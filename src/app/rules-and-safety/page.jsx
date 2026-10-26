"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { 
  BookOpen, 
  Search, 
  Gauge, 
  ShieldCheck, 
  Car, 
  Bike, 
  AlertTriangle, 
  Eye, 
  CloudRain, 
  Users, 
  Zap, 
  Wrench,
  CheckCircle2,
  Clock
} from "lucide-react";
import brtaFinesData from "@/data/brtaFines.json";
import safetyData from "@/data/safetyGuidelines.json";

export default function RulesAndSafetyPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("fines"); // 'fines', 'speed', 'bike_safety', 'car_safety'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter fines
  const filteredFines = brtaFinesData.fines.filter((fine) => {
    const matchesCategory = selectedCategory === "all" || fine.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      fine.offenseEn.toLowerCase().includes(q) ||
      fine.offenseBn.toLowerCase().includes(q) ||
      fine.section.toLowerCase().includes(q) ||
      fine.sectionBn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>সড়ক পরিবহন আইন ২০১৮ ও জীবন রক্ষা সহায়িকা</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.fines.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {t.fines.subtitle}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-4">
        {[
          { id: "fines", label: "জরিমানা ও অপরাধ তালিকা (Fines)", icon: AlertTriangle },
          { id: "speed", label: "জাতীয় গতিসীমা নির্দেশিকা (Speed Limits)", icon: Gauge },
          { id: "bike_safety", label: "বাইকারদের নিরাপত্তা (Bike Safety)", icon: Bike },
          { id: "car_safety", label: "কার ও হাইওয়ে প্রটোকল (Car Safety)", icon: Car },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: FINES & PENALTIES MATRIX */}
      {activeTab === "fines" && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.fines.searchPlaceholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">সকল বিভাগ (All Categories)</option>
                <option value="registration">রেজিস্ট্রেশন ও প্লেট (Registration)</option>
                <option value="license">লাইসেন্স (License)</option>
                <option value="safety">নিরাপত্তা ও হেলমেট (Safety)</option>
                <option value="speed">গতিসীমা লঙ্ঘন (Speed)</option>
                <option value="traffic_rules">ট্রাফিক নিয়ম (Traffic Rules)</option>
                <option value="documents">কাগজপত্র ও ফিটনেস (Documents)</option>
              </select>
            </div>
          </div>

          {/* Fines Table */}
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[11px] border-b border-white/10">
                  <tr>
                    <th className="px-5 py-4">{t.fines.sectionCol}</th>
                    <th className="px-5 py-4">{t.fines.offenseCol}</th>
                    <th className="px-5 py-4">{t.fines.penaltyCol}</th>
                    <th className="px-5 py-4 text-center">{t.fines.pointsCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredFines.length > 0 ? (
                    filteredFines.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                          {lang === "bn" ? item.sectionBn : item.section}
                        </td>
                        <td className="px-5 py-4 max-w-md">
                          <div className="font-semibold text-white">
                            {lang === "bn" ? item.offenseBn : item.offenseEn}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {lang === "bn" ? item.offenseEn : item.offenseBn}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-bold text-rose-400">
                            {lang === "bn" ? item.penaltyBn : item.penaltyEn}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {item.demeritPoints > 0 ? (
                            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono font-bold text-xs">
                              -{item.demeritPoints} Pt
                            </span>
                          ) : (
                            <span className="text-slate-500 font-mono">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                        কোনো ফলাফল পাওয়া যায়নি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPEED LIMITS GUIDE */}
      {activeTab === "speed" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(brtaFinesData.speedLimits).map(([key, limit]) => (
              <div key={key} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-base text-white">
                      {lang === "bn" ? limit.nameBn : limit.nameEn}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block">{t.fines.speedCar}</span>
                    <span className="text-xl font-extrabold text-white font-mono mt-1 block">
                      {limit.privateCar}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block">{t.fines.speedBike}</span>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono mt-1 block">
                      {limit.motorcycle}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                  💡 {lang === "bn" ? limit.notesBn : limit.notesEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BIKE SAFETY GUIDELINES */}
      {activeTab === "bike_safety" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyData.bikeSafety.guidelines.map((guide) => (
              <div key={guide.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      {lang === "bn" ? guide.titleBn : guide.titleEn}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === "bn" ? guide.summaryBn : guide.summaryEn}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {(lang === "bn" ? guide.tipsBn : guide.tipsEn).map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CAR & FOUR-WHEELER PROTOCOL */}
      {activeTab === "car_safety" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyData.carSafety.guidelines.map((guide) => (
              <div key={guide.id} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      {lang === "bn" ? guide.titleBn : guide.titleEn}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === "bn" ? guide.summaryBn : guide.summaryEn}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {(lang === "bn" ? guide.tipsBn : guide.tipsEn).map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
