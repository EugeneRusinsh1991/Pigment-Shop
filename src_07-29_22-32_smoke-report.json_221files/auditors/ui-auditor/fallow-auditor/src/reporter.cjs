/**
 * auditor/src/reporter.cjs
 * Orchestrates generation of all audit markdown reports by delegating to submodules.
 */
"use strict";

const { cleanPath } = require("./formatter.cjs");
const {
  generateComplexityReport,
  generateLargeFilesReport,
  generateHighComplexityFilesReport,
  generateTargetsReport,
  generateSmallFilesReport,
  generateAuditKeptReport,
} = require("./health-reports.cjs");
const {
  generateDuplicationReport,
  generateDeadFilesReport,
  generateUnusedExportsReport,
  generateDependencyIssuesReport,
} = require("./maintenance-reports.cjs");

// ---------------------------------------------------------------------------
// Main Report Generator
// ---------------------------------------------------------------------------

function generateMainReport(cleaned, dateStr, projectName, paths) {
  const { findings, file_scores, targets, small_files } = cleaned.health;
  const { clone_groups } = cleaned.dupes;
  const { unused_files, unused_exports, unused_dependencies, unlisted_dependencies, circular_dependencies } = cleaned.check;

  return `# ${projectName} Codebase Audit Summary

> **Audit Metrics & Health Overview**
> - **Critical Health Findings:** ${findings.filter(f => f.severity === "critical").length}
> - **High Health Findings:** ${findings.filter(f => f.severity === "high").length}
> - **Large / High-Risk Files:** ${file_scores.length}
> - **Significant Clone Groups:** ${clone_groups.length}
> - **Dead Files (Unused):** ${unused_files.length}
> - **Unused Exports:** ${unused_exports.length}
> - **Unused Dependencies:** ${unused_dependencies.length}
> - **Unlisted Dependencies:** ${unlisted_dependencies.length}
> - **Circular Dependencies:** ${circular_dependencies.length}
> - **Small / Pass-Through Files:** ${small_files ? small_files.filter(f => !f.isKept).length : 0}
> - **Preserved Files (@audit-keep):** ${small_files ? small_files.filter(f => f.isKept).length : 0}

---

### Detailed Audit Reports

- [🩺 Complexity Health Findings](./complexity-health-findings.md) ([Full Path](file:///${paths.complexity}))
- [📁 Large Files](./large-files.md) ([Full Path](file:///${paths.largeFiles}))
- [🧠 Highly Complex Files](./high-complexity-files.md) ([Full Path](file:///${paths.highComplexity}))
- [🎯 Priority Refactoring Targets](./priority-refactor-targets.md) ([Full Path](file:///${paths.targets}))
- [👥 Code Duplication Groups](./code-duplication.md) ([Full Path](file:///${paths.duplication}))
- [💀 Dead Files](./dead-files.md) ([Full Path](file:///${paths.deadFiles}))
- [📦 Unused Exports](./unused-exports.md) ([Full Path](file:///${paths.unusedExports}))
- [🔗 Dependency Issues](./dependency-issues.md) ([Full Path](file:///${paths.dependencyIssues}))
- [📄 Small & Pass-Through Files](./small-files.md) ([Full Path](file:///${paths.smallFiles}))
- [🛡️ Audit Kept Inventory](./audit-kept-inventory.md) ([Full Path](file:///${paths.auditKept}))
`;
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

function generateReports(cleaned, rootPath, projectName, subDir = "") {
  const dateStr = new Date().toLocaleString();
  const baseDir = subDir ? `.audits/fallow-audits/${subDir}` : `.audits/fallow-audits`;
  const paths = {
    complexity:       cleanPath(rootPath, `${baseDir}/complexity-health-findings.md`),
    largeFiles:       cleanPath(rootPath, `${baseDir}/large-files.md`),
    highComplexity:   cleanPath(rootPath, `${baseDir}/high-complexity-files.md`),
    targets:          cleanPath(rootPath, `${baseDir}/priority-refactor-targets.md`),
    duplication:      cleanPath(rootPath, `${baseDir}/code-duplication.md`),
    deadFiles:        cleanPath(rootPath, `${baseDir}/dead-files.md`),
    unusedExports:    cleanPath(rootPath, `${baseDir}/unused-exports.md`),
    dependencyIssues: cleanPath(rootPath, `${baseDir}/dependency-issues.md`),
    smallFiles:       cleanPath(rootPath, `${baseDir}/small-files.md`),
    auditKept:        cleanPath(rootPath, `${baseDir}/audit-kept-inventory.md`),
  };

  return {
    main:             generateMainReport(cleaned, dateStr, projectName, paths),
    complexity:       generateComplexityReport(cleaned, dateStr, rootPath),
    largeFiles:       generateLargeFilesReport(cleaned, dateStr, rootPath),
    highComplexity:   generateHighComplexityFilesReport(cleaned, dateStr, rootPath),
    targets:          generateTargetsReport(cleaned, dateStr, rootPath),
    duplication:      generateDuplicationReport(cleaned, dateStr, rootPath),
    deadFiles:        generateDeadFilesReport(cleaned, dateStr, rootPath),
    unusedExports:    generateUnusedExportsReport(cleaned, dateStr, rootPath),
    dependencyIssues: generateDependencyIssuesReport(cleaned, dateStr, rootPath),
    smallFiles:       generateSmallFilesReport(cleaned, dateStr, rootPath),
    auditKept:        generateAuditKeptReport(cleaned, dateStr, rootPath),
  };
}

module.exports = { generateReports };
