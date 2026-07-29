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
function runAllAudits() {
  const AUDITS_DIR = path.join(__dirname, '../../.docs/audits');
  
  // Ensure audit directories exist without wiping existing files (preserves VS Code file handles)
  if (!fs.existsSync(AUDITS_DIR)) {
    fs.mkdirSync(AUDITS_DIR, { recursive: true });
  }
  ['audits', 'catalog-inventory', 'fallow-audits', 'fallow-audits/project', 'fallow-audits/other'].forEach(sub => {
    const target = path.join(AUDITS_DIR, sub);
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
  });
  
  console.log('===================================================================');
  console.log('         RUNNING FULL SYSTEM AUDIT SUITE (.tools/auditor)          ');
  console.log('===================================================================');

  try { auditComponents(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 01:', e.message); }
  try { auditTextLiterals(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 02:', e.message); }
  try { auditStyles(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 03:', e.message); }
  try { auditTypography(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 04:', e.message); }
  try { auditServiceLayer(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 05:', e.message); }
  try { auditUnusedExports(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 06:', e.message); }
  try { auditLayerImports(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 07:', e.message); }
  try { auditMagicNumbers(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 08:', e.message); }
  try { auditA11y(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 09:', e.message); }
  try { auditPerformance(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 10:', e.message); }
  try { auditHardcodeUrl(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 11:', e.message); }
  try { auditRawI18nKeys(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 12:', e.message); }
  try { runUniversalHardcodeSearch(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error 13:', e.message); }

  console.log('-------------------------------------------------------------------');
  console.log('         RUNNING CODEBASE CATALOG GENERATOR                        ');
  console.log('-------------------------------------------------------------------');
  try { const { runCatalogGenerator } = require('./catalog-generator'); runCatalogGenerator(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error Catalog Generator:', e.message); }

  console.log('-------------------------------------------------------------------');
  console.log('         RUNNING CODEBASE FALLOW AUDITOR                           ');
  console.log('-------------------------------------------------------------------');
  try { runFallowAudit(DISABLE_DYNAMIC_AUDITS); } catch (e) { console.error('Error Fallow Auditor:', e.message); }

  console.log('===================================================================');
  console.log('All audit reports generated inside .docs/audits/ directory.');
  console.log('===================================================================');
}

if (require.main === module) {
  runAllAudits();
}

module.exports = { runAllAudits };
