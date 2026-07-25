import { delay, isElementVisible } from '../utils/domHelpers';

export function clickElement(el) {
  if (!el) return;
  try {
    el.click();
  } catch (e) {
    console.error('Click error:', e);
  }
}

export async function findFirstProductLink(router) {
  let productLinks = Array.from(document.querySelectorAll('a[href*="/product/"]')).filter((el) => {
    if (!isElementVisible(el)) return false;
    if (el.closest('#dev-debug-overlay') || el.closest('#app-header') || el.closest('#app-drawer')) return false;
    return true;
  });

  if (productLinks.length === 0) {
    console.log('[Alt+4] No product cards on Home page, navigating to /products...');
    router.push('/products');
    await delay(1200);
    productLinks = Array.from(document.querySelectorAll('a[href*="/product/"]')).filter((el) => {
      if (!isElementVisible(el)) return false;
      if (el.closest('#dev-debug-overlay') || el.closest('#app-header') || el.closest('#app-drawer')) return false;
      return true;
    });
  }

  return productLinks.length > 0 ? productLinks[0] : null;
}

function findQtyBtn(testId, symbols) {
  const byId = document.querySelector(`[data-testid="${testId}"]`);
  if (byId) return byId;

  return Array.from(document.querySelectorAll('button, [role="button"], div')).find((el) => {
    if (!isElementVisible(el)) return false;
    const txt = (el.textContent || '').trim();
    return symbols.includes(txt);
  });
}

async function clickBtnRepeatedly(btn, count, label, activeTaskRef) {
  if (!btn) return;
  console.log(`[Alt+4] Step 3: Clicking "${label}" ${count} times...`);
  for (let i = 0; i < count; i++) {
    if (activeTaskRef.current !== 'product_page_test') return;
    clickElement(btn);
    await delay(350);
  }
}

export async function adjustProductQuantity(activeTaskRef) {
  const plusBtn = findQtyBtn('product-qty-plus', ['+']);
  const minusBtn = findQtyBtn('product-qty-minus', ['−', '-']);

  await clickBtnRepeatedly(plusBtn, 4, '+', activeTaskRef);
  await clickBtnRepeatedly(minusBtn, 3, '-', activeTaskRef);
}

export async function interactProductDetailButtons(activeTaskRef) {
  const cartBtn = document.querySelector('[data-testid="product-detail-cart-button"]') ||
                  Array.from(document.querySelectorAll('button, [role="button"]')).find((el) => {
                    if (!isElementVisible(el)) return false;
                    const txt = (el.textContent || el.innerText || '').toLowerCase();
                    return txt.includes('cart') || txt.includes('корзин');
                  });

  if (cartBtn) {
    console.log('[Alt+4] Step 4: Clicking Add to Cart button...');
    clickElement(cartBtn);
    await delay(600);
  }

  if (activeTaskRef.current !== 'product_page_test') return;

  const favBtn = document.querySelector('[data-testid="product-detail-fav-button"]') ||
                 Array.from(document.querySelectorAll('button, [role="button"], div')).find((el) => {
                   if (!isElementVisible(el)) return false;
                   if (el.closest('#dev-debug-overlay') || el.closest('#app-header')) return false;
                   const tid = el.getAttribute('data-testid') || '';
                   return tid.includes('fav') || el.querySelector('svg');
                 });

  if (favBtn) {
    console.log('[Alt+4] Step 5: Clicking Favorite (heart) button...');
    clickElement(favBtn);
    await delay(600);
  }
}
