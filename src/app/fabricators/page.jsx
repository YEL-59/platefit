"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { 
  Wrench, 
  Search, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Star, 
  CheckCircle, 
  PlusCircle, 
  X,
  ExternalLink 
} from "lucide-react";
import fabricatorsList from "@/data/fabricators.json";

export default function FabricatorsPage() {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Shop Submission Form State
  const [shopName, setShopName] = useState("");
  const [shopDistrict, setShopDistrict] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [shopSpecialty, setShopSpecialty] = useState("");

  const filteredShops = fabricatorsList.filter((shop) => {
    const matchesDiv = selectedDivision === "all" || shop.division === selectedDivision;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      shop.nameEn.toLowerCase().includes(q) ||
      shop.nameBn.toLowerCase().includes(q) ||
      shop.district.toLowerCase().includes(q) ||
      shop.districtBn.toLowerCase().includes(q);
    return matchesDiv && matchesQuery;
  });

  const handleWhatsAppQuote = (shop) => {
    const msg = `আসসালামু আলাইকুম ${shop.nameBn}। আমি PlateFit (প্লেটফিট) থেকে একটি মোটরসাইকেল ফ্রন্ট নাম্বার প্লেটের স্পেক তৈরি করেছি (২৮৫ মিমি × ৫০ মিমি)। স্টেইনলেস স্টিল বা অ্যালুমিনিয়ামে এটি তৈরি করতে আপনাদের কত টাকা খরচ ও কত সময় লাগবে?`;
    const url = `https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleAddShopSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAddModalOpen(false);
      setShopName("");
      setShopDistrict("");
      setShopPhone("");
      setShopSpecialty("");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>লোকাল মেটাল ও অ্যাক্রিলিক ওয়ার্কশপ ডিরেক্টরি</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.fabricator.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {t.fabricator.subtitle}
        </p>
      </div>

      {/* Search & Actions Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.fabricator.searchPlaceholder}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">সকল বিভাগ (All Divisions)</option>
            <option value="dhaka">ঢাকা (Dhaka)</option>
            <option value="chattogram">চট্টগ্রাম (Chattogram)</option>
            <option value="sylhet">সিলেট (Sylhet)</option>
            <option value="rajshahi">রাজশাহী (Rajshahi)</option>
          </select>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs whitespace-nowrap transition-colors shadow-md shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.fabricator.addShop}</span>
          </button>
        </div>
      </div>

      {/* Fabricators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.map((shop) => (
          <div
            key={shop.id}
            className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-white">
                    {lang === "bn" ? shop.nameBn : shop.nameEn}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lang === "bn" ? shop.districtBn : shop.district}</span>
                  </div>
                </div>

                {shop.verified && (
                  <span className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === "bn" ? shop.addressBn : shop.addressEn}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(lang === "bn" ? shop.specialtiesBn : shop.specialtiesEn).map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons: WhatsApp & Call */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleWhatsAppQuote(shop)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.fabricator.requestQuote}</span>
              </button>

              <a
                href={`tel:${shop.phone}`}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Call Shop"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Workshop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              আপনার শপ তালিকাভুক্ত করুন
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              বিনামূল্যে লোকাল বাইকারদের সাথে সরাসরি যুক্ত হোন
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">ধন্যবাদ!</h4>
                <p className="text-xs text-slate-300">
                  আপনার দোকানের তথ্য সফলভাবে গ্রহণ করা হয়েছে। যাচাইয়ের পর যুক্ত করা হবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddShopSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">দোকানের নাম *</label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="যেমন: ধোলাইখাল লেজার কাটিং"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">জেলা ও ঠিকানা *</label>
                  <input
                    type="text"
                    required
                    value={shopDistrict}
                    onChange={(e) => setShopDistrict(e.target.value)}
                    placeholder="যেমন: ঢাকা (ধোলাইখাল মোটর মার্কেট)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">হোয়াটসঅ্যাপ / ফোন নাম্বার *</label>
                  <input
                    type="text"
                    required
                    value={shopPhone}
                    onChange={(e) => setShopPhone(e.target.value)}
                    placeholder="যেমন: 01711XXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">সেবাসমূহ (Specialties)</label>
                  <input
                    type="text"
                    value={shopSpecialty}
                    onChange={(e) => setShopSpecialty(e.target.value)}
                    placeholder="যেমন: স্টেইনলেস স্টিল, অ্যালুমিনিয়াম, এক্রিলিক"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/30"
                >
                  সাবমিট করুন
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
