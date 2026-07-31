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

export interface TraceStackFrame {
  functionName: string;
  scriptUrl: string;
  lineNumber: number;
  columnNumber: number;
}

export interface TraceLagRecord {
  type: 'cdp_longtask' | 'action_delay' | 'layout_thrash' | 'paint_stall';
  durationMs: number;
  traceCategory: string;
  traceName: string;
  timestamp: string;
  url: string;
  details: string;
  callStack?: TraceStackFrame[];
  sourceLocation?: {
    functionName: string;
    scriptUrl: string;
    lineNumber: number;
  };
  eventType?: string;
}

const LAG_EVENT_MATCHERS: Record<string, TraceLagRecord['type']> = {
  'RunTask': 'cdp_longtask',
  'FunctionCall': 'cdp_longtask',
  'EventDispatch': 'action_delay',
  'UpdateLayoutTree': 'layout_thrash',
  'Layout': 'layout_thrash',
  'Paint': 'paint_stall',
  'CompositeLayers': 'paint_stall',
};

const TRACE_CATEGORIES = [
  'devtools.timeline',
  'disabled-by-default-devtools.timeline',
  'disabled-by-default-devtools.timeline.stack',
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

    // Register listener ONCE in constructor — prevents stacking on flush restarts
    this.cdp.on('Tracing.dataCollected', (params: any) => {
      if (Array.isArray(params.value)) {
        this.traceChunks.push(...params.value);
      }
    });
  }

  async start(): Promise<void> {
    if (this.isTracing) return;
    this.traceChunks = [];

    await this.cdp.send('Tracing.start', {
      categories: TRACE_CATEGORIES.join(','),
      transferMode: 'ReportEvents',
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

    console.log(`[CDP TRACE] stopAndCollect: ${this.traceChunks.length} raw trace events received`);
    return this.extractLags(this.traceChunks);
  }

  private extractLags(events: TraceEvent[]): TraceLagRecord[] {
    const lags: TraceLagRecord[] = [];
    const currentUrl = this.pageUrl();

    let xWithDur = 0;
    let passedThreshold = 0;

    for (const evt of events) {
      if (evt.ph !== 'X' || !evt.dur) continue;
      xWithDur++;

      const durationMs = Math.round(evt.dur / 1000);
      if (durationMs < this.thresholdMs) continue;
      passedThreshold++;

      const lagType = LAG_EVENT_MATCHERS[evt.name];
      if (!lagType) continue;

      const localization = extractLocalization(evt);

      lags.push({
        type: lagType,
        durationMs,
        traceCategory: evt.cat,
        traceName: evt.name,
        timestamp: new Date().toISOString(),
        url: currentUrl,
        details: buildDetails(evt, durationMs, localization),
        callStack: localization.callStack,
        sourceLocation: localization.sourceLocation,
        eventType: localization.eventType,
      });
    }

    console.log(`[CDP TRACE] Raw: ${events.length} | X+dur: ${xWithDur} | ≥${this.thresholdMs}ms: ${passedThreshold} | matched: ${lags.length}`);
    return lags;
  }
}

interface LocalizationResult {
  callStack?: TraceStackFrame[];
  sourceLocation?: { functionName: string; scriptUrl: string; lineNumber: number };
  eventType?: string;
}

function extractLocalization(evt: TraceEvent): LocalizationResult {
  const result: LocalizationResult = {};
  const data = evt.args?.data;
  const beginData = evt.args?.beginData;

  // Extract stack trace from data.stackTrace or beginData.stackTrace (layout triggers)
  const rawStack = data?.stackTrace || beginData?.stackTrace || data?.callStack;
  if (Array.isArray(rawStack) && rawStack.length > 0) {
    result.callStack = rawStack
      .filter((f: any) => f.url || f.scriptUrl)
      .slice(0, 10)
      .map((f: any) => ({
        functionName: f.functionName || f.name || '(anonymous)',
        scriptUrl: f.url || f.scriptUrl || '',
        lineNumber: f.lineNumber ?? f.line ?? 0,
        columnNumber: f.columnNumber ?? f.column ?? 0,
      }));

    // First meaningful frame = source location
    const firstFrame = result.callStack.find(f => f.scriptUrl && !isInternalUrl(f.scriptUrl));
    if (firstFrame) {
      result.sourceLocation = {
        functionName: firstFrame.functionName,
        scriptUrl: firstFrame.scriptUrl,
        lineNumber: firstFrame.lineNumber,
      };
    }
  }

  // FunctionCall has direct function/script info
  if (evt.name === 'FunctionCall' && data) {
    const fnName = data.functionName || data.scriptName || '';
    if (fnName && !result.sourceLocation) {
      result.sourceLocation = {
        functionName: fnName,
        scriptUrl: data.scriptName || data.url || '',
        lineNumber: data.scriptLine || data.lineNumber || 0,
      };
    }
  }

  // EventDispatch carries the DOM event type
  if (evt.name === 'EventDispatch' && data?.type) {
    result.eventType = data.type;
  }

  return result;
}

function isInternalUrl(url: string): boolean {
  return url.includes('extensions::') || url.includes('chrome-extension://') || url.startsWith('native ');
}

function buildDetails(evt: TraceEvent, durationMs: number, loc: LocalizationResult): string {
  const parts = [`CDP ${evt.name}: ${durationMs}ms`];
  const data = evt.args?.data;

  if (loc.eventType) parts.push(`event=${loc.eventType}`);
  if (loc.sourceLocation) {
    const src = loc.sourceLocation;
    const file = src.scriptUrl.split('/').pop() || src.scriptUrl;
    parts.push(`source=${src.functionName}@${file}:${src.lineNumber}`);
  }
  if (loc.callStack?.length) parts.push(`stack_depth=${loc.callStack.length}`);
  if (data?.elementCount) parts.push(`elements=${data.elementCount}`);

  return parts.join(' | ');
}
