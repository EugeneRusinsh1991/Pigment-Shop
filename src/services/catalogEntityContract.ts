/**
 * catalogEntityContract.ts
 *
 * Defines the single authoritative domain boundary for catalog entities.
 * Both the storefront and admin logic must consume and adhere to these normalization rules.
 *
 * ─── Canonical Localized String Convention ───────────────────────────────────
 *
 * All localized string values across ALL domains MUST be represented as:
 *
 *   { uk: string; ru: string; en: string }
 *
 * This is the project-standard `LocalizedString` type defined below.
 *
 * ✅ Canonical (use this):   { uk: 'Назва', ru: 'Название', en: 'Name' }
 * ❌ Non-canonical (avoid):  label_uk / label_ru / label_en  (flat keys)
 *
 * Accessor pattern:
 *   - Read a localized value:  getLocale(localizedString, lang)
 *   - Create an empty value:   emptyLocalizedString()
 *   - Both delegate to src/utils/localization.js `getLocalizedValue` for
 *     language fallback resolution at render time.
 *
 * Domains that still use flat keys (e.g. Product form state) are non-conforming
 * and will be migrated in sub-initiatives 3.2 and 3.3.
 */

// ─── Canonical Localized String Types and Accessors ─────────────────────────

/**
 * The project-standard type for any multilingual text field.
 * Every locale key holds the translation for that language.
 * An empty string ('') signals that no translation has been provided yet.
 */
export type SupportedLocale = 'uk' | 'ru' | 'en';

const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['uk', 'ru', 'en'] as const;

export type LocalizedString = Record<SupportedLocale, string>;

/**
 * Returns a blank LocalizedString with all locales set to empty string.
 * Use this as the initial value for any new localized text field.
 */
export function emptyLocalizedString(): LocalizedString {
  return { uk: '', ru: '', en: '' };
}

/**
 * Reads a single locale from a LocalizedString.
 * Falls back to the first non-empty locale in SUPPORTED_LOCALES order if
 * the requested locale is absent.
 *
 * For full language-fallback resolution at render time (including the
 * LANGUAGE_FALLBACK chain), use `getLocalizedValue` from src/utils/localization.js.
 *
 * @param value - A canonical LocalizedString.
 * @param lang  - The requested locale (e.g. 'uk').
 * @returns The resolved string, or '' if no translation exists.
 */
export function getLocale(value: LocalizedString, lang: SupportedLocale): string {
  if (value[lang]) return value[lang];
  for (const locale of SUPPORTED_LOCALES) {
    if (value[locale]) return value[locale];
  }
  return '';
}

// ─── Sort Contract Definitions ──────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';

export interface SortState {
  field: string;
  direction: SortDirection;
}

export function makeSortState(field: string, direction: SortDirection = DEFAULT_SORT_DIRECTION): SortState {
  return { field, direction };
}

export function toggleSortState(current: SortState, field: string): SortState {
  if (current.field === field) {
    return { field, direction: current.direction === 'asc' ? 'desc' : 'asc' };
  }
  return { field, direction: DEFAULT_SORT_DIRECTION };
}

// ─── Domain Entity Contracts ──────────────────────────────────────────────────


export interface RawProductInput {
  id: string;
  label?: string | Record<string, string>;
  description?: string | Record<string, string>;
  price?: number;
  image?: string;
  images?: string[];
  sold?: number;
  stock?: number;
  active?: boolean;
  isNew?: boolean;
  discountPercent?: number;
  sku?: string;
  brand?: string;
  categoryId?: string | null;
  category?: string;
  subcategory?: string;
  [key: string]: unknown;
}

export interface NormalizedProductEntity {
  id: string;
  images: string[];
  sold: number;
  stock: number;
  active: boolean;
  [key: string]: unknown;
}

export interface RawCategoryInput {
  id: string;
  name?: string | Record<string, string>;
  description?: string | Record<string, string>;
  image?: string;
  parentId?: string | null;
  productIds?: string[];
  [key: string]: unknown;
}

export interface NormalizedCategoryEntity {
  id: string;
  productIds: string[];
  [key: string]: unknown;
}

function getNormalizedImages(rest: Record<string, unknown>): string[] {
  if (Array.isArray(rest.images) && rest.images.length > 0) {
    return rest.images as string[];
  }
  if (typeof rest.image === 'string' && rest.image.length > 0) {
    return [rest.image];
  }
  return [];
}

export function normalizeProductEntity(product?: RawProductInput | null): NormalizedProductEntity {
  const safeProduct = product || {} as RawProductInput;
  const { category, subcategory, categoryId, ...rest } = safeProduct;

  return {
    ...rest,
    id: safeProduct.id || '',
    images: getNormalizedImages(rest as Record<string, unknown>),
    sold: safeProduct.sold ?? 0,
    stock: safeProduct.stock ?? 0,
    active: safeProduct.active ?? true,
  };
}

export function normalizeCategoryEntity(category?: RawCategoryInput | null): NormalizedCategoryEntity {
  const safeCategory = category || {} as RawCategoryInput;

  return {
    ...safeCategory,
    id: safeCategory.id || '',
    productIds: Array.isArray(safeCategory.productIds) ? safeCategory.productIds.filter(Boolean) : [],
  };
}
