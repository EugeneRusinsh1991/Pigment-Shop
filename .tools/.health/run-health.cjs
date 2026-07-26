/**
 * .health/run-health.cjs
 * Universal environment and project integrity checker.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../..");

function checkEnvironment() {
  console.log("🩺 Checking Node environment...");
  console.log(`  - Node.js version: ${process.version}`);
  console.log(`  - Platform: ${process.platform} (${process.arch})`);
}

function checkPackageJson() {
  const pkgPath = path.join(ROOT, "package.json");
  if (!fs.existsSync(pkgPath)) {
    console.log("  ℹ️  No package.json found in project root.");
    return;
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    console.log(`  ✅ package.json valid (Name: ${pkg.name || "N/A"}, Version: ${pkg.version || "N/A"})`);
    
    const depsCount = Object.keys(pkg.dependencies || {}).length;
    const devDepsCount = Object.keys(pkg.devDependencies || {}).length;
    console.log(`  📊 Dependencies: ${depsCount} prod, ${devDepsCount} dev`);
  } catch (err) {
    console.error(`  ❌ Invalid package.json: ${err.message}`);
  }
}

function checkEnvVariables() {
  console.log("\n🔑 Checking environment variables...");
  const envPath = path.join(ROOT, ".env");
  const envExamplePath = path.join(ROOT, ".env.example");

  if (!fs.existsSync(envPath) && !fs.existsSync(envExamplePath)) {
    console.log("  ℹ️  No .env or .env.example files present.");
    return;
  }

  function parseEnvKeys(filePath) {
    if (!fs.existsSync(filePath)) return new Set();
    const content = fs.readFileSync(filePath, "utf-8");
    const keys = new Set();
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const key = trimmed.split("=")[0].trim();
        if (key) keys.add(key);
      }
    });
    return keys;
  }

  const envKeys = parseEnvKeys(envPath);
  const exampleKeys = parseEnvKeys(envExamplePath);

  if (exampleKeys.size > 0) {
    const missingInEnv = [...exampleKeys].filter((k) => !envKeys.has(k));
    if (missingInEnv.length > 0) {
      console.warn(`  ⚠️  Missing keys in .env (defined in .env.example): ${missingInEnv.join(", ")}`);
    } else {
      console.log("  ✅ All keys from .env.example are present in .env");
    }
  } else {
    console.log(`  ✅ .env found with ${envKeys.size} keys.`);
  }
}

const SCAN_EXTENSIONS = /\.(js|jsx|ts|tsx|cjs|mjs)$/;
const IMPORT_EXTENSIONS = ["", ".js", ".ts", ".jsx", ".tsx", ".cjs", "/index.js", "/index.ts"];
const SKIP_DIRS = new Set(["node_modules", ".git", ".tools", "dist", "build", ".expo"]);

function checkFileImports(fullPath, counters) {
  counters.checked++;
  const content = fs.readFileSync(fullPath, "utf-8");
  const importRegex = /(?:import|require)\(['"](\.[^'"]+)['"]\)/g;
  const resolvedDir = path.dirname(fullPath);
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const targetBase = path.resolve(resolvedDir, match[1]);
    if (!IMPORT_EXTENSIONS.some((ext) => fs.existsSync(targetBase + ext))) {
      counters.broken++;
      console.warn(`  ⚠️  Broken import '${match[1]}' in ${path.relative(ROOT, fullPath)}`);
    }
  }
}

function checkBrokenImports() {
  console.log("\n🔍 Scanning relative imports integrity...");
  const counters = { checked: 0, broken: 0 };

  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    let entries = [];
    try { entries = fs.readdirSync(dir); } catch (e) { return; }

    entries.forEach((entry) => {
      if (SKIP_DIRS.has(entry)) return;
      const fullPath = path.join(dir, entry);
      let stat;
      try { stat = fs.statSync(fullPath); } catch (e) { return; }
      if (stat.isDirectory()) scan(fullPath);
      else if (SCAN_EXTENSIONS.test(entry)) checkFileImports(fullPath, counters);
    });
  }

  scan(ROOT);
  console.log(`  📊 Scanned ${counters.checked} JS/TS files. Found ${counters.broken} broken relative import(s).`);
}


function runHealthCheck() {
  console.log("=========================================");
  console.log("       🩺 .TOOLS HEALTH CHECKER          ");
  console.log("=========================================\n");

  checkEnvironment();
  checkPackageJson();
  checkEnvVariables();
  checkBrokenImports();

  console.log("\n=========================================");
}

runHealthCheck();
