import { KnowledgeAnalyzer } from './KnowledgeAnalyzer';
import { KnowledgeGraphStore } from '../models/KnowledgeGraphStore';

export class AnalyzerOrchestrator {
  private analyzers: KnowledgeAnalyzer[] = [];

  public register(analyzer: KnowledgeAnalyzer) {
    this.analyzers.push(analyzer);
  }

  public run(store: KnowledgeGraphStore) {
    for (const analyzer of this.analyzers) {
      analyzer.analyze(store);
    }
  }
}
