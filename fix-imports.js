const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: 'src/components/domain/DataTable/DataTable.js',
    replacements: [
      { from: /from\s+['"]\.\.\/Text['"]/g, to: 'from \'../../ui/Text\'' },
      { from: /from\s+['"]\.\.\/Button['"]/g, to: 'from \'../../ui/Button\'' }
    ]
  },
  {
    file: 'src/components/domain/DataTable/EmptyState.js',
    replacements: [
      { from: /from\s+['"]\.\.\/Feedback['"]/g, to: 'from \'../../ui/Feedback\'' }
    ]
  },
  {
    file: 'src/components/domain/Flag/Flag.js',
    replacements: [
      { from: /from\s+['"]\.\.\/Text['"]/g, to: 'from \'../../ui/Text\'' }
    ]
  },
  {
    file: 'src/components/domain/Search/SearchDropdown.js',
    replacements: [
      { from: /from\s+['"]\.\.\/Text['"]/g, to: 'from \'../../ui/Text\'' },
      { from: /from\s+['"]\.\.\/Feedback['"]/g, to: 'from \'../../ui/Feedback\'' },
      { from: /from\s+['"]\.\.\/Button['"]/g, to: 'from \'../../ui/Button\'' }
    ]
  },
  {
    file: 'src/components/domain/Search/SearchInput.js',
    replacements: [
      { from: /from\s+['"]\.\.\/TextField['"]/g, to: 'from \'../../ui/TextField\'' },
      { from: /from\s+['"]\.\.\/Icons['"]/g, to: 'from \'../../Icons\'' },
      { from: /from\s+['"]\.\.\/Button['"]/g, to: 'from \'../../ui/Button\'' }
    ]
  },
  {
    file: 'src/components/ui/Card/Card.js',
    replacements: [
      { from: /from\s+['"]\.\.\/Flag['"]/g, to: 'from \'../../domain/Flag\'' }
    ]
  },
  {
    file: 'src/components/ui/Card/NavigationCard.js',
    replacements: [
      { from: /from\s+['"]\.\.\/Icons\/ControlIcons['"]/g, to: 'from \'../../Icons/ControlIcons\'' }
    ]
  }
];

fixes.forEach(fix => {
  const fullPath = path.resolve(fix.file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    fix.replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });
    fs.writeFileSync(fullPath, content);
    console.log('Fixed', fix.file);
  }
});

// Feedback directory recursive fixes
const feedbackDir = path.resolve('src/components/ui/Feedback');
function fixFeedback(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(entry => {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      fixFeedback(fullPath);
    } else if (fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      if (content.includes('from \'../../../theme/tokens\'')) {
        content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/theme\/tokens['"]/g, 'from \'../../../../theme/tokens\'');
        changed = true;
      }
      if (content.includes('from "../../../theme/tokens"')) {
        content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/theme\/tokens['"]/g, 'from "../../../../theme/tokens"');
        changed = true;
      }
      if (content.includes('from \'../../../context/ThemeContext\'')) {
        content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/context\/ThemeContext['"]/g, 'from \'../../../../context/ThemeContext\'');
        changed = true;
      }
      if (content.includes('from "../../../context/ThemeContext"')) {
        content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/context\/ThemeContext['"]/g, 'from "../../../../context/ThemeContext"');
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  });
}
fixFeedback(feedbackDir);
