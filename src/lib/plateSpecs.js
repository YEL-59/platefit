export const BRTA_SPECS = {
  MOTORCYCLE_FRONT: {
    id: "motorcycle_front",
    nameEn: "Motorcycle (Front / সামনে)",
    nameBn: "মোটরসাইকেল (সামনে)",
    type: "motorcycle",
    widthMm: 285,
    heightMm: 50,
    minCharHeightMm: 20,
    recommendedFontHeightMm: 22,
    maxLines: 1,
    lineLayout: "single_line", // e.g. "ঢাকা মেট্রো-হ ১১-১২৩৪"
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderWidthMm: 0,
    allowedMaterials: ["Stainless Steel", "Aluminium"],
    verified: true,
    directiveDate: "October 2026",
    complianceDeadline: "15 November 2026",
    descriptionEn: "Official BRTA dimension for standard motorcycle front plate. Single line format.",
    descriptionBn: "বিআরটিএ নির্দেশিত আদর্শ মোটরসাইকেল ফ্রন্ট প্লেট পরিমাপ। এক লাইনে বিন্যস্ত।"
  },
  SCOOTER_FRONT: {
    id: "scooter_front",
    nameEn: "Scooter / Moped (Front / স্কুটার সামনে)",
    nameBn: "স্কুটার / মোপেড (সামনে)",
    type: "scooter",
    widthMm: 200,
    heightMm: 100,
    minCharHeightMm: 20,
    recommendedFontHeightMm: 22,
    maxLines: 2,
    lineLayout: "two_lines", // Line 1: "ঢাকা মেট্রো-এ", Line 2: "১১-১২৩৪"
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderWidthMm: 0,
    allowedMaterials: ["Stainless Steel", "Aluminium"],
    verified: true,
    directiveDate: "October 2026",
    complianceDeadline: "15 November 2026",
    descriptionEn: "Official BRTA dimension for scooter/moped front plates. Two line stacked format.",
    descriptionBn: "বিআরটিএ নির্দেশিত স্কুটার ও মোপেডের জন্য ফ্রন্ট প্লেট পরিমাপ। দুই লাইনে বিন্যস্ত।"
  },
  CAR_FRONT_REAR: {
    id: "car_front_rear",
    nameEn: "Private Car / SUV / Microbus (কার / এসইউভি)",
    nameBn: "প্রাইভেট কার / জিপ / মাইক্রোবাস",
    type: "car",
    widthMm: 300,
    heightMm: 152,
    minCharHeightMm: 30,
    recommendedFontHeightMm: 32,
    maxLines: 2,
    lineLayout: "two_lines", // Line 1: "ঢাকা মেট্রো-গ", Line 2: "১১-১২৩৪"
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderWidthMm: 0,
    allowedMaterials: ["Embossed Aluminium", "Acrylic"],
    verified: true,
    directiveDate: "BRTA Standard",
    complianceDeadline: "Standard Vehicle Regulation",
    descriptionEn: "Standard private motor vehicle number plate dimension for cars, SUVs, and vans.",
    descriptionBn: "প্রাইভেট কার, জিপ ও মাইক্রোবাসের জন্য আদর্শ পরিমাপ।"
  }
};

export const CUSTOM_TEXTURES = [
  { id: "carbon", nameEn: "Carbon Fiber", nameBn: "কার্বন ফাইবার", bg: "#151517", textColor: "#F8FAFC", pattern: "carbon" },
  { id: "matte_black", nameEn: "Matte Stealth", nameBn: "ম্যাট ব্ল্যাক", bg: "#18181B", textColor: "#FAFAFA", pattern: "matte" },
  { id: "titanium", nameEn: "Brushed Titanium", nameBn: "ব্রাশড টাইটানিয়াম", bg: "#475569", textColor: "#F1F5F9", pattern: "brushed" },
  { id: "gloss_white", nameEn: "Classic White", nameBn: "ক্লাসিক হোয়াইট", bg: "#FFFFFF", textColor: "#0F172A", pattern: "clean" },
  { id: "racing_yellow", nameEn: "JDM Taxi Yellow", nameBn: "রেসিং ইয়োলো", bg: "#FACC15", textColor: "#000000", pattern: "clean" },
  { id: "cyber_neon", nameEn: "Cyber Neon", nameBn: "সাইবার নিয়ন", bg: "#022C22", textColor: "#34D399", pattern: "neon" }
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const BADGES_LIST = [
  { id: "bd_flag", name: "Bangladesh Flag", icon: "flag" },
  { id: "blood_group", name: "Blood Group", icon: "droplet" },
  { id: "bike_rider", name: "Rider Silhouette", icon: "bike" },
  { id: "helmet", name: "Helmet Icon", icon: "shield" },
  { id: "none", name: "No Badge", icon: "slash" }
];

// Millimeters to Points conversion factor (for jsPDF: 1 pt = 0.352778 mm, 1 mm = 2.83464567 pt)
export const MM_TO_PT = 2.83464567;
// Standard screen DPI assumes 96 pixels per inch: 1 inch = 25.4 mm => 96 / 25.4 = 3.7795 px/mm
export const MM_TO_PX_DEFAULT = 3.779527559;
