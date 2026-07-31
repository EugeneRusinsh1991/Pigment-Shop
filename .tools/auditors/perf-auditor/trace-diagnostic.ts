import { chromium } from 'playwright';

async function startTracing(cdp: any): Promise<void> {
  try {
    await cdp.send('Tracing.start', {
      categories: 'devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.stack',
      transferMode: 'ReportEvents',
    });
    console.log('[DIAG] Tracing.start succeeded with transferMode: ReportEvents');
  } catch (e: any) {
    console.error('[DIAG] Tracing.start with transferMode failed:', e.message);
    await cdp.send('Tracing.start', {
      categories: 'devtools.timeline,disabled-by-default-devtools.timeline',
    });
    console.log('[DIAG] Tracing.start succeeded without transferMode');
  }
}

async function simulateUserActivity(page: any, baseUrl: string): Promise<void> {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
  console.log('[DIAG] Page loaded. Waiting 5 seconds for activity...');
  await page.mouse.click(200, 300).catch(() => {});
  await new Promise(r => setTimeout(r, 5000));
}

function isDurationEvent(evt: any): boolean {
  return evt.ph === 'X' && Boolean(evt.dur && evt.dur > 0);
}

function hasStackTrace(evt: any): boolean {
  if (!evt.args || !evt.args.data) return false;
  return Boolean(evt.args.data.stackTrace);
}

function collectEventStats(chunks: any[]): { nameCount: Record<string, number>; xEvents: any[] } {
  const nameCount: Record<string, number> = {};
  const xEvents: any[] = [];
  for (const evt of chunks) {
    nameCount[evt.name] = (nameCount[evt.name] || 0) + 1;
    if (isDurationEvent(evt)) {
      xEvents.push({ name: evt.name, durMs: Math.round(evt.dur / 1000), hasStack: hasStackTrace(evt) });
    }
  }
  return { nameCount, xEvents };
}

function logEventDistributions(nameCount: Record<string, number>, xEvents: any[]): void {
  console.log('\n[DIAG] Event name distribution (top 20):');
  Object.entries(nameCount)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 20)
    .forEach(([name, count]) => console.log(`  ${name}: ${count}`));

  console.log(`\n[DIAG] Complete (X phase) events with duration: ${xEvents.length}`);
  const longEvents = xEvents.filter(e => e.durMs >= 1).sort((a, b) => b.durMs - a.durMs);
  console.log(`[DIAG] Events >= 1ms: ${longEvents.length}`);
  longEvents.slice(0, 15).forEach(e => console.log(`  ${e.name}: ${e.durMs}ms (hasStack=${e.hasStack})`));
}

function analyzeTraceChunks(chunks: any[]): void {
  const { nameCount, xEvents } = collectEventStats(chunks);
  logEventDistributions(nameCount, xEvents);
}

async function diagnose() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  const chunks: any[] = [];
  cdp.on('Tracing.dataCollected', (params: any) => {
    console.log(`[DIAG] Tracing.dataCollected fired with ${params.value?.length || 0} events`);
    if (Array.isArray(params.value)) chunks.push(...params.value);
  });
  cdp.on('Tracing.tracingComplete', () => {
    console.log(`[DIAG] Tracing.tracingComplete fired. Total chunks: ${chunks.length}`);
  });

  const baseUrl = process.env.BASE_URL || 'http://localhost:8081';
  console.log(`[DIAG] Navigating to ${baseUrl}...`);

  await startTracing(cdp);
  await simulateUserActivity(page, baseUrl);

  console.log('[DIAG] Stopping trace...');
  await cdp.send('Tracing.end');
  await new Promise(r => setTimeout(r, 3000));

  console.log(`[DIAG] Final chunk count: ${chunks.length}`);
  analyzeTraceChunks(chunks);

  await browser.close();
  process.exit(0);
}

diagnose().catch(e => { console.error(e); process.exit(1); });
