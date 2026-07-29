/**
 * .cleaner/run-clean.cjs
 * Universal project cleaner that safely removes cache and temporary build directories.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");

const CLEAN_TARGETS = [
  ".expo",
  "dist",
  "web-build",
  "test-results",
  "playwright-report",
  "blob-report",
  ".auditor-reports",
  ".cache",
  "tmp",
  ".next",
  "coverage"
];

function removeRecursive(targetPath) {
  if (!fs.existsSync(targetPath)) return 0;
  let count = 0;
  try {
    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(targetPath);
      entries.forEach((entry) => {
        count += removeRecursive(path.join(targetPath, entry));
      });
      fs.rmdirSync(targetPath);
      count++;
    } else {
      fs.unlinkSync(targetPath);
      count++;
    }
  } catch (err) {}
  return count;
}

function cleanProject() {
  console.log("🧹 Running project cleaner...");
  let totalRemoved = 0;

  CLEAN_TARGETS.forEach((targetName) => {
    const targetPath = path.join(ROOT, targetName);
    if (fs.existsSync(targetPath)) {
      const removed = removeRecursive(targetPath);
      totalRemoved += removed;
      console.log(`  ✅ Removed ${targetName} (${removed} items)`);
    }
  });

  // Clean old temporary restore snapshots
  try {
    const entries = fs.readdirSync(ROOT);
    entries.forEach((entry) => {
      if (entry.startsWith("_backup_before_restore_")) {
        const fullPath = path.join(ROOT, entry);
        if (fs.statSync(fullPath).isDirectory()) {
          const removed = removeRecursive(fullPath);
          totalRemoved += removed;
          console.log(`  ✅ Removed snapshot ${entry} (${removed} items)`);
        }
      }
    });
  } catch (e) {}

  console.log(`\n✨ Cleaning complete! Total removed items: ${totalRemoved}`);
}

cleanProject();
