const fs = require('fs');
const path = require('path');

function cleanOldFiles(directory, maxFiles, extension) {
  try {
    const files = fs
      .readdirSync(directory)
      .filter(
        (file) =>
          file.endsWith(extension) &&
          file !== `screenshot${extension}` &&
          file !== `state${extension}` &&
          file !== `latest_report${extension}`
      )
      .sort();

    if (files.length > maxFiles) {
      const filesToDelete = files.slice(0, files.length - maxFiles);
      filesToDelete.forEach((file) => {
        const filePath = path.join(directory, file);
        fs.unlinkSync(filePath);
        console.log(`[CleanUp] Deleted old file: ${file}`);
      });
    }
  } catch (err) {
    console.error(`[CleanUp] Failed to clean ${directory}:`, err.message);
  }
}

module.exports = { cleanOldFiles };
