import { Reporter } from '../ObservabilityManager';
import { ObservabilityEvent } from '../events';
import * as fs from 'fs';
import * as path from 'path';
import { prepareReportFile } from './reporterUtils';

export class JsonReporter implements Reporter {
  private events: ObservabilityEvent[] = [];

  report(event: ObservabilityEvent): void {
    this.events.push(event);
  }

  async flush(): Promise<void> {
    const { filepath } = prepareReportFile('json');

    const summary = this.events.find(e => e.type === 'SUMMARY');

    const reportData = {
      Run: {
        timestamp: new Date().toISOString(),
      },
      Environment: {
        nodeVersion: process.version,
        platform: process.platform,
      },
      Statistics: summary || {},
      Timeline: this.events
    };

    fs.writeFileSync(filepath, JSON.stringify(reportData, null, 2), 'utf-8');
    console.log(`[JSON_REPORTER] Saved to ${filepath}`);
  }
}
