import { jsPDF } from "jspdf";

/**
 * Generates an exact-millimeter vector PDF containing the plate stencil,
 * cut lines, hole markers, physical calibration ruler, and printing checklist.
 * 
 * @param {Object} params
 * @param {HTMLCanvasElement|HTMLImageElement} params.canvas - The rendered plate canvas
 * @param {number} params.plateWidthMm - Width in millimeters (e.g. 285)
 * @param {number} params.plateHeightMm - Height in millimeters (e.g. 50)
 * @param {string} params.title - Document title / plate registration
 * @param {boolean} params.isStencilMode - True for outline mode (laser cutting)
 * @param {string} params.vehicleType - "motorcycle", "scooter", or "car"
 */
export async function exportPlatePdf({
  canvas,
  plateWidthMm = 285,
  plateHeightMm = 50,
  title = "PlateFit-BRTA-Stencil",
  isStencilMode = false,
  vehicleType = "motorcycle"
}) {
  // A4 dimensions in mm: 210 x 297.
  // If plate width is greater than 190 mm (e.g. 285 mm), use Landscape orientation (297 mm width x 210 mm height).
  const isLandscape = plateWidthMm > 190;
  const pageWidth = isLandscape ? 297 : 210;
  const pageHeight = isLandscape ? 210 : 297;

  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  // Calculate centered position for the plate on the A4 page
  const startX = (pageWidth - plateWidthMm) / 2;
  const startY = 35; // margin from top

  // 1. Header Information
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(15, 23, 42); // slate-900
  pdf.text("PLATEFIT (প্লেটফিট) — 100% PHYSICAL SCALE STENCIL", pageWidth / 2, 14, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(71, 85, 105); // slate-600
  pdf.text(
    `Specification: ${plateWidthMm} mm x ${plateHeightMm} mm | Category: ${vehicleType.toUpperCase()} FRONT | Mode: ${isStencilMode ? "OUTLINE / LASER CUT" : "SOLID PRINT"}`,
    pageWidth / 2,
    19,
    { align: "center" }
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.5);
  pdf.setTextColor(220, 38, 38); // red-600
  pdf.text("CRITICAL: PRINT AT 'ACTUAL SIZE' (100% SCALE). DO NOT SELECT 'FIT TO PAGE' OR 'SHRINK TO FIT'.", pageWidth / 2, 24, { align: "center" });

  // 2. Draw Top & Side Measurement Guidelines
  pdf.setDrawColor(148, 163, 184); // slate-400
  pdf.setLineWidth(0.3);

  // Top measurement dimension line
  const dimLineY = startY - 4;
  pdf.line(startX, dimLineY, startX + plateWidthMm, dimLineY);
  pdf.line(startX, dimLineY - 2, startX, dimLineY + 2); // left tick
  pdf.line(startX + plateWidthMm, dimLineY - 2, startX + plateWidthMm, dimLineY + 2); // right tick
  pdf.setFontSize(8);
  pdf.setTextColor(51, 65, 85);
  pdf.text(`${plateWidthMm} mm (Physical Width)`, startX + plateWidthMm / 2, dimLineY - 1.5, { align: "center" });

  // Left measurement dimension line
  const dimLineX = startX - 4;
  pdf.line(dimLineX, startY, dimLineX, startY + plateHeightMm);
  pdf.line(dimLineX - 2, startY, dimLineX + 2, startY); // top tick
  pdf.line(dimLineX - 2, startY + plateHeightMm, dimLineX + 2, startY + plateHeightMm); // bottom tick
  pdf.text(`${plateHeightMm} mm`, dimLineX - 1.5, startY + plateHeightMm / 2, { align: "right" });

  // 3. Render Plate Canvas Image at EXACT Physical Millimeters
  if (canvas) {
    const imgData = canvas.toDataURL("image/png", 1.0);
    pdf.addImage(imgData, "PNG", startX, startY, plateWidthMm, plateHeightMm, undefined, "FAST");
  }

  // 4. Exact Outer Boundary Cut Box
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.4);
  pdf.rect(startX, startY, plateWidthMm, plateHeightMm);

  // 5. Corner Drill-Hole Guide Marks (4mm circles at standard 12mm offsets)
  pdf.setDrawColor(100, 116, 139);
  pdf.setLineWidth(0.2);
  const holeOffset = 8;
  const holeRadius = 2; // 4mm diameter
  // Top-left
  pdf.circle(startX + holeOffset, startY + holeOffset, holeRadius);
  // Top-right
  pdf.circle(startX + plateWidthMm - holeOffset, startY + holeOffset, holeRadius);
  // Bottom-left
  pdf.circle(startX + holeOffset, startY + plateHeightMm - holeOffset, holeRadius);
  // Bottom-right
  pdf.circle(startX + plateWidthMm - holeOffset, startY + plateHeightMm - holeOffset, holeRadius);

  // Center alignment cross-hairs
  pdf.setLineDashPattern([1, 1], 0);
  pdf.line(startX + plateWidthMm / 2, startY - 2, startX + plateWidthMm / 2, startY + plateHeightMm + 2);
  pdf.setLineDashPattern([], 0); // reset dash

  // 6. 100mm Physical Verification Ruler at the bottom
  const rulerStartX = (pageWidth - 100) / 2;
  const rulerY = startY + plateHeightMm + 18;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(15, 23, 42);
  pdf.text("PHYSICAL CALIBRATION SCALE (VERIFY WITH RULER AFTER PRINTING):", pageWidth / 2, rulerY - 4, { align: "center" });

  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(0.5);
  pdf.line(rulerStartX, rulerY, rulerStartX + 100, rulerY);

  // 10mm tick marks along the 100mm ruler
  for (let i = 0; i <= 100; i += 10) {
    const tickX = rulerStartX + i;
    const tickHeight = i % 50 === 0 ? 5 : i % 10 === 0 ? 3.5 : 2;
    pdf.line(tickX, rulerY, tickX, rulerY + tickHeight);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.text(`${i / 10}`, tickX, rulerY + tickHeight + 3, { align: "center" });
  }
  pdf.text("0 cm", rulerStartX - 1, rulerY + 8, { align: "right" });
  pdf.text("10 cm (100 mm)", rulerStartX + 101, rulerY + 8, { align: "left" });

  // 7. Instructions & Footer Disclaimer
  const footerY = rulerY + 16;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(100, 116, 139);
  pdf.text(
    "Instructions for Fabricator / Print Shop: Cut along outer black box. Holes indicate optional 4mm mounting screw positions.",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );
  pdf.text(
    "Legal Notice: PlateFit is an independent community utility. Official BRTA compliance requires fabrication in Stainless Steel / Aluminium.",
    pageWidth / 2,
    footerY + 4,
    { align: "center" }
  );
  pdf.text("Generated securely via PlateFit (platefit.vercel.app) | 100% Client-Side Privacy Guaranteed", pageWidth / 2, footerY + 8, { align: "center" });

  // Save the PDF
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");
  pdf.save(`${sanitizedTitle}_${plateWidthMm}x${plateHeightMm}mm.pdf`);
}
