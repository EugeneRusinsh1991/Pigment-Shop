/**
 * run-audit.cjs
 *
 * Core codebase auditor that runs static analysis via fallow,
 * filters raw results to keep only high/critical severity items, duplicates,
 * and unused code/dependencies, and generates clean human-readable reports.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const {
  runStaticAnalysis,
  readRawData,
  filterData,
  saveCleanedJSON,
  printSummary
} = require("./src/analyzer.cjs");
const { generateReports } = require("./src/reporter.cjs");

const ROOT = path.resolve(__dirname, "../../..");
const REPORTS_DIR = path.resolve(ROOT, ".docs/audits/fallow-audits");
const RAW_JSON = path.resolve(REPORTS_DIR, "fallow-raw.json");

// Resolve project name dynamically
function getProjectName(rootPath) {
  let projectName = "Codebase";
  try {
    const pkgPath = path.resolve(rootPath, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.name) {
        projectName = pkg.name
          .split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    } else {
      projectName = getFallbackName(rootPath);
    }
  } catch (e) {
    projectName = getFallbackName(rootPath);
  }
  return projectName;
}

function getFallbackName(rootPath) {
  const folderName = path.basename(rootPath);
  return folderName
    .replace(/^_+/, "")
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function writeReportFile(reportPath, content) {
  try {
    const dir = path.dirname(reportPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(reportPath, content, "utf-8");
    console.log(`Report generated successfully: ${reportPath}`);
  } catch (err) {
    console.error(`Error: Failed to write report file (${reportPath}):`, err.message);
    process.exit(1);
  }
}

function cleanupAuditArtifacts(rawJsonPath) {
  try {
    if (fs.existsSync(rawJsonPath)) {
      fs.unlinkSync(rawJsonPath);
    }
  } catch (err) {
    console.warn(`Warning: Unable to fully clean audit artifacts: ${err.message}`);
  }
}

function hasReportFindings(type, data) {
  const h = data.health || {};
  const c = data.check || {};
  const d = data.dupes || {};

  switch (type) {
    case "complexity":
      return (h.findings || []).length > 0;
    case "largeFiles":
      return (h.file_scores || []).some(f => (f.lines || 0) >= 500);
    case "highComplexity":
      return (h.file_scores || []).some(f => (f.lines || 0) < 500 && (f.crap_max || 0) >= 50);
    case "targets":
      return (h.targets || []).length > 0;
    case "duplication":
      return (d.clone_groups || []).length > 0;
    case "deadFiles":
      return (c.unused_files || []).length > 0;
    case "unusedExports":
      return (c.unused_exports || []).length > 0;
    case "dependencyIssues":
      return (
        (c.unused_dependencies || []).length > 0 ||
        (c.unlisted_dependencies || []).length > 0 ||
        (c.circular_dependencies || []).length > 0
      );
    case "smallFiles":
      return (h.small_files || []).filter(f => !f.isKept).length > 0;
    case "auditKept":
      return (h.small_files || []).filter(f => f.isKept).length > 0;
    default:
      return false;
  }
}

function writeAllReports(reports, subDir, data) {
  const base = subDir ? path.resolve(REPORTS_DIR, subDir) : REPORTS_DIR;
  
  // Clean up obsolete/main report files if present
  const obsoleteFiles = [
    path.resolve(base, "Codebase-Audit-Report.md"),
    path.resolve(base, "unused-code-dependencies.md"),
    path.resolve(base, "priority-refactor-targets.md")
  ];
  obsoleteFiles.forEach(f => {
    if (fs.existsSync(f)) {
      try { fs.unlinkSync(f); } catch (_) {}
    }
  });

  const reportMap = [
    ["complexity", path.resolve(base, "complexity-health-findings.md"), reports.complexity],
    ["largeFiles", path.resolve(base, "large-files.md"), reports.largeFiles],
    ["highComplexity", path.resolve(base, "high-complexity-files.md"), reports.highComplexity],
    ["duplication", path.resolve(base, "code-duplication.md"), reports.duplication],
    ["deadFiles", path.resolve(base, "dead-files.md"), reports.deadFiles],
    ["unusedExports", path.resolve(base, "unused-exports.md"), reports.unusedExports],
    ["dependencyIssues", path.resolve(base, "dependency-issues.md"), reports.dependencyIssues],
    ["smallFiles", path.resolve(base, "small-files.md"), reports.smallFiles],
    ["auditKept", path.resolve(base, "audit-kept-inventory.md"), reports.auditKept],
  ];

  reportMap.forEach(([key, reportPath, content]) => {
    if (hasReportFindings(key, data)) {
      if (content) writeReportFile(reportPath, content);
    } else {
      if (fs.existsSync(reportPath)) {
        try { fs.unlinkSync(reportPath); } catch (_) {}
      }
    }
  });
}

const PROJECT_PATH_PREFIXES = ['src/', 'app/', 'media/'];
const PROJECT_EXACT_FILES = ['package.json', 'app.json', 'app.config.js', 'metro.config.js', 'tsconfig.json'];

function isProjectPath(p) {
  if (!p) return false;
  const n = p.replace(/\\/g, "/");
  return PROJECT_PATH_PREFIXES.some((prefix) => n.startsWith(prefix)) || PROJECT_EXACT_FILES.includes(n);
}

function isOtherPath(p) {
  if (!p) return false;
  return !isProjectPath(p);
}

function splitFindingsArray(arr) {
  const project = [], other = [];
  (arr || []).forEach(item => {
    const p = item.path || item.file || "";
    if (isOtherPath(p)) other.push(item);
    else project.push(item);
  });
  return { project, other };
}

function splitCloneGroups(cloneGroups) {
  const proj = [], other = [];
  (cloneGroups || []).forEach(g => {
    const p = g.instances?.[0]?.file || "";
    if (isOtherPath(p)) other.push(g);
    else proj.push(g);
  });
  return { proj, other };
}

function splitCircularDeps(circularDependencies) {
  const proj = [], other = [];
  (circularDependencies || []).forEach(circ => {
    const p = Array.isArray(circ) ? (circ[0] || "") : "";
    if (isOtherPath(p)) other.push(circ);
    else proj.push(circ);
  });
  return { proj, other };
}

function splitData(cleaned) {
  const h = cleaned.health || {};
  const c = cleaned.check || {};
  const d = cleaned.dupes || {};

  const findings = splitFindingsArray(h.findings);
  const file_scores = splitFindingsArray(h.file_scores);
  const targets = splitFindingsArray(h.targets);
  const small_files = splitFindingsArray(h.small_files);
  const { proj: clone_groups_proj, other: clone_groups_other } = splitCloneGroups(d.clone_groups);
  const unused_files = splitFindingsArray(c.unused_files);
  const unused_exports = splitFindingsArray(c.unused_exports);
  const { proj: circ_proj, other: circ_other } = splitCircularDeps(c.circular_dependencies);

  return {
    project: {
      health: { findings: findings.project, file_scores: file_scores.project, targets: targets.project, small_files: small_files.project },
      dupes: { clone_groups: clone_groups_proj },
      check: { unused_files: unused_files.project, unused_exports: unused_exports.project, unused_dependencies: c.unused_dependencies || [], unlisted_dependencies: c.unlisted_dependencies || [], circular_dependencies: circ_proj }
    },
    other: {
      health: { findings: findings.other, file_scores: file_scores.other, targets: targets.other, small_files: small_files.other },
      dupes: { clone_groups: clone_groups_other },
      check: { unused_files: unused_files.other, unused_exports: unused_exports.other, unused_dependencies: [], unlisted_dependencies: [], circular_dependencies: circ_other }
    }
  };
}

function main(disableDynamicAudits = false) {
  const projectName = getProjectName(ROOT);

  console.log("=========================================");
  console.log(`  ${projectName} Codebase Auditor       `);
  console.log("=========================================");

  if (disableDynamicAudits) {
    console.log('[Fallow Auditor] Skipped (dynamic audits disabled)');
    return;
  }

  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  runStaticAnalysis(ROOT, RAW_JSON);
  const rawData = readRawData(RAW_JSON);
  const cleanedJSON = filterData(rawData, ROOT);
  saveCleanedJSON(cleanedJSON, RAW_JSON);

  const { project, other } = splitData(cleanedJSON);

  const projReports = generateReports(project, ROOT, projectName + " (Project)", "project");
  writeAllReports(projReports, "project", project);

  const otherReports = generateReports(other, ROOT, projectName + " (Other/Tools)", "other");
  writeAllReports(otherReports, "other", other);

  printSummary(cleanedJSON);
  cleanupAuditArtifacts(RAW_JSON);
}

if (require.main === module) {
  main();
}

module.exports = { runFallowAudit: main, main };

