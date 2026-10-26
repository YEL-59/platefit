"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { 
  Sparkles, 
  Download, 
  FileText, 
  Layers, 
  Droplet, 
  Type, 
  ShieldAlert, 
  Check, 
  Image as ImageIcon 
} from "lucide-react";
import CustomPlateCanvas from "@/components/CustomPlateCanvas";
import { CUSTOM_TEXTURES, BLOOD_GROUPS, BADGES_LIST } from "@/lib/plateSpecs";
import { exportCanvasAsPng } from "@/lib/exportPngImage";
import { exportPlatePdf } from "@/lib/exportVectorPdf";

export default function CustomStudioPage() {
  const { t } = useLanguage();

  // Customization State
  const [selectedTexture, setSelectedTexture] = useState(CUSTOM_TEXTURES[0]);
  const [borderStyle, setBorderStyle] = useState("pinstripe"); // 'none', 'pinstripe', 'chamfered', 'screws'
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [badgeType, setBadgeType] = useState("blood_group");
  const [fontFamily, setFontFamily] = useState("'Tiro Bangla', sans-serif");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const [primaryText, setPrimaryText] = useState("ঢাকা মেট্রো-হ ১১-১২৩৪");
  const [subText, setSubText] = useState("DHAKA RIDER CLUB");

  const [canvasInstance, setCanvasInstance] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Export handlers
  const handleDownloadPng = () => {
    if (!canvasInstance) return;
    exportCanvasAsPng(canvasInstance, `PlateFit_Custom_${primaryText.replace(/[^a-zA-Z0-9-_]/g, "_")}.png`);
  };

  const handleDownloadPdf = async () => {
    if (!canvasInstance) return;
    setIsExporting(true);
    try {
      await exportPlatePdf({
        canvas: canvasInstance,
        plateWidthMm: 285,
        plateHeightMm: 50,
        title: `PlateFit_Custom_${primaryText.replace(/[^a-zA-Z0-9-_]/g, "_")}`,
        isStencilMode: false,
        vehicleType: "custom_show",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Show/Track Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">কাস্টম প্লেট ব্যবহারের নীতিমালা (Show & Track Use Only):</strong>
          <p className="mt-0.5 text-xs text-amber-200/80">
            এই স্টুডিওতে তৈরি রঙিন, কার্বন বা কাস্টম ফন্টের প্লেটগুলো রেসিং ট্র্যাক, বাইক ক্লাবের শো, প্রদর্শনী বা পেছনের অ্যাকসেন্টের জন্য। বিআরটিএ নিয়মিত হাইওয়েতে সাদা-কালো অফিশিয়াল মানদণ্ড বাধ্যতামূলক করেছে।
          </p>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ক্রিয়েটিভ আফটারমার্কেট ডিজাইন স্টুডিও</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.modes.customTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          কার্বন ফাইবার, ম্যাট ব্ল্যাক, রক্তের গ্রুপ ব্যাজ ও নিজস্ব ক্লাবের নাম দিয়ে আকর্ষণীয় শো-প্লেট ডিজাইন করুন।
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Design Controls */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
          {/* 1. Style & Texture Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{t.custom.styleTitle}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CUSTOM_TEXTURES.map((tex) => (
                <button
                  key={tex.id}
                  type="button"
                  onClick={() => {
                    setSelectedTexture(tex);
                    setTextColor(tex.textColor);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                    selectedTexture.id === tex.id
                      ? "border-amber-400 bg-amber-500/20 text-white shadow-md shadow-amber-500/20"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: tex.bg }}
                  />
                  <span className="truncate">{tex.nameBn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Border & Frame Options */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.custom.frameTitle}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "none", label: "ক্লিন বর্ডারলেস (None)" },
                { id: "pinstripe", label: "রেসিং ডাবল পিনস্ট্রাইপ" },
                { id: "chamfered", label: "চ্যাম্ফার্ড নিয়ন ফ্রেম" },
                { id: "screws", label: "ইন্ডাস্ট্রিয়াল স্ক্রু রিভেটস" },
              ].map((bf) => (
                <button
                  key={bf.id}
                  type="button"
                  onClick={() => setBorderStyle(bf.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                    borderStyle === bf.id
                      ? "border-amber-400 bg-amber-500/20 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  {bf.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Emergency Blood Group & Badges */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-rose-500" />
              <span>{t.custom.bloodGroup}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  onClick={() => setBloodGroup(bloodGroup === bg ? "" : bg)}
                  className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all text-center ${
                    bloodGroup === bg
                      ? "border-rose-500 bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 block">
              জরুরি মুহূর্তে রক্তের গ্রুপ দ্রুত শনাক্ত করতে সাহায্য করে
            </span>
          </div>

          {/* 4. Text & Typography Input */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.custom.plateText}
              </label>
              <input
                type="text"
                value={primaryText}
                onChange={(e) => setPrimaryText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.custom.subText}
              </label>
              <input
                type="text"
                value={subText}
                onChange={(e) => setSubText(e.target.value)}
                placeholder={t.custom.subTextPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 uppercase"
              />
            </div>

            {/* Font Family Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-4 h-4 text-cyan-400" />
                <span>{t.custom.typographyTitle}</span>
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="'Tiro Bangla', serif">Tiro Bangla (ক্লাসিক বিআরটিএ স্টাইল)</option>
                <option value="'SolaimanLipi', sans-serif">SolaimanLipi (পরিষ্কার ও বোল্ড)</option>
                <option value="'Hind Siliguri', sans-serif">Hind Siliguri (আধুনিক)</option>
                <option value="sans-serif">Modern Sans Display</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Canvas & Export Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-bold text-base text-white">
                  কাস্টম ২ডি ক্যানভাস প্রিভিউ
                </h3>
                <p className="text-xs text-slate-400">
                  ৩০০ ডিপিআই হাই-রেজোলিউশন রেন্ডারিং
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                {selectedTexture.nameEn}
              </span>
            </div>

            {/* Custom Interactive Canvas */}
            <CustomPlateCanvas
              texture={selectedTexture}
              borderStyle={borderStyle}
              primaryText={primaryText}
              subText={subText}
              bloodGroup={bloodGroup}
              badgeType={badgeType}
              fontFamily={fontFamily}
              textColor={textColor}
              onCanvasReady={(cvs) => setCanvasInstance(cvs)}
            />

            {/* Export Actions: Dual Formats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadPng}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.01]"
              >
                <ImageIcon className="w-4 h-4" />
                <span>{t.custom.downloadPng}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>{isExporting ? "পিডিএফ তৈরি হচ্ছে..." : t.custom.downloadPdf}</span>
              </button>
            </div>

            {/* Fabricator direct quote prompt */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>অ্যাক্রিলিক বা মেটাল কাটিং শপে এই ডিজাইন পাঠাতে চান?</span>
              <a
                href="/fabricators"
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
              >
                শপ ডিরেক্টরি দেখুন ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
