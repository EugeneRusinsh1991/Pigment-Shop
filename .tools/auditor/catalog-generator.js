const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const ROOT = path.resolve(__dirname, '../../');
const SRC_DIR = path.resolve(ROOT, 'src');
const AUDITS_DIR = path.resolve(ROOT, '.docs/audits/catalog-inventory');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function parseFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  try {
    return parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  } catch (e) {
    return null;
  }
}

function generateSubReport(title, description, items, formatter) {
  let md = `# ${title}\n\n`;
  md += `> ${description}\n\n`;
  md += `**Total items found:** ${items.length}\n\n`;
  md += `---\n\n`;

  if (items.length === 0) {
    md += `*No items found for this category.*\n`;
    return md;
  }

  // Group by file
  const grouped = {};
  items.forEach(item => {
    if (!grouped[item.file]) grouped[item.file] = [];
    grouped[item.file].push(item);
  });

  Object.keys(grouped).sort().forEach(file => {
    md += `### File: ${file}\n\n`;
    grouped[file].forEach(item => {
      md += formatter(item, file);
    });
    md += `\n`;
  });

  return md;
}

function runCatalogGenerator(disableDynamicAudits = false) {
  if (disableDynamicAudits) {
    console.log('[Catalog Generator] Skipped (dynamic audits disabled)');
    return;
  }

  ensureDir(AUDITS_DIR);
  const files = getAllFiles(SRC_DIR);

  const catalog = {
    texts: [],
    cards: [],
    buttons: [],
    icons: [],
    inputs: [],
  };

  files.forEach((filePath) => {
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
    const ast = parseFile(filePath);
    if (!ast) return;

    traverse(ast, {
      JSXElement(nodePath) {
        const name = nodePath.node.openingElement.name.name;
        if (!name) return;

        const line = nodePath.node.loc ? nodePath.node.loc.start.line : 1;

        // 1. Text elements
        if (name === 'Text' || name.endsWith('Text') || name === 'Typography') {
          let content = '';
          nodePath.node.children.forEach((child) => {
            if (child.type === 'JSXText') {
              const text = child.value.trim();
              if (text) content += text + ' ';
            } else if (child.type === 'JSXExpressionContainer' && child.expression.type === 'StringLiteral') {
              content += child.expression.value + ' ';
            }
          });
          catalog.texts.push({ file: relPath, line, component: name, content: content.trim() || '[Dynamic Content]' });
        }

        // 2. Card elements
        if (name.includes('Card') || name.includes('Container') || name.includes('Sheet')) {
          catalog.cards.push({ file: relPath, line, component: name });
        }

        // 3. Button elements
        if (name.includes('Button') || name.includes('TouchableOpacity') || name.includes('Pressable')) {
          catalog.buttons.push({ file: relPath, line, component: name });
        }

        // 4. Icons
        if (name.includes('Icon') || name.endsWith('Icon')) {
          const nameAttr = nodePath.node.openingElement.attributes.find(a => a.name && a.name.name === 'name');
          const iconName = nameAttr && nameAttr.value ? (nameAttr.value.value || '[Dynamic]') : '[Unknown]';
          catalog.icons.push({ file: relPath, line, component: name, iconName });
        }

        // 5. Inputs
        if (name.includes('Input') || name.includes('TextField') || name.includes('Select')) {
          catalog.inputs.push({ file: relPath, line, component: name });
        }
      }
    });
  });

  // Generate 01-texts-catalog.md
  const textsMd = generateSubReport(
    '01. Text & Typography Catalog',
    'Catalog of all Text, Typography, and related components rendering textual content.',
    catalog.texts,
    (item, file) => `  - Line ${item.line}: \`<${item.component}>\` -> \`${item.content}\`\n`
  );
  fs.writeFileSync(path.join(AUDITS_DIR, '01-texts-catalog.md'), textsMd, 'utf-8');

  // Generate 02-cards-catalog.md
  const cardsMd = generateSubReport(
    '02. Cards & Containers Catalog',
    'Catalog of structural layout cards, containers, modal sheets, and wrappers.',
    catalog.cards,
    (item, file) => `  - Line ${item.line}: \`<${item.component}>\`\n`
  );
  fs.writeFileSync(path.join(AUDITS_DIR, '02-cards-catalog.md'), cardsMd, 'utf-8');

  // Generate 03-buttons-catalog.md
  const buttonsMd = generateSubReport(
    '03. Buttons & Interactive Elements Catalog',
    'Catalog of pressable UI elements including Buttons, Touchables, and Pressables.',
    catalog.buttons,
    (item, file) => `  - Line ${item.line}: \`<${item.component}>\`\n`
  );
  fs.writeFileSync(path.join(AUDITS_DIR, '03-buttons-catalog.md'), buttonsMd, 'utf-8');

  // Generate 04-icons-catalog.md
  const iconsMd = generateSubReport(
    '04. Icons Inventory Catalog',
    'Catalog of vector icons and icon component declarations.',
    catalog.icons,
    (item, file) => `  - Line ${item.line}: \`<${item.component}>\` (Icon: \`${item.iconName}\`)\n`
  );
  fs.writeFileSync(path.join(AUDITS_DIR, '04-icons-catalog.md'), iconsMd, 'utf-8');

  // Generate 05-inputs-catalog.md
  const inputsMd = generateSubReport(
    '05. Inputs & Form Controls Catalog',
    'Catalog of form fields, text inputs, selects, and controls.',
    catalog.inputs,
    (item, file) => `  - Line ${item.line}: \`<${item.component}>\`\n`
  );
  fs.writeFileSync(path.join(AUDITS_DIR, '05-inputs-catalog.md'), inputsMd, 'utf-8');

  // Generate Index README.md inside catalog-inventory
  let indexMd = `# Codebase UI Inventory Catalog Index\n\n`;
  indexMd += `> Comprehensive auto-generated catalog of UI elements across the codebase.\n\n`;
  indexMd += `### Sub-Catalogs:\n`;
  indexMd += `- [01-texts-catalog.md](01-texts-catalog.md) — Text & Typography Elements (${catalog.texts.length} items)\n`;
  indexMd += `- [02-cards-catalog.md](02-cards-catalog.md) — Cards & Containers (${catalog.cards.length} items)\n`;
  indexMd += `- [03-buttons-catalog.md](03-buttons-catalog.md) — Buttons & Touchables (${catalog.buttons.length} items)\n`;
  indexMd += `- [04-icons-catalog.md](04-icons-catalog.md) — Icons Inventory (${catalog.icons.length} items)\n`;
  indexMd += `- [05-inputs-catalog.md](05-inputs-catalog.md) — Form Inputs & Controls (${catalog.inputs.length} items)\n`;

  fs.writeFileSync(path.join(AUDITS_DIR, 'README.md'), indexMd, 'utf-8');
  if (fs.existsSync(path.join(AUDITS_DIR, 'catalog-inventory.md'))) {
    fs.unlinkSync(path.join(AUDITS_DIR, 'catalog-inventory.md'));
  }

  console.log(`[Catalog Generator] Clean sub-reports generated inside .docs/audits/catalog-inventory/`);
}

if (require.main === module) {
  runCatalogGenerator();
}

module.exports = { runCatalogGenerator };
