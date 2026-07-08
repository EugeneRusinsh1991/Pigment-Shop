/**
 * auditor/analyzer.cjs
 * Handles running Fallow static analysis, parsing raw data, filtering
 * high-severity findings, and saving the results.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { LARGE_FILE_LINES, MIN_CLONE_LINES } = require("./utils.cjs");
const { classifyFile } = require("./file-classifier.cjs");

// ---------------------------------------------------------------------------
// Static analysis runner
// ---------------------------------------------------------------------------

function runStaticAnalysis(rootPath, rawJsonPath) {
  console.log("Running static analysis via fallow...");
  try {
    execSync(
      `npx --yes fallow --format json --quiet --output-file "${rawJsonPath}"`,
      { cwd: rootPath, stdio: ["ignore", "ignore", "pipe"] }
    );
  } catch (err) {
    if (!fs.existsSync(rawJsonPath)) {
      console.error("Error: fallow failed to execute or produce any output.");
      console.error(err.stderr ? err.stderr.toString() : String(err));
      process.exit(1);
    }
  }
}

// ---------------------------------------------------------------------------
// Data I/O
// ---------------------------------------------------------------------------

function readRawData(rawJsonPath) {
  try {
    return JSON.parse(fs.readFileSync(rawJsonPath, "utf-8"));
  } catch (err) {
    console.error("Error: Failed to parse fallow JSON output:", err.message);
    process.exit(1);
  }
}

function saveCleanedJSON(cleanedJSON, rawJsonPath) {
  try {
    fs.writeFileSync(rawJsonPath, JSON.stringify(cleanedJSON, null, 2), "utf-8");
    console.log(`Filtered JSON saved to: ${rawJsonPath}`);
  } catch (err) {
    console.error("Error: Failed to write filtered JSON output:", err.message);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Sorting helpers
// ---------------------------------------------------------------------------

function getProp(obj, key, fallback) {
  if (!obj) return fallback;
  const val = obj[key];
  return val === undefined ? fallback : val;
}

const sortDescByCrap     = (a, b) => getProp(b, "crap", 0)      - getProp(a, "crap", 0);
const sortDescByCrapMax  = (a, b) => getProp(b, "crap_max", 0)  - getProp(a, "crap_max", 0);
const sortDescByLineCount= (a, b) => getProp(b, "line_count", 0)- getProp(a, "line_count", 0);

// ---------------------------------------------------------------------------
// Filter predicates
// ---------------------------------------------------------------------------

function isCriticalOrHigh(finding) {
  const severity = getProp(finding, "severity", "").toLowerCase();
  return severity === "critical" || severity === "high";
}

function isHighRiskFile(score) {
  return (
    getProp(score, "lines", 0) >= LARGE_FILE_LINES ||
    getProp(score, "crap_max", 0) >= 100 ||
    getProp(score, "crap_above_threshold", 0) >= 2
  );
}

function isSignificantClone(group) {
  return getProp(group, "line_count", 0) >= MIN_CLONE_LINES;
}

// ---------------------------------------------------------------------------
// Filter entry-points
// ---------------------------------------------------------------------------

const filterFindings   = (findings)    => findings.filter(isCriticalOrHigh).sort(sortDescByCrap);
const filterFileScores = (fileScores)  => fileScores.filter(isHighRiskFile).sort(sortDescByCrapMax);
const filterCloneGroups= (cloneGroups) => cloneGroups.filter(isSignificantClone).sort(sortDescByLineCount);

// ---------------------------------------------------------------------------
// Small-file detection (delegates classification to file-classifier.cjs)
// ---------------------------------------------------------------------------

/**
 * Processes a single file-score entry.
 * Returns a candidate object if the file qualifies, or null otherwise.
 */
function processScore(score, rootPath) {
  const relPath = score.path;
  if (!relPath.startsWith("src/")) return null;
  if (relPath.includes("src/components/ui/")) return null;

  const absPath = path.resolve(rootPath, relPath);
  if (!fs.existsSync(absPath)) return null;

  const classification = classifyFile(relPath, absPath, score.lines);
  if (!classification) return null;

  return { path: relPath, lines: score.lines || 0, size: fs.statSync(absPath).size, ...classification };
}

function detectSmallFiles(fileScores, rootPath) {
  return fileScores
    .map((score) => processScore(score, rootPath))
    .filter(Boolean)
    .sort((a, b) => a.lines - b.lines);
}

// ---------------------------------------------------------------------------
// Main data filter
// ---------------------------------------------------------------------------

function filterData(rawData, rootPath) {
  const health = getProp(rawData, "health", {});
  const dupes  = getProp(rawData, "dupes",  {});
  const check  = getProp(rawData, "check",  {});
  const rawFileScores = getProp(health, "file_scores", []);

  return {
    health: {
      findings:    filterFindings(getProp(health, "findings", [])),
      file_scores: filterFileScores(rawFileScores),
      targets:     getProp(health, "targets", []).slice(0, 10),
      small_files: detectSmallFiles(rawFileScores, rootPath || "."),
    },
    dupes: {
      clone_groups: filterCloneGroups(getProp(dupes, "clone_groups", [])),
    },
    check: {
      unused_files:            getProp(check, "unused_files", []),
      unused_exports:          getProp(check, "unused_exports", []),
      unused_dependencies:     getProp(check, "unused_dependencies", []),
      unlisted_dependencies:   getProp(check, "unlisted_dependencies", []),
      circular_dependencies:   getProp(check, "circular_dependencies", []),
    },
  };
}

// ---------------------------------------------------------------------------
// Console summary
// ---------------------------------------------------------------------------

function printSummary(cleaned) {
  const h = cleaned.health;
  const c = cleaned.check;
  console.log("");
  console.log("fallow Analysis complete.");
  console.log(`  🔴 Critical health findings:  ${h.findings.filter(f => f.severity === "critical").length}`);
  console.log(`  🟠 High health findings:      ${h.findings.filter(f => f.severity === "high").length}`);
  console.log(`  📋 Large/high-risk files:     ${h.file_scores.length}`);
  console.log(`  🎯 Priority targets:          ${h.targets.length}`);
  console.log(`  👥 Significant clone groups:  ${cleaned.dupes.clone_groups.length}`);
  console.log(`  💀 Dead Files (Unused):       ${c.unused_files.length}`);
  console.log(`  📦 Unused Exports:            ${c.unused_exports.length}`);
  console.log(`  📦 Unused Deps:               ${c.unused_dependencies.length}`);
  console.log(`  📦 Unlisted Deps:             ${c.unlisted_dependencies.length}`);
  console.log(`  ⚠️ Circular Deps:             ${c.circular_dependencies.length}`);
  console.log(`  📄 Small/Pass-Through Files:  ${h.small_files ? h.small_files.length : 0}`);
  console.log("=========================================");
}

module.exports = {
  runStaticAnalysis,
  readRawData,
  filterData,
  saveCleanedJSON,
  printSummary,
};
