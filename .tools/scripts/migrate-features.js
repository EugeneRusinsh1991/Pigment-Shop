const fs = require('fs');
const path = require('path');

const moveMappings = {
  "src/components/Catalog/CategoryFilterList.js": "src/features/catalog/CategoryFilterList.js",
  "src/components/Catalog/GridHeaderFooter.js": "src/features/catalog/GridHeaderFooter.js",
  "src/components/Catalog/PriceRangeSlider.js": "src/features/catalog/PriceRangeSlider.js",
  "src/components/Catalog/SidebarContent.js": "src/features/catalog/SidebarContent.js",
  "src/components/Catalog/SidebarUIComponents.js": "src/features/catalog/SidebarUIComponents.js",
  "src/components/Catalog/useCatalogFilters.js": "src/features/catalog/useCatalogFilters.js",
  "src/components/Catalog/usePaginatedCatalog.js": "src/features/catalog/usePaginatedCatalog.js",
  "src/components/ProductPage/useReviewsState.js": "src/features/product/useReviewsState.js"
};

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Move files
Object.entries(moveMappings).forEach(([oldPath, newPath]) => {
  const fullOldPath = path.join(ROOT_DIR, oldPath);
  const fullNewPath = path.join(ROOT_DIR, newPath);

  if (fs.existsSync(fullOldPath)) {
    fs.mkdirSync(path.dirname(fullNewPath), { recursive: true });
    fs.renameSync(fullOldPath, fullNewPath);
    console.log(`Moved ${oldPath} to ${newPath}`);
  }
});

// Remove empty directories
const dirsToRemove = [
  "src/components/Catalog",
  "src/components/ProductPage"
];
dirsToRemove.forEach(dir => {
  const fullDir = path.join(ROOT_DIR, dir);
  if (fs.existsSync(fullDir)) {
    try {
      fs.rmdirSync(fullDir);
    } catch(e) {
      console.warn(`Could not remove ${dir}`);
    }
  }
});

function getMappedPath(absolutePath) {
    for (const [oldRel, newRel] of Object.entries(moveMappings)) {
        const oldAbs = path.join(ROOT_DIR, oldRel).replace(/\.js$/, '');
        const oldAbsFull = path.join(ROOT_DIR, oldRel);
        if (absolutePath === oldAbs || absolutePath === oldAbsFull) {
            return path.join(ROOT_DIR, newRel).replace(/\.js$/, '');
        }
    }
    return null;
}

function processFile(filePath, oldFilePath = null) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.ts') && !filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /(import\s+.*?from\s+['"])(.*?)(['"])/g;
    const dynamicImportRegex = /(import\(['"])(.*?)(['"]\))/g;
    const requireRegex = /(require\(['"])(.*?)(['"]\))/g;
    
    const replaceFn = (match, p1, p2, p3) => {
        if (!p2.startsWith('.')) return match;

        let absoluteTarget;
        if (oldFilePath) {
            const oldDir = path.dirname(oldFilePath);
            absoluteTarget = path.resolve(oldDir, p2);
        } else {
            const currentDir = path.dirname(filePath);
            absoluteTarget = path.resolve(currentDir, p2);
        }

        let finalTargetAbs = getMappedPath(absoluteTarget) || absoluteTarget;
        
        const currentDir = path.dirname(filePath);
        let newRel = path.relative(currentDir, finalTargetAbs).replace(/\\/g, '/');
        if (!newRel.startsWith('.')) {
            newRel = './' + newRel;
        }
        
        if (newRel !== p2) {
            return `${p1}${newRel}${p3}`;
        }
        return match;
    };

    const newContent = content
        .replace(importRegex, replaceFn)
        .replace(dynamicImportRegex, replaceFn)
        .replace(requireRegex, replaceFn);

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated imports in ${filePath}`);
    }
}

Object.entries(moveMappings).forEach(([oldRel, newRel]) => {
    const fullNewPath = path.join(ROOT_DIR, newRel);
    const fullOldPath = path.join(ROOT_DIR, oldRel);
    if (fs.existsSync(fullNewPath)) {
        processFile(fullNewPath, fullOldPath);
    }
});

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walkDir(fullPath);
        } else {
            const isMoved = Object.values(moveMappings).some(newRel => path.join(ROOT_DIR, newRel) === fullPath);
            if (!isMoved) {
                processFile(fullPath);
            }
        }
    });
}

walkDir(path.join(ROOT_DIR, 'src'));
walkDir(path.join(ROOT_DIR, 'app'));

console.log("Migration script phase 2 complete.");
