import type { TraceEvent, TraceStackFrame } from './types';

interface ProfileNode {
  id: number;
  callFrame: {
    functionName: string;
    scriptId: string;
    url: string;
    lineNumber: number;
    columnNumber: number;
  };
  parent?: number;
  children?: number[];
}

interface TimedSample {
  /** Absolute timestamp in microseconds */
  ts: number;
  nodeId: number;
}

/**
 * Resolves V8 CPU profiler data from trace events.
 * Parses Profile/ProfileChunk events to build a node tree and sample timeline,
 * then maps time ranges to JS call stacks.
 */
export class V8ProfileResolver {
  private nodes = new Map<number, ProfileNode>();
  private samples: TimedSample[] = [];

  /**
   * Ingest all trace events and extract profiler data.
   * Call once per flush cycle with the full event array.
   */
  ingest(events: TraceEvent[]): void {
    this.nodes.clear();
    this.samples = [];

    for (const evt of events) {
      if (evt.name === 'Profile' || evt.name === 'ProfileChunk') {
        this.processProfileEvent(evt);
      }
    }

    // Sort samples by timestamp for binary search
    this.samples.sort((a, b) => a.ts - b.ts);
  }

  /** Returns true if any profiler data was collected */
  hasData(): boolean {
    return this.samples.length > 0 && this.nodes.size > 0;
  }

  private countSampledNodes(startIdx: number, endIdx: number): Map<number, number> {
    const nodeCounts = new Map<number, number>();
    for (let i = startIdx; i < endIdx; i++) {
      const nodeId = this.samples[i].nodeId;
      const node = this.nodes.get(nodeId);
      if (node && !this.isIdleNode(node)) {
        const current = nodeCounts.get(nodeId) ?? 0;
        nodeCounts.set(nodeId, current + 1);
      }
    }
    return nodeCounts;
  }

  private appendUniqueChainFrames(
    frames: TraceStackFrame[],
    chain: TraceStackFrame[],
    seen: Set<string>
  ): void {
    for (const frame of chain) {
      if (!frame.scriptUrl) continue;
      const key = `${frame.scriptUrl}:${frame.lineNumber}`;
      if (!seen.has(key)) {
        seen.add(key);
        frames.push(frame);
      }
    }
  }

  private extractTopFrames(sortedNodeEntries: [number, number][]): TraceStackFrame[] {
    const frames: TraceStackFrame[] = [];
    const seen = new Set<string>();

    for (const [nodeId] of sortedNodeEntries) {
      const chain = this.buildCallChain(nodeId);
      this.appendUniqueChainFrames(frames, chain, seen);
      if (frames.length >= 10) break;
    }

    return frames;
  }

  /**
   * Resolve the JS call stack active during [startTs, endTs] (microseconds).
   * Returns the most common non-idle call frame(s) found in samples.
   */
  resolve(startTs: number, endTs: number): TraceStackFrame[] | undefined {
    if (!this.hasData()) return undefined;

    const startIdx = this.lowerBound(startTs);
    const endIdx = this.upperBound(endTs);
    if (startIdx >= endIdx) return undefined;

    const nodeCounts = this.countSampledNodes(startIdx, endIdx);
    if (nodeCounts.size === 0) return undefined;

    const sorted = [...nodeCounts.entries()].sort((a, b) => b[1] - a[1]);
    const frames = this.extractTopFrames(sorted);

    return frames.length > 0 ? frames.slice(0, 10) : undefined;
  }

  private processProfileEvent(evt: TraceEvent): void {
    const data = evt.args?.data;
    if (!data) return;

    const cpuProfile = data.cpuProfile;
    if (!cpuProfile) return;

    this.processProfileNodes(cpuProfile.nodes);
    this.processProfileSamples(cpuProfile.samples, data.timeDeltas, evt.ts || 0);
  }

  private processProfileNodes(nodes?: unknown): void {
    if (!Array.isArray(nodes)) return;
    for (const node of (nodes as any[])) {
      if (node?.id != null && node.callFrame) {
        this.nodes.set(node.id, node);
      }
    }
  }

  private processProfileSamples(samples?: unknown, timeDeltas?: unknown, baseTs = 0): void {
    if (!Array.isArray(samples) || !Array.isArray(timeDeltas)) return;
    let currentTs = baseTs;
    for (let i = 0; i < samples.length; i++) {
      currentTs += (timeDeltas[i] || 0);
      this.samples.push({ ts: currentTs, nodeId: samples[i] });
    }
  }

  private isIdleNode(node: ProfileNode): boolean {
    const fn = node.callFrame.functionName;
    return fn === '(idle)' || fn === '(root)' || fn === '(program)' || fn === '(garbage collector)';
  }

  private toStackFrame(node: ProfileNode): TraceStackFrame | null {
    if (this.isIdleNode(node) || !node.callFrame.url) return null;
    return {
      functionName: node.callFrame.functionName || '(anonymous)',
      scriptUrl: node.callFrame.url,
      lineNumber: Math.max(0, node.callFrame.lineNumber),
      columnNumber: Math.max(0, node.callFrame.columnNumber),
    };
  }

  /** Walk up the call tree from nodeId to root, collecting non-idle frames */
  private buildCallChain(nodeId: number): TraceStackFrame[] {
    const chain: TraceStackFrame[] = [];
    let current = this.nodes.get(nodeId);
    const visited = new Set<number>();

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      const frame = this.toStackFrame(current);
      if (frame) chain.push(frame);
      current = current.parent != null ? this.nodes.get(current.parent) : undefined;
    }

    return chain;
  }

  private lowerBound(ts: number): number {
    let lo = 0, hi = this.samples.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.samples[mid].ts < ts) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  private upperBound(ts: number): number {
    let lo = 0, hi = this.samples.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.samples[mid].ts <= ts) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
