/**
 * repositories/index.js
 *
 * Dynamic repository registry.
 * Set EXPO_PUBLIC_USE_MOCKS=true to use deterministic mock data instead of Firebase.
 *
 * All consumers MUST import from this file — never import directly from
 * individual repository files.
 */

import * as liveCatalogRepo from './catalogRepository.js';
import * as liveOrdersRepo from './ordersRepository.js';
import * as liveAuthRepo from './authRepository.js';

import * as mockCatalogRepo from '../mocks/mockCatalogRepository.js';
import * as mockOrdersRepo from '../mocks/mockOrdersRepository.js';
import * as mockAuthRepo from '../mocks/mockAuthRepository.js';

const USE_MOCKS = process.env.EXPO_PUBLIC_USE_MOCKS === 'true';

export const catalogRepository = USE_MOCKS ? mockCatalogRepo : liveCatalogRepo;
export const ordersRepository = USE_MOCKS ? mockOrdersRepo : liveOrdersRepo;
export const authRepository = USE_MOCKS ? mockAuthRepo : liveAuthRepo;
