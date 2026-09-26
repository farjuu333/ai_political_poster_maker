'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, User, Mail, Phone, Lock, Sparkles, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin' | 'designer'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !emailOrPhone || !password) {
      setError('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
      return;
    }

    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }

    setLoading(true);
    setError(null);

    const isEmail = emailOrPhone.includes('@');
    const payload = {
      name,
      email: isEmail ? emailOrPhone : undefined,
      phone: !isEmail ? emailOrPhone : undefined,
      password,
      role,
    };

    try {
      await register(payload);
      router.push('/create');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'নিবন্ধন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য পুনরায় পরীক্ষা করুন।';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-slate-900 border border-emerald-500/40 shadow-xl shadow-emerald-950/50 mb-4">
            <UserPlus className="w-7 h-7 text-amber-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            নতুন অ্যাকাউন্ট নিবন্ধন করুন
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            এআই পোস্টার তৈরির সকল সুযোগ সুবিধা পেতে আজই যুক্ত হোন
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-8 rounded-2xl shadow-2xl border border-slate-800">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                আপনার পূর্ণ নাম (Full Name)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: আলহাজ্ব তানভীর আহমেদ"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Email or Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                ইমেইল অথবা মোবাইল নম্বর (Email or Phone)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="user@example.com অথবা 017xxxxxxxx"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* User Role */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                ব্যবহারকারীর ধরন (Role / Purpose)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'user', label: 'রাজনৈতিক কর্মী / নেতা' },
                  { id: 'designer', label: 'গ্রাফিক্স ডিজাইনার' },
                  { id: 'admin', label: 'ক্যাম্পেইন সমন্বয়ক' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      role === item.id
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/60 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-400 pt-4 border-t border-slate-800">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link
              href="/login"
              className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              এখানে লগইন করুন
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
