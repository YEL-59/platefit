"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { Printer, CheckCircle2, AlertOctagon, X } from "lucide-react";

export default function PrintGuideModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {t.printGuideModal.title}
            </h3>
            <p className="text-xs text-slate-400">
              সঠিক ২৮৫x৫০মিমি মাপে প্রিন্ট পাওয়ার জন্য নিচের ধাপগুলো মেনে চলুন
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <span className="font-bold text-emerald-400 text-base">১</span>
            <p>{t.printGuideModal.step1}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-rose-200">
              <strong>সবচেয়ে জরুরি:</strong> {t.printGuideModal.step2} (Fit to page টিক থাকলে প্লেটটি সংকুচিত বা বড় হয়ে যাবে)।
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <span className="font-bold text-emerald-400 text-base">৩</span>
            <p>{t.printGuideModal.step3}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-emerald-200">{t.printGuideModal.step4}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/30"
          >
            {t.printGuideModal.gotIt}
          </button>
        </div>
      </div>
    </div>
  );
}
