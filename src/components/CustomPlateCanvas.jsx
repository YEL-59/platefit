"use client";

import React, { useRef, useEffect } from "react";
import { Flag, Droplet, Shield, Bike, Slash } from "lucide-react";

export default function CustomPlateCanvas({
  texture,
  borderStyle,
  primaryText,
  subText,
  bloodGroup,
  badgeType,
  fontFamily,
  textColor,
  onCanvasReady,
  plateWidthMm = 285,
  plateHeightMm = 50
}) {
  const canvasRef = useRef(null);

  // Render plate to HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scale = 4; // High DPI resolution multiplier
    const width = plateWidthMm * scale;
    const height = plateHeightMm * scale;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Background Fill & Texture
    if (texture.pattern === "carbon") {
      // Carbon fiber pattern
      ctx.fillStyle = "#151517";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#222226";
      const size = 12;
      for (let x = 0; x < width; x += size) {
        for (let y = 0; y < height; y += size) {
          if ((x / size + y / size) % 2 === 0) {
            ctx.fillRect(x, y, size, size);
          }
        }
      }
    } else if (texture.pattern === "matte") {
      ctx.fillStyle = "#18181B";
      ctx.fillRect(0, 0, width, height);
    } else if (texture.pattern === "brushed") {
      // Brushed titanium
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#334155");
      grad.addColorStop(0.5, "#475569");
      grad.addColorStop(1, "#1E293B");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else if (texture.pattern === "neon") {
      ctx.fillStyle = "#022C22";
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = texture.bg || "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Borders & Frame
    if (borderStyle === "pinstripe") {
      ctx.lineWidth = 4 * (scale / 2);
      ctx.strokeStyle = textColor || "#FFFFFF";
      ctx.strokeRect(10, 10, width - 20, height - 20);

      ctx.lineWidth = 1.5 * (scale / 2);
      ctx.strokeRect(16, 16, width - 32, height - 32);
    } else if (borderStyle === "chamfered") {
      ctx.lineWidth = 6 * (scale / 2);
      ctx.strokeStyle = "#38BDF8"; // sky blue accent
      ctx.strokeRect(8, 8, width - 16, height - 16);
    } else if (borderStyle === "screws") {
      // Corner bolts
      const boltRadius = 8;
      ctx.fillStyle = "#94A3B8";
      ctx.beginPath();
      ctx.arc(20, 20, boltRadius, 0, Math.PI * 2);
      ctx.arc(width - 20, 20, boltRadius, 0, Math.PI * 2);
      ctx.arc(20, height - 20, boltRadius, 0, Math.PI * 2);
      ctx.arc(width - 20, height - 20, boltRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Left / Right Badges
    const textStartX = badgeType && badgeType !== "none" ? width * 0.16 : 0;

    // Draw Blood Group Pill on top right
    if (bloodGroup) {
      const pillWidth = 90;
      const pillHeight = 36;
      const pillX = width - pillWidth - 25;
      const pillY = 16;

      ctx.fillStyle = "#E11D48"; // Crimson Red
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 8);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${18}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(bloodGroup, pillX + pillWidth / 2, pillY + pillHeight / 2);
    }

    // 4. Primary Typography
    ctx.fillStyle = textColor || texture.textColor || "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const selectedFont = fontFamily || "'Tiro Bangla', 'SolaimanLipi', sans-serif";

    if (subText) {
      // Main Text with Subtitle
      ctx.font = `bold ${height * 0.38}px ${selectedFont}`;
      ctx.fillText(primaryText || "ঢাকা মেট্রো-হ ১১-১২৩৪", (width + textStartX) / 2, height * 0.42);

      // Subtitle
      ctx.font = `600 ${height * 0.18}px sans-serif`;
      ctx.fillStyle = texture.pattern === "neon" ? "#34D399" : "#94A3B8";
      ctx.fillText(subText.toUpperCase(), (width + textStartX) / 2, height * 0.78);
    } else {
      // Single Centered Main Text
      ctx.font = `bold ${height * 0.52}px ${selectedFont}`;
      ctx.fillText(primaryText || "ঢাকা মেট্রো-হ ১১-১২৩৪", (width + textStartX) / 2, height / 2);
    }

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [texture, borderStyle, primaryText, subText, bloodGroup, badgeType, fontFamily, textColor, plateWidthMm, plateHeightMm]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-950/90 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="relative w-full max-w-[680px]" style={{ aspectRatio: `${plateWidthMm} / ${plateHeightMm}` }}>
        <canvas ref={canvasRef} className="w-full h-full rounded shadow-inner" />
      </div>
    </div>
  );
}
