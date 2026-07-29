import { ApplicationKnowledgeGraph } from '../models/types';

export class JSONExporter {
  public static export(graph: ApplicationKnowledgeGraph): string {
    return JSON.stringify(graph, null, 2);
  }
}
