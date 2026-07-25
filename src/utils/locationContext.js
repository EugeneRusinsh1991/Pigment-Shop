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
  let compName = cardEl.getAttribute('data-component') || '';
  if (!compName) {
    const className = cardEl.className || '';
    if (typeof className === 'string' && className.includes('ProductCard')) compName = 'ProductCard';
  }
  return compName ? toPascalWords(compName) : null;
}

export function getLocationHierarchy(stateDump) {
  const hierarchy = [];

  try {
    const rawUrl = stateDump?.url || (typeof window !== 'undefined' ? window.location.href : '');
    if (rawUrl) {
      const { pathname } = new URL(rawUrl);
      const segments = parsePathSegments(pathname);
      hierarchy.push(...(segments.length > 0 ? segments : ['Home']));
    }
  } catch (e) {
    hierarchy.push('Home');
  }

  if (typeof document !== 'undefined') {
    try {
      const modal = extractModalLabel();
      if (modal && !hierarchy.includes(modal)) hierarchy.push(modal);

      if (hierarchy.length < 4) {
        const card = extractCardLabel();
        if (card && !hierarchy.includes(card)) hierarchy.push(card);
      }
    } catch (e) {}
  }

  return hierarchy.length > 0 ? hierarchy : ['App'];
}

export function getLocationContext(stateDump) {
  const hierarchy = getLocationHierarchy(stateDump);
  return hierarchy.join('_');
}

export function getOverlayText(stateDump) {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, '0');
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const hierarchy = getLocationHierarchy(stateDump);
  return `${hierarchy.join(' > ')} | ${timeStr}`;
}

export function getTimestamp(stateDump) {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, '0');
  const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  const context = getLocationContext(stateDump);
  return `S_${timeStr}_${context}`;
}
