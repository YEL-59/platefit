"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export default function DisclaimerBanner() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-300">
              {t.disclaimer.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {t.disclaimer.notice}
            </p>

            {expanded && (
              <div className="mt-3 pt-3 border-t border-amber-500/20 text-xs text-slate-400 space-y-2 leading-relaxed">
                <p>
                  • <strong>অফিশিয়াল আরএফআইডি প্লেট:</strong> বিআরটিএ কর্তৃক প্রদত্ত পেছনের ডিজিটাল নাম্বার প্লেট প্রতিস্থাপন করা দণ্ডনীয় অপরাধ। এই টুলটি কেবলমাত্র সামনের প্লেটের জন্য।
                </p>
                <p>
                  • <strong>অনুমোদিত উপাদান:</strong> বিআরটিএ নির্দেশনা অনুযায়ী সামনের প্লেটটি অবশ্যই স্টেইনলেস স্টিল (Stainless Steel) অথবা অ্যালুমিনিয়াম (Aluminium) পাতে কালো হরফে খোদাই বা তৈরি করতে হবে।
                </p>
                <p>
                  • <strong>কোনো সাজসজ্জা নয়:</strong> অফিশিয়াল সড়কে চলাচলের জন্য সামনের প্লেটে কোনো কার্টুন, ধর্মীয় স্লোগান, বাইক ক্লাবের লোগো বা রঙিন স্টিকার ব্যবহার করা নিষিদ্ধ।
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
        >
          <span>{expanded ? t.disclaimer.hide : t.disclaimer.readMore}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
