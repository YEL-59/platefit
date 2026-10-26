import "@/styles/globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PlateFit BD — 100% Free BRTA Number Plate Stencil & Custom Studio",
  description: "Generate 1:1 physical scale BRTA motorcycle & scooter front number plate stencils (285x50mm, 200x100mm) or design custom show plates. 100% free, vector PDF export.",
  keywords: [
    "PlateFit",
    "BRTA number plate",
    "Bangladesh motorcycle front plate",
    "BRTA front plate size 285x50",
    "BRTA scooter front plate 200x100",
    "Road Transport Act 2018 fines",
    "bike number plate generator Bangladesh"
  ],
  authors: [{ name: "PlateFit Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Tiro+Bangla:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <LanguageProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
