import { delay, isElementVisible } from '../utils/domHelpers';

export { getCategoryLinks, navigateDeeper, scrollLeafPage } from './crawlerCategoryNav';
export { getBreadcrumbItems, backtrackBreadcrumbs } from './crawlerBreadcrumbs';

export function initCrawlerTask(activeTaskRef) {
  if (activeTaskRef.current === 'crawler') {
    console.log('[Alt+3] Canceling catalog crawler...');
    activeTaskRef.current = null;
    return false;
  }
  activeTaskRef.current = 'crawler';
  return true;
}

export async function openFirstProductDetail(productLinks) {
  if (!productLinks || productLinks.length === 0) return;
  const firstProd = productLinks[0];
  const prodHref = firstProd.getAttribute('href');
  console.log(`[Alt+3] Step 6: Entering first product details page -> ${prodHref}`);
  try {
    firstProd.click();
  } catch (e) {
    console.error('[Alt+3] Product link click failed:', e);
  }
  await delay(1500);
}

function findCardFavButton(card) {
  return card.querySelector('[data-testid="product-fav-button"]') ||
    Array.from(card.querySelectorAll('button, [role="button"], div')).find((b) => {
      if (!isElementVisible(b)) return false;
      const tid = b.getAttribute('data-testid') || '';
      const cls = (b.className || '').toString();
      return tid.includes('fav') || cls.includes('glass') || Boolean(b.querySelector('svg'));
    });
}

function findCardCartButton(card) {
  return card.querySelector('[data-testid="product-cart-button"]') ||
    Array.from(card.querySelectorAll('button, [role="button"], div')).find((b) => {
      if (!isElementVisible(b)) return false;
      const tid = b.getAttribute('data-testid') || '';
      const cls = (b.className || '').toString();
      return tid.includes('cart') || cls.includes('solid');
    });
}

async function interactSingleCard(card) {
  const favBtn = findCardFavButton(card);
  if (favBtn) {
    console.log('[Alt+3] Card: Clicking Favorite (like) button');
    try { favBtn.click(); } catch (e) {}
    await delay(400);
  }

  const cartBtn = findCardCartButton(card);
  if (cartBtn && cartBtn !== favBtn) {
    console.log('[Alt+3] Card: Clicking Add to Cart button');
    try { cartBtn.click(); } catch (e) {}
    await delay(400);
  }
}

export async function interactWithProductCards(activeTaskRef) {
  const productLinks = Array.from(document.querySelectorAll('a[href*="/product/"]')).filter((el) => {
    if (!isElementVisible(el)) return false;
    return !(el.closest('#dev-debug-overlay') || el.closest('#app-header') || el.closest('#app-drawer'));
  });

  const cardContainers = Array.from(
    new Set(productLinks.map((link) => link.closest('[class*="prodCard"]') || link.closest('[class*="card"]') || link.closest('div') || link.parentElement))
  );

  console.log(`[Alt+3] Step 5: Interacting with ${cardContainers.length} product cards on leaf category page...`);

  for (const card of cardContainers) {
    if (activeTaskRef.current !== 'crawler') return productLinks;
    await interactSingleCard(card);
  }

  return productLinks;
}
