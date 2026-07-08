/**
 * auditor/formatter.cjs
 * All per-row and per-section markdown formatters for the audit reports.
 * reporter.cjs acts as the orchestrator; all formatting logic lives here.
 */

"use strict";

const path = require("path");
const { LARGE_FILE_LINES, MIN_CLONE_LINES, severityEmoji, effortLabel } = require("./utils.cjs");

// ---------------------------------------------------------------------------
// Shared micro-helpers
// ---------------------------------------------------------------------------

const cleanPath = (root, ...args) => path.resolve(root, ...args).replace(/\\/g, "/");
const fmtNum    = (val, dec = 0)  => val != null ? val.toFixed(dec) : "—";
const getProp   = (obj, key, fb)  => (!obj || obj[key] === undefined) ? fb : obj[key];
const getLabel  = (sev)           => sev ? sev.charAt(0).toUpperCase() + sev.slice(1) : "—";

// ---------------------------------------------------------------------------
// Complexity report helpers
// ---------------------------------------------------------------------------

function formatComplexityRow(f, rootPath) {
  const pathVal = getProp(f, "path", "");
  const abs     = cleanPath(rootPath, pathVal);
  const line    = getProp(f, "line", 0);
  const loc     = line ? `[L${line}](file:///${abs}#L${line})` : "—";
  const sev     = getProp(f, "severity", "");
  return `| ${severityEmoji(sev)} ${getLabel(sev)} | \`${getProp(f, "name", "anonymous")}\` | [${path.basename(pathVal)}](file:///${abs}) | ${getProp(f, "line_count", "—")} | ${getProp(f, "cyclomatic", "—")} | ${getProp(f, "cognitive", "—")} | ${fmtNum(f.crap)} | ${loc} |`;
}

function buildComplexityRows(findings, rootPath) {
  return findings.map(f => formatComplexityRow(f, rootPath)).join("\n");
}

// ---------------------------------------------------------------------------
// Large-files report helpers
// ---------------------------------------------------------------------------

const getLineFlag     = (lines) => lines >= LARGE_FILE_LINES ? "⚠️ " : "";
const getDensityLabel = (d)     => d != null ? (d * 100).toFixed(0) + "%" : "—";

function formatLargeFileRow(f, rootPath) {
  const pathVal = getProp(f, "path", "");
  const abs     = cleanPath(rootPath, pathVal);
  const lines   = getProp(f, "lines", 0);
  return `| [${path.basename(pathVal)}](file:///${abs}) | ${getLineFlag(lines)}${lines || "—"} | ${fmtNum(f.crap_max)} | ${getProp(f, "crap_above_threshold", 0)} | ${getDensityLabel(f.complexity_density)} | ${getProp(f, "fan_in", 0)} |`;
}

function buildLargeFileRows(fileScores, rootPath) {
  return fileScores.map(f => formatLargeFileRow(f, rootPath)).join("\n\n");
}

// ---------------------------------------------------------------------------
// Priority-targets report helpers
// ---------------------------------------------------------------------------

function formatTargetRow(t, i, rootPath) {
  const pathVal = getProp(t, "path", "");
  const abs     = cleanPath(rootPath, pathVal);
  const rec     = getProp(t, "recommendation", "—").replace(/\|/g, "\\|");
  return `| ${i + 1} (${fmtNum(t.priority, 1)}) | [${path.basename(pathVal)}](file:///${abs}) | ${rec} | ${effortLabel(t.effort)} | ${getProp(t, "category", "—").replace(/_/g, " ")} |`;
}

function buildTargetRows(targets, rootPath) {
  return targets.map((t, i) => formatTargetRow(t, i, rootPath)).join("\n");
}

// ---------------------------------------------------------------------------
// Duplication report helpers
// ---------------------------------------------------------------------------

function formatInstance(inst, rootPath) {
  const file  = getProp(inst, "file", "");
  const abs   = cleanPath(rootPath, file);
  const start = getProp(inst, "start_line", 0);
  const range = start && inst.end_line ? `L${start}–L${inst.end_line}` : "";
  const name  = path.basename(file);
  const link  = start
    ? `[${name}](file:///${abs}#L${start}-L${inst.end_line})`
    : `[${name}](file:///${abs})`;
  return `- ${link} \`${range}\``;
}

function formatCloneGroup(g, idx, rootPath) {
  const fp        = g.fingerprint ? ` · \`${g.fingerprint}\`` : "";
  const sug       = getProp(g, "actions", []).find(a => a.type === "extract-shared");
  const sugLine   = sug ? `  > 💡 ${sug.description}\n` : "";
  const instances = getProp(g, "instances", []).map(inst => formatInstance(inst, rootPath)).join("\n");
  return `### Clone Group ${idx + 1} — ${g.line_count || "?"} lines, ${g.token_count || "?"} tokens${fp}\n${instances}\n${sugLine}`;
}

function buildCloneSections(groups, rootPath) {
  return groups.map((g, idx) => formatCloneGroup(g, idx, rootPath)).join("\n");
}

// ---------------------------------------------------------------------------
// Unused-code & dependency formatters
// ---------------------------------------------------------------------------

function formatDeadFiles(unusedFiles, rootPath) {
  if (!unusedFiles || unusedFiles.length === 0) return "*No dead files found.*\n\n";
  const rows = unusedFiles
    .map(f => `| [${path.basename(f.path || "")}](file:///${cleanPath(rootPath, f.path)}) | Delete or use this file |`)
    .join("\n");
  return `| File Path | Actions |\n| :--- | :--- |\n${rows}\n\n`;
}

function formatExportLine(ue, abs) {
  const loc = ue.line ? `[L${ue.line}](file:///${abs}#L${ue.line})` : "";
  return `  ↳ Unused export \`${ue.export_name}\` at ${loc}`;
}

function formatUnusedExports(unusedExports, rootPath) {
  if (!unusedExports || unusedExports.length === 0) return "*No unused exports found.*\n\n";
  const byFile = {};
  unusedExports.forEach(ue => {
    if (!byFile[ue.path]) byFile[ue.path] = [];
    byFile[ue.path].push(ue);
  });
  return Object.keys(byFile).map(filePath => {
    const abs   = cleanPath(rootPath, filePath);
    const lines = byFile[filePath].map(ue => formatExportLine(ue, abs)).join("\n");
    return `- **[${path.basename(filePath)}](file:///${abs})**:\n${lines}`;
  }).join("\n") + "\n\n";
}

function formatUnusedDeps(unused, pkgJsonRel) {
  if (!unused || unused.length === 0) return "";
  const lines = unused.map(dep => `- \`${dep.package_name}\` — [package.json](file:///${pkgJsonRel})`).join("\n");
  return `**Unused dependencies** (declared in \`package.json\` but not imported):\n\n${lines}\n\n`;
}

function formatUnlistedDeps(unlisted) {
  if (!unlisted || unlisted.length === 0) return "";
  const lines = unlisted.map(dep => {
    const sites = getProp(dep, "imported_from", []).map(s => `\`${s.path}:${s.line}\``).join(", ");
    return `- \`${dep.package_name}\` — imported at: ${sites || "—"}`;
  }).join("\n");
  return `**Unlisted dependencies** (imported but not declared in \`package.json\`):\n\n${lines}\n\n`;
}

function formatCircularDeps(circular) {
  if (!circular || circular.length === 0) return "";
  const lines = circular.map(c => `- ${Array.isArray(c) ? c.join(" → ") : JSON.stringify(c)}`).join("\n");
  return `**Circular dependencies** (⚠️ high risk — can cause runtime issues):\n\n${lines}\n\n`;
}

function formatDependencyIssues(unused, unlisted, circular, rootPath) {
  const pkgJsonRel = cleanPath(rootPath, "package.json");
  return formatUnusedDeps(unused, pkgJsonRel) + formatUnlistedDeps(unlisted) + formatCircularDeps(circular);
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
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
};
