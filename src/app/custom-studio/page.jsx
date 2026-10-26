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
  Image as ImageIcon,
  Upload,
  X,
  Palette,
  Grid,
  CheckCircle2
} from "lucide-react";
import CustomPlateCanvas from "@/components/CustomPlateCanvas";
import CustomStylesGallery from "@/components/CustomStylesGallery";
import { CUSTOM_TEXTURES, BLOOD_GROUPS, BADGES_LIST } from "@/lib/plateSpecs";
import customPlateStyles from "@/data/customPlateStyles.json";
import { exportCanvasAsPng } from "@/lib/exportPngImage";
import { exportPlatePdf } from "@/lib/exportVectorPdf";

export default function CustomStudioPage() {
  const { t, lang } = useLanguage();

  // Mode View: 'editor' or 'gallery'
  const [activeTab, setActiveTab] = useState("editor");

  // Customization State
  const [selectedTexture, setSelectedTexture] = useState(CUSTOM_TEXTURES[0]);
  const [borderStyle, setBorderStyle] = useState("pinstripe"); // 'none', 'pinstripe', 'chamfered', 'screws'
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [badgeType, setBadgeType] = useState("blood_group");
  const [fontFamily, setFontFamily] = useState("'Tiro Bangla', serif");
  const [textColor, setTextColor] = useState("#FFFFFF");

  const [primaryText, setPrimaryText] = useState("ঢাকা মেট্রো-হ ১১-১২৩৪");
  const [subText, setSubText] = useState("DHAKA RIDER CLUB");

  // Custom Logo upload state
  const [uploadedLogo, setUploadedLogo] = useState(null);

  // Success alert when template is applied
  const [templateAppliedMsg, setTemplateAppliedMsg] = useState("");

  const [canvasInstance, setCanvasInstance] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Apply a preset from the gallery or quick-picker
  const handleApplyPreset = (preset) => {
    if (!preset) return;

    const matchedTexture = CUSTOM_TEXTURES.find((tx) => tx.id === preset.textureId);
    if (matchedTexture) {
      setSelectedTexture(matchedTexture);
    }
    if (preset.borderStyle) setBorderStyle(preset.borderStyle);
    if (preset.bloodGroup !== undefined) setBloodGroup(preset.bloodGroup);
    if (preset.badgeType) setBadgeType(preset.badgeType);
    if (preset.fontFamily) setFontFamily(preset.fontFamily);
    if (preset.textColor) setTextColor(preset.textColor);
    if (preset.subText) setSubText(preset.subText);

    setTemplateAppliedMsg("টেমপ্লেট সফলভাবে লোড হয়েছে! ক্যানভাসে পরিবর্তনগুলো দেখুন।");
    setActiveTab("editor");
    setTimeout(() => setTemplateAppliedMsg(""), 3500);
  };

  // Handle custom logo image file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLogo(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <span>ক্রিয়েটিভ আফটারমার্কেট ডিজাইন স্টুডিও ও মার্কেট গ্যালারি</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.modes.customTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          ধোলাইখাল ও বাংলাবাজারের জনপ্রিয় ৩ডি এক্রিলিক, কার্বন ফাইবার, গোল্ডেন এসএস বা নিয়ন স্টাইলের প্লেট ডিজাইন করুন।
        </p>
      </div>

      {/* View Switcher: Editor vs Market Gallery */}
      <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("editor")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "editor"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>কাস্টম এডিটর (Canvas Studio)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "gallery"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>মার্কেট কালেকশন ও গ্যালারি (Gallery)</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {templateAppliedMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{templateAppliedMsg}</span>
        </div>
      )}

      {/* TAB 1: CUSTOM STUDIO EDITOR */}
      {activeTab === "editor" && (
        <div className="space-y-6">
          {/* Quick-Pick Popular Bangladeshi Presets Strip */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>জনপ্রিয় মার্কেট টেমপ্লেট বেছে নিন (Quick Presets):</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-4 text-[11px]"
              >
                সবগুলো দেখুন ↗
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {customPlateStyles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleApplyPreset(item.presetConfig)}
                  className="group relative rounded-xl overflow-hidden border border-slate-800 hover:border-amber-400/60 transition-all text-left bg-slate-950 p-1 flex items-center gap-2.5"
                >
                  <img
                    src={item.image}
                    alt={item.nameBn}
                    className="w-14 h-10 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 pr-1">
                    <div className="text-[11px] font-bold text-white truncate group-hover:text-amber-300">
                      {item.nameBn.split(" ")[0]} {item.nameBn.split(" ")[1]}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate font-mono">
                      {item.priceEstimate}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid: Design Controls & Visual Canvas */}
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

              {/* 3. Emergency Blood Group */}
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
              </div>

              {/* 4. Custom Club Logo / Sticker Uploader */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-teal-400" />
                  <span>ক্লাব লোগো বা স্টিকার আপলোড (ঐচ্ছিক)</span>
                </label>

                {uploadedLogo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                    <div className="flex items-center gap-2">
                      <img
                        src={uploadedLogo}
                        alt="Custom Logo"
                        className="w-8 h-8 object-contain rounded bg-slate-800 p-0.5"
                      />
                      <span className="text-xs text-slate-300 font-medium">কাস্টম লোগো যুক্ত হয়েছে</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedLogo(null)}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-700 hover:border-amber-400 bg-slate-900/50 hover:bg-slate-900 text-xs text-slate-400 hover:text-white cursor-pointer transition-all">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>PNG বা JPG লোগো নির্বাচন করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* 5. Text & Typography Input */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {t.custom.plateText}
                  </label>
                  <input
                    type="text"
                    value={primaryText}
                    onChange={(e) => setPrimaryText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-bold"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 uppercase font-semibold"
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
                  uploadedLogo={uploadedLogo}
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
      )}

      {/* TAB 2: MARKET INSPIRATION GALLERY */}
      {activeTab === "gallery" && (
        <CustomStylesGallery onSelectPreset={handleApplyPreset} />
      )}
    </div>
  );
}
