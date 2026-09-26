'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Wand2,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Palette,
  Flag,
  Award,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Ambient Gradient Blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/15 via-red-600/10 to-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>🇧🇩 বাংলাদেশের প্রথম কৃত্রিম বুদ্ধিমত্তার রাজনৈতিক পোস্টার মেকার</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]">
            মুহূর্তেই তৈরি করুন <br />
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
              আধুনিক রাজনৈতিক ও শুভেচ্ছা পোস্টার
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            নেতৃবৃন্দের ছবি, প্রার্থীর প্রতিকৃতি এবং খাঁটি বাংলা ফন্টে প্রিন্ট-রেডি হাই-রেজোলিউশন নির্বাচনী পোস্টার ও উৎসবের ব্যানার তৈরি করুন এআই দিয়ে।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/create"
              className="px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:to-amber-400 shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 flex items-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <Wand2 className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>বিনামূল্যে পোস্টার তৈরি শুরু করুন</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/history"
              className="px-6 py-4 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all text-base"
            >
              পূর্বে তৈরি পোস্টার দেখুন
            </Link>
          </div>

          {/* Trust Checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>কালপুরুষ বাংলা ফন্ট</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>জেমিনাই এআই কালার ও স্লোগান</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>১২০০×১৬০০ HD প্রিন্ট এক্সপোর্ট</span>
            </div>
          </div>

        </div>

      </section>

      {/* SAMPLE POSTER SHOWCASE SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            জনপ্রিয় পোস্টার ক্যাটাগরি ও টেমপ্লেট
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            আপনার অনুষ্ঠান বা ক্যাম্পেইনের জন্য প্রস্তুত করা নমুনা ডিজাইন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Victory Day */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 group shadow-xl flex flex-col justify-between">
            <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-emerald-900/40 to-slate-950 border-b border-slate-800 relative">
              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 mb-3">
                মহান বিজয় দিবস
              </div>
              <h3 className="text-xl font-bold text-white mb-2">বিজয় দিবস ও জাতীয় দিবস</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                লাল-সবুজের ঐতিহ্যবাহী থিম, স্মৃতিসৌধের প্রতীক এবং শীর্ষ মুক্তিযোদ্ধাদের শ্রদ্ধার্ঘ্য সম্বলিত জাতীয় পোস্টার।
              </p>
            </div>
            <div className="p-6 bg-slate-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Palette className="w-4 h-4 text-emerald-400" />
                <span>রঙ: ফরেস্ট গ্রিন, ফ্ল্যাগ রেড, সোনালী</span>
              </div>
              <Link
                href="/create"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-center text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>এই টেমপ্লেট ব্যবহার করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Election Campaign */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/60 transition-all duration-300 group shadow-xl flex flex-col justify-between">
            <div className="p-6 bg-gradient-to-br from-blue-950/80 via-slate-900/60 to-slate-950 border-b border-slate-800 relative">
              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold text-amber-300 bg-amber-950/90 border border-amber-500/40 mb-3">
                নির্বাচনী প্রচারণা
              </div>
              <h3 className="text-xl font-bold text-white mb-2">সংসদ ও স্থানীয় সরকার নির্বাচন</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                প্রার্থীর বড় ছবি, মার্কা ও প্রতীক ব্যাজ, স্লোগান এবং ভোটাধিকার আবেদনের আকর্ষণীয় রাজনৈতিক ব্যানার।
              </p>
            </div>
            <div className="p-6 bg-slate-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>রঙ: রয়্যাল ব্লু, ডিপ রেড, গোল্ডেন অ্যাম্বার</span>
              </div>
              <Link
                href="/create"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-center text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>এই টেমপ্লেট ব্যবহার করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Condolence */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 group shadow-xl flex flex-col justify-between">
            <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black border-b border-slate-800 relative">
              <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-300 bg-slate-800 border border-slate-700 mb-3">
                শোক ও শ্রদ্ধাঞ্জলি
              </div>
              <h3 className="text-xl font-bold text-white mb-2">শোক বার্তা ও স্মরণ সভা</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                গাম্ভীর্যপূর্ণ মনোক্রোম ও ডার্ক চারকোল প্যালেট, শোকাবহ ফিতা এবং দোয়া কামনার উপযুক্ত মার্জিত ডিজাইন।
              </p>
            </div>
            <div className="p-6 bg-slate-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Palette className="w-4 h-4 text-slate-400" />
                <span>রঙ: ডিপ চারকোল, সিলভার, হোয়াইট</span>
              </div>
              <Link
                href="/create"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-center text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <span>এই টেমপ্লেট ব্যবহার করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS / FEATURES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/60">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            কীভাবে কাজ করে পোস্টারমেকার এআই?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            সহজ ৩টি ধাপে তৈরি করুন পেশাদার মানের রাজনৈতিক পোস্টার
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-xl font-extrabold">
              ১
            </div>
            <h3 className="text-lg font-bold text-white">তথ্য ও ছবি দিন</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              প্রার্থীর নাম, পদবি, দল, স্লোগান ও মার্কা লিখুন এবং সর্বোচ্চ ৩টি ছবি আপলোড করুন।
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-xl font-extrabold">
              ২
            </div>
            <h3 className="text-lg font-bold text-white">এআই অটোমেশন</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              জেমিনাই এআই দল ও উপলক্ষে নিখুঁত কালার প্যালেট নির্বাচন করবে এবং ক্যানভাসে ড্র করবে।
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto text-xl font-extrabold">
              ৩
            </div>
            <h3 className="text-lg font-bold text-white">হাই-রেজ ডাউনলোড</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              ১২০০×১৬০০ হাই-ডেফিনিশন ফরম্যাটে পিএনজি ফাইল সরাসরি ডাউনলোড করুন।
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-red-950/30 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              এখনই তৈরি করুন আপনার নির্বাচনী পোস্টার
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              কোনো গ্রাফিক্স ডিজাইন সফটওয়্যার জানা ছাড়াই নিমিষেই পান চোখ ধাঁধানো পোস্টার।
            </p>
            <div className="pt-2">
              <Link
                href="/create"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 shadow-xl shadow-emerald-950/80 text-base"
              >
                <Wand2 className="w-5 h-5 text-amber-200" />
                <span>পোস্টার জেনারেটরে যান</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
