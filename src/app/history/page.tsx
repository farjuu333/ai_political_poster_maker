'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { posterService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  History,
  Download,
  ExternalLink,
  PlusCircle,
  Calendar,
  Sparkles,
  Filter,
  Image as ImageIcon,
  User,
  Tag,
} from 'lucide-react';

interface PosterRecord {
  _id: string;
  generatedImageUrl?: string;
  status: string;
  createdAt: string;
  formData?: {
    candidateName?: string;
    designation?: string;
    partyName?: string;
    occasion?: string;
    slogan?: string;
    footerCredit?: string;
  };
  templateId?: {
    title?: string;
    occasionType?: string;
    thumbnailUrl?: string;
  };
}

export default function HistoryPage() {
  const { user } = useAuth();

  const [posters, setPosters] = useState<PosterRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'my' | 'all'>('my');

  useEffect(() => {
    loadPosters();
  }, [user, viewMode]);

  const loadPosters = async () => {
    setLoading(true);
    try {
      if (user?.id && viewMode === 'my') {
        const res = await posterService.getUserPosters(user.id);
        if (res.success && res.posters) {
          setPosters(res.posters);
          setLoading(false);
          return;
        }
      }

      // Fallback or public gallery list
      const res = await posterService.listPosters(1, 30);
      if (res.success && res.posters) {
        setPosters(res.posters);
      }
    } catch (err) {
      console.warn('Failed to load posters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl?: string, candidateName?: string) => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const safeName = (candidateName || 'poster').replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '_');
      link.download = `poster_${safeName}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      let downloadUrl = imageUrl;
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

  // Filter items
  const filteredPosters = posters.filter((p) => {
    if (selectedFilter === 'all') return true;
    const occ = (p.formData?.occasion || '').toLowerCase();
    if (selectedFilter === 'victory' && (occ.includes('বিজয়') || occ.includes('victory'))) return true;
    if (selectedFilter === 'election' && (occ.includes('নির্বাচন') || occ.includes('election') || occ.includes('প্রচারণা'))) return true;
    if (selectedFilter === 'condolence' && (occ.includes('শোক') || occ.includes('condolence'))) return true;
    return false;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>পোস্টার সংরক্ষণাগার</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            পোস্টার হিস্ট্রি ও গ্যালারি
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            পূর্বে তৈরি করা পোস্টারগুলো দেখুন ও ডাউনলোড করুন
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-950/60 border border-emerald-400/40 text-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন পোস্টার তৈরি করুন</span>
        </Link>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        
        {/* Toggle My vs All Posters */}
        {user && (
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('my')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'my'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              আমার তৈরি পোস্টার
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              সকল পোস্টার গ্যালারি
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {[
            { id: 'all', label: 'সব পোস্টার' },
            { id: 'victory', label: 'বিজয় দিবস' },
            { id: 'election', label: 'নির্বাচনী প্রচারণা' },
            { id: 'condolence', label: 'শোক বার্তা' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFilter(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === item.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Posters */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-slate-900/40 animate-pulse border border-slate-800"></div>
          ))}
        </div>
      ) : filteredPosters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosters.map((poster) => {
            const formData = poster.formData || {};
            const dateStr = poster.createdAt
              ? new Date(poster.createdAt).toLocaleDateString('bn-BD', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : '';

            return (
              <div
                key={poster._id}
                className="group relative glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                  {poster.generatedImageUrl ? (
                    <img
                      src={poster.generatedImageUrl}
                      alt={formData.candidateName || 'Poster'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-xs">ইমেজ প্রস্তুত হচ্ছে</span>
                    </div>
                  )}

                  {/* Occasion Badge Top Left */}
                  {formData.occasion && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-slate-950/80 backdrop-blur-md border border-white/20 shadow-md">
                      {formData.occasion}
                    </div>
                  )}

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs">
                    <Link
                      href={`/poster/${poster._id}`}
                      className="p-3 rounded-full bg-white text-slate-950 hover:bg-emerald-400 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all"
                      title="বিস্তারিত ও প্রিভিউ"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>

                    {poster.generatedImageUrl && (
                      <button
                        onClick={() => handleDownload(poster.generatedImageUrl, formData.candidateName)}
                        className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all"
                        title="সরাসরি ডাউনলোড"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white truncate">
                      {formData.candidateName || 'নামবিহীন পোস্টার'}
                    </h3>
                    <p className="text-xs text-emerald-400 truncate mt-0.5">
                      {formData.designation || formData.partyName || 'রাজনৈতিক পোস্টার'}
                    </p>
                    {formData.slogan && (
                      <p className="text-[11px] text-slate-400 italic line-clamp-1 mt-1">
                        "{formData.slogan}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 mt-3 border-t border-slate-800/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{dateStr || 'আজ'}</span>
                    </span>
                    <Link
                      href={`/poster/${poster._id}`}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                    >
                      দেখুন →
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-2xl border border-slate-800 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">এখনও কোনো পোস্টার তৈরি করা হয়নি</h3>
          <p className="text-slate-400 text-sm">
            মাত্র কয়েক ক্লিকে আপনার প্রথম কৃত্রিম বুদ্ধিমত্তা চালিত রাজনৈতিক বা উৎসবের পোস্টার ডিজাইন করুন।
          </p>
          <div className="pt-2">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 shadow-xl text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>প্রথম পোস্টার তৈরি করুন</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
