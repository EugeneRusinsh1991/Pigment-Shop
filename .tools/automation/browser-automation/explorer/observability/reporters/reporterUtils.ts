import * as fs from 'fs';
import * as path from 'path';

export interface ReportFileInfo {
  reportsDir: string;
  timestamp: string;
  filepath: (extension: string) => string;
}

export function prepareReportFile(extension: string): { reportsDir: string; timestamp: string; filepath: string } {
  const reportsDir = path.resolve(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/T/, '-').replace(/:/g, '').split('.')[0];
  const filename = `run-${timestamp}.${extension}`;
  const filepath = path.join(reportsDir, filename);

  return { reportsDir, timestamp, filepath };
}
