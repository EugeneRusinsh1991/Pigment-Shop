import { Page } from 'playwright';
import { ExplorerEventEmitter } from './explorer/events/ExplorerEventEmitter';
import { ExplorerConfig, runUIExplorer } from './index';
import { ScreenshotService } from './plugins/smoke/ScreenshotService';
import { SmokeConfig } from './plugins/smoke/SmokeConfig';
import { SmokePlugin } from './plugins/smoke/SmokePlugin';
import { SmokeReport } from './plugins/smoke/SmokeReport';

import * as path from 'path';
import { CapabilityAnalyzer } from './plugins/knowledge-graph/analyzers/CapabilityAnalyzer';
import { RelationshipAnalyzer } from './plugins/knowledge-graph/analyzers/RelationshipAnalyzer';
import { JSONExporter } from './plugins/knowledge-graph/exporters/JSONExporter';
import { MarkdownDocumentationExporter } from './plugins/knowledge-graph/exporters/MarkdownDocumentationExporter';
import { KnowledgeGraphBuilder } from './plugins/knowledge-graph/pipeline/builder/KnowledgeGraphBuilder';
import { KnowledgePipeline } from './plugins/knowledge-graph/pipeline/KnowledgePipeline';
import { FilesystemWriter } from './plugins/knowledge-graph/pipeline/writers/FilesystemWriter';

import { auditUIArchitecture } from './auditors/01-dynamic-ui-architecture-auditor';
import { auditRawI18n } from './auditors/02-dynamic-raw-i18n-auditor';
import { auditBrokenUI } from './auditors/03-dynamic-broken-ui-auditor';
import { RuntimeHealthAuditor } from './auditors/04-dynamic-runtime-health-auditor';
import { PlaywrightPage } from './explorer/driver/PlaywrightAdapter';
import { writeDynamicReport } from './helpers/dynamic-report-writer';

function buildKnowledgeGraph(builder: KnowledgeGraphBuilder) {
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

function getSmokeOptions(explorerConfig?: Partial<ExplorerConfig>) {
  return {
    baseUrl: explorerConfig?.baseUrl || 'http://localhost:8081',
    executionMode: explorerConfig?.executionMode || 'everyday-development'
  };
}

export async function runSmokeAutomation(
  config?: Partial<SmokeConfig>,
  explorerConfig?: Partial<ExplorerConfig>,
  screenshotService?: ScreenshotService,
  page?: Page,
  sessionId: string = 'smoke'
): Promise<SmokeReport> {
  const emitter = new ExplorerEventEmitter();
  const plugin = new SmokePlugin(config, screenshotService);
  const { baseUrl, executionMode } = getSmokeOptions(explorerConfig);
  
  const builder = executionMode === 'deep-diagnostics' ? new KnowledgeGraphBuilder(emitter, baseUrl) : undefined;
  
  plugin.subscribe(emitter);

  let healthAuditor: RuntimeHealthAuditor | undefined;
  let activePlaywrightPage: Page | undefined = page;

  const determineScope = (url: string): 'public' | 'admin' => {
    return url.includes('/admin') ? 'admin' : 'public';
  };

  const runVisualAudits = async (p: Page) => {
    try {
      const url = p.url();
      if (!url || url === 'about:blank') return;
      const scope = determineScope(url);

      const archViolations = await auditUIArchitecture(p, url, scope);
      writeDynamicReport('01', 'ui-architecture', scope, archViolations, sessionId);

      const i18nViolations = await auditRawI18n(p, url, scope);
      writeDynamicReport('02', 'raw-i18n', scope, i18nViolations, sessionId);

      const brokenViolations = await auditBrokenUI(p, url, scope);
      writeDynamicReport('03', 'broken-ui', scope, brokenViolations, sessionId);
    } catch {
      // Non-blocking audit error handling
    }
  };

  const setupHealthAuditor = (p: Page) => {
    activePlaywrightPage = p;
    const scope = determineScope(p.url());
    healthAuditor = new RuntimeHealthAuditor(p, scope, sessionId);
    healthAuditor.start();
  };

  if (activePlaywrightPage) {
    setupHealthAuditor(activePlaywrightPage);
  }

  emitter.on('ExplorerStarted', (event) => {
    if (event.page && (event.page as PlaywrightPage).page) {
      const p = (event.page as PlaywrightPage).page;
      if (!healthAuditor) {
        setupHealthAuditor(p);
      }
    }
  });

  emitter.on('NavigationCompleted', async () => {
    if (activePlaywrightPage) {
      await runVisualAudits(activePlaywrightPage);
    }
  });

  emitter.on('AfterInteraction', async () => {
    if (activePlaywrightPage) {
      await runVisualAudits(activePlaywrightPage);
    }
  });

  emitter.on('ExplorerFinished', async () => {
    if (healthAuditor) {
      const violations = healthAuditor.getViolations();
      const scope = activePlaywrightPage ? determineScope(activePlaywrightPage.url()) : 'public';
      writeDynamicReport('04', 'runtime-health', scope, violations, sessionId);
    }
  });

  await runUIExplorer(page, explorerConfig, emitter);

  if (builder) {
    buildKnowledgeGraph(builder);
  }

  return plugin.getReport();
}

export * from './plugins/smoke/ScreenshotService';
export * from './plugins/smoke/SmokeConfig';
export * from './plugins/smoke/SmokePlugin';
export * from './plugins/smoke/SmokeReport';

