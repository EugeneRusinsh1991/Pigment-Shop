import { Page } from 'playwright';
import { runUIExplorer, ExplorerConfig } from './index';
import { ExplorerEventEmitter } from './explorer/events/ExplorerEventEmitter';
import { SmokeConfig } from './plugins/smoke/SmokeConfig';
import { SmokePlugin } from './plugins/smoke/SmokePlugin';
import { SmokeReport } from './plugins/smoke/SmokeReport';
import { ScreenshotService } from './plugins/smoke/ScreenshotService';

import { KnowledgeGraphBuilder } from './plugins/knowledge-graph/pipeline/builder/KnowledgeGraphBuilder';
import { JSONExporter } from './plugins/knowledge-graph/exporters/JSONExporter';
import { MarkdownDocumentationExporter } from './plugins/knowledge-graph/exporters/MarkdownDocumentationExporter';
import { KnowledgePipeline } from './plugins/knowledge-graph/pipeline/KnowledgePipeline';
import { CapabilityAnalyzer } from './plugins/knowledge-graph/analyzers/CapabilityAnalyzer';
import { RelationshipAnalyzer } from './plugins/knowledge-graph/analyzers/RelationshipAnalyzer';
import { FilesystemWriter } from './plugins/knowledge-graph/pipeline/writers/FilesystemWriter';
import * as path from 'path';

export async function runSmokeAutomation(
  config?: Partial<SmokeConfig>,
  explorerConfig?: Partial<ExplorerConfig>,
  screenshotService?: ScreenshotService,
  page?: Page
): Promise<SmokeReport> {
  const emitter = new ExplorerEventEmitter();
  const plugin = new SmokePlugin(config, screenshotService);
  const baseUrl = explorerConfig?.baseUrl || 'http://localhost:8081';
  const executionMode = explorerConfig?.executionMode || 'everyday-development';
  
  let builder: KnowledgeGraphBuilder | undefined;
  if (executionMode === 'deep-diagnostics') {
    // Layer 3: Initialize Builder
    builder = new KnowledgeGraphBuilder(emitter, baseUrl);
  }
  
  plugin.subscribe(emitter);

  // Layer 1 & 2: Execution & Fact Generation
  await runUIExplorer(page, explorerConfig, emitter);

  if (executionMode === 'deep-diagnostics' && builder) {
    // Layer 4 & 5: Pipeline & Analyzers
    const pipeline = new KnowledgePipeline();
    pipeline.registerAnalyzer(new RelationshipAnalyzer());
    pipeline.registerAnalyzer(new CapabilityAnalyzer());
    pipeline.run(builder.getStore());

    // Layer 6 & 7: Exporters & Writers
    const reportsDir = path.join(process.cwd(), '.tools', 'browser-automation', 'reports');
    const writer = new FilesystemWriter(reportsDir);
    
    const graph = builder.getStore().getGraph();
    writer.write('application-knowledge-graph.json', JSONExporter.export(graph));
    writer.write('application-documentation.md', MarkdownDocumentationExporter.export(graph));
  }

  return plugin.getReport();
}

export * from './plugins/smoke/SmokeConfig';
export * from './plugins/smoke/SmokeReport';
export * from './plugins/smoke/ScreenshotService';
export * from './plugins/smoke/SmokePlugin';
