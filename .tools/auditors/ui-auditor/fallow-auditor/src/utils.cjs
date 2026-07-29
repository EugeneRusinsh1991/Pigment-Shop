/**
 * auditor/utils.cjs
 * Constants and basic formatting helpers for the codebase auditor.
 */

"use strict";

const LARGE_FILE_LINES = 200;
const MIN_CLONE_LINES = 8;

const EMOJIS = {
  critical: "🔴",
  high:     "🟠",
  moderate: "🟡",
};

function severityEmoji(severity) {
  const val = EMOJIS[(severity || "").toLowerCase()];
  return val === undefined ? "🟢" : val;
}

const EFFORTS = {
  high:   "高度 (High)",
  medium: "中度 (Medium)",
  low:    "低度 (Low)",
};

function effortLabel(effort) {
  const val = EFFORTS[(effort || "").toLowerCase()];
  if (val !== undefined) return val;
  return effort ? effort : "—";
}

module.exports = {
  LARGE_FILE_LINES,
  MIN_CLONE_LINES,
  severityEmoji,
  effortLabel
};
