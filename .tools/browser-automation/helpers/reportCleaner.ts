import * as fs from 'fs';
import * as path from 'path';

const MAX_REPORTS_PER_TYPE = 3; // Keep 3 reports per type (admin/guest)

export function clearReportsDirectory(reportsDir: string): void {
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    return;
  }

  const files = fs.readdirSync(reportsDir);
  files.forEach(file => {
    const filePath = path.join(reportsDir, file);
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Cleared report: ${file}`);
    } catch (error) {
      console.warn(`⚠️  Failed to delete ${file}:`, error);
    }
  });
}

function deleteFiles(files: { path: string; name: string }[], label: string): void {
  files.forEach(file => {
    try {
      fs.unlinkSync(file.path);
      console.log(`🗑️  Deleted old ${label}: ${file.name}`);
    } catch (error) {
      console.warn(`⚠️  Failed to delete ${file.name}:`, error);
    }
  });
}

function getSortedJsonFiles(reportsDir: string): { name: string; path: string; time: number }[] {
  if (!fs.existsSync(reportsDir)) return [];
  return fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      name: f,
      path: path.join(reportsDir, f),
      time: fs.statSync(path.join(reportsDir, f)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);
}

export function cleanOldReportsByType(reportsDir: string, maxFiles: number = MAX_REPORTS_PER_TYPE): void {
  const files = getSortedJsonFiles(reportsDir).map(f => ({
    ...f,
    type: f.name.includes('admin') ? 'admin' : 'guest'
  }));

  const adminFiles = files.filter(f => f.type === 'admin');
  const guestFiles = files.filter(f => f.type === 'guest');

  if (adminFiles.length > maxFiles) {
    deleteFiles(adminFiles.slice(maxFiles), 'admin report');
  }

  if (guestFiles.length > maxFiles) {
    deleteFiles(guestFiles.slice(maxFiles), 'guest report');
  }
}

export function cleanOldJsonReports(reportsDir: string, maxFiles: number = MAX_REPORTS_PER_TYPE): void {
  const files = getSortedJsonFiles(reportsDir);

  if (files.length > maxFiles) {
    deleteFiles(files.slice(maxFiles), 'report');
  }
}
