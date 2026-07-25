async function takeCompressedScreenshot(page, options = {}) {
  const {
    captureQuality = 70,
    exportQuality = 0.3,
    scale = 0.5,
    overlayText = ''
  } = options;

  const screenshotBuffer = await page.screenshot({ type: 'jpeg', quality: captureQuality });

  const compressedBase64 = await page.evaluate(async ({ base64, scale, quality, overlayText }) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        if (overlayText) {
          const fontSize = Math.max(12, Math.round(14 * scale));
          ctx.font = `600 ${fontSize}px sans-serif`;
          ctx.textBaseline = 'middle';
          
          const textMetrics = ctx.measureText(overlayText);
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
          ctx.fillText(overlayText, x + paddingX, y + boxHeight / 2);
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
    overlayText
  });

  return Buffer.from(compressedBase64, 'base64');
}

module.exports = {
  takeCompressedScreenshot
};
