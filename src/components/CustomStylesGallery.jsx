"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { 
  Sparkles, 
  Tag, 
  MapPin, 
  ArrowRight, 
  Eye, 
  Check, 
  Layers, 
  Flame, 
  Maximize2, 
  X,
  SlidersHorizontal 
} from "lucide-react";
import customPlateStyles from "@/data/customPlateStyles.json";

export default function CustomStylesGallery({ onSelectPreset }) {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { id: "all", labelBn: "সকল কালেকশন", labelEn: "All Collections" },
    { id: "acrylic", labelBn: "৩ডি এক্রিলিক (Acrylic)", labelEn: "3D Acrylic" },
    { id: "carbon", labelBn: "কার্বন ফাইবার (Carbon)", labelEn: "Carbon Fiber" },
    { id: "metal_ss", labelBn: "গোল্ডেন ও সিলভার এসএস", labelEn: "Golden SS" },
    { id: "led", labelBn: "নিয়ন এলইডি গ্লো (LED)", labelEn: "Neon Glow" },
  ];

  const filteredStyles = customPlateStyles.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Gallery Header & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <Flame className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {lang === "bn" ? "বাংলাদেশি ট্রেন্ডিং কাস্টম প্লেট কালেকশন" : "Trending Bangladeshi Custom Plates"}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === "bn"
              ? "ধোলাইখাল, বাংলাবাজার ও চট্টগ্রামের জনপ্রিয় আফটারমার্কেট ডিজাইন থেকে সরাসরি বেছে নিন"
              : "Handcrafted aftermarket designs inspired by Dholaikhal, Banglabazar & Biker Clubs"}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800"
              }`}
            >
              {lang === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStyles.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-amber-400/40 transition-all duration-300 shadow-xl"
          >
            {/* Image Container with Zoom & Badge Overlay */}
            <div className="relative w-full aspect-video overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={lang === "bn" ? item.nameBn : item.nameEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Price & Location Pills */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold font-mono">
                  {item.priceEstimate}
                </span>
                <span className="px-2 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.popularIn.split(",")[0]}</span>
                </span>
              </div>

              {/* Fullscreen Zoom Trigger */}
              <button
                type="button"
                onClick={() => setLightboxImage(item)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Zoom image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-3.5">
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {lang === "bn" ? item.nameBn : item.nameEn}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {lang === "bn" ? item.descriptionBn : item.descriptionEn}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Button: Apply to Studio */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-500">জনপ্রিয় বাজার: </span>
                  <span className="text-slate-300">{item.popularIn}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPreset) {
                      onSelectPreset(item.presetConfig);
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "এই স্টাইলে বানান" : "Use This Template"}</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Detail Inspection */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-video bg-black flex items-center justify-center">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.nameEn}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lang === "bn" ? lightboxImage.nameBn : lightboxImage.nameEn}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === "bn" ? lightboxImage.descriptionBn : lightboxImage.descriptionEn}
                </p>
                <div className="text-xs text-amber-400 font-mono mt-2 font-bold">
                  বাজার মূল্য: {lightboxImage.priceEstimate} | {lightboxImage.popularIn}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onSelectPreset) {
                    onSelectPreset(lightboxImage.presetConfig);
                  }
                  setLightboxImage(null);
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20 shrink-0"
              >
                {lang === "bn" ? "এই টেমপ্লেট নিয়ে কাস্টমাইজ করুন" : "Load Into Custom Studio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
