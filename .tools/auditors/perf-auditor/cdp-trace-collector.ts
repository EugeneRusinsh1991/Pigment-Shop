import { CDPSession } from 'playwright';
import { V8ProfileResolver } from './v8-profile-resolver';

export interface TraceEvent {
  cat: string;
  name: string;
  ph: string;
  ts: number;
  dur?: number;
  pid?: number;
  tid?: number;
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

/** Event names whose localization data can be inherited by parent RunTask */
const CHILD_SOURCE_EVENTS = new Set([
  'FunctionCall', 'EvaluateScript', 'EventDispatch', 'v8.compile',
]);

const TRACE_CATEGORIES = [
  'devtools.timeline',
  'disabled-by-default-devtools.timeline',
  'disabled-by-default-devtools.timeline.stack',
  'disabled-by-default-v8.cpu_profiler',
  'v8.cpu_profiler',
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

  private processDurationEvent(
    evt: TraceEvent,
    currentUrl: string,
    childIndex: Map<string, TraceEvent[]>,
    profiler: V8ProfileResolver
  ): TraceLagRecord | null {
    const durationMs = Math.round(evt.dur! / 1000);
    if (durationMs < this.thresholdMs) return null;

    const lagType = LAG_EVENT_MATCHERS[evt.name];
    if (!lagType) return null;

    let localization = extractLocalization(evt);

    if (evt.name === 'RunTask' && !localization.sourceLocation) {
      localization = inheritFromChildren(evt, childIndex, localization);
    }

    if (evt.name === 'RunTask' && !localization.sourceLocation && profiler.hasData()) {
      localization = resolveFromProfiler(evt, profiler, localization);
    }

    return {
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
    };
  }

  private extractLags(events: TraceEvent[]): TraceLagRecord[] {
    const lags: TraceLagRecord[] = [];
    const currentUrl = this.pageUrl();
    const durationEvents = events.filter(e => e.ph === 'X' && e.dur);
    const childIndex = buildChildIndex(durationEvents);

    const profiler = new V8ProfileResolver();
    profiler.ingest(events);
    if (profiler.hasData()) {
      console.log('[CDP TRACE] V8 CPU profiler data available for source resolution');
    }

    let passedThreshold = 0;

    for (const evt of durationEvents) {
      const durationMs = Math.round(evt.dur! / 1000);
      if (durationMs >= this.thresholdMs) passedThreshold++;

      const record = this.processDurationEvent(evt, currentUrl, childIndex, profiler);
      if (record) {
        lags.push(record);
      }
    }

    console.log(`[CDP TRACE] Raw: ${events.length} | X+dur: ${durationEvents.length} | ≥${this.thresholdMs}ms: ${passedThreshold} | matched: ${lags.length}`);
    return lags;
  }
}

interface LocalizationResult {
  callStack?: TraceStackFrame[];
  sourceLocation?: { functionName: string; scriptUrl: string; lineNumber: number };
  eventType?: string;
}

function parseCallStack(rawStack: any[]): {
  callStack: TraceStackFrame[];
  sourceLocation?: { functionName: string; scriptUrl: string; lineNumber: number };
} {
  const callStack = rawStack
    .filter((f: any) => f.url || f.scriptUrl)
    .slice(0, 10)
    .map((f: any) => ({
      functionName: f.functionName || f.name || '(anonymous)',
      scriptUrl: f.url || f.scriptUrl || '',
      lineNumber: f.lineNumber ?? f.line ?? 0,
      columnNumber: f.columnNumber ?? f.column ?? 0,
    }));

  const firstFrame = callStack.find(f => f.scriptUrl && !isInternalUrl(f.scriptUrl));
  const sourceLocation = firstFrame ? {
    functionName: firstFrame.functionName,
    scriptUrl: firstFrame.scriptUrl,
    lineNumber: firstFrame.lineNumber,
  } : undefined;

  return { callStack, sourceLocation };
}

function extractLocalization(evt: TraceEvent): LocalizationResult {
  const result: LocalizationResult = {};
  const data = evt.args?.data;
  const beginData = evt.args?.beginData;

  const rawStack = data?.stackTrace || beginData?.stackTrace || data?.callStack;
  if (Array.isArray(rawStack) && rawStack.length > 0) {
    const parsed = parseCallStack(rawStack);
    result.callStack = parsed.callStack;
    if (parsed.sourceLocation) {
      result.sourceLocation = parsed.sourceLocation;
    }
  }

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

  if (evt.name === 'EventDispatch' && data?.type) {
    result.eventType = data.type;
  }

  return result;
}

function isInternalUrl(url: string): boolean {
  return url.includes('extensions::') || url.includes('chrome-extension://') || url.startsWith('native ');
}

// --- Phase 1: Parent-child trace hierarchy ---

type ChildIndexKey = string;

function threadKey(evt: TraceEvent): ChildIndexKey {
  return `${evt.pid ?? 0}:${evt.tid ?? 0}`;
}

/** Groups child source events (FunctionCall, EvaluateScript, etc.) by pid:tid */
function buildChildIndex(events: TraceEvent[]): Map<ChildIndexKey, TraceEvent[]> {
  const index = new Map<ChildIndexKey, TraceEvent[]>();
  for (const evt of events) {
    if (!CHILD_SOURCE_EVENTS.has(evt.name)) continue;
    const key = threadKey(evt);
    let list = index.get(key);
    if (!list) {
      list = [];
      index.set(key, list);
    }
    list.push(evt);
  }
  return index;
}

function isChildOf(parent: TraceEvent, child: TraceEvent): boolean {
  const pEnd = parent.ts + (parent.dur ?? 0);
  const cEnd = child.ts + (child.dur ?? 0);
  return child.ts >= parent.ts && cEnd <= pEnd;
}

/**
 * For a RunTask with no own sourceLocation, find children in the same thread
 * whose timestamp range is contained within the parent, and inherit their
 * localization (deepest/longest FunctionCall wins).
 */
function mergeChildLocalizations(children: TraceEvent[], existing: LocalizationResult): LocalizationResult {
  const mergedStack: TraceStackFrame[] = [];
  let bestSource: LocalizationResult['sourceLocation'] | undefined;
  let bestEventType: string | undefined;

  for (const child of children) {
    const childLoc = extractLocalization(child);
    if (childLoc.callStack) {
      for (const frame of childLoc.callStack) {
        if (!mergedStack.some(f => f.scriptUrl === frame.scriptUrl && f.lineNumber === frame.lineNumber)) {
          mergedStack.push(frame);
        }
      }
    }
    if (childLoc.sourceLocation && !bestSource) {
      bestSource = childLoc.sourceLocation;
    }
    if (childLoc.eventType && !bestEventType) {
      bestEventType = childLoc.eventType;
    }
  }

  return {
    callStack: mergedStack.length > 0 ? mergedStack.slice(0, 10) : existing.callStack,
    sourceLocation: bestSource ?? existing.sourceLocation,
    eventType: bestEventType ?? existing.eventType,
  };
}

function inheritFromChildren(
  parent: TraceEvent,
  childIndex: Map<ChildIndexKey, TraceEvent[]>,
  existing: LocalizationResult,
): LocalizationResult {
  const key = threadKey(parent);
  const candidates = childIndex.get(key);
  if (!candidates) return existing;

  const children = candidates.filter(c => isChildOf(parent, c));
  if (children.length === 0) return existing;

  children.sort((a, b) => a.ts - b.ts);
  return mergeChildLocalizations(children, existing);
}

// --- Phase 2: V8 CPU profiler resolution ---

function resolveFromProfiler(
  evt: TraceEvent,
  profiler: V8ProfileResolver,
  existing: LocalizationResult,
): LocalizationResult {
  const frames = profiler.resolve(evt.ts, evt.ts + (evt.dur ?? 0));
  if (!frames || frames.length === 0) return existing;

  const firstNonInternal = frames.find(f => !isInternalUrl(f.scriptUrl));
  return {
    callStack: frames,
    sourceLocation: firstNonInternal
      ? {
          functionName: firstNonInternal.functionName,
          scriptUrl: firstNonInternal.scriptUrl,
          lineNumber: firstNonInternal.lineNumber,
        }
      : existing.sourceLocation,
    eventType: existing.eventType,
  };
}

function buildDetails(evt: TraceEvent, durationMs: number, loc: LocalizationResult): string {
  const parts = [`CDP ${evt.name}: ${durationMs}ms`];
  const data = evt.args?.data;

  if (loc.eventType) parts.push(`event=${loc.eventType}`);
  if (loc.sourceLocation) {
    const src = loc.sourceLocation;
    const file = src.scriptUrl.split('/').pop() || src.scriptUrl;
    parts.push(`source=${src.functionName}@${file}:${src.lineNumber}`);
  } else if (evt.name === 'RunTask') {
    parts.push('[browser_internal]');
  }
  if (loc.callStack?.length) parts.push(`stack_depth=${loc.callStack.length}`);
  if (data?.elementCount) parts.push(`elements=${data.elementCount}`);

  return parts.join(' | ');
}
