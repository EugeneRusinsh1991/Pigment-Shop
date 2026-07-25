async function takeCompressedScreenshot(page, options = {}) {
  const {
    captureQuality = 70,
    exportQuality = 0.3,
    scale = 0.5,
    overlayText = '',
    hoverInfo = null
  } = options;

  const screenshotBuffer = await page.screenshot({ type: 'jpeg', quality: captureQuality });

  const compressedBase64 = await page.evaluate(async ({ base64, scale, quality, overlayText, hoverInfo }) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        let finalOverlayText = overlayText;

        if (hoverInfo && hoverInfo.mouse && hoverInfo.mouse.active) {
          const { x, y } = hoverInfo.mouse;
          const scaledX = x * scale;
          const scaledY = y * scale;

          if (hoverInfo.target && hoverInfo.target.rect) {
            const { rect, tag, selector, text } = hoverInfo.target;
            const rx = rect.x * scale;
            const ry = rect.y * scale;
            const rw = rect.width * scale;
            const rh = rect.height * scale;

            ctx.lineWidth = Math.max(1, Math.round(2 * scale));
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
            ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
            ctx.fillRect(rx, ry, rw, rh);
            ctx.strokeRect(rx, ry, rw, rh);

            const badgeLabel = `[${tag || 'ELEMENT'}] ${selector}${text ? ` "${text}"` : ''}`;
            if (finalOverlayText) {
              finalOverlayText += ` | Hover: <${selector}>`;
            } else {
              finalOverlayText = `Hover: <${selector}>`;
            }

            const badgeFontSize = Math.max(10, Math.round(12 * scale));
            ctx.font = `600 ${badgeFontSize}px sans-serif`;
            const badgeMetrics = ctx.measureText(badgeLabel);
            const badgePadX = Math.round(6 * scale);
            const badgePadY = Math.round(3 * scale);
            const badgeWidth = badgeMetrics.width + badgePadX * 2;
            const badgeHeight = badgeFontSize + badgePadY * 2;
            const badgeX = Math.max(5, Math.min(rx, canvas.width - badgeWidth - 5));
            const badgeY = ry > badgeHeight + 5 ? ry - badgeHeight - 4 : ry + rh + 4;

            ctx.fillStyle = 'rgba(22, 101, 52, 0.9)';
            if (ctx.roundRect) {
              ctx.beginPath();
              ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 3);
              ctx.fill();
            } else {
              ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
            }
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'middle';
            ctx.fillText(badgeLabel, badgeX + badgePadX, badgeY + badgeHeight / 2);
          }

          const radius = Math.max(8, Math.round(14 * scale));
          ctx.beginPath();
          ctx.arc(scaledX, scaledY, radius, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
          ctx.fill();
          ctx.lineWidth = Math.max(1.5, Math.round(2 * scale));
          ctx.strokeStyle = '#22C55E';
          ctx.stroke();
        }

        if (finalOverlayText) {
          const fontSize = Math.max(12, Math.round(14 * scale));
          ctx.font = `600 ${fontSize}px sans-serif`;
          ctx.textBaseline = 'middle';
          
          const textMetrics = ctx.measureText(finalOverlayText);
          const paddingX = Math.round(10 * scale);
          const paddingY = Math.round(6 * scale);
          const boxWidth = textMetrics.width + paddingX * 2;
          const boxHeight = fontSize + paddingY * 2;
          
          const margin = Math.round(10 * scale);
          const x = canvas.width - boxWidth - margin;
          const y = canvas.height - boxHeight - margin;
          
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, boxWidth, boxHeight, 4);
          } else {
            ctx.rect(x, y, boxWidth, boxHeight);
          }
          ctx.fill();
          
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(finalOverlayText, x + paddingX, y + boxHeight / 2);
        }

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl.split(',')[1]);
      };
      img.src = 'data:image/jpeg;base64,' + base64;
    });
  }, { 
    base64: screenshotBuffer.toString('base64'),
    scale,
    quality: exportQuality,
    overlayText,
    hoverInfo
  });

  return Buffer.from(compressedBase64, 'base64');
}

module.exports = {
  takeCompressedScreenshot
};
