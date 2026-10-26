// English to Bangla digit maps
const enToBnDigits = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

const bnToEnDigits = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/**
 * Converts any English digits in a string to Bangla digits
 * @param {string|number} input
 * @returns {string}
 */
export function toBanglaDigits(input) {
  if (input === null || input === undefined) return "";
  const str = String(input);
  return str.replace(/[0-9]/g, (digit) => enToBnDigits[digit] || digit);
}

/**
 * Converts any Bangla digits in a string to English digits
 * @param {string} input
 * @returns {string}
 */
export function toEnglishDigits(input) {
  if (!input) return "";
  return String(input).replace(/[০-৯]/g, (digit) => bnToEnDigits[digit] || digit);
}

/**
 * Formats a 2-digit series number (e.g. "11" or "১১")
 * @param {string} val
 * @returns {string}
 */
export function formatSeriesNumber(val) {
  if (!val) return "";
  const bn = toBanglaDigits(val);
  // Keep only bangla digits
  return bn.replace(/[^০-৯]/g, "").slice(0, 2);
}

/**
 * Formats a 4-digit registration number (e.g. "1234" or "১২৩৪")
 * @param {string} val
 * @returns {string}
 */
export function formatRegistrationNumber(val) {
  if (!val) return "";
  const bn = toBanglaDigits(val);
  // Keep only bangla digits
  return bn.replace(/[^০-৯]/g, "").slice(0, 4);
}
