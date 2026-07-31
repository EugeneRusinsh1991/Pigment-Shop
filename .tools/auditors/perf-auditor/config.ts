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

export function loadConfig(override: Partial<PerfAuditConfig> = {}): PerfAuditConfig {
  let cliThreshold;
  const thresholdArg = process.argv.find(arg => arg.startsWith('--threshold='));
  if (thresholdArg) {
    cliThreshold = Number(thresholdArg.split('=')[1]);
  }
  const lagThresholdMs = cliThreshold || Number(process.env.LAG_THRESHOLD_MS) || override.lagThresholdMs || 1;
  
  const interactive = process.env.LAG_INTERACTIVE === 'true' || override.interactive || false;
  const enableCDPProfiler = process.env.ENABLE_CDP_PROFILER !== 'false' && (override.enableCDPProfiler !== false);
  const rootDir = process.cwd();
  const logsDir = path.join(rootDir, '.logs', 'perf-audit');

  return {
    lagThresholdMs,
    interactive,
    logsDir,
    outputDir: path.join(logsDir, 'latest'),
    screenshotOnLag: override.screenshotOnLag ?? true,
    enableCDPProfiler,
    enableCDPTracing: override.enableCDPTracing ?? (process.env.ENABLE_CDP_TRACING !== 'false'),
    traceFlushIntervalMs: Number(process.env.TRACE_FLUSH_INTERVAL_MS) || override.traceFlushIntervalMs || 2000,
  };
}
