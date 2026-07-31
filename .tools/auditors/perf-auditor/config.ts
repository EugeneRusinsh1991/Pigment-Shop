import path from 'path';

export interface PerfAuditConfig {
  lagThresholdMs: number;
  interactive: boolean;
  logsDir: string;
  outputDir: string;
  screenshotOnLag: boolean;
  enableCDPProfiler: boolean;
  enableCDPTracing: boolean;
  traceFlushIntervalMs: number;
}

function resolveLagThresholdMs(override: Partial<PerfAuditConfig>): number {
  const thresholdArg = process.argv.find(arg => arg.startsWith('--threshold='));
  const cliThreshold = thresholdArg ? Number(thresholdArg.split('=')[1]) : undefined;
  return cliThreshold || Number(process.env.LAG_THRESHOLD_MS) || override.lagThresholdMs || 100;
}

function resolveInteractive(override: Partial<PerfAuditConfig>): boolean {
  return process.env.LAG_INTERACTIVE === 'true' || override.interactive || false;
}

function resolveEnableCDPProfiler(override: Partial<PerfAuditConfig>): boolean {
  return process.env.ENABLE_CDP_PROFILER !== 'false' && (override.enableCDPProfiler !== false);
}

function resolveEnableCDPTracing(override: Partial<PerfAuditConfig>): boolean {
  return override.enableCDPTracing ?? (process.env.ENABLE_CDP_TRACING !== 'false');
}

function resolveTraceFlushIntervalMs(override: Partial<PerfAuditConfig>): number {
  return Number(process.env.TRACE_FLUSH_INTERVAL_MS) || override.traceFlushIntervalMs || 2000;
}

export function loadConfig(override: Partial<PerfAuditConfig> = {}): PerfAuditConfig {
  const rootDir = process.cwd();
  const logsDir = path.join(rootDir, '.logs', 'perf-audit');

  return {
    lagThresholdMs: resolveLagThresholdMs(override),
    interactive: resolveInteractive(override),
    logsDir,
    outputDir: path.join(logsDir, 'latest'),
    screenshotOnLag: override.screenshotOnLag ?? true,
    enableCDPProfiler: resolveEnableCDPProfiler(override),
    enableCDPTracing: resolveEnableCDPTracing(override),
    traceFlushIntervalMs: resolveTraceFlushIntervalMs(override),
  };
}
