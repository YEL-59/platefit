/**
 * Downloads the plate canvas as a high-definition PNG image
 * @param {HTMLCanvasElement} canvas
 * @param {string} filename
 */
export function exportCanvasAsPng(canvas, filename = "platefit-custom-plate.png") {
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}
