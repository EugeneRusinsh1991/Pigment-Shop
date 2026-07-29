function toPascalWords(text, limit) {
  const words = text
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return (limit ? words.slice(0, limit) : words).join('');
}

function parsePathSegments(pathname) {
  const segments = [];
  for (const seg of pathname.split('/').filter(Boolean)) {
    const cleaned = seg.replace(/[^a-zA-Z0-9]/g, ' ').trim();
    if (!cleaned || /^\d+$/.test(cleaned)) continue;
    const pasc = toPascalWords(cleaned);
    if (pasc && !segments.includes(pasc)) segments.push(pasc);
  }
  return segments;
}

function extractModalLabel() {
  const modal = document.querySelector('[role="dialog"], .modal, [data-modal="true"]');
  if (!modal) return null;
  const titleEl = modal.querySelector('h1, h2, h3, [class*="title"], [class*="Title"]');
  const text = titleEl?.textContent?.trim();
  return text ? toPascalWords(text, 2) : null;
}

function extractCardLabel() {
  const cardEl = document.querySelector('[data-component], [id$="Card"], [class*="ProductCard"], [class*="product-card"]');
  if (!cardEl) return null;
  const compName = cardEl.getAttribute('data-component') ||
    (String(cardEl.className).includes('ProductCard') ? 'ProductCard' : '');
  return compName ? toPascalWords(compName) : null;
}

function _safeParsePathname(rawUrl) {
  try {
    return new URL(rawUrl).pathname;
  } catch {
    return null;
  }
}

function _getRawUrl(stateDump) {
  if (stateDump?.url) return stateDump.url;
  return typeof window !== 'undefined' ? window.location.href : '';
}

function _resolveUrlSegments(stateDump) {
  const rawUrl = _getRawUrl(stateDump);
  if (!rawUrl) return ['Home'];
  const pathname = _safeParsePathname(rawUrl);
  if (!pathname) return ['Home'];
  const segments = parsePathSegments(pathname);
  return segments.length > 0 ? segments : ['Home'];
}

function _pushIfAbsent(hierarchy, label) {
  if (label && !hierarchy.includes(label)) hierarchy.push(label);
}

function _enrichFromDom(hierarchy) {
  if (typeof document === 'undefined') return;
  try {
    _pushIfAbsent(hierarchy, extractModalLabel());
    if (hierarchy.length < 4) _pushIfAbsent(hierarchy, extractCardLabel());
  } catch {}
}

function getLocationHierarchy(stateDump) {
  const hierarchy = _resolveUrlSegments(stateDump);
  _enrichFromDom(hierarchy);
  return hierarchy.length > 0 ? hierarchy : ['App'];
}

export function getLocationContext(stateDump) {
  const hierarchy = getLocationHierarchy(stateDump);
  return hierarchy.join('_');
}

function _formatTime(sep) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(now.getHours())}${sep}${pad(now.getMinutes())}${sep}${pad(now.getSeconds())}`;
}

export function getOverlayText(stateDump) {
  const hierarchy = getLocationHierarchy(stateDump);
  return `${hierarchy.join(' > ')} | ${_formatTime(':')}`;
}

export function getTimestamp(stateDump) {
  const context = getLocationContext(stateDump);
  return `S_${_formatTime('-')}_${context}`;
}
