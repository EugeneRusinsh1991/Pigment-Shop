import { KnowledgeGraphStore } from '../models/KnowledgeGraphStore';

export interface KnowledgeAnalyzer {
  analyze(store: KnowledgeGraphStore): void;
}
