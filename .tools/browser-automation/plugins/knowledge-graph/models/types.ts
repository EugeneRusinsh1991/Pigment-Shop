export type DiscoveryStatus = 'Undiscovered' | 'Discovered' | 'Partially Explored' | 'Fully Explored' | 'Blocked' | 'Skipped' | 'Failed';

export interface GraphIdentity {
  stableId: string;
  semanticId: string;
  runtimeId: string;
}

export interface AppMetadata {
  baseUrl: string;
  firstDiscovery: number;
  lastUpdate: number;
  graphVersion: string;
  schemaVersion: string;
  generatorVersion: string;
  platformVersion: string;
}

export interface ApplicationKnowledgeGraph {
  application: AppMetadata;
  pages: Record<string, SemanticPageNode>;
  states: Record<string, UIStateNode>;
  containers: Record<string, UIContainerNode>;
  elements: Record<string, SemanticElementNode>;
  relationships: TypedRelationshipEdge[];
  capabilities: CapabilityNode[];
  warnings: RuntimeWarning[];
  errors: RuntimeError[];
}

export interface BaseNode {
  identity: GraphIdentity;
  discoveryStatus: DiscoveryStatus;
  confidence?: number;
  firstDiscovery: number;
  lastUpdate: number;
}

export interface SemanticPageNode extends BaseNode {
  url: string;
  normalizedRoute: string;
  title: string;
  description: string;
  depth: number;
  visitCount: number;
}

export interface UIStateNode extends BaseNode {
  pageId: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface UIContainerNode extends BaseNode {
  type: string; // Form, Dialog, Navigation, List, Toolbar, Filter
  pageId: string;
}

export interface SemanticElementNode extends BaseNode {
  visibleText: string;
  normalizedText: string;
  ariaLabel: string;
  accessibleName: string;
  role: string;
  elementType: string;
  category: string;
  pageId: string;
  interactionCount: number;
  visibleState: boolean;
  enabledState: boolean;
}

export type RelationshipType = 'CONTAINS' | 'NAVIGATES_TO' | 'OPENS' | 'SUBMITS_TO' | 'FILTERS' | 'REQUIRES';
export type NodeType = 'PAGE' | 'STATE' | 'CONTAINER' | 'ELEMENT' | 'CAPABILITY';

export interface BaseRelationshipEdge {
  id: string;
  sourceId: string;
  sourceType: NodeType;
  targetId: string;
  targetType: NodeType;
  relationshipType: RelationshipType;
  confidence?: number;
  createdBy: string;
}

export interface ContainsRelationship extends BaseRelationshipEdge {
  relationshipType: 'CONTAINS';
  typedMetadata: {
    orderIndex?: number;
  };
}

export interface NavigatesToRelationship extends BaseRelationshipEdge {
  relationshipType: 'NAVIGATES_TO';
  typedMetadata: {
    triggerElementId?: string;
    transitionType: 'navigation' | 'redirect' | 'back' | 'forward' | 'submit';
    success: boolean;
    durationMs?: number;
  };
}

export interface OpensRelationship extends BaseRelationshipEdge {
  relationshipType: 'OPENS';
  typedMetadata: {
    triggerElementId: string;
    modalType: 'dialog' | 'dropdown' | 'drawer' | 'accordion';
  };
}

export interface SubmitsToRelationship extends BaseRelationshipEdge {
  relationshipType: 'SUBMITS_TO';
  typedMetadata: {
    formContainerId: string;
    endpoint?: string;
  };
}

export interface FiltersRelationship extends BaseRelationshipEdge {
  relationshipType: 'FILTERS';
  typedMetadata: {
    targetContainerId: string;
  };
}

export interface RequiresRelationship extends BaseRelationshipEdge {
  relationshipType: 'REQUIRES';
  typedMetadata: {
    requirement: string;
  };
}

export type TypedRelationshipEdge = 
  | ContainsRelationship
  | NavigatesToRelationship
  | OpensRelationship
  | SubmitsToRelationship
  | FiltersRelationship
  | RequiresRelationship;

export interface CapabilityNode extends BaseNode {
  name: string;
  description: string;
}

export interface RuntimeWarning {
  id: string;
  pageId: string;
  message: string;
  timestamp: number;
}

export interface RuntimeError {
  id: string;
  pageId: string;
  message: string;
  timestamp: number;
}
