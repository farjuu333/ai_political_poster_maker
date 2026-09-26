'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Mail, Lock, Sparkles, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('অনুগ্রহ করে ইমেইল/ফোন নম্বর এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login({ identifier, password });
      router.push('/create');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য পুনরায় পরীক্ষা করুন।';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-slate-900 border border-emerald-500/40 shadow-xl shadow-emerald-950/50 mb-4">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            স্বাগতম ফিরে আসার জন্য
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            আপনার অ্যাকাউন্টে লগইন করে রাজনৈতিক পোস্টার তৈরি করুন
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel p-8 rounded-2xl shadow-2xl border border-slate-800">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identifier input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                ইমেইল অথবা ফোন নম্বর (Email or Phone)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@example.com অথবা 017xxxxxxxx"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-300">
                  পাসওয়ার্ড (Password)
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>লগইন করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                setIdentifier('designer@example.com');
                setPassword('password123');
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
            >
              ডেমো ক্রেডেনশিয়াল ফিল করুন (Quick Demo Fill)
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center text-sm text-slate-400">
            নতুন ব্যবহারকারী?{' '}
            <Link
              href="/register"
              className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              এখনই বিনামূল্যে অ্যাকাউন্ট খুলুন
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
