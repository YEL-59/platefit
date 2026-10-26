# PLATEFIT (প্লেটফিট) — PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project Name:** PlateFit (প্লেটফিট)  
**Document Version:** 2.0 (Comprehensive Architecture & Feature Specification)  
**Date:** October 26, 2026  
**Status:** Approved for Implementation  
**Target Platform:** Mobile-First Responsive Web Application & Progressive Web App (PWA)  
**Target Market:** Bangladesh (Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, Mymensingh)  

---

## 1. EXECUTIVE SUMMARY & OBJECTIVES

### 1.1 Project Mission
**PlateFit (প্লেটফিট)** is an open-access, zero-cost, privacy-first web application designed for Bangladeshi vehicle owners—specifically motorcyclists, scooterists, and private car drivers. It solves three critical problems:
1. **The 2026 BRTA Front Number Plate Mandate:** Providing an instantaneous, 100% physically accurate (1:1 millimeter scale) vector PDF stencil generator that allows riders to fabricate official-dimension front plates without hiring expensive graphic designers.
2. **Creative & Aftermarket Expression:** A dedicated *Custom Plate Studio* that lets bike enthusiasts, clubs, and off-road riders design custom decorative show plates, club badges, blood-group markers, and personalized typography for non-regulated or display use.
3. **Road Safety & Legal Awareness:** A centralized, accessible, bilingual (Bangla & English) handbook detailing official BRTA highway speed limits, Road Transport Act 2018 penalty fines, rider safety guidelines, and car highway protocols.

### 1.2 Core Value Proposition
- **100% Free & No Sign-Up:** Zero friction. Users can generate, preview, and download a print-ready vector PDF in under 60 seconds.
- **Micro-Millimeter Vector Precision:** Mathematical 1:1 scaling ($1\text{ pt} = 0.352778\text{ mm}$) ensuring that when printed at 100% scale, physical dimensions match official BRTA regulations down to the millimeter ($285\text{ mm} \times 50\text{ mm}$ for bikes; $200\text{ mm} \times 100\text{ mm}$ for scooters).
- **Bangla-First Engine:** Native support for Bangla font glyphs, automated English-to-Bangla number conversion, and official metro/district registrations.
- **Privacy By Design:** 100% client-side execution. Plate numbers and vehicle data are never sent to or logged on a backend server.
- **Community Bridge:** Connecting riders with verified local laser cutting, acrylic, and metal fabrication workshops via one-click WhatsApp quote requests.

---

## 2. LEGAL BOUNDARIES, SAFETY & COMPLIANCE GUARDRAILS

### 2.1 The 2026 BRTA Front Plate Directives
In mid-October 2026, the Bangladesh Road Transport Authority (BRTA) reiterated mandatory front number plates for motorcycles and scooters. Key verified technical constraints:
- **Materials Allowed:** Heavy-gauge Stainless Steel or Aluminum.
- **Colorway:** Solid reflective white background with stark black characters/numerals.
- **Decoration Prohibition:** Zero decorative borders, unofficial crests, gradient fills, or modified artistic fonts allowed for official highway use.
- **Official Rear Plate Non-Replacement:** The product explicitly instructs users that this tool **does not** replace official BRTA rear digital retro-reflective plates embedded with RFID tags. Front plates are auxiliary stencils/plates required under the front-visibility mandate.

### 2.2 System Safety & Disclaimer Safeguards
The application must present an unmistakable legal and safety disclaimer across both the generator and output documents:
> **PlateFit Legal Notice:** *"PlateFit is an independent community utility and is not an official branch of the BRTA or Bangladesh Government. Official compliance requires physical fabrication in aluminum or stainless steel following exact BRTA specifications. Custom/Decorative plates generated in 'Custom Studio Mode' are strictly meant for track, show, or off-road display and cannot replace legal highway registration."*

### 2.3 Zero-Data-Retention Architecture
- **No Database for Vehicle Records:** Registration inputs live exclusively in temporary React state and browser `localStorage`.
- **Zero Logging:** Form inputs are never dispatched to analytics endpoints or server logs.

---

## 3. PRODUCT MODES & ARCHITECTURAL OVERVIEW

PlateFit is partitioned into four interconnected functional pillars:

```
                                 +---------------------------------------------------+
                                 |                 PLATEFIT (প্লেটফিট)               |
                                 +---------------------------------------------------+
                                                           |
         +--------------------------+----------------------+--------------------+--------------------------+
         |                          |                                           |                          |
         v                          v                                           v                          v
+------------------+      +-------------------+                       +-------------------+      +-------------------+
|     MODE 1:      |      |      MODE 2:      |                       |    MODULE 3 & 4:  |      |     MODULE 5:     |
|  BRTA Official   |      |   Custom Studio   |                       |   BRTA Rules &    |      | Local Fabricator  |
|  Front Stencil   |      |  Creative Design  |                       |  Safety Handbook  |      | Shop Directory    |
+------------------+      +-------------------+                       +-------------------+      +-------------------+
| • 285x50mm Bike  |      | • Custom colors   |                       | • Highway speeds  |      | • City / District |
| • 200x100mm Scoot|      | • Carbon textures |                       | • 2018 Act Fines  |      | • Laser / Acrylic |
| • 300x152mm Car  |      | • Blood groups    |                       | • Bike safety PPE |      | • Metal Stamping  |
| • 20mm min font  |      | • Club badges     |                       | • Car expressway  |      | • One-Click WA    |
| • 100% Vector PDF|      | • High-res PNG/PDF|                       | • Pillion & rules |      |   Quote Message   |
+------------------+      +-------------------+                       +-------------------+      +-------------------+
```

---

## 4. DETAILED FEATURE SPECIFICATIONS

### 4.1 Mode 1: BRTA Official Compliance Generator (P0)

#### 4.1.1 Vehicle Categories & Dimensions
| Category | Physical Dimensions | Max Lines | Min Character Height | Default Material Spec | Verified Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Standard Motorcycle (Front)** | $285\text{ mm} \times 50\text{ mm}$ | 1 Line | $20\text{ mm}$ | Stainless Steel / Aluminium | Verified (Oct 2026) |
| **Scooter / Moped (Front)** | $200\text{ mm} \times 100\text{ mm}$ | 2 Lines | $20\text{ mm}$ | Stainless Steel / Aluminium | Verified (Oct 2026) |
| **Private Car / Microbus (Front/Rear)** | $300\text{ mm} \times 152\text{ mm}$ | 2 Lines | $30\text{ mm}$ | Embossed Aluminium / Acrylic | Verified Standard |

#### 4.1.2 Input Structure & Smart Formatting
1. **Metro / District Dropdown:**
   - Pre-populated with all 64 districts & metro zones: *ঢাকা মেট্রো, চট্টগ্রাম মেট্রো, সিলেট মেট্রো, রাজশাহী মেট্রো, খুলনা মেট্রো, বরিশাল মেট্রো, রংপুর মেট্রো, গাজীপুর, নারায়ণগঞ্জ, বগুড়া, ময়মনসিংহ, etc.*
2. **Vehicle Class Dropdown:**
   - Valid Bangla series classes:
     - **হ (Ha):** Motorcycle standard
     - **ল (La):** Commercial / Delivery two-wheeler
     - **এ (E):** Scooter / Lightweight vehicle
     - **ক, খ, গ, ঘ, চ, ছ:** Private cars, microbuses, SUVs
3. **Series Number (২ অঙ্কের সিরিজ):**
   - e.g., ১১, ১২, ১৫, ২১, ২৩, ৪২, ৫৬
   - Automatic English-to-Bangla conversion (`11` $\rightarrow$ `১১`).
4. **Vehicle Registration Number (৪ অঙ্কের নাম্বার):**
   - e.g., ১২৩৪, ৫৬৭৮, ৯৮৭৬
   - Auto-formatting and real-time live preview update on every stroke.

#### 4.1.3 Physical Vector PDF Engine
- **Accurate Physical Units:** Generates vector PDF via pure Millimeter Coordinate Projection ($1\text{ mm} = 2.83464567\text{ pt}$).
- **Print Alignment Aids:**
  - Centerline notch marks.
  - Drill-hole guide circles (optional toggle: $4\text{ mm}$ corner bolt markers).
  - 100mm physical calibration ruler printed directly alongside the plate layout so users can verify accuracy with a physical scale before cutting.
- **Stencil Cut-Guide Mode:** An outline-only toggle that produces vector paths for CNC laser cutters or manual shearing machines.

---

### 4.2 Mode 2: Custom / Creative Plate Studio (P0)

Designed for motorcycle clubs, race tracks, show bikes, car exhibits, and personal customization.

#### 4.2.1 Plate Styles & Materials
- **Texture Overlays:**
  - Gloss White (Classic)
  - Matte Stealth Black
  - Carbon Fiber Pattern (Subtle weave)
  - Brushed Aluminum / Titanium Look
  - Vintage Yellow / JDM Taxi Gold
  - Cyber Neon Green / Crimson Red
- **Borders & Framing:**
  - Clean Edgeless
  - Racing Double Pinstripe
  - Heavy Chamfered Border
  - Industrial Bolt Rivets (4-corner screw mounts)

#### 4.2.2 Typography & Customization Elements
- **Font Selector:**
  - Bangla Fonts: *Tiro Bangla, SolaimanLipi, Kalpurush, Hind Siliguri, Noto Serif Bengali*
  - English Display Fonts: *Bebas Neue, Montserrat, Eurostyle Racing, Orbitron, Impact*
- **Text Customization:**
  - Multi-line support: Primary registration line + Subtitle / Tagline.
  - Controls: Font Size, Letter Spacing, Text Shadow, Stroke Outline, and Color Picker.
- **Badges & Club Stickers:**
  - **Blood Group Badge:** A+, A-, B+, B-, O+, O-, AB+, AB- (critical emergency marker).
  - **National Identity:** Bangladesh National Flag, 50-Years Crest.
  - **Motoring Badges:** Superbike Silhouette, Helmet Icon, Piston, Eagle Wings, "BD RIDER", "RESPECT BIKERS".
  - **Custom Club Logo Uploader:** Allows uploading transparent PNG logos to position on either side of the plate.

#### 4.2.3 Dual Export Formats
- **Vector PDF:** Scaled to chosen dimensions for metal/acrylic cutting.
- **Ultra-HD PNG (300 DPI):** Exportable for vinyl sticker plotters or digital sharing on social media.

---

### 4.3 Module 3: BRTA Highway Rules & Legal Fines Handbook (P1)

A complete, interactive directory explaining Bangladeshi traffic laws under the **Road Transport Act, 2018 (সড়ক পরিবহন আইন ২০১৮)** and **Road Transport Rules, 2022**.

#### 4.3.1 Traffic Violation Fines & Penalties Matrix
| Offense (অপরাধ) | Section (ধারা) | Legal Penalty (অর্থদণ্ড / কারাদণ্ড) | Demerit Points |
| :--- | :--- | :--- | :--- |
| **Driving Without Valid License** | Section 66 | Up to ৳25,000 fine / up to 6 months imprisonment | -1 Point |
| **Unregistered Vehicle / Faulty Plate** | Section 72 | Up to ৳50,000 fine / up to 6 months imprisonment | -1 Point |
| **Riding Without Approved Helmet (Rider/Pillion)** | Section 92(1) | Up to ৳10,000 fine | - |
| **Speeding / Exceeding Highway Speed Limit** | Section 86 | Up to ৳10,000 fine / up to 3 months imprisonment | -1 Point |
| **Wrong-Side Driving (উল্টোপথে গাড়ি চালানো)** | Section 89 | Up to ৳10,000 fine | -1 Point |
| **Talking on Mobile Phone While Driving** | Section 92(2) | Up to ৳5,000 fine / up to 1 month imprisonment | - |
| **Overloading / Triple Riding on Motorcycle** | Section 92 | Up to ৳5,000 fine | - |
| **Driving Without Fitness Certificate** | Section 75 | Up to ৳25,000 fine / up to 6 months imprisonment | - |
| **Driving Without Valid Tax Token** | Section 76 | Up to ৳10,000 fine | - |

#### 4.3.2 Official National Speed Limits Guide
- **Expressway (Dhaka-Mawa-Bhanga, etc.):**
  - Private Cars / Microbuses: Max **$80\text{ km/h}$**
  - Motorcycles: Max **$60\text{ km/h}$** (where permitted)
- **National Highways (N1, N2, etc.):**
  - Passenger Cars: **$80\text{ km/h}$**
  - Motorcycles: **$50\text{ km/h}$**
- **City & Urban Roads (Dhaka / Chittagong City):**
  - All Light Vehicles & Motorcycles: Max **$30\text{–}40\text{ km/h}$**
  - School, Hospital, and Residential Zones: Max **$20\text{ km/h}$**

---

### 4.4 Module 4: Bike & Two-Wheeler Safety Guidelines (P1)

A dedicated, illustrated interactive guide tailored to Bangladesh's unique traffic ecosystem:

1. **Helmet & Certified Gear Standards:**
   - Mandatory DOT, ECE 22.05/22.06, or BSTI certified full-face helmets.
   - Pillion safety: Both rider and passenger must wear strapped helmets at all times.
   - Recommended riding jacket, abrasion-resistant gloves, and closed-toe footwear.
2. **Defensive Riding in Bangladesh Traffic:**
   - The "Blind Spot Rule" around buses, trucks, and covered vans.
   - "Door Zone" awareness when passing parked or stalled CNG auto-rickshaws.
   - Safe following distance: Minimum 3-second rule on highways.
3. **Monsoon & Wet Weather Safety (বর্ষাকালীন সতর্কতা):**
   - Avoiding painted road markings and metal expansion joints during rain (extreme slippage).
   - Hydroplaning prevention: maintaining adequate tire tread depth ($>2.0\text{ mm}$).
   - Proper use of low-beam headlights in rain or fog.
4. **Pillion Rider Rules:**
   - Maximum 1 pillion passenger permitted.
   - Both feet must be placed on footpegs.
   - Loose traditional clothing (saree, dupatta, lungi) safety: ensuring guards are installed over rear chain and spokes.

---

### 4.5 Module 5: Car & Four-Wheeler Safety Handbook (P1)

1. **Expressway & Bridge Protocols:**
   - Padma Bridge & Bangabandhu Tunnel regulations: strict lane discipline, zero stopping/selfie taking, keeping hazard lights off unless in emergency.
   - Dedicated toll lane etiquette (RFID electronic toll collection vs. cash lanes).
2. **Seatbelt & Child Passenger Safety:**
   - Mandatory 3-point seatbelt for driver and front passenger.
   - Child restraint recommendations for rear seats.
3. **Highway Overtaking Protocols:**
   - Never overtake on curves, blind bridges, or narrow single-lane national highways.
   - Flash high-beam / honk signals protocol standard in Bangladesh.
4. **Vehicle Emergency Checklist:**
   - Mandatory in-car equipment: Reflective emergency triangle, fire extinguisher, spare tire with jack, first-aid kit.

---

### 4.6 Module 6: Fabricator Directory & One-Click WhatsApp Connect (P1)

Helps users turn their digital PDF stencils into physical metal or acrylic plates:
- **Search & Filter:** By Division (Dhaka, Chittagong, etc.) and Material Specialty (Stainless Steel Laser Cut, Hand Embossed Aluminum, Acrylic Vinyl).
- **Direct WhatsApp Quote Engine:** Pre-populates a ready-to-send WhatsApp message with the exact dimensions and specifications:
  > *"আসসালামু আলাইকুম। আমি PlateFit (প্লেটফিট) থেকে একটি মোটরসাইকেল ফ্রন্ট নাম্বার প্লেটের স্পেক তৈরি করেছি ($285\text{ mm} \times 50\text{ mm}$)। স্টেইনলেস স্টিল / অ্যালুমিনিয়ামে এটি তৈরি করতে আপনাদের খরচ ও সময় কেমন লাগবে?"*
- **"Add My Workshop" Community Form:** Free submission portal for local workshops in Banglabazar, Dholaikhal, Mirpur, Chittagong Agrabad, etc., to list their services.

---

### 4.7 Module 7: Interactive Live Preview & Print Calibration Simulator (P0)

1. **Real-Time Dynamic SVG Canvas:**
   - Real-time updates as user types district, series, or number.
   - Aspect ratio locking to reflect exact real-world proportions.
2. **Interactive Measurement Overlay:**
   - Dynamic millimeter rulers displayed along top and left axes ($285\text{ mm}$ width, $50\text{ mm}$ height).
   - Center-line and 20mm minimum character height guideline lines.
3. **On-Screen Screen-DPI Calibration Simulator:**
   - Interactive calibration card: User adjusts an on-screen slider until a virtual card matches an actual physical ATM/Credit Card ($85.60\text{ mm} \times 53.98\text{ mm}$) held against the screen.
   - Once calibrated, the preview renders on screen at literal 100% life-size scale.
4. **Printer 100% Scale Instructions Modal:**
   - Clear visual walkthrough on how to disable "Fit to Page" / "Scale to Fit" in Chrome, Adobe Acrobat, and mobile print dialogs.

---

## 5. NON-FUNCTIONAL REQUIREMENTS (NFR)

- **NFR-01: Physical Accuracy:** Output PDF page dimensions must match $285\text{ mm} \times 50\text{ mm}$ ($\pm 0.5\text{ mm}$) or $200\text{ mm} \times 100\text{ mm}$ ($\pm 0.5\text{ mm}$) when printed at 100% scale.
- **NFR-02: Performance:** Initial page load under 1.5 seconds on 4G mobile connections. Zero server round-trips for plate generation.
- **NFR-03: Privacy & Security:** 100% client-side memory. Zero telemetry or server-side transmission of vehicle registration text.
- **NFR-04: Typography Fidelity:** No missing Bangla conjunct glyphs (যুক্তবর্ণ). Embedded vector curves or true-type glyph paths ensure clean output across all PDF readers.
- **NFR-05: Responsiveness:** Mobile-first design optimized for 360px to 430px smartphone viewports up to 4K desktop screens.
- **NFR-06: Accessibility:** WCAG 2.1 AA compliance with minimum 48px touch targets and high-contrast color modes.
- **NFR-07: PWA Capability:** Installable to mobile home screen with offline capability for basic stencil generation.

---

## 6. TECHNICAL STACK & PROJECT DIRECTORY STRUCTURE

### 6.1 Recommended Tech Stack
- **Framework:** Next.js 15+ (App Router, React 19)
- **Styling:** Tailwind CSS v4, Lucide Icons, Glassmorphic / Modern Dark & Light UI tokens
- **Vector & PDF Generation:** `jspdf` (millimeter coordinate system) + SVG Path vector serialization
- **Fonts:** Tiro Bangla, SolaimanLipi, Hind Siliguri, Noto Sans Bengali via `next/font`
- **Component Primitives:** Radix UI / custom headless accessible UI components

### 6.2 Project Structure
```plaintext
platefit/
├── public/
│   ├── fonts/                     # Offline Bangla font glyphs for PDF engine
│   ├── badges/                    # SVG Badges (BD flag, blood groups, club logos)
│   └── manifest.json              # PWA Web Manifest
├── src/
│   ├── app/
│   │   ├── layout.jsx             # Root layout with fonts, metadata, and bilingual provider
│   │   ├── page.jsx               # Landing page, Mode switcher & quick generator
│   │   ├── brta-generator/        # Mode 1: Official BRTA 1:1 Stencil Generator
│   │   │   └── page.jsx
│   │   ├── custom-studio/         # Mode 2: Creative Plate Studio
│   │   │   └── page.jsx
│   │   ├── rules-and-safety/      # Modules 3, 4, 5: BRTA rules, fines & safety hub
│   │   │   └── page.jsx
│   │   └── fabricators/           # Module 6: Workshop directory & WhatsApp quotes
│   │       └── page.jsx
│   ├── components/
│   │   ├── Header.jsx             # Navigation, Language Switcher (বাং/EN), Dark Mode
│   │   ├── Footer.jsx             # Disclaimers, copyright, links
│   │   ├── DisclaimerBanner.jsx   # Prominent legal & BRTA safety disclaimers
│   │   ├── BrtaPlatePreview.jsx   # 1:1 SVG live preview with millimeter rulers
│   │   ├── CustomPlateCanvas.jsx  # Rich canvas with textures, badges, and fonts
│   │   ├── ScreenDpiCalibrator.jsx# Life-size screen scaling credit-card tool
│   │   ├── PrintGuideModal.jsx    # Step-by-step 100% scale print instructions
│   │   ├── FinesTable.jsx         # Searchable 2018 Act penalty table
│   │   ├── SafetyCard.jsx         # Interactive bike & car safety card
│   │   └── FabricatorCard.jsx     # Workshop item with direct WhatsApp launch
│   ├── lib/
│   │   ├── banglaNumerals.js      # English <-> Bangla digit converter
│   │   ├── plateSpecs.js          # Official BRTA dimensions & constraint definitions
│   │   ├── exportVectorPdf.js     # Exact-millimeter vector PDF compiler
│   │   ├── exportPngImage.js      # High-DPI raster exporter for custom studio
│   │   └── translations.js        # Full Bangla / English UI dictionary
│   └── data/
│       ├── districts.json         # 64 Bangladesh districts & vehicle registration classes
│       ├── brtaFines.json         # 2018 Road Transport Act fines & offenses
│       ├── safetyGuidelines.json  # Bike & Car safety protocols
│       └── fabricators.json       # Initial directory of verified local workshops
├── package.json
└── README.md
```

---

## 7. EXECUTION PLAN & IMPLEMENTATION ROADMAP

### Phase 1: Foundation & Core Generator (Immediate Delivery)
- Set up Next.js app with Tailwind CSS v4, icons, and bilingual dictionary.
- Implement `plateSpecs.js`, `banglaNumerals.js`, and `districts.json`.
- Build **Mode 1: BRTA Official Stencil Generator** with real-time SVG preview, millimeter rulers, and exact-dimension vector PDF export.
- Build **Mode 2: Custom Plate Studio** with materials, textures, blood groups, club badges, and font stylers.
- Build **Modules 3, 4, 5: Road Transport Act 2018 Fines & Bike/Car Safety Hub**.
- Build **Module 6: Fabricator Directory** with direct WhatsApp quote integration.
- Implement **Screen DPI Calibrator** and **Print Guide Modal**.

### Phase 2: User Validation & Polish
- Validate physical printed output using millimeter rulers on standard A4/A3 printers.
- Cross-browser validation across Chrome Android, Safari iOS, and desktop browsers.
- Expand fabricator directory with real community submissions.

---

## 8. ACCEPTANCE CRITERIA CHECKLIST

- [x] Clear brand identity: **PlateFit (প্লেটফিট)**.
- [x] Official BRTA Motorcycle ($285\text{ mm} \times 50\text{ mm}$) and Scooter ($200\text{ mm} \times 100\text{ mm}$) dimensions strictly enforced in Mode 1.
- [x] Automatic conversion of numbers to authentic Bangla digits (`১২৩৪`).
- [x] Vector PDF download sized to literal millimeters with physical calibration marks.
- [x] Custom Studio features custom colors, carbon fiber texture, blood groups, badges, and fonts.
- [x] Searchable BRTA road rules, 2018 Act fines, speed limits, bike safety, and car safety guides.
- [x] Fabricator directory with pre-formatted WhatsApp quote requests.
- [x] Full bilingual toggle (বাংলা / English).
- [x] Unambiguous legal disclaimer preventing misleading claims of BRTA endorsement.
- [x] 100% client-side execution with zero vehicle registration data storage.
