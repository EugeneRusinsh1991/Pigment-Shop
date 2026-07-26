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
} = require("./health-reports.cjs");
const {
  generateDuplicationReport,
  generateUnusedReport,
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
> - **Small / Pass-Through Files:** ${small_files ? small_files.length : 0}

---

### Detailed Audit Reports

- [🩺 Complexity Health Findings](file:///${paths.complexity})
- [📁 Large Files](file:///${paths.largeFiles})
- [🧠 Highly Complex Files](file:///${paths.highComplexity})
- [🎯 Priority Refactoring Targets](file:///${paths.targets})
- [👥 Code Duplication Groups](file:///${paths.duplication})
- [📦 Unused Code & Dependencies](file:///${paths.unused})
- [📄 Small & Pass-Through Files](file:///${paths.smallFiles})
`;
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

function generateReports(cleaned, rootPath, projectName, subDir = "") {
  const dateStr = new Date().toLocaleString();
  const baseDir = subDir ? `.docs/auditor-reports/${subDir}` : `.docs/auditor-reports`;
  const paths = {
    complexity:  cleanPath(rootPath, `${baseDir}/complexity-health-findings.md`),
    largeFiles:  cleanPath(rootPath, `${baseDir}/large-files.md`),
    highComplexity: cleanPath(rootPath, `${baseDir}/high-complexity-files.md`),
    targets:     cleanPath(rootPath, `${baseDir}/priority-refactor-targets.md`),
    duplication: cleanPath(rootPath, `${baseDir}/code-duplication.md`),
    unused:      cleanPath(rootPath, `${baseDir}/unused-code-dependencies.md`),
    smallFiles:  cleanPath(rootPath, `${baseDir}/small-files.md`),
  };

  return {
    main:        generateMainReport(cleaned, dateStr, projectName, paths),
    complexity:  generateComplexityReport(cleaned, dateStr, rootPath),
    largeFiles:  generateLargeFilesReport(cleaned, dateStr, rootPath),
    highComplexity: generateHighComplexityFilesReport(cleaned, dateStr, rootPath),
    targets:     generateTargetsReport(cleaned, dateStr, rootPath),
    duplication: generateDuplicationReport(cleaned, dateStr, rootPath),
    unused:      generateUnusedReport(cleaned, dateStr, rootPath),
    smallFiles:  generateSmallFilesReport(cleaned, dateStr, rootPath),
  };
}

module.exports = { generateReports };
