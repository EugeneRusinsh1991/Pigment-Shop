import fs from 'fs';
import path from 'path';
import { PerfAuditConfig } from './config';

export interface LagRecord {
  id: string;
  timestamp: string;
  type: 'longtask' | 'action_delay' | 'custom';
  durationMs: number;
  thresholdMs: number;
  url: string;
  userAction?: {
    type: 'click' | 'input' | 'scroll' | 'keydown';
    targetSelector: string;
    targetTagName: string;
    targetText?: string;
    timestamp: number;
  };
  callStack?: Array<{
    functionName: string;
    scriptUrl: string;
    lineNumber: number;
    columnNumber: number;
  }>;
  attribution?: {
    containerType?: string;
    containerSrc?: string;
    containerId?: string;
    containerName?: string;
  };
  screenshotPath?: string;
  selector?: string;
  action?: string;
  details?: string;
}

export class PerfLogger {
  public runDir: string;
  public latestDir: string;
  private lags: LagRecord[] = [];

  constructor(private config: PerfAuditConfig) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.runDir = path.join(config.logsDir, `run-${timestamp}`);
    this.latestDir = path.join(config.logsDir, 'latest');

    fs.mkdirSync(path.join(this.runDir, 'screenshots'), { recursive: true });

    if (fs.existsSync(this.latestDir)) {
      try {
        fs.rmSync(this.latestDir, { recursive: true, force: true });
      } catch {}
    }
  }

  public recordLag(record: Omit<LagRecord, 'id'>): void {
    const id = `lag-${Date.now()}-${record.durationMs}`;
    const fullRecord = { id, ...record } as LagRecord;
    this.lags.push(fullRecord);
    const target = fullRecord.userAction?.targetSelector || fullRecord.selector || fullRecord.action || 'UI';
    console.warn(`[PERF LAG WARNING] ${record.type} on ${target} took ${record.durationMs}ms (Threshold: ${record.thresholdMs}ms)`);
  }

  public getLags(): LagRecord[] {
    return this.lags;
  }

  public saveReport(): void {
    const reportPath = path.join(this.runDir, 'lags-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.lags, null, 2), 'utf-8');

    try {
      fs.mkdirSync(this.latestDir, { recursive: true });
      fs.writeFileSync(path.join(this.latestDir, 'summary.json'), JSON.stringify(this.lags, null, 2), 'utf-8');

      const latestScreenshotsDir = path.join(this.latestDir, 'screenshots');
      fs.mkdirSync(latestScreenshotsDir, { recursive: true });
      const screenshotsDir = path.join(this.runDir, 'screenshots');
      if (fs.existsSync(screenshotsDir)) {
        const screenshots = fs.readdirSync(screenshotsDir);
        for (const s of screenshots) {
          fs.copyFileSync(path.join(screenshotsDir, s), path.join(latestScreenshotsDir, s));
        }
      }
    } catch (err) {
      console.error('Failed to sync to latest dir:', err);
    }
  }
}
