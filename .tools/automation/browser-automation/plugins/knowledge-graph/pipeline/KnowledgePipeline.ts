import { KnowledgeAnalyzer } from '../analyzers/KnowledgeAnalyzer';
import { KnowledgeGraphStore } from '../models/KnowledgeGraphStore';

export class KnowledgePipeline {
  private analyzers: KnowledgeAnalyzer[] = [];

  public registerAnalyzer(analyzer: KnowledgeAnalyzer) {
    this.analyzers.push(analyzer);
  }

  public run(store: KnowledgeGraphStore) {
    for (const analyzer of this.analyzers) {
      analyzer.analyze(store);
    }
  }
}
