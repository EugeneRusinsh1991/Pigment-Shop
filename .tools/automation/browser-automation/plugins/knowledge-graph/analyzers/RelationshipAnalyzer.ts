import { KnowledgeAnalyzer } from './KnowledgeAnalyzer';
import { KnowledgeGraphStore } from '../models/KnowledgeGraphStore';
import { TypedRelationshipEdge } from '../models/types';

interface ContainerInfo {
  type: string;
  idName: string;
}

function determineContainerInfo(idStr: string): ContainerInfo {
  if (idStr.includes('nav') || idStr.includes('header')) {
    return { type: 'Navigation', idName: 'navigation-header' };
  }
  if (idStr.includes('filter')) {
    return { type: 'Filters', idName: 'filter-panel' };
  }
  if (idStr.includes('form') || idStr.includes('input')) {
    return { type: 'Form', idName: 'input-form' };
  }
  return { type: 'General', idName: 'page-content' };
}

export class RelationshipAnalyzer implements KnowledgeAnalyzer {
  private processElement(el: any, store: KnowledgeGraphStore): void {
    const pageId = el.pageId;
    const idStr = el.identity.semanticId.toLowerCase();
    const { type, idName } = determineContainerInfo(idStr);

    const container = store.upsertContainer(pageId, idName, type, 'RelationshipAnalyzer');
    store.removeRelationship(pageId, el.identity.stableId, 'CONTAINS');

    store.addRelationship({
      id: `${container.identity.stableId}-CONTAINS-${el.identity.stableId}`,
      sourceId: container.identity.stableId,
      sourceType: 'CONTAINER',
      targetId: el.identity.stableId,
      targetType: 'ELEMENT',
      relationshipType: 'CONTAINS',
      confidence: 0.8,
      createdBy: 'RelationshipAnalyzer',
      typedMetadata: {}
    } as TypedRelationshipEdge);
  }

  analyze(store: KnowledgeGraphStore): void {
    const graph = store.getGraph();
    const elements = Object.values(graph.elements);
    elements.forEach((el) => this.processElement(el, store));
  }
}
