const fs = require('fs');
const path = require('path');

const targetFiles = [
  'src/components/Text/Text.js',
  'src/components/Text/Heading.js',
  'src/features/shell/components/Footer.js',
  'src/features/shell/AppHeader/AppHeaderLogo.js',
  'src/features/orders/OrdersPageStyles.js',
  'src/features/favorites/FavoritesPageStyles.js',
  'src/features/profile/ProfilePageStyles.js',
  'src/features/product/ProductReviewsStyles.js',
  'src/features/contact/SocialButtons.js',
  'src/features/home/components/FeaturedSections.js',
  'src/features/home/components/HeroCarousel/carouselStyles.js',
  'src/features/catalog/CategoryCard.js',
  'src/features/cart/CartViewStyles.js',
  'src/features/cart/CartItem.js',
  'src/features/auth/LoginPageStyles.js',
  'src/features/contact/ContactPageStyles.js',
  'src/features/contact/ContactQuestionForm.js',
];

const forbiddenPatterns = [
  /fontSize:\s*\d+/,
  /fontWeight:\s*['"]?\d+['"]?/,
  /fontWeight:\s*['"]bold['"]/,
  /fontFamily:\s*/,
];

let errorsFound = 0;
const rootDir = path.resolve(__dirname, '..');

console.log('--- Typography Standardization Verification ---');

targetFiles.forEach((relPath) => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[MISSING] File not found: ${relPath}`);
    errorsFound++;
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const isPrimitiveFile = relPath.includes('src/components/Text/');

  if (!isPrimitiveFile) {
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      forbiddenPatterns.forEach((pattern) => {
        if (pattern.test(line)) {
          console.error(`[TYPOGRAPHY OVERRIDE] ${relPath}:${index + 1} -> ${line.trim()}`);
          errorsFound++;
        }
      });
    });
  }
});

if (errorsFound === 0) {
  console.log('SUCCESS: All audited target files comply with typography standardization!');
  process.exit(0);
} else {
  console.error(`FAILED: Found ${errorsFound} typography override issues.`);
  process.exit(1);
}
