'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700/80 border border-emerald-500/40 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">পোস্টারমেকার এআই (PosterMaker AI)</div>
              <div className="text-slate-400 text-xs">বাংলাদেশের প্রথম কৃত্রিম বুদ্ধিমত্তাসম্পন্ন রাজনৈতিক পোস্টার তৈরির প্ল্যাটফর্ম</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link>
            <Link href="/create" className="hover:text-emerald-400 transition-colors">পোস্টার তৈরি</Link>
            <Link href="/history" className="hover:text-emerald-400 transition-colors">হিস্ট্রি</Link>
            <Link href="/login" className="hover:text-emerald-400 transition-colors">লগইন</Link>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>নির্মিত হয়েছে</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>বাংলাদেশি ডিজাইনারদের জন্য</span>
          </div>

        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} AI Political Poster Maker. সকল অধিকার সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
