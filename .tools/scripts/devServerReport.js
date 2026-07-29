const fs = require('fs');
const path = require('path');

function generateMarkdownReport(timestamp, diagnostics, state, screenshotsDir, stateDir) {
  const screenshotFilename = `screenshot_${timestamp}.jpg`;
  const stateFilename = `state_${timestamp}.json`;

  const logsRows =
    diagnostics.recentLogs && diagnostics.recentLogs.length > 0
      ? diagnostics.recentLogs
          .map((log) => `| ${log.timestamp} | **${log.type.toUpperCase()}** | ${log.message} |`)
          .join('\n')
      : '| N/A | No warnings or errors logged | |';

  return `# AI Debug Report - ${timestamp}

## 📊 Environment & Diagnostics
| Parameter | Value |
| :--- | :--- |
| **URL** | [${diagnostics.url}](${diagnostics.url}) |
| **User Agent** | \`${diagnostics.userAgent}\` |
| **Viewport Size** | ${diagnostics.screen.viewportWidth}x${diagnostics.screen.viewportHeight} (PixelRatio: ${diagnostics.screen.devicePixelRatio}) |
| **Screen Resolution** | ${diagnostics.screen.width}x${diagnostics.screen.height} |
| **Network** | Online: \`${diagnostics.network.online}\`, Type: \`${diagnostics.network.effectiveType}\` |
| **DOM Size** | ${diagnostics.dom.elementCount} elements |

## 🖼️ Screenshot
![Screenshot](../screenshots/${screenshotFilename})

## 📂 Quick Links
* [Open Full Screenshot](file:///${path.join(screenshotsDir, screenshotFilename).replace(/\\/g, '/')})
* [Open Raw State JSON](file:///${path.join(stateDir, stateFilename).replace(/\\/g, '/')})

## 📜 Console Warnings & Errors (Recent ${diagnostics.recentLogs ? diagnostics.recentLogs.length : 0})
| Timestamp | Type | Message |
| :--- | :--- | :--- |
${logsRows}

## 📦 Application State Dump
\`\`\`json
${JSON.stringify(state, null, 2)}
\`\`\`
`;
}

module.exports = {
  generateMarkdownReport,
};
