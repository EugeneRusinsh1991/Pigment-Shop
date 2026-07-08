/**
 * auditor/reporter.cjs
 * Orchestrates generation of all audit markdown reports.
 * All per-row and per-section formatting logic lives in formatter.cjs.
 */
"use strict";

const {
  cleanPath,
  buildComplexityRows,
  buildLargeFileRows,
  buildTargetRows,
  buildCloneSections,
  formatDeadFiles,
  formatUnusedExports,
  formatDependencyIssues,
  LARGE_FILE_LINES,
  MIN_CLONE_LINES,
} = require("./formatter.cjs");

// ---------------------------------------------------------------------------
// Report generators — each assembles one markdown document from pre-formatted rows
// ---------------------------------------------------------------------------

function generateMainReport(cleaned, dateStr, projectName, paths) {
  const { findings, file_scores, targets, small_files } = cleaned.health;
  const { clone_groups } = cleaned.dupes;
  const { unused_files, unused_exports, unused_dependencies, unlisted_dependencies, circular_dependencies } = cleaned.check;

  return `# ${projectName} Codebase Audit Report

*Generated on: ${dateStr} (via fallow static analysis)*

## Executive Summary

> [!NOTE]
> **Audit Metrics & Health Summary**
> - **Critical Health Findings:** ${findings.filter(f => f.severity === "critical").length}
> - **High Health Findings:** ${findings.filter(f => f.severity === "high").length}
> - **Large / High-Risk Files:** ${file_scores.length}
> - **Significant Clone Groups:** ${clone_groups.length}
> - **Dead Files (Unused):** ${unused_files.length}
> - **Unused Exports:** ${unused_exports.length}
> - **Unused Dependencies:** ${unused_dependencies.length}
> - **Unlisted Dependencies:** ${unlisted_dependencies.length}
> - **Circular Dependencies:** ${circular_dependencies.length}
> - **Small / Pass-Through Files:** ${small_files ? small_files.length : 0}

> [!IMPORTANT]
> This report includes only **Critical** and **High** severity findings and significant code duplications. Low/medium risk issues have been filtered out.

### Detailed Report Files:

- [🩺 Complexity Health Findings (Critical & High)](file:///${paths.complexity})
- [📁 Large / High-Risk Files](file:///${paths.largeFiles})
- [🎯 Priority Refactoring Targets](file:///${paths.targets})
- [👥 Significant Code Duplication](file:///${paths.duplication})
- [📦 Unused Code & Dependencies](file:///${paths.unused})
- [📄 Small & Pass-Through Files Findings](file:///${paths.smallFiles})
`;
}

function generateComplexityReport(cleaned, dateStr, rootPath, backLink) {
  const findings = cleaned.health.findings || [];
  const header = `# 🩺 Complexity Health Findings (Critical & High)\n\n*Generated on: ${dateStr}*\n\n`;
  if (findings.length === 0) return header + `*No critical or high-severity complexity findings found.*\n\n${backLink}`;
  const tableHeader = `| Severity | Function / Method | File | Lines | Cyclomatic | Cognitive | CRAP | Location |\n| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |\n`;
  return header + tableHeader + buildComplexityRows(findings, rootPath) + `\n\n${backLink}`;
}

function generateLargeFilesReport(cleaned, dateStr, rootPath, backLink) {
  const fileScores = cleaned.health.file_scores || [];
  const header = `# 📁 Large / High-Risk Files\n\n*Generated on: ${dateStr}*\n\n`;
  if (fileScores.length === 0) return header + `*No large or high-risk files found.*\n\n${backLink}`;

  const largeInSize = fileScores
    .filter(f => (f.lines || 0) >= LARGE_FILE_LINES)
    .sort((a, b) => (b.lines || 0) - (a.lines || 0));

  const highlyComplex = fileScores
    .filter(f => (f.lines || 0) < LARGE_FILE_LINES)
    .sort((a, b) => (b.crap_max || 0) - (a.crap_max || 0));

  let md = header;
  md += `This report lists files that are either extremely large in size or have very high complexity (CRAP scores).\n\n`;

  if (largeInSize.length > 0) {
    md += `### 📏 Large Files (≥ ${LARGE_FILE_LINES} lines)\n\n`;
    md += `| File | Lines | CRAP Max | Functions Above Threshold | Complexity Density | Fan-In |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: | :---: |\n`;
    md += buildLargeFileRows(largeInSize, rootPath) + `\n\n`;
  }

  if (highlyComplex.length > 0) {
    md += `### 🧠 Highly Complex Files (< ${LARGE_FILE_LINES} lines)\n\n`;
    md += `| File | Lines | CRAP Max | Functions Above Threshold | Complexity Density | Fan-In |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: | :---: |\n`;
    md += buildLargeFileRows(highlyComplex, rootPath) + `\n\n`;
  }

  return md + backLink;
}

function generateTargetsReport(cleaned, dateStr, rootPath, backLink) {
  const targets = cleaned.health.targets || [];
  const header = `# 🎯 Priority Refactoring Targets\n\n*Generated on: ${dateStr}*\n\n`;
  if (targets.length === 0) return header + `*No priority refactoring targets found.*\n\n${backLink}`;
  const tableHeader = `| Priority | File | Recommendation | Effort | Category |\n| :---: | :--- | :--- | :---: | :--- |\n`;
  return header + tableHeader + buildTargetRows(targets, rootPath) + `\n\n${backLink}`;
}

function generateDuplicationReport(cleaned, dateStr, rootPath, backLink) {
  const groups = cleaned.dupes.clone_groups || [];
  const header = `# 👥 Significant Code Duplication (≥ ${MIN_CLONE_LINES} lines)\n\n*Generated on: ${dateStr}*\n\n`;
  if (groups.length === 0) return header + `*No significant code duplication found.*\n\n${backLink}`;
  return header + buildCloneSections(groups, rootPath) + `\n\n${backLink}`;
}

function generateUnusedReport(cleaned, dateStr, rootPath, backLink) {
  const { unused_files, unused_exports, unused_dependencies, unlisted_dependencies, circular_dependencies } = cleaned.check;
  let md = `# 📦 Unused Code & Dependencies\n\n*Generated on: ${dateStr}*\n\n`;
  md += `### Dead Files (Unused)\nFiles that are not reachable or imported by any other codebase file:\n\n`;
  md += formatDeadFiles(unused_files, rootPath);
  md += `### Unused Exports\nExports that are not imported or consumed by any other active file:\n\n`;
  md += formatUnusedExports(unused_exports, rootPath);
  if (unused_dependencies.length > 0 || unlisted_dependencies.length > 0 || circular_dependencies.length > 0) {
    md += `### Dependency Issues\n\n`;
    md += formatDependencyIssues(unused_dependencies, unlisted_dependencies, circular_dependencies, rootPath);
  }
  return md + backLink;
}

function generateSmallFilesReport(cleaned, dateStr, rootPath, backLink) {
  const smallFiles = cleaned.health.small_files || [];
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
    .map(f => `| [${require("path").basename(f.path)}](file:///${cleanPath(rootPath, f.path)}) | ${f.lines} | ${f.size} | **${f.type}** | ${f.recommendation} |`)
    .join("\n\n");
  return `${header}This report lists very small, redundant, or "pass-through" (bridge/proxy/barrel) files that increase cognitive overhead, add complexity to the file structure, and complicate imports without providing significant architectural value.\n\n### Candidate Files for Refactoring/Elimination\n\n| File Path | Lines | Size (Bytes) | Type | Recommendation |\n| :--- | :---: | :---: | :--- | :--- |\n${rows}\n\n${backLink}`;
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

function generateReports(cleaned, rootPath, projectName) {
  const dateStr  = new Date().toLocaleString();
  const backLink = `\n[← Back to Main Report](file:///${cleanPath(rootPath, "auditor/reports/auditreport.md")})\n`;
  const paths = {
    complexity:  cleanPath(rootPath, "auditor/reports/complexity-health-findings.md"),
    largeFiles:  cleanPath(rootPath, "auditor/reports/large-files.md"),
    targets:     cleanPath(rootPath, "auditor/reports/priority-refactor-targets.md"),
    duplication: cleanPath(rootPath, "auditor/reports/code-duplication.md"),
    unused:      cleanPath(rootPath, "auditor/reports/unused-code-dependencies.md"),
    smallFiles:  cleanPath(rootPath, "auditor/reports/small-files.md"),
  };

  return {
    main:        generateMainReport(cleaned, dateStr, projectName, paths),
    complexity:  generateComplexityReport(cleaned, dateStr, rootPath, backLink),
    largeFiles:  generateLargeFilesReport(cleaned, dateStr, rootPath, backLink),
    targets:     generateTargetsReport(cleaned, dateStr, rootPath, backLink),
    duplication: generateDuplicationReport(cleaned, dateStr, rootPath, backLink),
    unused:      generateUnusedReport(cleaned, dateStr, rootPath, backLink),
    smallFiles:  generateSmallFilesReport(cleaned, dateStr, rootPath, backLink),
  };
}

module.exports = { generateReports };
