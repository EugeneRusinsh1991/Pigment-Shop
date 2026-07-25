const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/Admin/Users/UsersTableHeader.js',
  'src/components/Admin/Users/UserRow.js',
  'src/components/Admin/Products/ProductsTable.js',
  'src/components/Admin/Products/ProductRow.js',
  'src/components/Admin/Orders/OrdersTableControls.js',
  'src/components/Admin/Orders/OrdersTable.js',
  'src/components/Admin/Categories/CategoryTree.js',
  'src/components/Admin/Categories/CategoryRow.js',
  'src/components/Admin/Banners/BannersManager.js',
  'src/components/Admin/Analytics/DateRangePicker.js',
  'src/components/Admin/AdminPanel.js'
];

for (const file of filesToUpdate) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Calculate relative path to src/hooks/useIsMobile
  const depth = file.split('/').length - 1;
  const relativePrefix = '../'.repeat(depth - 1);
  const hookImport = `import { useIsMobile } from '${relativePrefix}hooks/useIsMobile';`;

  // For ProductRow, it takes width as prop, so we just use useIsMobile() inside.
  if (file.includes('ProductRow.js')) {
    content = `import { useIsMobile } from '${relativePrefix}hooks/useIsMobile';\n` + content;
    content = content.replace(/const isMobile = width < 768;/, 'const isMobile = useIsMobile();');
    changed = true;
  } else {
    // 2. Remove useWindowDimensions from react-native import if present
    if (content.includes('useWindowDimensions')) {
      content = content.replace(/,\s*useWindowDimensions/, '');
      content = content.replace(/useWindowDimensions,\s*/, '');
      content = content.replace(/\{\s*useWindowDimensions\s*\}/, '{}');
      
      const importMatch = content.match(/import.*?from 'react-native';/);
      if (importMatch) {
        content = content.replace(importMatch[0], `${importMatch[0]}\n${hookImport}`);
        changed = true;
      }
    }

    // 3. Replace the actual width logic
    if (content.includes('const { width } = useWindowDimensions();')) {
      content = content.replace(/\s*const { width } = useWindowDimensions\(\);\s*const isMobile = width < 768;/, '\n  const isMobile = useIsMobile();');
      content = content.replace(/\s*const { width } = useWindowDimensions\(\);\s*if \(width < 768\)/, '\n  const isMobile = useIsMobile();\n  if (isMobile)');
      content = content.replace(/\s*const { width } = useWindowDimensions\(\);\s*const isDesktop = width >= 768;/, '\n  const isMobile = useIsMobile();\n  const isDesktop = !isMobile;');
      // For ProductsTable
      content = content.replace(/const { width } = useWindowDimensions\(\);\s*const isMobile = width < 768;/, 'const { width } = useWindowDimensions();\n  const isMobile = useIsMobile();');
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
