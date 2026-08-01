const BaseAnalyzer = require('./base-analyzer');
const { createNormalizedFinding } = require('../normalizer');

class ESLintAnalyzer extends BaseAnalyzer {
  constructor() {
    super({
      id: 'eslint',
      name: 'ESLint',
      description: 'Standard JavaScript/React linter for syntax, quality, and best practices'
    });
  }

  getCommand(profile, profileConfig) {
    const targets = profileConfig.targets.join(' ');
    return `npx eslint --format=json --no-error-on-unmatched-pattern ${targets}`;
  }

  normalize(rawOutput) {
    if (!rawOutput || !rawOutput.trim()) return [];
    let parsed = [];
    try {
      parsed = JSON.parse(rawOutput);
    } catch (e) {
      const jsonStart = rawOutput.indexOf('[');
      const jsonEnd = rawOutput.lastIndexOf(']') + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        parsed = JSON.parse(rawOutput.slice(jsonStart, jsonEnd));
      } else {
        throw e;
      }
    }

    const findings = [];
    if (!Array.isArray(parsed)) return [];

    for (const fileResult of parsed) {
      const { filePath, messages = [] } = fileResult;
      for (const msg of messages) {
        const severity = msg.severity === 2 ? 'error' : msg.severity === 1 ? 'warning' : 'info';
        findings.push(
          createNormalizedFinding({
            filePath,
            line: msg.line || 1,
            column: msg.column || 1,
            severity,
            message: msg.message || 'Lint issue',
            ruleId: msg.ruleId || 'eslint/general',
            detectedBy: [this.name]
          })
        );
      }
    }

    return findings;
  }
}

module.exports = ESLintAnalyzer;
