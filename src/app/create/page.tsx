'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { posterService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Check,
  Palette,
  Layers,
  ArrowRight,
  X,
  AlertCircle,
  Wand2,
  Calendar,
  MapPin,
  Flag,
  User,
  Award,
} from 'lucide-react';

interface TemplateItem {
  _id: string;
  title: string;
  occasionType: string;
  thumbnailUrl?: string;
  layoutConfig?: {
    palette?: string[];
    [key: string]: any;
  };
}

export default function CreatePosterPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Templates state
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  // Form Fields State (Bilingual)
  const [candidateName, setCandidateName] = useState('আলহাজ্ব মো: রফিকুল ইসলাম');
  const [designation, setDesignation] = useState('সাধারণ সম্পাদক পদপ্রার্থী');
  const [partyName, setPartyName] = useState('বাংলাদেশ আওয়ামী লীগ');
  const [area, setArea] = useState('ঢাকা-১০, ধানমন্ডি');
  const [occasion, setOccasion] = useState('মহান বিজয় দিবস');
  const [slogan, setSlogan] = useState('বিজয়ের চেতনায় দেশ গড়ার শপথ নিন');
  const [secondarySlogan, setSecondarySlogan] = useState('উন্নয়ন ও অগ্রযাত্রায় ঐক্যবদ্ধ হোন');
  const [symbolName, setSymbolName] = useState('নৌকা');
  const [footerCredit, setFooterCredit] = useState('সর্বস্তরের নেতাকর্মী ও শুভাকাঙ্ক্ষীবৃন্দ');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  // 3 Photo Uploads State
  const [candidatePhoto, setCandidatePhoto] = useState<File | null>(null);
  const [candidatePhotoPreview, setCandidatePhotoPreview] = useState<string | null>(null);

  const [leaderPhoto1, setLeaderPhoto1] = useState<File | null>(null);
  const [leaderPhoto1Preview, setLeaderPhoto1Preview] = useState<string | null>(null);

  const [leaderPhoto2, setLeaderPhoto2] = useState<File | null>(null);
  const [leaderPhoto2Preview, setLeaderPhoto2Preview] = useState<string | null>(null);

  // Generation status state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const res = await posterService.getTemplates();
      if (res.success && res.templates?.length > 0) {
        setTemplates(res.templates);
        setSelectedTemplateId(res.templates[0]._id);
      } else {
        // Fallback default templates
        setTemplates(defaultFallbackTemplates);
        setSelectedTemplateId(defaultFallbackTemplates[0]._id);
      }
    } catch (err) {
      console.warn('Could not load templates from server, using fallbacks:', err);
      setTemplates(defaultFallbackTemplates);
      setSelectedTemplateId(defaultFallbackTemplates[0]._id);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'candidate' | 'leader1' | 'leader2'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === 'candidate') {
      setCandidatePhoto(file);
      setCandidatePhotoPreview(previewUrl);
    } else if (type === 'leader1') {
      setLeaderPhoto1(file);
      setLeaderPhoto1Preview(previewUrl);
    } else {
      setLeaderPhoto2(file);
      setLeaderPhoto2Preview(previewUrl);
    }
  };

  const handleRemovePhoto = (type: 'candidate' | 'leader1' | 'leader2') => {
    if (type === 'candidate') {
      setCandidatePhoto(null);
      setCandidatePhotoPreview(null);
    } else if (type === 'leader1') {
      setLeaderPhoto1(null);
      setLeaderPhoto1Preview(null);
    } else {
      setLeaderPhoto2(null);
      setLeaderPhoto2Preview(null);
    }
  };

  const handleApplyPreset = (type: 'bnp' | 'al' | 'condolence') => {
    if (type === 'bnp') {
      setPartyName('বাংলাদেশ জাতীয়তাবাদী দল - বিএনপি');
      setCandidateName('ব্যারিস্টার কায়সার কামাল');
      setDesignation('আইন বিষয়ক সম্পাদক');
      setOccasion('আসন্ন নির্বাচনী প্রচারণা');
      setSlogan('গণতন্ত্র পুনরুদ্ধারে ঐক্যবদ্ধ হোন');
      setSecondarySlogan('জনগণের ভোটাধিকার রক্ষায় ধানের শীষে ভোট দিন');
      setSymbolName('ধানের শীষ');
      setFooterCredit('জাতীয়তাবাদী আইনজীবী ফোরাম ও সর্বস্তরের জনগণ');
    } else if (type === 'al') {
      setPartyName('বাংলাদেশ আওয়ামী লীগ');
      setCandidateName('আলহাজ্ব মো: রফিকুল ইসলাম');
      setDesignation('সাধারণ সম্পাদক পদপ্রার্থী');
      setOccasion('মহান বিজয় দিবস');
      setSlogan('বিজয়ের রক্তিম শুভেচ্ছা ও শুভকামনা');
      setSecondarySlogan('স্মার্ট বাংলাদেশ বিনির্মাণে এগিয়ে চলুন');
      setSymbolName('নৌকা');
      setFooterCredit('এলাকাবাসী ও দলীয় সর্বস্তরের নেতাকর্মীবৃন্দ');
    } else {
      setPartyName('সর্বদলীয় শোক সভা');
      setCandidateName('মরহুম আলহাজ্ব আবুল কাশেম');
      setDesignation('বিশিষ্ট সমাজসেবক ও শিক্ষানুরাগী');
      setOccasion('গভীর শোক ও শ্রদ্ধাঞ্জলি');
      setSlogan('বিনম্র শ্রদ্ধায় স্মরণ করি চির অম্লান স্মৃতি');
      setSecondarySlogan('আমরা মরহুমের বিদেহী আত্মার মাগফিরাত কামনা করছি');
      setSymbolName('');
      setFooterCredit('শোকাহত: পরিবারবর্গ ও সর্বস্তরের শুভাকাঙ্ক্ষী');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setErrorMessage('অনুগ্রহ করে প্রার্থীর নাম প্রদান করুন।');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setGenerationStep(1);

    // Simulated progress steps for great UX
    const timer1 = setTimeout(() => setGenerationStep(2), 1000);
    const timer2 = setTimeout(() => setGenerationStep(3), 2200);

    try {
      const formData = new FormData();
      formData.append('templateId', selectedTemplateId);
      formData.append('candidateName', candidateName);
      formData.append('designation', designation);
      formData.append('partyName', partyName);
      formData.append('occasion', occasion);
      formData.append('slogan', slogan);
      formData.append('secondarySlogan', secondarySlogan);
      formData.append('symbolName', symbolName);
      formData.append('footerCredit', footerCredit);
      formData.append('venue', venue ? `${area ? area + ', ' : ''}${venue}` : area);
      formData.append('area', area);
      formData.append('district', area);
      formData.append('eventDate', eventDate);
      formData.append('customNotes', customNotes);

      if (user?.id) {
        formData.append('userId', user.id);
      }

      // Photos
      if (candidatePhoto) {
        formData.append('candidatePhoto', candidatePhoto);
      }
      if (leaderPhoto1) {
        formData.append('leaderPhotos', leaderPhoto1);
      }
      if (leaderPhoto2) {
        formData.append('leaderPhotos', leaderPhoto2);
      }

      const res = await posterService.generatePoster(formData);

      clearTimeout(timer1);
      clearTimeout(timer2);
      setGenerationStep(4);

      if (res.success && res.poster?.id) {
        setTimeout(() => {
          router.push(`/poster/${res.poster.id}`);
        }, 800);
      } else {
        throw new Error(res.message || 'পোস্টার তৈরি ব্যর্থ হয়েছে।');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setIsGenerating(false);
      setErrorMessage(
        err.response?.data?.message || err.message || 'পোস্টার রেন্ডার করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
      );
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI রাজনৈতিক পোস্টার জেনারেটর</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              নতুন পোস্টার ডিজাইন করুন
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              টেমপ্লেট নির্বাচন করুন, প্রয়োজনীয় তথ্য দিন এবং এআই দিয়ে নিমেষেই তৈরি করুন হাই-রেজোলিউশন পোস্টার
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">দ্রুত নমুনা:</span>
            <button
              type="button"
              onClick={() => handleApplyPreset('al')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900 transition-all"
            >
              আওয়ামী লীগ থিম
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('bnp')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-700/60 hover:bg-blue-900 transition-all"
            >
              বিএনপি থিম
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('condolence')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all"
            >
              শোক শ্রদ্ধাঞ্জলি
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
          <div>
            <div className="font-semibold">পোস্টার তৈরি সম্ভব হয়নি</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* STEP 1: TEMPLATE SELECTOR */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ১
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">টেমপ্লেট নির্বাচন করুন (Select Template)</h2>
              <p className="text-xs text-slate-400">আপনার অনুষ্ঠান বা প্রচারণার জন্য মানানসই থিম পছন্দ করুন</p>
            </div>
          </div>

          {loadingTemplates ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 rounded-xl bg-slate-800/40 animate-pulse border border-slate-800"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {templates.map((tpl) => {
                const isSelected = selectedTemplateId === tpl._id;
                const palette = tpl.layoutConfig?.palette || ['#006A4E', '#B71C1C', '#FFD700'];

                return (
                  <div
                    key={tpl._id}
                    onClick={() => {
                      setSelectedTemplateId(tpl._id);
                      if (tpl.occasionType === 'victory_day') setOccasion('মহান বিজয় দিবস');
                      if (tpl.occasionType === 'condolence') setOccasion('গভীর শোক ও বিনম্র শ্রদ্ধাঞ্জলি');
                      if (tpl.occasionType === 'election_campaign') setOccasion('আসন্ন নির্বাচনী প্রচারণা');
                    }}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/30 bg-slate-900/90 shadow-xl shadow-amber-950/20'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                    }`}
                  >
                    {/* Top Preview Banner */}
                    <div
                      className="h-36 relative overflow-hidden flex items-center justify-center p-4 text-center"
                      style={{
                        background: `linear-gradient(135deg, ${palette[0]}dd, ${palette[1] || palette[0]}cc, #050b14)`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm border border-white/20 mb-1.5">
                          {tpl.occasionType}
                        </span>
                        <div className="text-white font-extrabold text-base leading-snug drop-shadow-md">
                          {tpl.title}
                        </div>
                      </div>

                      {/* Selected Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-bold">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Card Footer Details */}
                    <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <div className="flex items-center -space-x-1">
                          {palette.slice(0, 4).map((c, idx) => (
                            <span
                              key={idx}
                              className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                              style={{ backgroundColor: c }}
                            ></span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                        {isSelected ? 'নির্বাচিত ✓' : 'পছন্দ করুন →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* STEP 2: CAMPAIGN DETAILS FORM */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ২
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">পোস্টারের বিস্তারিত তথ্য (Campaign Details)</h2>
              <p className="text-xs text-slate-400">প্রার্থী, দল ও স্লোগানের তথ্য বাংলা অথবা ইংরেজিতে লিখুন</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Candidate Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                প্রার্থীর নাম / ব্যক্তির নাম (Candidate Name) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="যেমন: আলহাজ্ব মো: রফিকুল ইসলাম"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                পদবি বা প্রত্যাশিত পদ (Designation)
              </label>
              <div className="relative">
                <Award className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="যেমন: সাধারণ সম্পাদক পদপ্রার্থী / মেয়র প্রার্থী"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Party Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                দল বা সংগঠনের নাম (Party / Organization)
              </label>
              <div className="relative">
                <Flag className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  placeholder="যেমন: বাংলাদেশ আওয়ামী লীগ / বিএনপি"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* District / Thana / Area */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                জেলা / থানা / নির্বাচনী এলাকা (District / Thana)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="যেমন: ঢাকা-১০, ধানমন্ডি / কুমিল্লা সদর"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Occasion Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                উপলক্ষ্য (Occasion)
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              >
                <option value="মহান বিজয় দিবস">মহান বিজয় দিবস (Victory Day)</option>
                <option value="আসন্ন নির্বাচনী প্রচারণা">আসন্ন নির্বাচনী প্রচারণা (Election Campaign)</option>
                <option value="গভীর শোক ও বিনম্র শ্রদ্ধাঞ্জলি">গভীর শোক ও বিনম্র শ্রদ্ধাঞ্জলি (Condolence & Memorial)</option>
                <option value="পবিত্র ঈদুল ফিতরের শুভেচ্ছা">পবিত্র ঈদুল ফিতরের শুভেচ্ছা (Eid-ul-Fitr)</option>
                <option value="পবিত্র ঈদুল আযহার শুভেচ্ছা">পবিত্র ঈদুল আযহার শুভেচ্ছা (Eid-ul-Adha)</option>
                <option value="মহান স্বাধীনতা দিবস">মহান স্বাধীনতা দিবস (Independence Day)</option>
                <option value="কর্মী সমাবেশ ও সম্মেলন">কর্মী সমাবেশ ও সম্মেলন (Party Rally)</option>
                <option value="শুভ নববর্ষ ১৪৩১">শুভ নববর্ষ ১৪৩১ (Pohela Boishakh)</option>
              </select>
            </div>

            {/* Ballot Symbol / Mark */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                নির্বাচনী মার্কা বা প্রতীক (Ballot Symbol)
              </label>
              <input
                type="text"
                value={symbolName}
                onChange={(e) => setSymbolName(e.target.value)}
                placeholder="যেমন: নৌকা / ধানের শীষ / লাঙ্গল / তারা"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>

          </div>

          {/* Slogans Section */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            
            {/* Main Headline Slogan */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-200">
                  মূল স্লোগান বা বক্তব্য (Main Headline / Slogan in Bangla)
                </label>
                <span className="text-xs text-amber-400">খালি রাখলে এআই স্বয়ংক্রিয় তৈরি করবে</span>
              </div>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="যেমন: উন্নয়নের ধারাবাহিকতায় নৌকায় ভোট দিন"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Secondary Slogan */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                উপ-স্লোগান বা আহ্বান (Secondary Slogan)
              </label>
              <input
                type="text"
                value={secondarySlogan}
                onChange={(e) => setSecondarySlogan(e.target.value)}
                placeholder="যেমন: আপনার মূল্যবান ভোট দিয়ে জয়যুক্ত করুন"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Footer Credit */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1.5">
                প্রচারে (Footer Credit Line)
              </label>
              <input
                type="text"
                value={footerCredit}
                onChange={(e) => setFooterCredit(e.target.value)}
                placeholder="যেমন: সর্বস্তরের নেতাকর্মী ও এলাকাবাসী"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Event Date & Venue optional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">তারিখ (ঐচ্ছিক)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="যেমন: ২৬ মার্চ, ২০২৬"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">ভেন্যু বা স্থান (ঐচ্ছিক)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="যেমন: ইঞ্জিনিয়ার্স ইনস্টিটিউশন মিলনায়তন"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-white text-xs"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* STEP 3: PHOTO UPLOADS (UP TO 3 PHOTOS) */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ৩
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">ছবি আপলোড করুন (Upload Photos - Up to 3)</h2>
              <p className="text-xs text-slate-400">প্রার্থীর মূল ছবি এবং শীর্ষ নেতৃবৃন্দের ছবি যুক্ত করুন (ঐচ্ছিক কিন্তু সুন্দর পোস্টারের জন্য বাঞ্ছনীয়)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* 1. Candidate Photo */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-amber-400">১. প্রার্থীর ছবি (Main)</span>
                  <span className="text-[11px] text-slate-400">বড় কেন্দ্রিক ছবি</span>
                </div>
                
                {candidatePhotoPreview ? (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-amber-400/40 group">
                    <img src={candidatePhotoPreview} alt="Candidate" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto('candidate')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-950/40 hover:bg-slate-900/60 transition-all text-center p-3">
                    <Upload className="w-7 h-7 text-emerald-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-300">প্রার্থীর ছবি আপলোড</span>
                    <span className="text-[10px] text-slate-500 mt-1">PNG, JPG (Max 10MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(e, 'candidate')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* 2. Leader Photo 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-200">২. শীর্ষ নেতা ১</span>
                  <span className="text-[11px] text-slate-400">উপরে বাম ফ্রেম</span>
                </div>

                {leaderPhoto1Preview ? (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-700 group">
                    <img src={leaderPhoto1Preview} alt="Leader 1" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto('leader1')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-950/40 hover:bg-slate-900/60 transition-all text-center p-3">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-300">নেতা ১ এর ছবি আপলোড</span>
                    <span className="text-[10px] text-slate-500 mt-1">বঙ্গবন্ধু / জিয়াউর রহমান ইত্যাদি</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(e, 'leader1')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* 3. Leader Photo 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-200">৩. শীর্ষ নেতা ২</span>
                  <span className="text-[11px] text-slate-400">উপরে ডান ফ্রেম</span>
                </div>

                {leaderPhoto2Preview ? (
                  <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-700 group">
                    <img src={leaderPhoto2Preview} alt="Leader 2" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto('leader2')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-lg cursor-pointer bg-slate-950/40 hover:bg-slate-900/60 transition-all text-center p-3">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-300">নেতা ২ এর ছবি আপলোড</span>
                    <span className="text-[10px] text-slate-500 mt-1">শেখ হাসিনা / খালেদা জিয়া ইত্যাদি</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(e, 'leader2')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* SUBMIT BUTTON & PROGRESS OVERLAY */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto min-w-[320px] py-4 px-8 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:to-amber-400 shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mx-auto"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>এআই পোস্টার তৈরি হচ্ছে...</span>
              </div>
            ) : (
              <>
                <Wand2 className="w-6 h-6 text-amber-200" />
                <span>পোস্টার তৈরি করুন (Generate AI Poster)</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>

      {/* GENERATION PROGRESS MODAL OVERLAY */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-slate-700 text-center shadow-2xl space-y-6">
            
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-400 animate-spin blur-md opacity-75"></div>
              <div className="relative w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">পোস্টার তৈরি হচ্ছে...</h3>
              <p className="text-xs text-slate-400 mt-1">কৃত্রিম বুদ্ধিমত্তা আপনার পোস্টার রেন্ডার করছে</p>
            </div>

            {/* Steps indicator */}
            <div className="space-y-3 text-left">
              {[
                { step: 1, label: 'তথ্য ও আপলোডকৃত ছবি বিশ্লেষণ' },
                { step: 2, label: 'জেমিনাই এআই কালার ও স্লোগান সমন্বয়' },
                { step: 3, label: 'হাই-রেজোলিউশন ক্যানভাসে বাংলা পোস্টার ড্র' },
                { step: 4, label: 'প্রিন্ট কোয়ালিটি পিএনজি ইমেজ প্রস্তুত' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      generationStep > s.step
                        ? 'bg-emerald-500 text-white'
                        : generationStep === s.step
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {generationStep > s.step ? '✓' : s.step}
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      generationStep >= s.step ? 'text-white font-medium' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

const defaultFallbackTemplates: TemplateItem[] = [
  {
    _id: '6ab62e30b9fce1bd44a4988a',
    title: 'মহান বিজয় দিবস - রক্তিম শুভেচ্ছা ও শ্রদ্ধাঞ্জলি',
    occasionType: 'victory_day',
    layoutConfig: {
      palette: ['#006A4E', '#B71C1C', '#FFD700', '#071A12', '#FFFFFF'],
    },
  },
  {
    _id: '6ab62e30b9fce1bd44a4988c',
    title: 'আসন্ন নির্বাচনী প্রচারণা ও গণসংযোগ',
    occasionType: 'election_campaign',
    layoutConfig: {
      palette: ['#0D47A1', '#B71C1C', '#F59E0B', '#091528', '#FFFFFF'],
    },
  },
  {
    _id: '6ab62e30b9fce1bd44a4988b',
    title: 'গভীর শোক ও বিনম্র শ্রদ্ধাঞ্জলি',
    occasionType: 'condolence',
    layoutConfig: {
      palette: ['#1E293B', '#0F172A', '#CBD5E1', '#090D16', '#F8FAFC'],
    },
  },
];
