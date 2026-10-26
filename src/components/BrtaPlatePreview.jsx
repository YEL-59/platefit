"use client";

import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { ShieldCheck, Ruler, Scissors, CheckCircle, AlertTriangle, Maximize2 } from "lucide-react";
import { MM_TO_PX_DEFAULT } from "@/lib/plateSpecs";

export default function BrtaPlatePreview({
  spec,
  districtBn,
  vehicleClass,
  seriesNumber,
  regNumber,
  isStencilMode = false,
  showRuler = true,
  onCanvasReady,
  pxPerMm = MM_TO_PX_DEFAULT,
  isLifeSize = false
}) {
  const { t } = useLanguage();
  const canvasRef = useRef(null);
  const [charHeightMm, setCharHeightMm] = useState(spec.recommendedFontHeightMm || 22);

  // Plate dimensions in mm
  const widthMm = spec.widthMm;
  const heightMm = spec.heightMm;

  // Aspect ratio
  const aspectRatio = widthMm / heightMm;

  // Layout text based on vehicle type
  const isTwoLines = spec.lineLayout === "two_lines";

  // Construct text lines
  const line1 = isTwoLines
    ? `${districtBn}-${vehicleClass}`
    : `${districtBn}-${vehicleClass} ${seriesNumber}-${regNumber}`;
  const line2 = isTwoLines ? `${seriesNumber}-${regNumber}` : "";

  // Render to hidden canvas for PDF generator and export
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use high-res scale (10 pixels per millimeter for razor-sharp vector PDF rendering)
    const renderScale = 10;
    const canvasWidth = widthMm * renderScale;
    const canvasHeight = heightMm * renderScale;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    if (isStencilMode) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(2, 2, canvasWidth - 4, canvasHeight - 4);
    } else {
      ctx.fillStyle = spec.backgroundColor || "#FFFFFF";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#D1D5DB";
      ctx.strokeRect(1, 1, canvasWidth - 2, canvasHeight - 2);
    }

    // Font calculation
    // Recommended font height in mm translated to canvas pixels
    const fontHeightPx = charHeightMm * renderScale;
    const fontFamily = "'Tiro Bangla', 'SolaimanLipi', 'Hind Siliguri', 'Kalpurush', sans-serif";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (isStencilMode) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "transparent";
    } else {
      ctx.fillStyle = spec.textColor || "#000000";
    }

    if (!isTwoLines) {
      // Single line layout (Motorcycle 285x50mm)
      ctx.font = `bold ${fontHeightPx * 1.15}px ${fontFamily}`;
      const textY = canvasHeight / 2;
      if (isStencilMode) {
        ctx.strokeText(line1, canvasWidth / 2, textY);
      } else {
        ctx.fillText(line1, canvasWidth / 2, textY);
      }
    } else {
      // Two lines layout (Scooter 200x100mm or Car 300x152mm)
      ctx.font = `bold ${fontHeightPx * 1.05}px ${fontFamily}`;
      const line1Y = canvasHeight * 0.35;
      const line2Y = canvasHeight * 0.72;

      if (isStencilMode) {
        ctx.strokeText(line1, canvasWidth / 2, line1Y);
        ctx.strokeText(line2, canvasWidth / 2, line2Y);
      } else {
        ctx.fillText(line1, canvasWidth / 2, line1Y);
        ctx.fillText(line2, canvasWidth / 2, line2Y);
      }
    }

    // Corner hole guides (optional stencil markers)
    const holeRadius = 2 * renderScale;
    const holeOffset = 8 * renderScale;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#94A3B8";

    // Circle holes
    ctx.beginPath();
    ctx.arc(holeOffset, holeOffset, holeRadius, 0, Math.PI * 2);
    ctx.arc(canvasWidth - holeOffset, holeOffset, holeRadius, 0, Math.PI * 2);
    ctx.arc(holeOffset, canvasHeight - holeOffset, holeRadius, 0, Math.PI * 2);
    ctx.arc(canvasWidth - holeOffset, canvasHeight - holeOffset, holeRadius, 0, Math.PI * 2);
    ctx.stroke();

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [widthMm, heightMm, line1, line2, isTwoLines, charHeightMm, isStencilMode, spec]);

  // Width in pixels for life-size mode vs responsive container mode
  const displayWidth = isLifeSize ? `${widthMm * pxPerMm}px` : "100%";

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Dimension & Compliance Badge Header */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            {t.generator.validStatus}
          </span>
          <span className="text-slate-500">•</span>
          <span className="font-mono text-slate-300">
            {widthMm} mm × {heightMm} mm
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-mono text-[11px]">
          <span>{charHeightMm}mm Font Height</span>
          <span className="text-emerald-400">(Min: {spec.minCharHeightMm}mm)</span>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="relative w-full overflow-x-auto p-4 sm:p-6 bg-slate-950/90 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
        {/* Top Horizontal Millimeter Ruler */}
        {showRuler && (
          <div
            style={{ width: displayWidth, maxWidth: isLifeSize ? "none" : "680px" }}
            className="h-6 border-b border-slate-700/80 flex items-end justify-between px-1 mb-1 font-mono text-[9px] text-slate-500 relative"
          >
            <span className="text-slate-400">0 mm</span>
            <span className="absolute left-1/4 -translate-x-1/2">{(widthMm * 0.25).toFixed(0)} mm</span>
            <span className="absolute left-1/2 -translate-x-1/2 text-emerald-400 font-bold">
              {(widthMm * 0.5).toFixed(0)} mm (Center)
            </span>
            <span className="absolute left-3/4 -translate-x-1/2">{(widthMm * 0.75).toFixed(0)} mm</span>
            <span className="text-slate-400">{widthMm} mm</span>
          </div>
        )}

        {/* The Visual Physical Plate */}
        <div className="relative flex items-center justify-center w-full">
          {/* Left Vertical Ruler */}
          {showRuler && (
            <div
              style={{
                height: isLifeSize ? `${heightMm * pxPerMm}px` : "auto",
                aspectRatio: isLifeSize ? "auto" : `${aspectRatio}`
              }}
              className="w-8 border-r border-slate-700/80 flex flex-col justify-between py-1 mr-2 font-mono text-[9px] text-slate-500 text-right pr-1"
            >
              <span>0</span>
              <span className="text-emerald-400 font-bold">{(heightMm * 0.5).toFixed(0)}</span>
              <span>{heightMm}mm</span>
            </div>
          )}

          {/* Plate Surface */}
          <div
            style={{
              width: displayWidth,
              maxWidth: isLifeSize ? "none" : "680px",
              aspectRatio: `${widthMm} / ${heightMm}`,
            }}
            className={`relative rounded-[4px] border-2 shadow-2xl transition-all duration-150 flex flex-col items-center justify-center overflow-hidden ${
              isStencilMode
                ? "bg-white border-black"
                : "bg-white border-slate-400/90"
            }`}
          >
            {/* Centerline Crosshair guide (dashed) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-dashed border-slate-300/60 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-r border-dashed border-slate-300/60 pointer-events-none" />

            {/* Corner Screw Hole Marks */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-slate-400 bg-slate-200/50" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-slate-400 bg-slate-200/50" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border border-slate-400 bg-slate-200/50" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-slate-400 bg-slate-200/50" />

            {/* Plate Bangla Typography */}
            {!isTwoLines ? (
              <div
                className={`font-bold tracking-tight text-center whitespace-nowrap px-4 py-1 ${
                  isStencilMode
                    ? "text-black [text-shadow:_0_0_1px_#000] font-mono"
                    : "text-black"
                }`}
                style={{
                  fontSize: `clamp(16px, ${heightMm * 0.52}px, 44px)`,
                  fontFamily: "'Tiro Bangla', 'SolaimanLipi', 'Hind Siliguri', sans-serif"
                }}
              >
                {line1}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-1 py-2 px-3 text-center">
                <div
                  className="font-bold text-black tracking-tight whitespace-nowrap"
                  style={{
                    fontSize: `clamp(14px, ${heightMm * 0.28}px, 34px)`,
                    fontFamily: "'Tiro Bangla', 'SolaimanLipi', sans-serif"
                  }}
                >
                  {line1}
                </div>
                <div
                  className="font-bold text-black tracking-wider whitespace-nowrap"
                  style={{
                    fontSize: `clamp(15px, ${heightMm * 0.32}px, 38px)`,
                    fontFamily: "'Tiro Bangla', 'SolaimanLipi', sans-serif"
                  }}
                >
                  {line2}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden Canvas used for razor-sharp Vector PDF generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
