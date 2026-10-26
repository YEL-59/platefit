"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { 
  ShieldCheck, 
  Download, 
  Printer, 
  Sliders, 
  HelpCircle, 
  Ruler, 
  Check, 
  Copy, 
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import BrtaPlatePreview from "@/components/BrtaPlatePreview";
import PrintGuideModal from "@/components/PrintGuideModal";
import ScreenDpiCalibrator from "@/components/ScreenDpiCalibrator";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import districtsData from "@/data/districts.json";
import { BRTA_SPECS, MM_TO_PX_DEFAULT } from "@/lib/plateSpecs";
import { formatSeriesNumber, formatRegistrationNumber, toBanglaDigits } from "@/lib/banglaNumerals";
import { exportPlatePdf } from "@/lib/exportVectorPdf";

export default function BrtaGeneratorPage() {
  const { t, lang } = useLanguage();

  // Form State
  const [selectedSpecKey, setSelectedSpecKey] = useState("MOTORCYCLE_FRONT");
  const [selectedDistrict, setSelectedDistrict] = useState("dhaka_metro");
  const [selectedClass, setSelectedClass] = useState("হ");
  const [seriesNum, setSeriesNum] = useState("১১");
  const [regNum, setRegNum] = useState("১২৩৪");

  // Display toggles
  const [isStencilMode, setIsStencilMode] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [isLifeSize, setIsLifeSize] = useState(false);
  const [pxPerMm, setPxPerMm] = useState(MM_TO_PX_DEFAULT);

  // Modals
  const [isPrintGuideOpen, setIsPrintGuideOpen] = useState(false);
  const [isCalibratorOpen, setIsCalibratorOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Canvas Reference
  const [canvasInstance, setCanvasInstance] = useState(null);

  const activeSpec = BRTA_SPECS[selectedSpecKey] || BRTA_SPECS.MOTORCYCLE_FRONT;

  // Find District Object
  let districtObj = null;
  for (const div of districtsData.divisions) {
    const found = div.districts.find((d) => d.code === selectedDistrict);
    if (found) {
      districtObj = found;
      break;
    }
  }
  const districtNameBn = districtObj ? districtObj.nameBn : "ঢাকা মেট্রো";

  // Handlers for series and registration input with auto Bangla conversion
  const handleSeriesChange = (e) => {
    setSeriesNum(formatSeriesNumber(e.target.value));
  };

  const handleRegChange = (e) => {
    setRegNum(formatRegistrationNumber(e.target.value));
  };

  // PDF Export
  const handleDownloadPdf = async () => {
    if (!canvasInstance) return;
    setIsExporting(true);
    try {
      await exportPlatePdf({
        canvas: canvasInstance,
        plateWidthMm: activeSpec.widthMm,
        plateHeightMm: activeSpec.heightMm,
        title: `PlateFit_${districtNameBn}_${selectedClass}_${seriesNum}_${regNum}`,
        isStencilMode: isStencilMode,
        vehicleType: activeSpec.type,
      });
    } catch (err) {
      console.error("PDF Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy specs for metal shop
  const handleCopySpec = () => {
    const text = `PlateFit Specification:
Category: ${activeSpec.nameEn}
Dimensions: ${activeSpec.widthMm}mm x ${activeSpec.heightMm}mm
Registration: ${districtNameBn}-${selectedClass} ${seriesNum}-${regNum}
Color: White background, Bold Black Bangla
Material: Stainless Steel / Aluminium
Tool: PlateFit BD (platefit.vercel.app)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>১০০% নিখুঁত বিআরটিএ ফ্রন্ট স্টেনসিল মেকার</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.modes.brtaTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {t.modes.brtaDesc}
        </p>
      </div>

      {/* Main Grid: Form Controls (Left) & Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
          {/* 1. Vehicle Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.generator.vehicleType}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedSpecKey("MOTORCYCLE_FRONT");
                  setSelectedClass("হ");
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSpecKey === "MOTORCYCLE_FRONT"
                    ? "bg-emerald-500/20 border-emerald-500/60 text-white shadow-md shadow-emerald-500/10"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="font-bold text-sm text-white">মোটরসাইকেল (Bike)</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">২৮৫ মিমি × ৫০ মিমি</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedSpecKey("SCOOTER_FRONT");
                  setSelectedClass("এ");
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSpecKey === "SCOOTER_FRONT"
                    ? "bg-emerald-500/20 border-emerald-500/60 text-white shadow-md shadow-emerald-500/10"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="font-bold text-sm text-white">স্কুটার (Scooter)</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">২০০ মিমি × ১০০ মিমি</div>
              </button>
            </div>
          </div>

          {/* 2. District & Metro Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.generator.metroDistrict}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {districtsData.divisions.map((div) => (
                <optgroup key={div.id} label={`${div.nameBn} বিভাগ (${div.nameEn})`}>
                  {div.districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.nameBn} ({d.nameEn})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* 3. Vehicle Class Character */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t.generator.vehicleClass}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {districtsData.vehicleClasses.map((vc) => (
                <option key={vc.letter} value={vc.letter}>
                  {vc.nameBn} [{vc.nameEn}]
                </option>
              ))}
            </select>
          </div>

          {/* 4. Series (2 Digits) & Registration Number (4 Digits) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.generator.seriesNumber}
              </label>
              <input
                type="text"
                maxLength={2}
                value={seriesNum}
                onChange={handleSeriesChange}
                placeholder={t.generator.seriesPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-base font-bold text-center text-white focus:outline-none focus:border-emerald-500 font-mono tracking-widest"
              />
              <span className="text-[10px] text-slate-500 block text-center">ইংরেজি বা বাংলায় লিখুন</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.generator.regNumber}
              </label>
              <input
                type="text"
                maxLength={4}
                value={regNum}
                onChange={handleRegChange}
                placeholder={t.generator.regPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-base font-bold text-center text-white focus:outline-none focus:border-emerald-500 font-mono tracking-widest"
              />
              <span className="text-[10px] text-slate-500 block text-center">যেমন: ১২৩৪</span>
            </div>
          </div>

          {/* Toggles: Stencil Cut Mode, Ruler, Life Size */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isStencilMode}
                  onChange={(e) => setIsStencilMode(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>{t.generator.stencilMode}</span>
              </label>
              <span className="text-[10px] text-slate-500">সিএনসি/লেজার কাটিং</span>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRuler}
                  onChange={(e) => setShowRuler(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>অন-স্ক্রিন মিলিমিটার স্কেল</span>
              </label>
              <span className="text-[10px] text-slate-500">টপ ও সাইড রুলার</span>
            </div>
          </div>

          {/* Calibrator & Print Guide Modal Launchers */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCalibratorOpen(true)}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-xs font-semibold text-teal-300 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>স্ক্রিন ক্যালিব্রেশন</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPrintGuideOpen(true)}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-xs font-semibold text-emerald-300 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট গাইড চেকলিস্ট</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview & Action Buttons */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-bold text-base text-white">
                  {t.generator.previewTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  বিআরটিএ মানদণ্ড: {activeSpec.widthMm} মিমি × {activeSpec.heightMm} মিমি
                </p>
              </div>

              {/* Life size toggle button */}
              <button
                type="button"
                onClick={() => setIsLifeSize(!isLifeSize)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  isLifeSize
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/40"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                }`}
              >
                <span>{isLifeSize ? "১:১ জীবনমুখী অন" : "১:১ লাইফ-সাইজ ভিউ"}</span>
              </button>
            </div>

            {/* The Live Preview Component */}
            <BrtaPlatePreview
              spec={activeSpec}
              districtBn={districtNameBn}
              vehicleClass={selectedClass}
              seriesNumber={seriesNum || "০০"}
              regNumber={regNum || "০০০০"}
              isStencilMode={isStencilMode}
              showRuler={showRuler}
              isLifeSize={isLifeSize}
              pxPerMm={pxPerMm}
              onCanvasReady={(cvs) => setCanvasInstance(cvs)}
            />

            {/* Action Bar: Download PDF & Copy */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-xl shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                <span>
                  {isExporting ? "ভেক্টর PDF তৈরি হচ্ছে..." : t.generator.downloadPdf}
                </span>
              </button>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopySpec}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs font-semibold text-slate-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "কপি সম্পন্ন হয়েছে!" : t.generator.copyWhatsapp}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPrintGuideOpen(true)}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-300 transition-colors"
                  title="প্রিন্ট নির্দেশনা"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Important Checklist Callout */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>প্রিন্ট নেওয়ার সময় নিশ্চিত করুন:</span>
              </div>
              <p>• স্কেল অপশনে 'Fit to Page' বন্ধ করে 'Actual Size (100%)' নির্বাচন করতে হবে।</p>
              <p>• প্রিন্ট করার পর প্রিন্টআউটের ১০০ মিমি রুলারটি আসল স্কেল দিয়ে মেপে যাচাই করুন।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screen DPI Calibrator Modal */}
      <ScreenDpiCalibrator
        isOpen={isCalibratorOpen}
        onClose={() => setIsCalibratorOpen(false)}
        onScaleChange={(scale) => setPxPerMm(scale)}
      />

      {/* Print Instructions Modal */}
      <PrintGuideModal
        isOpen={isPrintGuideOpen}
        onClose={() => setIsPrintGuideOpen(false)}
      />
    </div>
  );
}
