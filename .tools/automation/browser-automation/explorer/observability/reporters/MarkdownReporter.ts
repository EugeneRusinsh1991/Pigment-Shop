import { Reporter } from '../ObservabilityManager';
import { ObservabilityEvent, SummaryEvent, ActionEvent, SkipEvent, NavigationEvent, ErrorEvent, WarningEvent } from '../events';
import * as fs from 'fs';
import * as path from 'path';
import { prepareReportFile } from './reporterUtils';

export class MarkdownReporter implements Reporter {
  private events: ObservabilityEvent[] = [];

  report(event: ObservabilityEvent): void {
    this.events.push(event);
  }

  async flush(): Promise<void> {
    const { filepath } = prepareReportFile('md');

    const summary = this.events.find(e => e.type === 'SUMMARY') as SummaryEvent;
    const actions = this.events.filter(e => e.type === 'ACTION') as ActionEvent[];
    const skips = this.events.filter(e => e.type === 'SKIP') as SkipEvent[];
    const navs = this.events.filter(e => e.type === 'NAVIGATION') as NavigationEvent[];
    const errors = this.events.filter(e => e.type === 'ERROR') as ErrorEvent[];
    const warnings = this.events.filter(e => e.type === 'WARNING') as WarningEvent[];

    const failedNavs = navs.filter(n => !n.success);

    const uniquePages = new Set(navs.map(n => n.destinationUrl));

    let md = `# Browser Automation Run Summary\n\n`;
    md += `*Generated at: ${new Date().toISOString()}*\n\n`;

    if (summary) {
      md += `## Overall Statistics\n`;
      md += `- **Total Runtime:** ${summary.totalRuntimeMs}ms\n`;
      md += `- **Pages Visited:** ${summary.pagesVisited}\n`;
      md += `- **DOM Scans:** ${summary.domScans}\n`;
      md += `- **Elements Scanned:** ${summary.elementsScanned}\n`;
      md += `- **Candidates Evaluated:** ${summary.candidatesEvaluated}\n`;
      md += `- **Clicks:** ${summary.clicks}\n`;
      md += `- **Successful Navigations:** ${summary.successfulNavigations}\n`;
      md += `- **Skipped Elements:** ${summary.skipped}\n`;
      md += `- **Errors:** ${summary.errors}\n\n`;

      md += `## Performance\n`;
      md += `- **Average Page Time:** ${summary.averagePageTimeMs}ms\n`;
      md += `- **Average Click Time:** ${summary.averageClickTimeMs}ms\n`;
      md += `- **Slowest Operation:** ${summary.slowestOperationName} (${summary.slowestOperationMs}ms)\n\n`;
    }

    md += `## Pages Visited\n`;
    uniquePages.forEach(p => md += `- ${p}\n`);
    md += `\n`;

    md += `## Important Clicks\n`;
    actions.slice(0, 50).forEach(a => {
      md += `- Clicked \`${a.element.type}\` "${a.element.text}" (duration: ${a.durationMs}ms, result: ${a.result})\n`;
    });
    md += `\n`;

    if (failedNavs.length > 0) {
      md += `## Failed Navigations\n`;
      failedNavs.forEach(n => {
        md += `- Failed to navigate to ${n.destinationUrl}\n`;
      });
      md += `\n`;
    }

    if (errors.length > 0) {
      md += `## Errors\n`;
      errors.forEach(e => md += `- ${e.message}\n`);
      md += `\n`;
    }

    if (warnings.length > 0) {
      md += `## Warnings\n`;
      warnings.forEach(w => md += `- ${w.message}\n`);
      md += `\n`;
    }

    md += `## Skip Analysis\n`;
    const skipReasons: Record<string, number> = {};
    skips.forEach(s => {
      skipReasons[s.reason] = (skipReasons[s.reason] || 0) + 1;
    });
    Object.entries(skipReasons).forEach(([reason, count]) => {
      md += `- **${reason}**: ${count} times\n`;
    });
    md += `\n`;

    fs.writeFileSync(filepath, md, 'utf-8');
    console.log(`[MD_REPORTER] Saved to ${filepath}`);
  }
}
