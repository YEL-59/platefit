"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { CreditCard, RotateCcw, Check, X, Sliders } from "lucide-react";
import { MM_TO_PX_DEFAULT } from "@/lib/plateSpecs";

export default function ScreenDpiCalibrator({ isOpen, onClose, onScaleChange }) {
  const { t } = useLanguage();
  // Standard credit card width is 85.60 mm
  const CARD_WIDTH_MM = 85.6;
  const CARD_HEIGHT_MM = 53.98;

  // Pixels per mm
  const [pxPerMm, setPxPerMm] = useState(MM_TO_PX_DEFAULT);

  useEffect(() => {
    const saved = localStorage.getItem("platefit_px_per_mm");
    if (saved) {
      const val = parseFloat(saved);
      if (!isNaN(val) && val > 1 && val < 10) {
        setPxPerMm(val);
      }
    }
  }, []);

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setPxPerMm(val);
    if (onScaleChange) onScaleChange(val);
  };

  const handleSave = () => {
    localStorage.setItem("platefit_px_per_mm", pxPerMm.toString());
    if (onScaleChange) onScaleChange(pxPerMm);
    onClose();
  };

  const handleReset = () => {
    setPxPerMm(MM_TO_PX_DEFAULT);
    localStorage.removeItem("platefit_px_per_mm");
    if (onScaleChange) onScaleChange(MM_TO_PX_DEFAULT);
  };

  if (!isOpen) return null;

  const cardWidthPx = CARD_WIDTH_MM * pxPerMm;
  const cardHeightPx = CARD_HEIGHT_MM * pxPerMm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-teal-500/20 text-teal-400 rounded-2xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {t.calibration.title}
            </h3>
            <p className="text-xs text-slate-400">
              স্ক্রিনের ডিপিআই ক্যালিব্রেট করে ১:১ জীবনমুখী সাইজ প্রিভিউ
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
          {t.calibration.desc}
        </p>

        {/* The Interactive Visual Card */}
        <div className="flex flex-col items-center justify-center my-6">
          <div
            style={{ width: `${cardWidthPx}px`, height: `${cardHeightPx}px` }}
            className="rounded-xl border-2 border-dashed border-teal-400 bg-gradient-to-tr from-slate-800 to-slate-700/90 shadow-xl flex flex-col justify-between p-4 transition-all duration-75 relative overflow-hidden select-none"
          >
            <div className="flex justify-between items-center text-teal-400">
              <span className="text-[10px] font-bold tracking-widest uppercase">STANDARD ATM / CREDIT CARD</span>
              <span className="text-[10px] font-mono">85.6 mm</span>
            </div>
            <div className="text-center font-mono text-xs text-slate-300">
              [ আপনার কার্ডটি এখানে ধরুন ]
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>54.0 mm</span>
              <span>{Math.round(pxPerMm * 25.4)} DPI</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              {t.calibration.scaleAdjust}
            </span>
            <span className="font-mono text-teal-300 font-semibold">{pxPerMm.toFixed(2)} px/mm</span>
          </div>
          <input
            type="range"
            min="2.0"
            max="6.5"
            step="0.05"
            value={pxPerMm}
            onChange={handleSliderChange}
            className="w-full accent-teal-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.calibration.reset}</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-teal-600/30"
          >
            <Check className="w-4 h-4" />
            <span>{t.calibration.close}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
