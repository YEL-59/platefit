"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext({
  lang: "bn",
  setLang: () => {},
  t: translations.bn,
  toggleLang: () => {}
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("bn");

  useEffect(() => {
    const saved = localStorage.getItem("platefit_lang");
    if (saved === "en" || saved === "bn") {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("platefit_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "bn" ? "en" : "bn";
    handleSetLang(next);
  };

  const t = translations[lang] || translations.bn;

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
