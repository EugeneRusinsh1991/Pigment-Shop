const BANNERS_STORAGE_KEY = 'ps_banners';

export const SEED_BANNERS = [
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
];

function readBannersFromStorage() {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(BANNERS_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return null;
}

export function persistBanners(banners) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
    }
  } catch {}
}

export function loadInitialBanners() {
  try {
    const stored = readBannersFromStorage();
    if (stored) return stored;
  } catch {}
  return [...SEED_BANNERS];
}
