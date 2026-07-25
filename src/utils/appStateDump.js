export function getLocationContext(stateDump) {
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

  return hierarchy.length > 0 ? hierarchy.join('_') : 'App';
}

export function getTimestamp(stateDump) {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, '0');
  const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  const context = getLocationContext(stateDump);
  return `S_${timeStr}_${context}`;
}

function getGlobalEnv() {
  const isWeb = typeof window !== 'undefined';
  return {
    win: isWeb ? window : null,
    nav: isWeb && typeof navigator !== 'undefined' ? navigator : null,
    doc: isWeb && typeof document !== 'undefined' ? document : null,
  };
}

function dumpWebStorage(storage) {
  if (!storage) return {};
  try {
    const data = {};
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) data[key] = storage.getItem(key);
    }
    return data;
  } catch {
    return {};
  }
}

function getProp(obj, prop, def) {
  return obj ? obj[prop] ?? def : def;
}

function getScreenInfo(win) {
  const screen = win ? win.screen : null;
  return {
    viewportWidth: getProp(win, 'innerWidth', 1280),
    viewportHeight: getProp(win, 'innerHeight', 800),
    devicePixelRatio: getProp(win, 'devicePixelRatio', 1),
    width: getProp(screen, 'width', 1920),
    height: getProp(screen, 'height', 1080),
  };
}

function getNetworkInfo(nav) {
  return {
    online: nav?.onLine ?? true,
    effectiveType: nav?.connection?.effectiveType || '4g',
  };
}

const mapSection = (obj, mapper) => (obj ? mapper(obj) : null);

function dumpContextState(auth, cart, favorites, theme) {
  return {
    auth: mapSection(auth, (a) => ({
      isLoggedIn: a.isAuthenticated,
      user: a.user ? { uid: a.user.uid, email: a.user.email, displayName: a.user.displayName } : null,
    })),
    cart: mapSection(cart, (c) => ({ items: c.items, totalCount: c.totalCount })),
    favorites: mapSection(favorites, (f) => ({ items: f.favorites })),
    language: mapSection(theme, (t) => ({ currentLanguage: t.lang })),
    theme: mapSection(theme, (t) => ({ isDark: t.isDark })),
  };
}

function getUrl(win) {
  try {
    return win.location.href || '';
  } catch {
    return '';
  }
}

function getElementCount(doc) {
  try {
    return doc.getElementsByTagName('*').length;
  } catch {
    return 0;
  }
}

function getHistoryLength(win) {
  try {
    return win.history.length;
  } catch {
    return 0;
  }
}

function getBrowserEnvInfo(win, nav, doc) {
  return {
    url: getUrl(win),
    userAgent: nav?.userAgent || '',
    elementCount: getElementCount(doc),
    historyLength: getHistoryLength(win),
    localStorage: win?.localStorage,
    sessionStorage: win?.sessionStorage,
  };
}

function safeClone(obj) {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) return '[Circular]';
        seen.add(value);
      }
      return value;
    })
  );
}

export function getAppStateDump(contexts = {}) {
  const { auth, cart, favorites, theme } = contexts;
  const { win, nav, doc } = getGlobalEnv();
  const env = getBrowserEnvInfo(win, nav, doc);

  const rawDump = {
    url: env.url,
    userAgent: env.userAgent,
    screen: getScreenInfo(win),
    network: getNetworkInfo(nav),
    dom: {
      elementCount: env.elementCount,
    },
    history: {
      length: env.historyLength,
    },
    storage: {
      localStorage: dumpWebStorage(env.localStorage),
      sessionStorage: dumpWebStorage(env.sessionStorage),
    },
    state: dumpContextState(auth, cart, favorites, theme),
  };

  return safeClone(rawDump);
}



