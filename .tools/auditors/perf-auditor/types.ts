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
