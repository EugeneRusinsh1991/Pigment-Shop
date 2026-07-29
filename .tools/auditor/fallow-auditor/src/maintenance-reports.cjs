/**
 * auditor/src/maintenance-reports.cjs
 * Handles maintenance-related reports: duplication, unused code and dependency issues.
 */
"use strict";

const {
  cleanPath,
  buildCloneSections,
  formatDeadFiles,
  formatUnusedExports,
  formatDependencyIssues,
  MIN_CLONE_LINES,
} = require("./formatter.cjs");

function generateDuplicationReport(cleaned, dateStr, rootPath, backLink = "") {
  const groups = cleaned.dupes.clone_groups || [];
  const header = `# 👥 Significant Code Duplication (≥ ${MIN_CLONE_LINES} lines)\n\n*Generated on: ${dateStr}*\n\n`;
  if (groups.length === 0) return header + `*No significant code duplication found.*\n\n${backLink}`;
  return header + buildCloneSections(groups, rootPath) + `\n\n${backLink}`;
}

function generateDeadFilesReport(cleaned, dateStr, rootPath, backLink = "") {
  const { unused_files } = cleaned.check;
  let md = `# 💀 Dead Files (Unused)\n\n*Generated on: ${dateStr}*\n\n`;
  md += `Files that are not reachable or imported by any other codebase file:\n\n`;
  md += formatDeadFiles(unused_files, rootPath);
  return md + backLink;
}

function generateUnusedExportsReport(cleaned, dateStr, rootPath, backLink = "") {
  const { unused_exports } = cleaned.check;
  let md = `# 📦 Unused Exports\n\n*Generated on: ${dateStr}*\n\n`;
  md += `Exports that are not imported or consumed by any other active file:\n\n`;
  md += formatUnusedExports(unused_exports, rootPath);
  return md + backLink;
}

function hasAnyDependencyIssues(unused, unlisted, circular) {
  return Boolean((unused && unused.length) || (unlisted && unlisted.length) || (circular && circular.length));
}

function generateDependencyIssuesReport(cleaned, dateStr, rootPath, backLink = "") {
  const { unused_dependencies, unlisted_dependencies, circular_dependencies } = cleaned.check;
  let md = `# 🔗 Dependency Issues\n\n*Generated on: ${dateStr}*\n\n`;
  if (hasAnyDependencyIssues(unused_dependencies, unlisted_dependencies, circular_dependencies)) {
    md += formatDependencyIssues(unused_dependencies, unlisted_dependencies, circular_dependencies, rootPath);
  } else {
    md += `*No dependency issues found.*\n\n`;
  }
  return md + backLink;
}

module.exports = {
  generateDuplicationReport,
  generateDeadFilesReport,
  generateUnusedExportsReport,
  generateDependencyIssuesReport,
};
