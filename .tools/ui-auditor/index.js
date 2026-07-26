const path = require('path');
const { auditComponents } = require('./ui-architecture-audit');
const { auditTextLiterals } = require('./hardcode-text-auditor');
const { auditStyles } = require('./hardcode-styles-auditor');
const { auditTypography } = require('./typography-auditor');
const { auditServiceLayer } = require('./service-layer-auditor');

/**
 * Main Audit Suite Runner
 * Executes all domain auditors and generates individual report logs inside .docs/audits/
 */
function runAllAudits() {
  console.log('===================================================================');
  console.log('         RUNNING FULL SYSTEM AUDIT SUITE (.tools/ui-auditor)       ');
  console.log('===================================================================');

  try { auditComponents(); } catch (e) { console.error('Error 01:', e.message); }
  try { auditTextLiterals(); } catch (e) { console.error('Error 02:', e.message); }
  try { auditStyles(); } catch (e) { console.error('Error 03:', e.message); }
  try { auditTypography(); } catch (e) { console.error('Error 04:', e.message); }
  try { auditServiceLayer(); } catch (e) { console.error('Error 05:', e.message); }

  console.log('===================================================================');
  console.log('All audit reports generated inside .docs/audits/ directory.');
  console.log('===================================================================');
}

if (require.main === module) {
  runAllAudits();
}

module.exports = { runAllAudits };
