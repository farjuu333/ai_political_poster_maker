import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI Political Poster Maker | কৃত্রিম বুদ্ধিমত্তার রাজনৈতিক পোস্টার মেকার',
  description: 'বাংলাদেশের রাজনৈতিক প্রচারণা, জাতীয় দিবস এবং উৎসবের শুভেচ্ছা পোস্টার তৈরি করুন এআই দিয়ে মুহূর্তেই।',
  keywords: ['political poster maker', 'bangladesh poster maker', 'ai poster generator', 'নির্বাচনী পোস্টার', 'বিজয় দিবস পোস্টার'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
