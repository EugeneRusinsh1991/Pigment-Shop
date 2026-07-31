async function takeCompressedScreenshot(page, options = {}) {
  const {
    captureQuality = 80,
    exportQuality = 0.4,
    scale = 0.5,
    cropToTarget = false,
    cropPadding = 100,
    overlayText = '',
    hoverInfo = null
  } = options;

  const screenshotBuffer = await page.screenshot({ type: 'jpeg', quality: captureQuality });

  const compressedBase64 = await page.evaluate(async ({ base64, scale, quality, cropToTarget, cropPadding, overlayText, hoverInfo }) => {
    function drawHoverBadge(ctx, { rx, ry, rw, rh, tag, selector, text, drawScale, canvas, overlayText }) {
      const badgeLabel = `[${tag || 'ELEMENT'}] ${selector}${text ? ` "${text}"` : ''}`;
      const newOverlay = overlayText ? overlayText + ` | Hover: <${selector}>` : `Hover: <${selector}>`;
      const badgeFontSize = Math.max(11, Math.round(13 * drawScale));
      ctx.font = `600 ${badgeFontSize}px sans-serif`;
      const badgeMetrics = ctx.measureText(badgeLabel);
      const badgePadX = Math.round(8 * drawScale), badgePadY = Math.round(4 * drawScale);
      const badgeWidth = badgeMetrics.width + badgePadX * 2, badgeHeight = badgeFontSize + badgePadY * 2;
      const badgeX = Math.max(5, Math.min(rx, canvas.width - badgeWidth - 5));
      const badgeY = ry > badgeHeight + 5 ? ry - badgeHeight - 4 : ry + rh + 4;
      ctx.fillStyle = 'rgba(22, 101, 52, 0.95)';
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 4); ctx.fill(); }
      else { ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight); }
      ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeLabel, badgeX + badgePadX, badgeY + badgeHeight / 2);
      return newOverlay;
    }

    function drawMouseCursor(ctx, scaledX, scaledY, drawScale) {
      const radius = Math.max(6, Math.round(12 * drawScale));
      ctx.beginPath();
      ctx.arc(scaledX, scaledY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
      ctx.fill();
      ctx.lineWidth = Math.max(1.5, Math.round(2 * drawScale));
      ctx.strokeStyle = '#22C55E';
      ctx.stroke();
    }

    function drawOverlayLabel(ctx, canvas, text, drawScale) {
      const fontSize = Math.max(11, Math.round(13 * drawScale));
      ctx.font = `600 ${fontSize}px sans-serif`;
      ctx.textBaseline = 'middle';
      const textMetrics = ctx.measureText(text);
      const paddingX = Math.round(10 * drawScale), paddingY = Math.round(6 * drawScale);
      const boxWidth = textMetrics.width + paddingX * 2, boxHeight = fontSize + paddingY * 2;
      const margin = Math.round(10 * drawScale);
      const x = canvas.width - boxWidth - margin, y = canvas.height - boxHeight - margin;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y, boxWidth, boxHeight, 4); }
      else { ctx.rect(x, y, boxWidth, boxHeight); }
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, x + paddingX, y + boxHeight / 2);
    }

    function renderTargetCropCanvas(img, dpr, hoverInfo, cropPadding, overlayText) {
      const canvas = document.createElement('canvas');
      const rect = hoverInfo.target.rect;
      const pad = cropPadding * dpr;

      const rectX = rect.x * dpr;
      const rectY = rect.y * dpr;
      const rectW = rect.width * dpr;
      const rectH = rect.height * dpr;

      const cropX = Math.max(0, Math.floor(rectX - pad));
      const cropY = Math.max(0, Math.floor(rectY - pad));
      const cropW = Math.min(img.width - cropX, Math.ceil(rectW + pad * 2));
      const cropH = Math.min(img.height - cropY, Math.ceil(rectH + pad * 2));

      canvas.width = cropW;
      canvas.height = cropH;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

      const rx = rectX - cropX;
      const ry = rectY - cropY;
      const rw = rectW;
      const rh = rectH;
      const drawScale = dpr;

      ctx.lineWidth = Math.max(2, Math.round(2 * drawScale));
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
      ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeRect(rx, ry, rw, rh);

      let finalOverlayText = drawHoverBadge(ctx, {
        rx, ry, rw, rh,
        tag: hoverInfo.target.tag,
        selector: hoverInfo.target.selector,
        text: hoverInfo.target.text,
        drawScale,
        canvas,
        overlayText
      });

      if (hoverInfo.mouse && hoverInfo.mouse.active) {
        const mouseX = (hoverInfo.mouse.x * dpr) - cropX;
        const mouseY = (hoverInfo.mouse.y * dpr) - cropY;
        drawMouseCursor(ctx, mouseX, mouseY, drawScale);
      }

      if (finalOverlayText) {
        drawOverlayLabel(ctx, canvas, finalOverlayText, drawScale);
      }
      return canvas;
    }

    function renderFullCanvas(img, dpr, hoverInfo, scale, overlayText) {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let finalOverlayText = overlayText;
      if (hoverInfo && hoverInfo.mouse && hoverInfo.mouse.active) {
        const mouseCanvasX = hoverInfo.mouse.x * dpr * scale;
        const mouseCanvasY = hoverInfo.mouse.y * dpr * scale;

        if (hoverInfo.target && hoverInfo.target.rect) {
          const rect = hoverInfo.target.rect;
          const rx = rect.x * dpr * scale;
          const ry = rect.y * dpr * scale;
          const rw = rect.width * dpr * scale;
          const rh = rect.height * dpr * scale;

          ctx.lineWidth = Math.max(1, Math.round(2 * scale));
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
          ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
          ctx.fillRect(rx, ry, rw, rh);
          ctx.strokeRect(rx, ry, rw, rh);

          finalOverlayText = drawHoverBadge(ctx, {
            rx, ry, rw, rh,
            tag: hoverInfo.target.tag,
            selector: hoverInfo.target.selector,
            text: hoverInfo.target.text,
            drawScale: scale,
            canvas,
            overlayText
          });
        }

        drawMouseCursor(ctx, mouseCanvasX, mouseCanvasY, scale);
      }

      if (finalOverlayText) {
        drawOverlayLabel(ctx, canvas, finalOverlayText, scale);
      }
      return canvas;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const dpr = (window.innerWidth && img.width) ? (img.width / window.innerWidth) : (window.devicePixelRatio || 1);
        const hasTarget = !!(cropToTarget && hoverInfo && hoverInfo.target && hoverInfo.target.rect);
        const canvas = hasTarget
          ? renderTargetCropCanvas(img, dpr, hoverInfo, cropPadding, overlayText)
          : renderFullCanvas(img, dpr, hoverInfo, scale, overlayText);
        resolve(canvas.toDataURL('image/jpeg', quality).split(',')[1]);
      };
      img.src = 'data:image/jpeg;base64,' + base64;
    });
  }, { 
    base64: screenshotBuffer.toString('base64'),
    scale,
    quality: exportQuality,
    cropToTarget,
    cropPadding,
    overlayText,
    hoverInfo
  });

  return Buffer.from(compressedBase64, 'base64');
}

module.exports = {
  takeCompressedScreenshot
};
