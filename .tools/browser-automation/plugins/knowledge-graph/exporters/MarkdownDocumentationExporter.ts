import { ApplicationKnowledgeGraph } from '../models/types';

function buildOverviewSection(graph: ApplicationKnowledgeGraph): string[] {
  const navEdges = graph.relationships.filter(r => r.relationshipType === 'NAVIGATES_TO');
  return [
    '## 🏗 Application Overview',
    `- **Base URL**: ${graph.application.baseUrl}`,
    `- **Graph Version**: ${graph.application.graphVersion}`,
    `- **Discovered Pages**: ${Object.keys(graph.pages).length}`,
    `- **Containers**: ${Object.keys(graph.containers).length}`,
    `- **Interactive Elements**: ${Object.keys(graph.elements).length}`,
    `- **Navigation Edges**: ${navEdges.length}\n`
  ];
}

function formatNavEdgeLine(graph: ApplicationKnowledgeGraph, edge: any): string {
  const targetPage = graph.pages[edge.targetId];
  const destName = targetPage ? targetPage.semanticName : edge.targetId;
  const triggerId = edge.typedMetadata?.triggerElementId;
  const trigger = triggerId && graph.elements[triggerId] ? graph.elements[triggerId].identity.semanticId : triggerId || 'Unknown Trigger';
  return `  - ➔ **${destName}** (via \`${trigger}\`)`;
}

function groupNavEdgesBySource(graph: ApplicationKnowledgeGraph): Record<string, string[]> {
  const navEdges = graph.relationships.filter(r => r.relationshipType === 'NAVIGATES_TO');
  const edgesBySource: Record<string, string[]> = {};

  for (const edge of navEdges) {
    if (!edgesBySource[edge.sourceId]) edgesBySource[edge.sourceId] = [];
    edgesBySource[edge.sourceId].push(formatNavEdgeLine(graph, edge));
  }
  return edgesBySource;
}

function buildNavigationSection(graph: ApplicationKnowledgeGraph): string[] {
  const lines: string[] = ['## 🗺 Navigation Graph'];
  const edgesBySource = groupNavEdgesBySource(graph);

  for (const [sourceId, targets] of Object.entries(edgesBySource)) {
    const sourcePage = graph.pages[sourceId];
    const sourceName = sourcePage ? sourcePage.semanticName : sourceId;
    lines.push(`- **${sourceName}**`);
    lines.push(...targets);
  }
  lines.push('');
  return lines;
}

function buildPageContainerDetails(graph: ApplicationKnowledgeGraph, targetId: string): string[] {
  const lines: string[] = [];
  const container = graph.containers[targetId];
  if (container) {
    lines.push(`- 📦 **${container.identity.semanticId}** (${container.type})`);
    const elEdges = graph.relationships.filter(r => r.sourceId === container.identity.stableId && r.relationshipType === 'CONTAINS');
    for (const elEdge of elEdges) {
      const el = graph.elements[elEdge.targetId];
      if (el) {
        lines.push(`  - 🔘 \`${el.identity.semanticId}\` (Interactions: ${el.interactionCount})`);
      }
    }
    return lines;
  }

  const state = graph.states[targetId];
  if (state) {
    lines.push(`- 🎨 **State**: ${state.name} (${state.description})`);
    return lines;
  }

  const el = graph.elements[targetId];
  if (el) {
    lines.push(`- 🔘 \`${el.identity.semanticId}\` (Interactions: ${el.interactionCount})`);
  }
  return lines;
}

function buildPagesSection(graph: ApplicationKnowledgeGraph): string[] {
  const lines: string[] = ['## 📄 Pages & Structure'];
  for (const page of Object.values(graph.pages)) {
    lines.push(`### ${page.semanticName} (\`${page.normalizedRoute}\`)`);
    lines.push(`- **Depth**: ${page.depth}`);
    lines.push(`- **Visits**: ${page.visitCount}`);
    lines.push(`- **Status**: ${page.discoveryStatus}`);
    
    const containsEdges = graph.relationships.filter(r => r.sourceId === page.identity.stableId && r.relationshipType === 'CONTAINS');
    if (containsEdges.length > 0) {
      lines.push(`\n**Containers & Elements:**`);
      for (const edge of containsEdges) {
        lines.push(...buildPageContainerDetails(graph, edge.targetId));
      }
    }
    lines.push('');
  }
  return lines;
}

function buildCapabilitiesSection(graph: ApplicationKnowledgeGraph): string[] {
  const lines: string[] = ['## ⚡ Semantic Capabilities'];
  if (graph.capabilities.length > 0) {
    for (const cap of graph.capabilities) {
      lines.push(`- ✅ **${cap.name}** (Confidence: ${cap.confidence}): ${cap.description}`);
    }
  } else {
    lines.push('- No specific capabilities inferred yet.');
  }
  lines.push('');
  return lines;
}

export class MarkdownDocumentationExporter {
  public static export(graph: ApplicationKnowledgeGraph): string {
    const lines: string[] = [
      '# 🧠 Application Knowledge Graph (V3)\n',
      ...buildOverviewSection(graph),
      ...buildNavigationSection(graph),
      ...buildPagesSection(graph),
      ...buildCapabilitiesSection(graph)
    ];

    return lines.join('\n');
  }
}
