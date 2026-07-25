import * as fs from 'fs';
import * as path from 'path';
import { SmokeReport } from './SmokeReport';

export class SmokeReportPrinter {
  public static formatUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return parsed.pathname || '/';
    } catch {
      return url;
    }
  }

  public static formatElement(id: string): string {
    if (id.startsWith('link|')) {
      const parts = id.split('|');
      return `Link "${parts[2] || parts[1]}"`;
    }
    if (id.startsWith('testid|')) return `Element "${id.replace('testid|', '')}"`;
    if (id.startsWith('btn|')) return `Button "${id.replace('btn|', '')}"`;
    if (id.startsWith('class|')) return `Class "${id.replace('class|', '')}"`;
    return `Element "${id}"`;
  }

  public static logFailure(category: string, errorType: string, screen: string, currentElement: string, errorMessage: string) {
    console.log(`\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m`);
    console.log(`🔴 \x1b[91m\x1b[1m${category}: ${errorType}\x1b[0m\n`);
    console.log(`Screen\n\x1b[96m${SmokeReportPrinter.formatUrl(screen)}\x1b[0m\n`);
    console.log(`Interaction\n${SmokeReportPrinter.formatElement(currentElement)}\n`);
    console.log(`Reason\n${errorMessage}\n`);
    console.log(`Recovery\n\x1b[90mExplorer continued successfully.\x1b[0m`);
    console.log(`\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n`);
  }

  public static logWarning(screen: string, errorType: string, errorMessage: string) {
    const isNoiseWarning = errorMessage.includes('pointerEvents is deprecated') ||
                           errorMessage.includes('shadow*') ||
                           errorMessage.includes('Failed to load resource');

    if (!isNoiseWarning) {
      console.log(`\n⚠️ \x1b[33m${errorType}\x1b[0m`);
      console.log(`Screen: ${SmokeReportPrinter.formatUrl(screen)}`);
      console.log(`Reason: ${errorMessage}\n`);
    }
  }

  public static saveReportToDisk(report: SmokeReport) {
    try {
      const reportsDir = path.join(__dirname, '..', '..', 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      const filePath = path.join(reportsDir, 'smoke-report.json');
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf-8');
    } catch {
      // Ignore write errors
    }
  }

  public static printConsoleReport(report: SmokeReport, visitedScreensList: string[]) {
    console.log('\n================ SMOKE REPORT ================');
    
    const screensWithFailures = new Set(report.failures.map(f => f.screen));
    
    visitedScreensList.forEach(screen => {
      const cleanPath = SmokeReportPrinter.formatUrl(screen);
      if (screensWithFailures.has(screen)) {
        console.log(`❌ ${cleanPath}`);
      } else {
        console.log(`✅ ${cleanPath}`);
      }
    });

    const elapsedSeconds = Math.floor(report.summary.executionDurationMs / 1000);
    const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const seconds = String(elapsedSeconds % 60).padStart(2, '0');
    const explorerPass = report.summary.errors === 0;
    const smokePass = report.summary.errors === 0;
    
    const pad = (str: string, len: number) => str.padEnd(len, ' ');

    console.log('\n==============================================');
    console.log(`${pad('Explorer', 20)} ${explorerPass ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`${pad('Smoke', 20)} ${smokePass ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`${pad('Visited Screens', 20)} ${report.summary.visitedScreens}`);
    console.log(`${pad('Visited Elements', 20)} ${report.summary.visitedInteractions}`);
    console.log(`${pad('Interactions', 20)} ${report.summary.successfulInteractions + report.summary.failedInteractions}`);
    console.log(`${pad('Errors', 20)} ${report.summary.errors}`);
    console.log(`${pad('Warnings', 20)} ${report.summary.warnings}`);
    console.log(`${pad('Duration', 20)} ${minutes}:${seconds}`);
    console.log(`${pad('Coverage', 20)} N/A`);
    console.log(`${pad('JSON Report', 20)} browser-automation/reports/smoke-report.json`);
    console.log('==============================================\n');

    if (report.failures.length > 0) {
      console.log('❌ ERRORS BREAKDOWN:');
      report.failures.forEach((f, i) => {
        console.log(`  ${i + 1}. [${SmokeReportPrinter.formatUrl(f.screen)}] ${f.errorType}: ${f.errorMessage}`);
      });
      console.log('');
    }

    if (report.warnings.length > 0) {
      console.log('⚠️ WARNINGS BREAKDOWN:');
      report.warnings.forEach((w, i) => {
        console.log(`  ${i + 1}. [${SmokeReportPrinter.formatUrl(w.screen)}] ${w.errorType}: ${w.errorMessage}`);
      });
      console.log('');
    }
  }
}
