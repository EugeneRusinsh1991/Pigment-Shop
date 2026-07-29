/**
 * mockAuthRepository.js
 *
 * Mock implementation of authRepository.js.
 * Returns raw credential-shaped objects (no withServiceContract wrapper)
 * to preserve the exact call-site contract consumed by authService.js.
 */

import { delay, createMockUser } from './mockFactories.js';

const MOCK_USER = createMockUser();

function buildMockCredential(user = MOCK_USER) {
  return { user: { ...user, getIdToken: async () => 'mock-token' } };
}

export function subscribeToAuthChanges(callback) {
  delay(50).then(() => callback(MOCK_USER));
  return () => {};
}

export async function loginWithEmail() {
  await delay(300);
  return buildMockCredential();
}

export async function registerWithEmail() {
  await delay(300);
  return buildMockCredential();
}

export async function loginWithGoogle() {
  await delay(400);
  return buildMockCredential();
}

export async function logoutUser() {
  await delay(100);
}

export async function loginAnonymously() {
  await delay(200);
  return buildMockCredential(createMockUser({ uid: 'anon-mock', email: null, role: 'anonymous' }));
}
