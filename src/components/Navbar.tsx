'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Image as ImageIcon, History, LogIn, UserPlus, LogOut, Menu, X, Shield, PlusCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'হোম', href: '/', icon: Sparkles },
    { name: 'পোস্টার তৈরি', href: '/create', icon: PlusCircle },
    { name: 'পোস্টার হিস্ট্রি', href: '/history', icon: History },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-800 to-slate-900 border border-emerald-500/30 shadow-lg group-hover:scale-105 transition-all duration-300">
              <span className="absolute w-4 h-4 rounded-full bg-red-600/90 shadow-md"></span>
              <Sparkles className="w-5 h-5 text-amber-300 relative z-10 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  পোস্টারমেকার
                </span>
                <span className="px-1.5 py-0.5 text-xs font-bold uppercase rounded bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 tracking-wide">
                রাজনৈতিক ও শুভেচ্ছা ব্যানার জেনারেটর
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Controls Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                <div className="text-right">
                  <div className="text-sm font-semibold text-white leading-tight flex items-center justify-end gap-1.5">
                    <span>{user.name}</span>
                    {user.role === 'admin' && (
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {user.role === 'admin' ? 'এডমিন' : user.role === 'designer' ? 'ডিজাইনার' : 'সদস্য'}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-emerald-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={logout}
                  title="লগআউট"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>লগইন</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-md shadow-emerald-900/40 border border-emerald-500/40 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>নিবন্ধন করুন</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/40">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-slate-400">{user.email || user.phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>লগআউট করুন</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700"
                >
                  <LogIn className="w-4 h-4" />
                  <span>লগইন</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/30"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>নিবন্ধন</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
