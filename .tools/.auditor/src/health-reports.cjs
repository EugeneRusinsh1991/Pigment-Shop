/**
 * auditor/src/health-reports.cjs
 * Handles health-related reports: complexity, large files, high complexity, targets, small files.
 */
"use strict";

const path = require("path");
const {
  cleanPath,
  buildComplexityRows,
  buildLargeFileRows,
  buildTargetRows,
  LARGE_FILE_LINES,
} = require("./formatter.cjs");

function filterByThreshold(findings, severity, threshold, isOver) {
  return findings.filter(f => f.severity === severity && ((f.line_count || 0) > threshold) === isOver);
}

function buildReportSections(header, findings, rootPath, backLink = "") {
  const THRESHOLD = 50;
  
  const criticalOver = filterByThreshold(findings, 'critical', THRESHOLD, true);
  const criticalLE   = filterByThreshold(findings, 'critical', THRESHOLD, false);
  const highOver     = filterByThreshold(findings, 'high', THRESHOLD, true);
  const highLE       = filterByThreshold(findings, 'high', THRESHOLD, false);

  if ([criticalOver, criticalLE, highOver, highLE].every(arr => arr.length === 0)) {
    return header + `*No critical or high-severity complexity findings found.*\n\n${backLink}`;
  }

  let md = header;
  if (criticalOver.length > 0) md += `## 🔴 Critical (> ${THRESHOLD} lines)\n\n` + buildComplexityRows(criticalOver, rootPath) + `\n\n`;
  if (criticalLE.length > 0) md += `## 🔴 Critical (≤ ${THRESHOLD} lines)\n\n` + buildComplexityRows(criticalLE, rootPath) + `\n\n`;
  if (highOver.length > 0) md += `## 🟠 High (> ${THRESHOLD} lines)\n\n` + buildComplexityRows(highOver, rootPath) + `\n\n`;
  if (highLE.length > 0) md += `## 🟠 High (≤ ${THRESHOLD} lines)\n\n` + buildComplexityRows(highLE, rootPath) + `\n\n`;
  return md + backLink;
}

function generateComplexityReport(cleaned, dateStr, rootPath, backLink = "") {
  const findings = cleaned.health?.findings || [];
  const header = `# 🩺 Complexity Health Findings (Critical & High)\n\n*Generated on: ${dateStr}*\n\n`;
  if (findings.length === 0) return header + `*No critical or high-severity complexity findings found.*\n\n${backLink}`;
  return buildReportSections(header, findings, rootPath, backLink);
}

function generateLargeFilesReport(cleaned, dateStr, rootPath, backLink = "") {
  const fileScores = cleaned.health?.file_scores || [];
  const header = `# 📁 Large / High-Risk Files\n\n*Generated on: ${dateStr}*\n\n`;
  const largeInSize = fileScores
    .filter(f => (f.lines || 0) >= LARGE_FILE_LINES)
    .sort((a, b) => (b.lines || 0) - (a.lines || 0));

  if (largeInSize.length === 0) return header + `*No large or high-risk files found.*\n\n${backLink}`;

  let md = header;
  md += `### Large Files (≥ ${LARGE_FILE_LINES} lines)\n\n`;
  md += buildLargeFileRows(largeInSize, rootPath) + `\n\n`;

  return md + backLink;
}

function generateHighComplexityFilesReport(cleaned, dateStr, rootPath, backLink = "") {
  const fileScores = cleaned.health?.file_scores || [];
  const header = `# 🧠 Highly Complex Files\n\n*Generated on: ${dateStr}*\n\n`;

  const CRAP_THRESHOLD = 50;

  const highlyComplex = fileScores
    .filter(f => (f.lines || 0) < LARGE_FILE_LINES && (f.crap_max || 0) >= CRAP_THRESHOLD)
    .sort((a, b) => (b.crap_max || 0) - (a.crap_max || 0));

  if (highlyComplex.length === 0) return header + `*No highly complex files found.*\n\n${backLink}`;

  let md = header;
  md += `### Highly Complex Files (< ${LARGE_FILE_LINES} lines)\n\n`;
  md += buildLargeFileRows(highlyComplex, rootPath) + `\n\n`;

  return md + backLink;
}

function generateTargetsReport(cleaned, dateStr, rootPath, backLink = "") {
  const targets = cleaned.health?.targets || [];
  const header = `# 🎯 Priority Refactoring Targets\n\n*Generated on: ${dateStr}*\n\n`;
  if (targets.length === 0) return header + `*No priority refactoring targets found.*\n\n${backLink}`;
  return header + buildTargetRows(targets, rootPath) + `\n\n${backLink}`;
}

function generateSmallFilesReport(cleaned, dateStr, rootPath, backLink = "") {
  const smallFiles = cleaned.health?.small_files || [];
  const header = `# 📄 Small & Pass-Through Files Findings\n\n*Generated on: ${dateStr}*\n\n`;
  if (smallFiles.length === 0) return header + `*No redundant, small, or pass-through files identified.*\n\n${backLink}`;

  const typeWeight = {
    "Tiny File": 1,
    "Tiny Component": 2,
    "Helper File": 3,
    "Pass-Through Hook": 4,
    "Barrel Re-export": 5
  };

  const sortedFiles = [...smallFiles].sort((a, b) => {
    const wA = typeWeight[a.type] || 99;
    const wB = typeWeight[b.type] || 99;
    if (wA !== wB) return wA - wB;
    return a.lines - b.lines;
  });

  const rows = sortedFiles
    .map(f => `- **[${path.basename(f.path)}](file:///${cleanPath(rootPath, f.path)})** (\`${f.path}\`)\n  - Lines: ${f.lines} | Size: ${f.size} B | Type: **${f.type}**\n  > 💡 ${f.recommendation}`)
    .join("\n\n");
  return `${header}### Candidate Files for Refactoring/Elimination\n\n${rows}\n\n${backLink}`;
}

module.exports = {
  generateComplexityReport,
  generateLargeFilesReport,
  generateHighComplexityFilesReport,
  generateTargetsReport,
  generateSmallFilesReport,
};
