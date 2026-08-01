const path = require('path');
const crypto = require('crypto');
const { ROOT_DIR } = require('./config');

function normalizePath(filePath, rootDir = ROOT_DIR) {
  if (!filePath) return 'unknown';
  let relativePath = path.isAbsolute(filePath)
    ? path.relative(rootDir, filePath)
    : filePath;
  relativePath = relativePath.replace(/\\/g, '/');
  if (relativePath.startsWith('./')) {
    relativePath = relativePath.slice(2);
  }
  return relativePath;
}

function generateFindingId(filePath, line, ruleId, message) {
  const normPath = normalizePath(filePath);
  const cleanRule = (ruleId || 'general').replace(/^eslint\(|\)$/g, '');
  const raw = `${normPath}:${line}:${cleanRule}:${message.slice(0, 40)}`;
  return crypto.createHash('md5').update(raw).digest('hex').slice(0, 12);
}

function createNormalizedFinding({
  filePath,
  line = 1,
  column = 1,
  severity = 'warning',
  message = '',
  ruleId = 'general',
  category = null,
  detectedBy = []
}) {
  const normPath = normalizePath(filePath);
  const cleanRule = (ruleId || 'general').replace(/^eslint\(|\)$/g, '');
  return {
    id: generateFindingId(normPath, line, cleanRule, message),
    filePath: normPath,
    line: Number(line) || 1,
    column: Number(column) || 1,
    severity: ['error', 'warning', 'info'].includes(severity) ? severity : 'warning',
    message: String(message).trim(),
    ruleId: cleanRule,
    category,
    detectedBy: Array.isArray(detectedBy) ? detectedBy : [String(detectedBy)]
  };
}

function areRulesSimilar(ruleA = '', ruleB = '') {
  const cleanA = ruleA.replace(/^eslint\(|\)$/g, '').toLowerCase();
  const cleanB = ruleB.replace(/^eslint\(|\)$/g, '').toLowerCase();
  if (cleanA === cleanB) return true;
  if (cleanA && cleanB && (cleanA.includes(cleanB) || cleanB.includes(cleanA))) return true;
  return false;
}

function deduplicateFindings(findings) {
  const uniqueList = [];
  const indexMap = new Map();

  for (const finding of findings) {
    const key = `${finding.filePath}:${finding.line}:${finding.ruleId}`;
    const existingIndex = indexMap.get(key);

    if (existingIndex !== undefined) {
      const existing = uniqueList[existingIndex];
      const mergedDetectedBy = Array.from(
        new Set([...existing.detectedBy, ...finding.detectedBy])
      ).sort();

      const severities = ['error', 'warning', 'info'];
      const topSeverity =
        severities.indexOf(existing.severity) <= severities.indexOf(finding.severity)
          ? existing.severity
          : finding.severity;

      uniqueList[existingIndex] = {
        ...existing,
        severity: topSeverity,
        detectedBy: mergedDetectedBy
      };
    } else {
      let matchedIndex = -1;
      for (let i = 0; i < uniqueList.length; i++) {
        const candidate = uniqueList[i];
        if (
          candidate.filePath === finding.filePath &&
          candidate.line === finding.line &&
          (areRulesSimilar(candidate.ruleId, finding.ruleId) ||
            candidate.message.slice(0, 25) === finding.message.slice(0, 25))
        ) {
          matchedIndex = i;
          break;
        }
      }

      if (matchedIndex >= 0) {
        const existing = uniqueList[matchedIndex];
        const mergedDetectedBy = Array.from(
          new Set([...existing.detectedBy, ...finding.detectedBy])
        ).sort();
        uniqueList[matchedIndex] = {
          ...existing,
          detectedBy: mergedDetectedBy
        };
      } else {
        uniqueList.push(finding);
        indexMap.set(key, uniqueList.length - 1);
      }
    }
  }

  return uniqueList.sort((a, b) => {
    if (a.filePath !== b.filePath) return a.filePath.localeCompare(b.filePath);
    if (a.line !== b.line) return a.line - b.line;
    return a.column - b.column;
  });
}

module.exports = {
  normalizePath,
  generateFindingId,
  createNormalizedFinding,
  deduplicateFindings
};
