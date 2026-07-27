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

export function cleanOldReportsByType(reportsDir: string, maxFiles: number = MAX_REPORTS_PER_TYPE): void {
  if (!fs.existsSync(reportsDir)) {
    return;
  }

  const files = fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      name: f,
      path: path.join(reportsDir, f),
      time: fs.statSync(path.join(reportsDir, f)).mtime.getTime(),
      type: f.includes('admin') ? 'admin' : 'guest'
    }))
    .sort((a, b) => b.time - a.time); // Newest first

  // Separate by type and keep only maxFiles per type
  const adminFiles = files.filter(f => f.type === 'admin');
  const guestFiles = files.filter(f => f.type === 'guest');

  if (adminFiles.length > maxFiles) {
    const toDelete = adminFiles.slice(maxFiles);
    toDelete.forEach(file => {
      try {
        fs.unlinkSync(file.path);
        console.log(`🗑️  Deleted old admin report: ${file.name}`);
      } catch (error) {
        console.warn(`⚠️  Failed to delete ${file.name}:`, error);
      }
    });
  }

  if (guestFiles.length > maxFiles) {
    const toDelete = guestFiles.slice(maxFiles);
    toDelete.forEach(file => {
      try {
        fs.unlinkSync(file.path);
        console.log(`🗑️  Deleted old guest report: ${file.name}`);
      } catch (error) {
        console.warn(`⚠️  Failed to delete ${file.name}:`, error);
      }
    });
  }
}

export function cleanOldJsonReports(reportsDir: string, maxFiles: number = MAX_REPORTS_PER_TYPE): void {
  if (!fs.existsSync(reportsDir)) {
    return;
  }

  const files = fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      name: f,
      path: path.join(reportsDir, f),
      time: fs.statSync(path.join(reportsDir, f)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time); // Newest first

  if (files.length > maxFiles) {
    const toDelete = files.slice(maxFiles);
    toDelete.forEach(file => {
      try {
        fs.unlinkSync(file.path);
        console.log(`🗑️  Deleted old report: ${file.name}`);
      } catch (error) {
        console.warn(`⚠️  Failed to delete ${file.name}:`, error);
      }
    });
  }
}
