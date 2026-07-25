/**
 * DOM Scanning & Interactive Element Utilities for Manual Browser Inspection
 */

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function isElementVisible(el) {
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;

  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;

  return true;
}

function isInteractiveTag(tagName, includeInputs) {
  if (tagName === 'A' || tagName === 'BUTTON') return true;
  return includeInputs && tagName === 'INPUT';
}

function isInteractiveRole(role, includeInputs) {
  if (role === 'button') return true;
  return includeInputs && role === 'checkbox';
}

export function isInteractiveTagOrAttribute(el, includeInputs = false) {
  if (isInteractiveTag(el.tagName, includeInputs)) return true;
  if (isInteractiveRole(el.getAttribute('role'), includeInputs)) return true;
  return el.getAttribute('tabindex') === '0';
}

export function isAdminElement(el) {
  const href = el.getAttribute('href') || '';
  if (href.includes('/admin')) return true;
  try {
    const absHref = new URL(href, window.location.origin).pathname;
    return absHref.startsWith('/admin') || absHref.includes('/admin');
  } catch {
    return false;
  }
}

function isHeaderOrDrawer(el) {
  if (el.closest('#app-header')) return true;
  return Boolean(el.closest('#app-drawer'));
}

function shouldExcludeElement(el, excludeHeaderAndDrawer, excludeAdmin) {
  if (el.closest('#manual-browser-inspector') || el.closest('#dev-debug-overlay')) return true;
  if (excludeHeaderAndDrawer && isHeaderOrDrawer(el)) return true;
  if (excludeAdmin && isAdminElement(el)) return true;
  return !isElementVisible(el);
}

function filterAncestorClickables(clickables, includeInputs) {
  return clickables.filter((el) => {
    const ancestor = clickables.find((other) => other !== el && other.contains(el));
    if (!ancestor) return true;
    return isInteractiveTagOrAttribute(el, includeInputs);
  });
}

export function getClickableElements({ includeInputs = false, excludeHeaderAndDrawer = false, excludeAdmin = true } = {}) {
  const all = document.querySelectorAll('*');
  const clickables = [];

  for (let i = 0; i < all.length; i++) {
    const el = all[i];
    if (shouldExcludeElement(el, excludeHeaderAndDrawer, excludeAdmin)) continue;

    const style = window.getComputedStyle(el);
    if (style.cursor === 'pointer' || isInteractiveTagOrAttribute(el, includeInputs)) {
      clickables.push(el);
    }
  }

  return filterAncestorClickables(clickables, includeInputs);
}
