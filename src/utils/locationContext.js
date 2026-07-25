export function getLocationHierarchy(stateDump) {
  const hierarchy = [];

  let pathname = '';
  try {
    const rawUrl = stateDump?.url || (typeof window !== 'undefined' ? window.location.href : '');
    if (rawUrl) {
      const parsed = new URL(rawUrl);
      pathname = parsed.pathname;
    }
  } catch (e) {}

  const rawSegments = pathname.split('/').filter(Boolean);

  if (rawSegments.length === 0) {
    hierarchy.push('Home');
  } else {
    for (const seg of rawSegments) {
      const cleaned = seg.replace(/[^a-zA-Z0-9]/g, ' ').trim();
      if (!cleaned || /^\d+$/.test(cleaned)) continue;
      const pasc = cleaned
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
      if (pasc && !hierarchy.includes(pasc)) {
        hierarchy.push(pasc);
      }
    }
  }

  if (typeof document !== 'undefined') {
    try {
      const modal = document.querySelector('[role="dialog"], .modal, [data-modal="true"]');
      if (modal) {
        const titleEl = modal.querySelector('h1, h2, h3, [class*="title"], [class*="Title"]');
        const modalText = titleEl ? titleEl.textContent?.trim() : '';
        if (modalText) {
          const formattedModal = modalText
            .replace(/[^a-zA-Z0-9]/g, ' ')
            .split(/\s+/)
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .slice(0, 2)
            .join('');
          if (formattedModal && !hierarchy.includes(formattedModal)) {
            hierarchy.push(formattedModal);
          }
        }
      }

      const cardEl = document.querySelector('[data-component], [id$="Card"], [class*="ProductCard"], [class*="product-card"]');
      if (cardEl && hierarchy.length < 4) {
        let compName = cardEl.getAttribute('data-component') || '';
        if (!compName) {
          const className = cardEl.className || '';
          if (typeof className === 'string' && className.includes('ProductCard')) compName = 'ProductCard';
        }
        if (compName) {
          const formattedComp = compName
            .replace(/[^a-zA-Z0-9]/g, ' ')
            .split(/\s+/)
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join('');
          if (formattedComp && !hierarchy.includes(formattedComp)) {
            hierarchy.push(formattedComp);
          }
        }
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
