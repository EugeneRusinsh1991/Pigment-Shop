const fs = require('fs');
const path = require('path');

function deduplicate(violations) {
  const seen = new Set();
  return violations.filter(v => {
    const key = `${v.location}|${v.details}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function writeAuditReport({ violations, logFile, filesLogFile, auditName, issueTypeName, timestamp }) {
  let report = "===================================================================\n";
  report += `               ${auditName.toUpperCase()} REPORT                            \n`;
  report += "Timestamp: " + (timestamp || new Date().toISOString()) + "\n";
  report += "===================================================================\n\n";

  if (violations.length === 0) {
    report += `No ${issueTypeName} issues found.\n`;
    if (fs.existsSync(filesLogFile)) { try { fs.unlinkSync(filesLogFile); } catch (_) {} }
    fs.writeFileSync(logFile, report);
    console.log(`[${auditName}] Finished (0 unique issues) -> Clean`);
  } else {
    const grouped = {};
    violations.forEach(v => {
      const [filePath, lineNum] = v.location.split(':');
      if (!grouped[filePath]) grouped[filePath] = [];
      grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
    });

    const fileCount = Object.keys(grouped).length;
    report += `Found ${violations.length} ${issueTypeName} issue(s) across ${fileCount} file(s):\n\n`;

    Object.entries(grouped).forEach(([filePath, items]) => {
      report += `File: ${filePath}\n`;
      items.forEach((item) => {
        const lineStr = item.lineNum ? `L${item.lineNum}` : '';
        report += `  ${lineStr.padEnd(6)} ${item.details}\n`;
      });
      report += `\n`;
    });

    if (fileCount > 10) {
      let filesReport = "===================================================================\n";
      filesReport += "               FILES WITH ISSUES REPORT                            \n";
      filesReport += "Timestamp: " + (timestamp || new Date().toISOString()) + "\n";
      filesReport += "===================================================================\n\n";
      filesReport += "Found " + violations.length + " issue(s) across " + fileCount + " target(s):\n\n";

      Object.keys(grouped).forEach(filePath => {
        filesReport += "- " + filePath + " (" + grouped[filePath].length + " issues)\n";
      });

      fs.writeFileSync(filesLogFile, filesReport);
      console.log("  -> Also generated compact file list: " + path.basename(filesLogFile));
    } else {
      if (fs.existsSync(filesLogFile)) { try { fs.unlinkSync(filesLogFile); } catch (_) {} }
    }

    fs.writeFileSync(logFile, report);
    console.log(`[${auditName}] Finished (${violations.length} unique issues) -> ${path.relative(path.join(__dirname, '../..'), logFile)}`);
  }
}

module.exports = {
  deduplicate,
  writeAuditReport
};
