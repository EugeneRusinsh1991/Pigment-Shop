#!/usr/bin/env node

const { StaticAnalysisPipeline } = require('./pipeline');
const { PROFILES } = require('./config');

function parseProfileArg(argv) {
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i].toLowerCase();
    if (arg === 'full' || arg === '--full') return 'full';
    if (arg === 'project' || arg === '--project') return 'project';
    if (arg === 'tools' || arg === '--tools') return 'tools';

    if (arg.startsWith('--profile=')) {
      const val = arg.split('=')[1];
      if (val && PROFILES[val]) return val;
    }
    if (arg === '--profile' && i + 1 < argv.length) {
      const nextArg = argv[i + 1].toLowerCase();
      if (PROFILES[nextArg]) return nextArg;
    }
  }
  return 'full';
}

async function main() {
  const profile = parseProfileArg(process.argv);
  const profileName = PROFILES[profile] ? PROFILES[profile].name : 'Full Repository';

  console.log(`\n======================================================`);
  console.log(` 🔍 Static Analysis Pipeline — Profile: [${profile.toUpperCase()}]`);
  console.log(`    Scope: ${PROFILES[profile].targets.join(', ')}`);
  console.log(`======================================================\n`);

  console.log(`⏳ Executing analyzers (ESLint, Oxlint, Knip)...`);

  try {
    const pipeline = new StaticAnalysisPipeline(profile);
    const result = await pipeline.execute();

    console.log(`\n------------------------------------------------------`);
    console.log(` 📊 SUMMARY (${(result.totalDuration / 1000).toFixed(2)}s total)`);
    console.log(`------------------------------------------------------`);
    for (const stat of result.analyzerStats) {
      const statusIcon = stat.status === 'success' ? '✅' : '⚠️ ';
      console.log(
        `  ${statusIcon} ${stat.name.padEnd(10)} : ${String(stat.count).padStart(4)} finding(s) [${(stat.duration / 1000).toFixed(2)}s]`
      );
    }
    console.log(`------------------------------------------------------`);
    console.log(`  🎉 Total Unique Deduplicated Findings: ${result.totalUniqueFindings}`);
    console.log(`  📄 Unified Markdown Report:`);
    console.log(`     -> ${result.reportPath}`);
    console.log(`======================================================\n`);

    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Fatal Error executing Static Analysis Pipeline:\n`, err.stack || err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  parseProfileArg
};
