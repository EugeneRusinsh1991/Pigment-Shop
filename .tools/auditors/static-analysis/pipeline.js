const { PROFILES } = require('./config');
const { getAnalyzers } = require('./analyzers');
const { deduplicateFindings } = require('./normalizer');
const { categorizeFindings } = require('./categorizer');
const { saveReports } = require('./reporters');

class StaticAnalysisPipeline {
  constructor(profile = 'full', options = {}) {
    this.profile = PROFILES[profile] ? profile : 'full';
    this.profileConfig = PROFILES[this.profile];
    this.options = options;
  }

  async execute() {
    const startTime = Date.now();
    const analyzers = getAnalyzers();

    const results = await Promise.allSettled(
      analyzers.map((analyzer) => analyzer.run(this.profile, this.profileConfig))
    );

    const analyzerStats = [];
    const rawFindings = [];

    for (let i = 0; i < results.length; i++) {
      const res = results[i];
      const fallbackName = analyzers[i] ? analyzers[i].name : `Analyzer #${i + 1}`;
      const fallbackId = analyzers[i] ? analyzers[i].id : `analyzer_${i + 1}`;

      if (res.status === 'fulfilled') {
        const value = res.value;
        analyzerStats.push({
          id: value.id || fallbackId,
          name: value.name || fallbackName,
          status: value.status,
          count: value.count || 0,
          duration: value.duration || 0,
          error: value.error,
          rawOutput: value.rawOutput
        });
        if (Array.isArray(value.findings)) {
          rawFindings.push(...value.findings);
        }
      } else {
        analyzerStats.push({
          id: fallbackId,
          name: fallbackName,
          status: 'failed',
          count: 0,
          duration: 0,
          error: res.reason ? res.reason.message : 'Analyzer execution rejected'
        });
      }
    }

    const uniqueFindings = deduplicateFindings(rawFindings);
    const categorizedFindings = categorizeFindings(uniqueFindings);
    const totalDuration = Date.now() - startTime;

    const savedPaths = saveReports({
      profile: this.profile,
      profileName: this.profileConfig.name,
      targets: this.profileConfig.targets,
      totalDuration,
      analyzerStats,
      uniqueFindings: categorizedFindings
    });

    return {
      success: true,
      profile: this.profile,
      profileName: this.profileConfig.name,
      targets: this.profileConfig.targets,
      totalDuration,
      totalRawFindings: rawFindings.length,
      totalUniqueFindings: categorizedFindings.length,
      analyzerStats,
      findings: categorizedFindings,
      reportPath: savedPaths.markdownReportPath,
      historicalReportPath: savedPaths.historicalReportPath
    };
  }
}

module.exports = {
  StaticAnalysisPipeline
};
