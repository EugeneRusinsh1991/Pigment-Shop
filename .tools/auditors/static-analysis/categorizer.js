const { CATEGORIES } = require('./config');

function categorizeFinding(finding) {
  const ruleId = (finding.ruleId || '').toLowerCase();
  const msg = (finding.message || '').toLowerCase();

  if (
    ruleId.startsWith('knip/') ||
    ruleId.includes('unused') ||
    ruleId.includes('unreachable') ||
    msg.includes('is defined but never used') ||
    msg.includes('unused') ||
    msg.includes('never used')
  ) {
    return CATEGORIES.UNUSED_CODE;
  }

  if (
    ruleId.includes('security') ||
    ruleId.includes('type') ||
    ruleId.includes('eval') ||
    ruleId.includes('unsafe') ||
    msg.includes('type ') ||
    msg.includes('security')
  ) {
    return CATEGORIES.TYPE_SECURITY;
  }

  if (
    ruleId.startsWith('import/') ||
    ruleId.startsWith('react/') ||
    ruleId.startsWith('react-hooks/') ||
    ruleId.startsWith('jsx-a11y/') ||
    ruleId.includes('syntax')
  ) {
    return CATEGORIES.SYNTAX_BEST_PRACTICES;
  }

  if (
    ruleId.startsWith('no-') ||
    ruleId.startsWith('prefer-') ||
    ruleId.includes('eqeqeq') ||
    ruleId.includes('complexity') ||
    ruleId.includes('eslint') ||
    ruleId.includes('oxlint')
  ) {
    return CATEGORIES.CODE_QUALITY;
  }

  return CATEGORIES.OTHER;
}

function categorizeFindings(findings) {
  return findings.map((f) => ({
    ...f,
    category: f.category || categorizeFinding(f)
  }));
}

module.exports = {
  categorizeFinding,
  categorizeFindings
};
