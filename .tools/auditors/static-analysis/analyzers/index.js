const ESLintAnalyzer = require('./eslint-analyzer');
const OxlintAnalyzer = require('./oxlint-analyzer');
const KnipAnalyzer = require('./knip-analyzer');

const defaultAnalyzers = [
  new ESLintAnalyzer(),
  new OxlintAnalyzer(),
  new KnipAnalyzer()
];

const registry = new Map();

for (const analyzer of defaultAnalyzers) {
  registry.set(analyzer.id, analyzer);
}

function registerAnalyzer(analyzer) {
  if (!analyzer || !analyzer.id) {
    throw new Error('Analyzer must have an id property');
  }
  registry.set(analyzer.id, analyzer);
}

function getAnalyzers(ids = null) {
  if (!ids) {
    return Array.from(registry.values());
  }
  return ids
    .map((id) => registry.get(id))
    .filter(Boolean);
}

function getAnalyzerById(id) {
  return registry.get(id) || null;
}

module.exports = {
  registerAnalyzer,
  getAnalyzers,
  getAnalyzerById,
  defaultAnalyzers
};
