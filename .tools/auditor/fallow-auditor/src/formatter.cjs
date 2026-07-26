/**
 * auditor/formatter.cjs
 * All per-row and per-section markdown formatters for the audit reports.
 * Token-optimized, human-readable, and GitHub Flavored Markdown compliant.
 */

"use strict";

const path = require("path");
const { LARGE_FILE_LINES, MIN_CLONE_LINES, severityEmoji, effortLabel } = require("./utils.cjs");

const cleanPath = (root, ...args) => path.resolve(root, ...args).replace(/\\/g, "/");
const fmtNum    = (val, dec = 0)  => val != null ? val.toFixed(dec) : "—";
const getProp   = (obj, key, fb)  => (!obj || obj[key] === undefined) ? fb : obj[key];
const getLabel  = (sev)           => sev ? sev.charAt(0).toUpperCase() + sev.slice(1) : "—";

function buildComplexityRows(findings, rootPath) {
  const byFile = {};
  findings.forEach(f => {
    const p = getProp(f, "path", "Unknown");
    if (!byFile[p]) byFile[p] = [];
    byFile[p].push(f);
  });

  return Object.keys(byFile).map(filePath => {
    const abs = cleanPath(rootPath, filePath);
    const name = path.basename(filePath);
    let md = `#### 📁 [${name}](file:///${abs})\n`;
    md += `\`${filePath}\`\n\n`;

    byFile[filePath].forEach(f => {
      const line = getProp(f, "line", 0);
      const fnName = getProp(f, "name", "anonymous");
      const sev = getProp(f, "severity", "unknown");
      const e = severityEmoji(sev);
      const loc = line ? `[L${line}](file:///${abs}#L${line})` : "";
      md += `- ${e} **\`${fnName}\`** ${loc}\n`;
      md += `  - Lines: ${getProp(f, "line_count", "—")} | Cyclomatic: ${getProp(f, "cyclomatic", "—")} | Cognitive: ${getProp(f, "cognitive", "—")} | CRAP: ${fmtNum(f.crap)}\n`;
    });
    return md;
  }).join("\n");
}

function buildLargeFileRows(fileScores, rootPath) {
  return fileScores.map(f => {
    const pathVal = getProp(f, "path", "");
    const abs     = cleanPath(rootPath, pathVal);
    const name    = path.basename(pathVal);
    const lines   = getProp(f, "lines", 0);
    const flag    = lines >= LARGE_FILE_LINES ? "⚠️ " : "";
    const density = f.complexity_density != null ? (f.complexity_density * 100).toFixed(0) + "%" : "—";
    
    let md = `- ${flag}**[${name}](file:///${abs})** (\`${pathVal}\`)\n`;
    md += `  - Lines: ${lines || "—"} | CRAP Max: ${fmtNum(f.crap_max)} | Complex Funcs: ${getProp(f, "crap_above_threshold", 0)} | Density: ${density}`;
    return md;
  }).join("\n\n");
}

function buildTargetRows(targets, rootPath) {
  return targets.map((t, i) => {
    const pathVal = getProp(t, "path", "");
    const abs     = cleanPath(rootPath, pathVal);
    const name    = path.basename(pathVal);
    const rec     = getProp(t, "recommendation", "—");
    
    let md = `### ${i + 1}. [${name}](file:///${abs})\n`;
    md += `**Priority:** ${fmtNum(t.priority, 1)} | **Effort:** ${effortLabel(t.effort)} | **Category:** ${getProp(t, "category", "—").replace(/_/g, " ")}\n\n`;
    md += `> 💡 ${rec}\n`;
    return md;
  }).join("\n");
}

function formatInstance(inst, rootPath) {
  const file  = getProp(inst, "file", "");
  const abs   = cleanPath(rootPath, file);
  const start = getProp(inst, "start_line", 0);
  const name  = path.basename(file);
  const link  = start
    ? `[${name}:L${start}–L${inst.end_line}](file:///${abs}#L${start}-L${inst.end_line})`
    : `[${name}](file:///${abs})`;
  return `- ${link} (\`${file}\`)`;
}

function formatCloneGroup(g, idx, rootPath) {
  const fp        = g.fingerprint ? ` · \`${g.fingerprint}\`` : "";
  const sug       = getProp(g, "actions", []).find(a => a.type === "extract-shared");
  const sugLine   = sug ? `> 💡 ${sug.description}\n\n` : "";
  const instances = getProp(g, "instances", []).map(inst => formatInstance(inst, rootPath)).join("\n");
  return `### Clone Group ${idx + 1} — ${g.line_count || "?"} lines, ${g.token_count || "?"} tokens${fp}\n${sugLine}${instances}\n`;
}

function buildCloneSections(groups, rootPath) {
  return groups.map((g, idx) => formatCloneGroup(g, idx, rootPath)).join("\n");
}

function formatDeadFiles(unusedFiles, rootPath) {
  if (!unusedFiles || unusedFiles.length === 0) return "*No dead files found.*\n\n";
  return unusedFiles.map(f => {
    const abs = cleanPath(rootPath, f.path || "");
    const name = path.basename(f.path || "");
    return `- [${name}](file:///${abs}) (\`${f.path}\`)`;
  }).join("\n") + "\n\n";
}

function formatUnusedExports(unusedExports, rootPath) {
  if (!unusedExports || unusedExports.length === 0) return "*No unused exports found.*\n\n";
  const byFile = {};
  unusedExports.forEach(ue => {
    if (!byFile[ue.path]) byFile[ue.path] = [];
    byFile[ue.path].push(ue);
  });
  return Object.keys(byFile).map(filePath => {
    const abs = cleanPath(rootPath, filePath);
    const name = path.basename(filePath);
    const exportList = byFile[filePath].map(ue => {
      const loc = ue.line ? `[L${ue.line}](file:///${abs}#L${ue.line})` : "";
      return `\`${ue.export_name}\`${loc ? " (" + loc + ")" : ""}`;
    }).join(", ");
    return `- [${name}](file:///${abs}): ${exportList}`;
  }).join("\n") + "\n\n";
}

function formatUnusedDeps(unused) {
  if (!unused || unused.length === 0) return "";
  const lines = unused.map(dep => `- \`${dep.package_name}\` (declared in \`package.json\`)`).join("\n");
  return `#### Unused Dependencies\n${lines}\n\n`;
}

function formatUnlistedDeps(unlisted) {
  if (!unlisted || unlisted.length === 0) return "";
  const lines = unlisted.map(dep => {
    const sites = getProp(dep, "imported_from", []).map(s => `\`${s.path}:${s.line}\``).join(", ");
    return `- \`${dep.package_name}\` (imported at: ${sites || "—"})`;
  }).join("\n");
  return `#### Unlisted Dependencies\n${lines}\n\n`;
}

function formatCircularDeps(circular) {
  if (!circular || circular.length === 0) return "";
  const lines = circular.map(c => `- ${Array.isArray(c) ? c.join(" → ") : JSON.stringify(c)}`).join("\n");
  return `#### Circular Dependencies (⚠️ High Risk)\n${lines}\n\n`;
}

function formatDependencyIssues(unused, unlisted, circular, rootPath) {
  return formatUnusedDeps(unused) + formatUnlistedDeps(unlisted) + formatCircularDeps(circular);
}

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
