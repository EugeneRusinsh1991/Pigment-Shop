import { delay, isElementVisible } from '../utils/domHelpers';

export function setInputValue(inputEl, val) {
  if (!inputEl) return;
  inputEl.focus();
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
  if (nativeSetter) {
    nativeSetter.call(inputEl, val);
  } else {
    inputEl.value = val;
  }
  inputEl.dispatchEvent(new Event('input', { bubbles: true }));
  inputEl.dispatchEvent(new Event('change', { bubbles: true }));
}

export function clickElement(el) {
  if (!el) return;
  try {
    el.click();
  } catch (e) {
    console.error('Click error:', e);
  }
}

export function initTaskState(activeTaskRef) {
  const isUnified = activeTaskRef.current === 'autoclick';
  const taskName = isUnified ? 'autoclick' : 'all_products_test';

  if (!isUnified) {
    if (activeTaskRef.current === 'all_products_test') {
      console.log('[Alt+5] Canceling All Products test...');
      activeTaskRef.current = null;
      return null;
    }
    activeTaskRef.current = 'all_products_test';
  }
  return { isUnified, taskName };
}

export async function resetFilterButton(taskName, activeTaskRef) {
  if (activeTaskRef.current !== taskName) return;
  const resetBtn = document.querySelector('[data-testid="filter-reset-button"]');
  if (resetBtn) {
    console.log('[Alt+5] Step 10: Clicking Reset Filters button...');
    clickElement(resetBtn);
    await delay(800);
  }
}

export async function toggleCheckboxByTestId(testId, stepName, taskName, activeTaskRef) {
  if (activeTaskRef.current !== taskName) return;
  const checkbox = document.querySelector(`[data-testid="${testId}"]`);
  if (checkbox) {
    console.log(`[Alt+5] ${stepName} ON...`);
    clickElement(checkbox);
    await delay(600);
    console.log(`[Alt+5] ${stepName} OFF...`);
    clickElement(checkbox);
    await delay(600);
  }
}

export async function adjustPriceInputs() {
  const minInput = document.querySelector('[data-testid="filter-price-min"]') ||
                   Array.from(document.querySelectorAll('input')).find((el) => isElementVisible(el) && ((el.placeholder || '').includes('0') || (el.name || '').includes('min')));
  const maxInput = document.querySelector('[data-testid="filter-price-max"]') ||
                   Array.from(document.querySelectorAll('input')).find((el) => isElementVisible(el) && ((el.placeholder || '').includes('5000') || (el.name || '').includes('max')));

  if (minInput) {
    console.log('[Alt+5] Step 2a: Changing Min Price to 150...');
    setInputValue(minInput, '150');
    await delay(600);
  }
  if (maxInput) {
    console.log('[Alt+5] Step 2b: Changing Max Price to 3500...');
    setInputValue(maxInput, '3500');
    await delay(600);
  }
}

export async function toggleCategoryCheckboxes(taskName, activeTaskRef) {
  const getCategoryCheckboxes = () => {
    return Array.from(document.querySelectorAll('[data-testid^="category-checkbox-"]')).filter((el) => isElementVisible(el));
  };

  for (let i = 0; i < 3; i++) {
    if (activeTaskRef.current !== taskName) return;
    const catCheckboxes = getCategoryCheckboxes();
    if (catCheckboxes.length > i) {
      console.log(`[Alt+5] Step 7: Checking category checkbox ${i + 1}/3...`);
      clickElement(catCheckboxes[i]);
      await delay(800);
    }
  }
}

async function interactFirstCardButtons(firstCard) {
  const favBtn = firstCard.querySelector('[data-testid="product-fav-button"]');
  if (favBtn) {
    console.log('[Alt+5] Step 8: Product Card Favorite click');
    clickElement(favBtn);
    await delay(400);
  }

  const cartBtn = firstCard.querySelector('[data-testid="product-cart-button"]');
  if (cartBtn) {
    console.log('[Alt+5] Step 8: Product Card Cart click');
    clickElement(cartBtn);
    await delay(400);
  }
}

async function navigateBackFromDetail(router) {
  const backBtn = document.querySelector('[data-testid="page-back-button"]');
  if (backBtn) {
    console.log('[Alt+5] Step 9: Clicking Back button from product detail page...');
    clickElement(backBtn);
  } else {
    router.back();
  }
  await delay(1200);
}

function getFirstCardContainer(productLink) {
  return productLink.closest('[class*="prodCard"]') 
    || productLink.closest('[class*="card"]') 
    || productLink.closest('div') 
    || productLink.parentElement;
}

export async function interactWithFirstProduct(router, taskName, activeTaskRef) {
  const productLinks = Array.from(document.querySelectorAll('a[href*="/product/"]')).filter((el) => isElementVisible(el));
  if (productLinks.length === 0) return;

  const firstCard = getFirstCardContainer(productLinks[0]);
  await interactFirstCardButtons(firstCard);

  if (activeTaskRef.current !== taskName) return;

  console.log('[Alt+5] Step 9: Entering product detail page...');
  clickElement(productLinks[0]);
  await delay(1200);

  if (activeTaskRef.current !== taskName) return;

  await navigateBackFromDetail(router);
}
