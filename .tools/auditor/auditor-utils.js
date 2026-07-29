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

function groupViolationsByFile(violations) {
  const grouped = {};
  violations.forEach(v => {
    const [filePath, lineNum] = v.location.split(':');
    if (!grouped[filePath]) grouped[filePath] = [];
    grouped[filePath].push({ lineNum: lineNum || '', details: v.details });
  });
  return grouped;
}

function cleanFilesLog(filesLogFile) {
  if (fs.existsSync(filesLogFile)) {
    try { fs.unlinkSync(filesLogFile); } catch (_) {}
  }
}

function generateReportHeader(auditName, timestamp) {
  return "===================================================================\n" +
    `               ${auditName.toUpperCase()} REPORT                            \n` +
    "Timestamp: " + (timestamp || new Date().toISOString()) + "\n" +
    "===================================================================\n\n";
}

function formatGroupedViolations(grouped) {
  let body = "";
  Object.entries(grouped).forEach(([filePath, items]) => {
    body += `File: ${filePath}\n`;
    items.forEach((item) => {
      const lineStr = item.lineNum ? `L${item.lineNum}` : '';
      body += `  ${lineStr.padEnd(6)} ${item.details}\n`;
    });
    body += `\n`;
  });
  return body;
}

function writeFilesSummaryReport(filesLogFile, fileCount, violationsCount, grouped, timestamp) {
  let filesReport = generateReportHeader("FILES WITH ISSUES", timestamp);
  filesReport += `Found ${violationsCount} issue(s) across ${fileCount} target(s):\n\n`;
  Object.keys(grouped).forEach(filePath => {
    filesReport += `- ${filePath} (${grouped[filePath].length} issues)\n`;
  });
  fs.writeFileSync(filesLogFile, filesReport);
  console.log("  -> Also generated compact file list: " + path.basename(filesLogFile));
}

function writeAuditReport({ violations, logFile, filesLogFile, auditName, issueTypeName, timestamp }) {
  if (violations.length === 0) {
    cleanFilesLog(filesLogFile);
    fs.writeFileSync(logFile, generateReportHeader(auditName, timestamp) + `No ${issueTypeName} issues found.\n`);
    console.log(`[${auditName}] Finished (0 unique issues) -> Clean`);
    return;
  }

  const grouped = groupViolationsByFile(violations);
  const fileCount = Object.keys(grouped).length;

  let report = generateReportHeader(auditName, timestamp);
  report += `Found ${violations.length} ${issueTypeName} issue(s) across ${fileCount} file(s):\n\n`;
  report += formatGroupedViolations(grouped);

  if (fileCount > 10) {
    writeFilesSummaryReport(filesLogFile, fileCount, violations.length, grouped, timestamp);
  } else {
    cleanFilesLog(filesLogFile);
  }

  fs.writeFileSync(logFile, report);
  console.log(`[${auditName}] Finished (${violations.length} unique issues) -> ${path.relative(path.join(__dirname, '../..'), logFile)}`);
}

module.exports = {
  deduplicate,
  writeAuditReport
};
