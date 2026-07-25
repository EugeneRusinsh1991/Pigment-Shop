import { delay, isElementVisible } from '../utils/domHelpers';

function isInExcludedContainer(el) {
  const excludedSelectors = ['#dev-debug-overlay', '#app-header', '#app-drawer'];
  return excludedSelectors.some((selector) => el.closest(selector));
}

function isInvalidCategoryHref(href) {
  if (!href.includes('/catalog/')) return true;
  return href.includes('/product/') || href.includes('/admin');
}

function isExcludedCategoryElement(el) {
  if (!isElementVisible(el) || isInExcludedContainer(el)) return true;
  return isInvalidCategoryHref(el.getAttribute('href') || '');
}

function isUnvisitedCategoryPath(href, visitedCategoryHrefs) {
  try {
    const absHref = new URL(href, window.location.origin).pathname;
    if (!absHref.startsWith('/catalog/') || absHref === '/catalog') return false;
    return !visitedCategoryHrefs.has(absHref);
  } catch {
    return false;
  }
}

function isValidCategoryLink(el, visitedCategoryHrefs) {
  if (isExcludedCategoryElement(el)) return false;
  return isUnvisitedCategoryPath(el.getAttribute('href') || '', visitedCategoryHrefs);
}

export function getCategoryLinks(visitedCategoryHrefs) {
  return Array.from(document.querySelectorAll('a, [role="link"]'))
    .filter((el) => isValidCategoryLink(el, visitedCategoryHrefs));
}

export async function navigateDeeper(visitedCategoryHrefs, activeTaskRef) {
  let maxDepth = 6;
  while (maxDepth > 0) {
    if (activeTaskRef.current !== 'crawler') return;

    const catLinks = getCategoryLinks(visitedCategoryHrefs);
    if (catLinks.length === 0) {
      console.log(`[Alt+3] Reached deepest leaf subcategory: ${window.location.pathname}`);
      break;
    }

    const firstCatLink = catLinks[0];
    const targetHref = new URL(firstCatLink.getAttribute('href'), window.location.origin).pathname;
    console.log(`[Alt+3] Step 1-3: Navigating deeper to category -> ${targetHref}`);

    visitedCategoryHrefs.add(targetHref);

    try {
      firstCatLink.click();
    } catch (e) {
      console.error('[Alt+3] Category click failed:', e);
    }
    await delay(1200);
    maxDepth--;
  }
}

export async function scrollLeafPage() {
  console.log('[Alt+3] Step 4: Scrolling to bottom of leaf category page...');
  window.scrollTo({ top: document.body.scrollHeight || document.documentElement.scrollHeight, behavior: 'smooth' });
  document.querySelectorAll('div, main, section').forEach((el) => {
    if (el.scrollHeight > el.clientHeight) el.scrollTop = el.scrollHeight;
  });
  await delay(1000);
}
