"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { ShieldCheck, Heart, AlertCircle, Lock } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-md pt-12 pb-8 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                PF
              </div>
              <span className="font-bold text-lg text-white">PlateFit BD</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              {t.app.tagline}. {t.app.subtitle}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400/90 font-medium bg-emerald-950/40 border border-emerald-800/40 px-3 py-2 rounded-lg w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy: Your registration text is never stored on a server.</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/brta-generator" className="hover:text-emerald-400 transition-colors">
                  {t.nav.brtaGenerator} (285x50mm)
                </Link>
              </li>
              <li>
                <Link href="/custom-studio" className="hover:text-emerald-400 transition-colors">
                  {t.nav.customStudio}
                </Link>
              </li>
              <li>
                <Link href="/rules-and-safety" className="hover:text-emerald-400 transition-colors">
                  {t.nav.rulesAndSafety}
                </Link>
              </li>
              <li>
                <Link href="/fabricators" className="hover:text-emerald-400 transition-colors">
                  {t.nav.fabricators}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Sources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://brta.gov.bd/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  BRTA Official Portal ↗
                </a>
              </li>
              <li>
                <a href="https://bsp.brta.gov.bd/numberPlate" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  BRTA Number Plate Info ↗
                </a>
              </li>
              <li>
                <a href="https://rthd.gov.bd/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Road Transport Division (RTHD) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-slate-800/80 pt-6 pb-6 text-xs text-slate-500 leading-relaxed">
          <div className="flex items-start gap-2 mb-2 text-amber-400/90 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>আইনি ও বিআরটিএ সংক্রান্ত ঘোষণা (Legal & Disclaimer Notice):</span>
          </div>
          <p>
            PlateFit (প্লেটফিট) একটি উন্মুক্ত স্বাধীন সফটওয়্যার টুল। এটি বিআরটিএ (BRTA) বা বাংলাদেশ সরকারের কোনো অফিশিয়াল অঙ্গপ্রতিষ্ঠান নয়। 
            বিআরটিএ নির্দেশিত পেছনের ডিজিটাল আরএফআইডি (RFID) রেট্রো-রিফ্লেক্টিভ প্লেট কোনো অবস্থাতেই অন্য কোথাও থেকে তৈরি করা অনুমোদিত নয়। 
            এই টুলটি কেবলমাত্র বিআরটিএ নির্দেশিত পরিমাপ অনুযায়ী মোটরসাইকেলের সামনের মেটাল স্টেনসিল প্রস্তুতিতে সহায়তা করে। 
            কাস্টম স্টুডিওতে তৈরি ডিজাইনগুলো রেসিং ট্র্যাক, অফ-রোড বা শো-এর উদ্দেশ্যে সংরক্ষিত।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/60 pt-6 text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PlateFit BD. Built for the Bangladeshi Riding Community.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for safe roads in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
