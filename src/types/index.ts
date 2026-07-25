/**
 * Core Application TypeScript Interfaces & Type Definitions
 */

export type LanguageCode = 'en' | 'uk' | 'ru';

export interface LocalizedString {
  en?: string;
  uk?: string;
  ru?: string;
  [key: string]: string | undefined;
}

export interface CatalogItem {
  id: string;
  label: string;
  brand?: string;
  price: number;
  sku?: string;
  discountPercent: number;
  isNew: boolean;
  description?: string;
  image?: string;
  images?: string[];
  stock?: number;
  sold?: number;
  category: string;
  categoryId?: string | null;
  subcategory: string;
  isCategory: boolean;
  children?: CatalogItem[];
  reviews?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

export interface CartItem {
  id: string;
  label: string;
  price: number | string;
  qty: number;
  image?: string;
  icon?: string;
}

export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  phoneNumber?: string;
  address?: string;
  role?: 'admin' | 'user' | 'visitor';
}
