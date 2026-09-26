'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { posterService } from '@/lib/api';
import {
  Download,
  RotateCw,
  Share2,
  Sparkles,
  ArrowLeft,
  Check,
  AlertCircle,
  Clock,
  Layers,
  Palette,
  ExternalLink,
  PlusCircle,
  Copy,
} from 'lucide-react';

export default function PosterPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const posterId = resolvedParams.id;

  const [poster, setPoster] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Regenerate & retry limit handling
  const [retriesLeft, setRetriesLeft] = useState(3);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const fetchPoster = async () => {
      try {
        const res = await posterService.getPosterById(posterId);
        if (res.success && res.poster) {
          setPoster(res.poster);
          setLoading(false);

          // If still processing, poll every 2 seconds
          if (res.poster.status === 'processing') {
            if (!interval) {
              interval = setInterval(fetchPoster, 2000);
            }
          } else if (interval) {
            clearInterval(interval);
          }
        } else {
          setError(res.message || 'পোস্টার খুঁজে পাওয়া যায়নি।');
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'পোস্টার লোড করতে সমস্যা হয়েছে।');
        setLoading(false);
      }
    };

    fetchPoster();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [posterId]);

  // Handle direct file download
  const handleDownload = async () => {
    if (!poster?.generatedImageUrl) return;

    try {
      const response = await fetch(poster.generatedImageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const safeName = (poster.formData?.candidateName || 'poster')
        .replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_');
      link.download = `poster_${safeName}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Direct Cloudinary attachment download fallback if available
      let downloadUrl = poster.generatedImageUrl;
      if (downloadUrl.includes('cloudinary.com') && downloadUrl.includes('/upload/')) {
        downloadUrl = downloadUrl.replace('/upload/', '/upload/fl_attachment/');
      }
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = `poster_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle Regenerate with retry limit
  const handleRegenerate = async () => {
    if (retriesLeft <= 0) return;
    if (!poster) return;

    setIsRegenerating(true);
    try {
      const payload = {
        templateId: poster.templateId?._id || poster.templateId,
        candidateName: poster.formData?.candidateName,
        designation: poster.formData?.designation,
        partyName: poster.formData?.partyName,
        occasion: poster.formData?.occasion,
        slogan: poster.formData?.slogan,
        secondarySlogan: poster.formData?.secondarySlogan,
        symbolName: poster.formData?.symbolName,
        footerCredit: poster.formData?.footerCredit,
        venue: poster.formData?.venue,
        eventDate: poster.formData?.eventDate,
        customNotes: poster.formData?.customNotes,
        candidatePhotoUrl: poster.uploadedPhotoUrls?.[0],
        leaderPhotoUrls: poster.uploadedPhotoUrls?.slice(1) || [],
        formData: {
          ...poster.formData,
          candidatePhotoUrl: poster.uploadedPhotoUrls?.[0],
          leaderPhotoUrls: poster.uploadedPhotoUrls?.slice(1) || [],
        },
        userId: poster.userId?._id || poster.userId,
      };

      const res = await posterService.generatePoster(payload);
      if (res.success && res.poster?.id) {
        setRetriesLeft((prev) => prev - 1);
        // Switch to the newly generated poster
        router.push(`/poster/${res.poster.id}`);
      } else {
        throw new Error(res.message || 'পুনরায় তৈরি ব্যর্থ হয়েছে।');
      }
    } catch (err: any) {
      alert(err.message || 'পোস্টার পুনরায় তৈরি করতে সমস্যা হয়েছে।');
    } finally {
      setIsRegenerating(false);
    }
  };

  // Share link copy
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping"></div>
          <div className="relative w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
        </div>
        <div className="text-white font-semibold text-lg">পোস্টার লোড হচ্ছে...</div>
        <p className="text-slate-400 text-xs">অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন</p>
      </div>
    );
  }

  if (error || !poster) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">পোস্টার খুঁজে পাওয়া যায়নি</h2>
        <p className="text-slate-400 text-sm">{error || 'পোস্টারটির তথ্য সার্ভারে অনুপস্থিত।'}</p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন পোস্টার তৈরি করুন</span>
        </Link>
      </div>
    );
  }

  const formData = poster.formData || {};
  const isCompleted = poster.status === 'completed';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/create"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>নতুন পোস্টার তৈরি পেইজে ফিরুন</span>
        </Link>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>পোস্টার প্রস্তুত (Completed)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>রেন্ডার হচ্ছে (Processing)...</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Preview & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Poster Image Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative group w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden glass-panel border border-slate-700/80 p-3 shadow-2xl shadow-emerald-950/40">
            
            {poster.generatedImageUrl ? (
              <div className="relative rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={poster.generatedImageUrl}
                  alt={formData.candidateName || 'AI Political Poster'}
                  className="w-full h-auto object-contain rounded-lg shadow-inner"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/4] flex flex-col items-center justify-center bg-slate-900/60 rounded-xl space-y-3">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-sm font-semibold text-slate-300">ইমেজ তৈরি হচ্ছে...</div>
              </div>
            )}

            {/* Poster Dimensions & Format Badge */}
            <div className="flex items-center justify-between mt-3 px-2 text-xs text-slate-400">
              <span>রেজোলিউশন: ১২০০ × ১৬০০ px (HD)</span>
              <span>ফরম্যাট: PNG (Print Ready)</span>
            </div>

          </div>
        </div>

        {/* Right Column: Actions & Campaign Information */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Action Buttons Box */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              পোস্টার অ্যাকশন (Actions)
            </h2>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!isCompleted}
              className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950/50 border border-emerald-400/40 flex items-center justify-center gap-2.5 transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              <span>হাই-রেজোলিউশন ডাউনলোড (PNG)</span>
            </button>

            {/* Regenerate Button with retry count */}
            <div className="pt-2">
              <button
                onClick={handleRegenerate}
                disabled={isRegenerating || retriesLeft <= 0}
                className="w-full py-3 px-4 rounded-xl font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>
                  {isRegenerating
                    ? 'পুনরায় তৈরি হচ্ছে...'
                    : retriesLeft > 0
                    ? `পুনরায় তৈরি করুন (বাকি ${retriesLeft}টি সুযোগ)`
                    : 'রিট্রাই সীমা শেষ'}
                </span>
              </button>
              {retriesLeft === 0 && (
                <p className="text-[11px] text-slate-500 text-center mt-1">
                  রিট্রাই লিমিট শেষ হয়েছে। নতুন পরিবর্তন করতে নতুন পোস্টার তৈরি করুন।
                </p>
              )}
            </div>

            {/* Secondary Actions: Share & Create Another */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleShare}
                className="py-2.5 px-3 rounded-xl font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-1.5 transition-all text-xs"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'লিংক কপি হয়েছে!' : 'শেয়ার লিংক'}</span>
              </button>

              <Link
                href="/create"
                className="py-2.5 px-3 rounded-xl font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-1.5 transition-all text-xs"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>নতুন তৈরি</span>
              </Link>
            </div>

          </div>

          {/* Poster Meta Details */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>পোস্টারের বিস্তারিত বিবরণ</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">প্রার্থীর নাম:</span>
                <span className="font-semibold text-white">{formData.candidateName || '—'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">পদবি:</span>
                <span className="text-slate-200">{formData.designation || '—'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">দল / সংগঠন:</span>
                <span className="text-emerald-400 font-medium">{formData.partyName || '—'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">উপলক্ষ্য:</span>
                <span className="text-amber-400 font-medium">{formData.occasion || '—'}</span>
              </div>

              {formData.slogan && (
                <div className="py-2 border-b border-slate-800">
                  <span className="text-slate-400 text-xs block mb-1">স্লোগান / বক্তব্য:</span>
                  <span className="text-slate-200 text-sm font-medium italic">"{formData.slogan}"</span>
                </div>
              )}

              {formData.footerCredit && (
                <div className="py-2">
                  <span className="text-slate-400 text-xs block mb-1">প্রচারে:</span>
                  <span className="text-slate-300 text-xs">{formData.footerCredit}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Print Tip */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300/90 leading-relaxed">
            💡 <strong>প্রিন্ট টিপস:</strong> এই পোস্টারটি ১২০০×১৬০০ হাই-রেজোলিউশনে রেন্ডার করা হয়েছে। এটি সরাসরি প্রিন্টিং প্রেসে বা ফেসবুক, হোয়াটসঅ্যাপে পরিষ্কারভাবে শেয়ার করতে পারবেন।
          </div>

        </div>

      </div>

    </div>
  );
}
