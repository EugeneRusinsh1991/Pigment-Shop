import { CDPSession } from 'playwright';

export interface TraceEvent {
  cat: string;
  name: string;
  ph: string;
  ts: number;
  dur?: number;
  args?: Record<string, any>;
  tdur?: number;
}

export interface TraceLagRecord {
  type: 'cdp_longtask' | 'action_delay' | 'layout_thrash' | 'paint_stall';
  durationMs: number;
  traceCategory: string;
  traceName: string;
  timestamp: string;
  url: string;
  details: string;
}

const LAG_EVENT_MATCHERS: Record<string, TraceLagRecord['type']> = {
  'RunTask': 'cdp_longtask',
  'EventDispatch': 'action_delay',
  'UpdateLayoutTree': 'layout_thrash',
  'Layout': 'layout_thrash',
  'Paint': 'paint_stall',
  'CompositeLayers': 'paint_stall',
};

const TRACE_CATEGORIES = [
  'devtools.timeline',
  'disabled-by-default-devtools.timeline',
];

export class CdpTraceCollector {
  private cdp: CDPSession;
  private thresholdMs: number;
  private traceChunks: TraceEvent[] = [];
  private isTracing = false;
  private pageUrl: () => string;

  constructor(cdp: CDPSession, thresholdMs: number, pageUrlFn: () => string) {
    this.cdp = cdp;
    this.thresholdMs = thresholdMs;
    this.pageUrl = pageUrlFn;
  }

  async start(): Promise<void> {
    if (this.isTracing) return;
    this.traceChunks = [];
    this.cdp.on('Tracing.dataCollected', (params: any) => {
      if (Array.isArray(params.value)) {
        this.traceChunks.push(...params.value);
      }
    });

    await this.cdp.send('Tracing.start', {
      categories: TRACE_CATEGORIES.join(','),
      options: 'sampling-frequency=1000',
    });
    this.isTracing = true;
  }

  async flush(): Promise<TraceLagRecord[]> {
    if (!this.isTracing) return [];

    const collected = await this.stopAndCollect();
    await this.start();
    return collected;
  }

  async stop(): Promise<TraceLagRecord[]> {
    if (!this.isTracing) return [];
    return this.stopAndCollect();
  }

  private async stopAndCollect(): Promise<TraceLagRecord[]> {
    const completionPromise = new Promise<void>((resolve) => {
      this.cdp.once('Tracing.tracingComplete', () => resolve());
    });

    await this.cdp.send('Tracing.end');
    await completionPromise;
    this.isTracing = false;

    return this.extractLags(this.traceChunks);
  }

  private extractLags(events: TraceEvent[]): TraceLagRecord[] {
    const lags: TraceLagRecord[] = [];
    const currentUrl = this.pageUrl();

    for (const evt of events) {
      if (evt.ph !== 'X' || !evt.dur) continue;

      const durationMs = Math.round(evt.dur / 1000);
      if (durationMs < this.thresholdMs) continue;

      const lagType = LAG_EVENT_MATCHERS[evt.name];
      if (!lagType) continue;

      lags.push({
        type: lagType,
        durationMs,
        traceCategory: evt.cat,
        traceName: evt.name,
        timestamp: new Date().toISOString(),
        url: currentUrl,
        details: buildDetails(evt, durationMs),
      });
    }

    return lags;
  }
}

function buildDetails(evt: TraceEvent, durationMs: number): string {
  const base = `CDP ${evt.name}: ${durationMs}ms`;
  const data = evt.args?.data;
  if (!data) return base;

  const parts = [base];
  if (data.type) parts.push(`event=${data.type}`);
  if (data.stackTrace?.length) parts.push(`stack_depth=${data.stackTrace.length}`);
  if (data.elementCount) parts.push(`elements=${data.elementCount}`);
  return parts.join(' | ');
}
