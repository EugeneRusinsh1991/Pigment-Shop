import { ApplicationKnowledgeGraph, SemanticPageNode, SemanticElementNode, UIContainerNode, UIStateNode } from './types';
import * as crypto from 'crypto';

export function generateStableId(type: string, input: string): string {
  return crypto.createHash('sha256').update(`${type}:${input}`).digest('hex').substring(0, 12);
}

function inferSemanticName(route: string): string {
  if (!route || route === '/') return 'Home';
  const parts = route.split('/').filter(Boolean);
  if (parts.length === 0) return 'Home';
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

export function createInitialGraph(baseUrl: string): ApplicationKnowledgeGraph {
  return {
    application: {
      baseUrl,
      firstDiscovery: Date.now(),
      lastUpdate: Date.now(),
      graphVersion: '3.0.0',
      schemaVersion: '1.0.0',
      generatorVersion: '1.0.0',
      platformVersion: '1.0.0'
    },
    pages: {},
    states: {},
    containers: {},
    elements: {},
    relationships: [],
    capabilities: [],
    warnings: [],
    errors: []
  };
}

export function createPageNode(url: string, normalizedRoute: string, depth: number): SemanticPageNode {
  const semanticId = normalizedRoute || url;
  const stableId = generateStableId('page', semanticId);
  return {
    identity: {
      stableId,
      semanticId,
      runtimeId: url
    },
    discoveryStatus: 'Discovered',
    firstDiscovery: Date.now(),
    lastUpdate: Date.now(),
    url,
    normalizedRoute,
    semanticName: inferSemanticName(normalizedRoute),
    title: '',
    description: '',
    depth,
    visitCount: 0
  };
}

export function createElementNode(pageId: string, elementIdentifier: string): SemanticElementNode {
  const semanticId = `${pageId}-element-${elementIdentifier}`;
  const stableId = generateStableId('element', semanticId);
  return {
    identity: {
      stableId,
      semanticId,
      runtimeId: elementIdentifier
    },
    discoveryStatus: 'Discovered',
    firstDiscovery: Date.now(),
    lastUpdate: Date.now(),
    visibleText: '',
    normalizedText: '',
    ariaLabel: '',
    accessibleName: '',
    role: 'element',
    elementType: 'unknown',
    category: 'general',
    pageId,
    interactionCount: 0,
    visibleState: true,
    enabledState: true
  };
}
