async function takeCompressedScreenshot(page, options = {}) {
  const {
    captureQuality = 70,
    exportQuality = 0.3,
    scale = 0.5
  } = options;

  const screenshotBuffer = await page.screenshot({ type: 'jpeg', quality: captureQuality });

  const compressedBase64 = await page.evaluate(async ({ base64, scale, quality }) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl.split(',')[1]);
      };
      img.src = 'data:image/jpeg;base64,' + base64;
    });
  }, { 
    base64: screenshotBuffer.toString('base64'),
    scale,
    quality: exportQuality
  });

  return Buffer.from(compressedBase64, 'base64');
}

module.exports = {
  takeCompressedScreenshot
};
