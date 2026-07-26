const path = require('path');
const { auditComponents } = require('./ui-architecture-audit');
const { auditTextLiterals } = require('./hardcode-text-auditor');
const { auditStyles } = require('./hardcode-styles-auditor');
const { auditTypography } = require('./typography-auditor');
const { auditServiceLayer } = require('./service-layer-auditor');
const { auditUnusedExports } = require('./unused-exports-auditor');
const { auditLayerImports } = require('./layer-imports-auditor');
const { auditMagicNumbers } = require('./magic-numbers-auditor');
const { runFallowAudit } = require('./fallow-auditor/run-audit.cjs');

/**
 * Main Audit Suite Runner
 * Executes all domain auditors and generates individual report logs inside .docs/audits/
 */
function runAllAudits() {
  console.log('===================================================================');
  console.log('         RUNNING FULL SYSTEM AUDIT SUITE (.tools/auditor)          ');
  console.log('===================================================================');

  try { auditComponents(); } catch (e) { console.error('Error 01:', e.message); }
  try { auditTextLiterals(); } catch (e) { console.error('Error 02:', e.message); }
  try { auditStyles(); } catch (e) { console.error('Error 03:', e.message); }
  try { auditTypography(); } catch (e) { console.error('Error 04:', e.message); }
  try { auditServiceLayer(); } catch (e) { console.error('Error 05:', e.message); }
  try { auditUnusedExports(); } catch (e) { console.error('Error 06:', e.message); }
  try { auditLayerImports(); } catch (e) { console.error('Error 07:', e.message); }
  try { auditMagicNumbers(); } catch (e) { console.error('Error 08:', e.message); }

  console.log('-------------------------------------------------------------------');
  console.log('         RUNNING CODEBASE CATALOG GENERATOR                        ');
  console.log('-------------------------------------------------------------------');
  try { const { runCatalogGenerator } = require('./catalog-generator'); runCatalogGenerator(); } catch (e) { console.error('Error Catalog Generator:', e.message); }

  console.log('-------------------------------------------------------------------');
  console.log('         RUNNING CODEBASE FALLOW AUDITOR                           ');
  console.log('-------------------------------------------------------------------');
  try { runFallowAudit(); } catch (e) { console.error('Error Fallow Auditor:', e.message); }

  console.log('===================================================================');
  console.log('All audit reports generated inside .docs/audits/ directory.');
  console.log('===================================================================');
}

if (require.main === module) {
  runAllAudits();
}

module.exports = { runAllAudits };
