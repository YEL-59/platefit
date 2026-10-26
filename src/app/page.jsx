"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Ruler, 
  Lock, 
  Printer, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight,
  BookOpen,
  Wrench
} from "lucide-react";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import BrtaPlatePreview from "@/components/BrtaPlatePreview";
import { BRTA_SPECS } from "@/lib/plateSpecs";

export default function HomePage() {
  const { t } = useLanguage();
  const [demoDistrict] = useState("ঢাকা মেট্রো");
  const [demoClass] = useState("হ");
  const [demoSeries] = useState("১১");
  const [demoNumber] = useState("১২৩৪");

  return (
    <div className="space-y-16">
      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium animate-pulse">
          <ShieldCheck className="w-4 h-4" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
          {t.hero.titleStart}{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {t.hero.titleHighlight}
          </span>{" "}
          <br className="hidden sm:inline" />
          {t.hero.titleEnd}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/brta-generator"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-xl shadow-emerald-600/30 hover:scale-[1.02]"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t.hero.ctaBrta}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/custom-studio"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-bold text-base border border-slate-700/80 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{t.hero.ctaCustom}</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-emerald-400" />
            <span>{t.hero.verifiedDimensions}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>{t.hero.clientSideNotice}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>১:১ ভেক্টর PDF এক্সপোর্ট</span>
          </div>
        </div>
      </section>

      {/* Live Interactive Quick Demo Preview */}
      <section className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-slate-400 ml-2">BRTA_FRONT_PREVIEW_285x50mm.svg</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Live 1:1 Scale
          </span>
        </div>

        <BrtaPlatePreview
          spec={BRTA_SPECS.MOTORCYCLE_FRONT}
          districtBn={demoDistrict}
          vehicleClass={demoClass}
          seriesNumber={demoSeries}
          regNumber={demoNumber}
          showRuler={true}
        />

        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>আদর্শ মোটরসাইকেল পরিমাপ: ২৮৫ মিমি × ৫০ মিমি</span>
          <Link
            href="/brta-generator"
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>আপনার নিজের নাম্বার দিয়ে বানান</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Two Core Modes Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card 1: Official BRTA Mode */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400/50 transition-all group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">P0 Official</span>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {t.modes.brtaTitle}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.modes.brtaDesc}
            </p>
            <ul className="space-y-2 text-xs text-slate-400 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>২৮৫x৫০ মিমি মোটরসাইকেল ও ২০০x১০০ মিমি স্কুটার ফ্রন্ট</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>২০ মিমি সর্বনিম্ন হরফ উচ্চতা ভ্যালিডেশন</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>লেজার কাটিং স্টেনসিল মোড ও ১০০ মিমি টেস্ট রুলার</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/brta-generator"
              className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20"
            >
              <span>স্টেনসিল তৈরি শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Card 2: Custom Plate Studio */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 flex flex-col justify-between hover:border-amber-400/40 transition-all group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Aftermarket / Show</span>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {t.modes.customTitle}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.modes.customDesc}
            </p>
            <ul className="space-y-2 text-xs text-slate-400 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>কার্বন ফাইবার, ম্যাট ব্ল্যাক, টাইটানিয়াম ও নিয়ন স্টাইল</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>জরুরি রক্তের গ্রুপ ব্যাজ (O+, A+, B+) ও ক্লাব মোটো</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>৩০০ ডিপিআই হাই-রেজোলিউশন PNG ও কাটিং ভেক্টর</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href="/custom-studio"
              className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              <span>কাস্টম স্টুডিও খুলুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Safety & Fabricator Hub Quick Banner */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4">
        <Link
          href="/rules-and-safety"
          className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              সড়ক পরিবহন আইন ২০১৮ ও গতিসীমা
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              ট্রাফিক জরিমানা তালিকা, হেলমেট আইন ও এক্সপ্রেসওয়ে গাইড
            </p>
          </div>
        </Link>

        <Link
          href="/fabricators"
          className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              মেটাল ও লেজার কাটিং শপ ডিরেক্টরি
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              ধোলাইখাল, মিরপুর, আগ্রাবাদে ১-ক্লিকে হোয়াটসঅ্যাপ কোটেশন
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
