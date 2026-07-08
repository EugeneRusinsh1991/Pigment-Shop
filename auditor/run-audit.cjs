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

const ROOT = path.resolve(__dirname, "..");
const RAW_JSON = path.resolve(__dirname, "reports", "fallow-raw.json");

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

function writeReportFile(reportPath, md) {
  try {
    fs.writeFileSync(reportPath, md, "utf-8");
    console.log(`Report generated successfully: ${reportPath}`);
  } catch (err) {
    console.error(`Error: Failed to write report file (${reportPath}):`, err.message);
    process.exit(1);
  }
}

function main() {
  const projectName = getProjectName(ROOT);

  console.log("=========================================");
  console.log(`  ${projectName} Codebase Auditor       `);
  console.log("=========================================");

  // Ensure the reports directory exists before running analysis
  const reportsDir = path.resolve(__dirname, "reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  runStaticAnalysis(ROOT, RAW_JSON);
  const rawData = readRawData(RAW_JSON);
  const cleanedJSON = filterData(rawData, ROOT);
  saveCleanedJSON(cleanedJSON, RAW_JSON);

  const reports = generateReports(cleanedJSON, ROOT, projectName);

  writeReportFile(path.resolve(__dirname, "reports", "auditreport.md"), reports.main);
  writeReportFile(path.resolve(__dirname, "reports", "complexity-health-findings.md"), reports.complexity);
  writeReportFile(path.resolve(__dirname, "reports", "large-files.md"), reports.largeFiles);
  writeReportFile(path.resolve(__dirname, "reports", "priority-refactor-targets.md"), reports.targets);
  writeReportFile(path.resolve(__dirname, "reports", "code-duplication.md"), reports.duplication);
  writeReportFile(path.resolve(__dirname, "reports", "unused-code-dependencies.md"), reports.unused);
  writeReportFile(path.resolve(__dirname, "reports", "small-files.md"), reports.smallFiles);

  printSummary(cleanedJSON);
}

main();
