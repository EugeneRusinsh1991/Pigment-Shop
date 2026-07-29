/**
 * .packer/run-pack.cjs
 * Universal project packer that packages clean codebase into a ZIP archive.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "../..");
const PARENT_DIR = path.dirname(ROOT);

function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;
}

function packProject() {
  const folderName = path.basename(ROOT);
  const zipName = `${folderName}_${getTimestamp()}.zip`;
  const destZipPath = path.join(PARENT_DIR, zipName);

  console.log("📦 Packaging clean project codebase...");
  console.log(`📂 Source: ${ROOT}`);
  console.log(`💾 Archive: ${destZipPath}\n`);

  const excludeItems = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".expo",
    "test-results",
    "playwright-report",
    ".auditor-reports",
    ".cache",
    "tmp",
    "coverage"
  ];

  try {
    if (process.platform === "win32") {
      const psExclude = excludeItems.map((i) => `'${i}'`).join(",");
      const command = `powershell -Command "Get-ChildItem -Path '${ROOT}' | Where-Object { ${psExclude} -notcontains $_.Name -and $_.Name -notlike '_backup_before_restore_*' -and $_.Name -notlike '*.zip' } | Compress-Archive -DestinationPath '${destZipPath}' -Force"`;
      execSync(command, { stdio: "inherit" });
    } else {
      const zipCmd = `zip -r "${destZipPath}" . -x "node_modules/*" ".git/*" "dist/*" "build/*" ".expo/*" "*.zip"`;
      execSync(zipCmd, { cwd: ROOT, stdio: "inherit" });
    }

    const stat = fs.statSync(destZipPath);
    const sizeMb = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`\n✨ Archive successfully created!`);
    console.log(`📂 Location: ${destZipPath}`);
    console.log(`📏 Archive Size: ${sizeMb} MB`);
  } catch (err) {
    console.error(`❌ Packaging failed: ${err.message}`);
    process.exit(1);
  }
}

packProject();
