const fs = require('fs');
const readline = require('readline');
const path = require('path');

function extractTargetFile(content) {
  if (!content.includes('File Path: `file:///d:/Magazine/_PigmentShop/.docs/07-refactoring-roadmap.md`') &&
      !content.includes('File Path: `file:///d:/Magazine/_PigmentShop/.docs/WPs/')) {
    return null;
  }
  
  if (content.includes('.docs/WPs/')) {
    const matchFile = content.match(/File Path: `file:\/\/\/d:\/Magazine\/_PigmentShop\/\.docs\/WPs\/(WP-[^\.]+)\.md`/);
    if (matchFile) return `WPs/${matchFile[1]}.md`;
  }
  
  return '07-refactoring-roadmap.md';
}

function parseContentLines(content, fileLines, targetFile) {
  if (!fileLines[targetFile]) fileLines[targetFile] = {};

  const lines = content.split('\n');
  for (const l of lines) {
    const match = l.match(/^(\d+):\s(.*)$/);
    if (match) {
      const lineNum = parseInt(match[1], 10);
      fileLines[targetFile][lineNum] = match[2];
    }
  }
}

function processTranscriptLine(line, fileLines) {
  if (!line.includes('VIEW_FILE')) return;
  try {
    const entry = JSON.parse(line);
    if (entry.type !== 'VIEW_FILE' || !entry.content) return;
    const targetFile = extractTargetFile(entry.content);
    if (targetFile) {
      parseContentLines(entry.content, fileLines, targetFile);
    }
  } catch (e) {}
}

async function processTranscriptFile(transcriptPath, fileLines) {
  if (!fs.existsSync(transcriptPath)) return;

  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    processTranscriptLine(line, fileLines);
  }
}

function writeReconstructedFiles(fileLines, outDir) {
  for (const file of Object.keys(fileLines)) {
    const linesObj = fileLines[file];
    const maxLine = Math.max(...Object.keys(linesObj).map(Number));
    const reconstructed = [];
    let missingCount = 0;
    for (let i = 1; i <= maxLine; i++) {
      if (linesObj[i] !== undefined) {
          reconstructed.push(linesObj[i]);
      } else {
          reconstructed.push(`<!-- MISSING LINE ${i} -->`);
          missingCount++;
      }
    }
    
    if (file.includes('WPs/')) {
       if (!fs.existsSync(path.join(outDir, 'WPs'))) fs.mkdirSync(path.join(outDir, 'WPs'));
    }
    fs.writeFileSync(path.join(outDir, file), reconstructed.join('\n'), 'utf8');
    console.log(`Reconstructed ${file}: found ${Object.keys(linesObj).length} lines out of ${maxLine} (Missing: ${missingCount}).`);
  }
}

async function reconstructStrict() {
  const brainDir = 'C:\\Users\\Eugene\\.gemini\\antigravity-ide\\brain';
  const dirs = fs.readdirSync(brainDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const outDir = 'd:\\Magazine\\_PigmentShop\\.docs';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileLines = {};

  for (const dir of dirs) {
    const transcriptPath = path.join(brainDir, dir, '.system_generated', 'logs', 'transcript_full.jsonl');
    await processTranscriptFile(transcriptPath, fileLines);
  }

  writeReconstructedFiles(fileLines, outDir);
}

reconstructStrict();
