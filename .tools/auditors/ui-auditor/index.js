const path = require('path');
const fs = require('fs');
const { auditComponents } = require('./ui-architecture-audit');
const { auditTextLiterals } = require('./hardcode-text-auditor');
const { auditStyles } = require('./hardcode-styles-auditor');
const { auditTypography } = require('./typography-auditor');
const { auditServiceLayer } = require('./service-layer-auditor');
const { auditUnusedExports } = require('./unused-exports-auditor');
const { auditLayerImports } = require('./layer-imports-auditor');
const { auditMagicNumbers } = require('./magic-numbers-auditor');
const { auditA11y } = require('./a11y-auditor');
const { auditPerformance } = require('./performance-auditor');
const { auditHardcodeUrl } = require('./hardcode-url-auditor');
const { auditRawI18nKeys } = require('./12-raw-i18n-keys-auditor');
const { runUniversalHardcodeSearch } = require('./universal-hardcode-searcher');
const { runFallowAudit } = require('./fallow-auditor/run-audit.cjs');

// Disable dynamic audit report generation
const DISABLE_DYNAMIC_AUDITS = false;

/**
 * Main Audit Suite Runner
 * Executes all domain auditors and generates individual report logs inside .docs/audits/
 */
function ensureAuditDirs(auditsDir) {
  if (!fs.existsSync(auditsDir)) {
    fs.mkdirSync(auditsDir, { recursive: true });
  }
  ['audits', 'catalog-inventory', 'fallow-audits', 'fallow-audits/project', 'fallow-audits/other'].forEach(sub => {
    const target = path.join(auditsDir, sub);
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
  });
}

function runAuditorSafe(fn, id) {
  try {
    fn(DISABLE_DYNAMIC_AUDITS);
  } catch (e) {
    console.error(`Error ${id}:`, e.message);
  }
}

function runAllAudits() {
  const AUDITS_DIR = path.join(__dirname, '../../.audits');
  ensureAuditDirs(AUDITS_DIR);
  
  console.log('===================================================================');
  console.log('         RUNNING FULL SYSTEM AUDIT SUITE (.tools/auditor)          ');
  console.log('===================================================================');

  const domainAuditors = [
    [auditComponents, '01'], [auditTextLiterals, '02'], [auditStyles, '03'],
    [auditTypography, '04'], [auditServiceLayer, '05'], [auditUnusedExports, '06'],
    [auditLayerImports, '07'], [auditMagicNumbers, '08'], [auditA11y, '09'],
    [auditPerformance, '10'], [auditHardcodeUrl, '11'], [auditRawI18nKeys, '12'],
    [runUniversalHardcodeSearch, '13']
  ];

  domainAuditors.forEach(([auditor, id]) => runAuditorSafe(auditor, id));

  // Catalog Generator temporarily disabled
  // const { runCatalogGenerator } = require('./catalog-generator');
  // runAuditorSafe(runCatalogGenerator, 'Catalog Generator');

  console.log('-------------------------------------------------------------------');
  console.log('         RUNNING CODEBASE FALLOW AUDITOR                           ');
  console.log('-------------------------------------------------------------------');
  runAuditorSafe(runFallowAudit, 'Fallow Auditor');

  console.log('===================================================================');
  console.log('All audit reports generated inside .audits/ directory.');
  console.log('===================================================================');
}

if (require.main === module) {
  runAllAudits();
}

module.exports = { runAllAudits };
