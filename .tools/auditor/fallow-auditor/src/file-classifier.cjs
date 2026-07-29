/**
 * auditor/file-classifier.cjs
 * Classifies source files into structural archetypes (barrel, wrapper hook,
 * helper, tiny component, small file) used by the small-file detection pass
 * in analyzer.cjs.
 */

"use strict";

const fs = require("fs");

// Archetype definitions — evaluated in priority order (first match wins).
const ARCHETYPES = [
  {
    key: "isBarrel",
    type: "Barrel Re-export",
    recommendation: "Import directly from the source files or merge models to remove this redirecting layer.",
  },
  {
    key: "isWrapper",
    type: "Pass-Through Hook",
    recommendation: "Export the hook directly from the context file and delete this wrapper file.",
  },
  {
    key: "isHelper",
    type: "Helper File",
    recommendation: "Consider merging this helper file into the main component that consumes it.",
  },
  {
    key: "isTiny",
    type: "Tiny Component",
    recommendation: "This component is very small; consider declaring it inline within its parent component.",
  },
  {
    key: "isSmall",
    type: "Tiny File",
    recommendation: "This file contains very few lines; review if it adds unnecessary system noise.",
  },
];

// ---------------------------------------------------------------------------
// Content helpers
// ---------------------------------------------------------------------------

function stripComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "").trim();
}

// ---------------------------------------------------------------------------
// Predicates
// ---------------------------------------------------------------------------

function isExportStatement(stmt) {
  const t = stmt.trim();
  return t.startsWith("export ") && t.includes(" from ");
}

function detectBarrel(clean) {
  return clean.length > 0 && clean.split(";").filter(Boolean).every(isExportStatement);
}

function detectWrapper(relPath, clean) {
  return relPath.startsWith("src/hooks/") && /return\s+use[A-Za-z]+Context\s*\(\s*\)/.test(clean);
}

function detectHelper(relPath) {
  return /Helper(s)?\.(js|jsx|ts|tsx)$/.test(relPath);
}

// Returns true when none of the "base" archetypes matched — used as a shared
// guard for detectTiny and detectSmall so they each stay at cyclomatic 1.
function isUnclassified(base) {
  return !base.isBarrel && !base.isWrapper && !base.isHelper;
}

function detectTiny(relPath, lines, base) {
  return isUnclassified(base) && relPath.startsWith("src/components/") && lines <= 25;
}

function detectSmall(relPath, lines, base) {
  const norm = relPath.replace(/\\/g, "/");
  if (norm.startsWith("app/")) return false;
  return isUnclassified(base) && !base.isTiny && lines <= 20;
}

// ---------------------------------------------------------------------------
// Flag builder
// ---------------------------------------------------------------------------

function buildFlags(relPath, lines, clean, rawContent = "") {
  const isKept = /@audit-keep|@keep/.test(rawContent);
  const base = {
    isBarrel:  detectBarrel(clean),
    isWrapper: detectWrapper(relPath, clean),
    isHelper:  detectHelper(relPath),
    isKept:    isKept
  };
  return { ...base, isTiny: detectTiny(relPath, lines, base), isSmall: detectSmall(relPath, lines, base) };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Classify a single source file.
 * @param {string} relPath       - Path relative to the project root.
 * @param {string} absPath       - Absolute filesystem path.
 * @param {number} reportedLines - Line count from the fallow score object.
 * @returns {{ type: string, recommendation: string } | null}
 */
function classifyFile(relPath, absPath, reportedLines) {
  let content;
  try { content = fs.readFileSync(absPath, "utf-8"); }
  catch { return null; }

  if (/@audit-keep|@keep/.test(content)) {
    return { isKept: true, type: "Preserved Helper", recommendation: "Kept via @audit-keep annotation." };
  }

  const lines = reportedLines || content.split("\n").length;
  const flags = buildFlags(relPath, lines, stripComments(content), content);
  const match = ARCHETYPES.find((a) => flags[a.key]);
  return match ? { type: match.type, recommendation: match.recommendation } : null;
}

module.exports = { classifyFile };
