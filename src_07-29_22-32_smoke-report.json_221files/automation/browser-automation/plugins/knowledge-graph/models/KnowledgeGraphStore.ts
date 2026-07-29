import { ApplicationKnowledgeGraph, SemanticPageNode, SemanticElementNode, UIContainerNode, TypedRelationshipEdge, CapabilityNode, UIStateNode } from './types';
import { generateStableId, createInitialGraph, createPageNode, createElementNode } from './graphFactories';

export class KnowledgeGraphStore {
  private graph: ApplicationKnowledgeGraph;

  constructor(baseUrl: string) {
    this.graph = createInitialGraph(baseUrl);
  }

  public getGraph(): ApplicationKnowledgeGraph {
    return this.graph;
  }

  public upsertPage(url: string, normalizedRoute: string, depth: number): SemanticPageNode {
    const semanticId = normalizedRoute || url;
    const stableId = generateStableId('page', semanticId);
    
    if (!this.graph.pages[stableId]) {
      this.graph.pages[stableId] = createPageNode(url, normalizedRoute, depth);
      this.upsertState(stableId, 'Default', 'Base UI state without interactions', true);
    }
    
    const page = this.graph.pages[stableId];
    page.visitCount++;
    page.lastUpdate = Date.now();
    page.identity.runtimeId = url;
    this.graph.application.lastUpdate = Date.now();
    
    return page;
  }
  
  public upsertState(pageId: string, name: string, description: string, isDefault: boolean = false): UIStateNode {
    const semanticId = `${pageId}-state-${name.toLowerCase().replace(/\s+/g, '-')}`;
    const stableId = generateStableId('state', semanticId);

    if (!this.graph.states[stableId]) {
      this.graph.states[stableId] = {
        identity: { stableId, semanticId, runtimeId: semanticId },
        discoveryStatus: 'Discovered',
        firstDiscovery: Date.now(),
        lastUpdate: Date.now(),
        pageId,
        name,
        description,
        isDefault
      };
      this.addRelationship({
        id: `${pageId}-CONTAINS-${stableId}`,
        sourceId: pageId,
        sourceType: 'PAGE',
        targetId: stableId,
        targetType: 'STATE',
        relationshipType: 'CONTAINS',
        createdBy: 'KnowledgeGraphBuilder',
        typedMetadata: {}
      });
    }
    return this.graph.states[stableId];
  }

  public upsertContainer(pageId: string, semanticIdentifier: string, type: string, createdBy: string = 'KnowledgeGraphBuilder'): UIContainerNode {
    const semanticId = `${pageId}-container-${semanticIdentifier.toLowerCase().replace(/\s+/g, '-')}`;
    const stableId = generateStableId('container', semanticId);

    if (!this.graph.containers[stableId]) {
      this.graph.containers[stableId] = {
        identity: { stableId, semanticId, runtimeId: semanticIdentifier },
        discoveryStatus: 'Discovered',
        firstDiscovery: Date.now(),
        lastUpdate: Date.now(),
        type,
        pageId
      };
      this.addRelationship({
        id: `${pageId}-CONTAINS-${stableId}`,
        sourceId: pageId,
        sourceType: 'PAGE',
        targetId: stableId,
        targetType: 'CONTAINER',
        relationshipType: 'CONTAINS',
        createdBy,
        typedMetadata: {}
      });
    }
    return this.graph.containers[stableId];
  }

  public upsertElement(pageId: string, elementIdentifier: string): SemanticElementNode {
    const semanticId = `${pageId}-element-${elementIdentifier}`;
    const stableId = generateStableId('element', semanticId);

    if (!this.graph.elements[stableId]) {
      this.graph.elements[stableId] = createElementNode(pageId, elementIdentifier);
      this.addRelationship({
        id: `${pageId}-CONTAINS-${stableId}`,
        sourceId: pageId,
        sourceType: 'PAGE',
        targetId: stableId,
        targetType: 'ELEMENT',
        relationshipType: 'CONTAINS',
        createdBy: 'KnowledgeGraphBuilder',
        typedMetadata: {}
      });
    }
    return this.graph.elements[stableId];
  }

  public addRelationship(edge: TypedRelationshipEdge): void {
    const existingIdx = this.graph.relationships.findIndex(r => r.id === edge.id);
    if (existingIdx === -1) {
      this.graph.relationships.push(edge);
      this.graph.application.lastUpdate = Date.now();
    } else {
      this.graph.relationships[existingIdx] = edge;
    }
  }
  
  public removeRelationship(sourceId: string, targetId: string, type: string): void {
    this.graph.relationships = this.graph.relationships.filter(r => !(r.sourceId === sourceId && r.targetId === targetId && r.relationshipType === type));
  }

  public addCapability(capability: CapabilityNode): void {
    const existing = this.graph.capabilities.find(c => c.name === capability.name);
    if (!existing) {
      this.graph.capabilities.push(capability);
      this.graph.application.lastUpdate = Date.now();
    }
  }

  public recordInteraction(stableId: string): void {
    if (this.graph.elements[stableId]) {
      this.graph.elements[stableId].interactionCount++;
      this.graph.elements[stableId].lastUpdate = Date.now();
      this.graph.application.lastUpdate = Date.now();
    }
  }

  public recordWarning(pageId: string, message: string): void {
    const id = `warn-${Date.now()}-${Math.random()}`;
    this.graph.warnings.push({ id, pageId, message, timestamp: Date.now() });
    this.graph.application.lastUpdate = Date.now();
  }

  public recordError(pageId: string, message: string): void {
    const id = `err-${Date.now()}-${Math.random()}`;
    this.graph.errors.push({ id, pageId, message, timestamp: Date.now() });
    this.graph.application.lastUpdate = Date.now();
  }
}
