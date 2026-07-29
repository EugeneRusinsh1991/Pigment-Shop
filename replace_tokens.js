const fs = require('fs');
const path = require('path');

const replacements = {
  'colors.neutralLightFaint': 'colors.surfaceSubtleLight',
  'colors.neutralLightMax': 'colors.surfaceSubtleLight',
  'colors.neutralLightMid': 'colors.borderLight',
  'colors.neutralLightStrong': 'colors.borderLight',
  'colors.neutralDarkFaint': 'colors.surfaceSubtleDark',
  'colors.neutralDarkMid': 'colors.surfaceSubtleDark',
  'colors.borderLightAlt': 'colors.borderLight',
  'colors.borderDarkAlt': 'colors.borderDark',
  'colors.surfaceNeutralLight': 'colors.surfaceSubtleLight',
  'colors.dangerSoftDarkBgAlt': 'colors.dangerSoftDarkBg',
  'colors.chipLightInactiveBorder': 'colors.borderLight',
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;

walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  // skip tokens.js itself!
  if (filePath.includes('tokens.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  for (const [oldKey, newKey] of Object.entries(replacements)) {
    // regex to match the exact property access
    const regex = new RegExp(oldKey.replace(/\./g, '\\.'), 'g');
    newContent = newContent.replace(regex, newKey);
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modifiedCount++;
    console.log(`Updated: ${filePath}`);
  }
});

console.log(`\nReplaced legacy tokens in ${modifiedCount} files.`);
