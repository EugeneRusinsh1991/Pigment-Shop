import { delay, isElementVisible } from '../utils/domHelpers';

export function getBreadcrumbItems() {
  const testIdNodes = Array.from(document.querySelectorAll('[data-testid^="breadcrumb-"]')).filter((el) => isElementVisible(el));
  if (testIdNodes.length > 0) {
    return testIdNodes.map((el) => {
      const href = el.getAttribute('href') || (el.querySelector('a')?.getAttribute('href')) || '';
      const text = (el.textContent || el.innerText || '').trim();
      return { element: el, href, text };
    });
  }

  const links = Array.from(document.querySelectorAll('a, [role="link"]')).filter((el) => {
    if (!isElementVisible(el)) return false;
    if (el.closest('#dev-debug-overlay')) return false;

    const href = el.getAttribute('href') || '';
    return href === '/' || href.startsWith('/catalog');
  });

  return links.map((el) => ({
    element: el,
    href: el.getAttribute('href') || '',
    text: (el.textContent || el.innerText || '').trim(),
  }));
}

async function tryClickBreadcrumbDom(element, rawHref) {
  try {
    element.click();
    await delay(500);
    return Boolean(rawHref && window.location.pathname === rawHref);
  } catch (e) {
    console.error('[Alt+3] Breadcrumb DOM click error:', e);
    return false;
  }
}

async function fallbackBreadcrumbPush(rawHref, router) {
  console.log(`[Alt+3] Fallback router push to breadcrumb href -> ${rawHref}`);
  try {
    router.push(rawHref);
    await delay(1000);
  } catch {}
}

async function clickBreadcrumbItem(targetCrumb, router) {
  const { href: rawHref, text = 'crumb', element } = targetCrumb;
  console.log(`[Alt+3] Breadcrumb step back click -> "${text}" (${rawHref})`);

  const navigated = await tryClickBreadcrumbDom(element, rawHref);
  if (!navigated && rawHref && router) {
    await fallbackBreadcrumbPush(rawHref, router);
    return;
  }
  await delay(800);
}

export async function backtrackBreadcrumbs(router, activeTaskRef) {
  console.log('[Alt+3] Step 7: Backtracking step-by-step through EVERY breadcrumb...');
  let maxBreadcrumbs = 12;

  while (maxBreadcrumbs > 0) {
    if (activeTaskRef.current !== 'crawler') return;

    const crumbs = getBreadcrumbItems();
    if (crumbs.length === 0) {
      console.log('[Alt+3] No clickable breadcrumbs found on current page.');
      break;
    }

    const targetCrumb = crumbs[crumbs.length - 1];
    await clickBreadcrumbItem(targetCrumb, router);

    if (window.location.pathname === '/' || targetCrumb.href === '/') {
      console.log('[Alt+3] Reached Home page via breadcrumbs!');
      break;
    }

    maxBreadcrumbs--;
  }
}
