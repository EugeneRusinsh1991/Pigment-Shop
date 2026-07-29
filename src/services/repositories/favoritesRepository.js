/**
 * favoritesRepository.js
 *
 * Firestore adapter for user favorites.
 * Uses Firestore arrayUnion and arrayRemove for atomic item delta updates.
 */
import { doc, onSnapshot, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';

/**
 * Subscribe to the favorites list for a given user.
 *
 * @param {string} uid
 * @param {(favorites: Array) => void} onData
 * @param {(error: Error) => void} [onError]
 * @returns {() => void}
 */
export function subscribeFavorites(uid, onData, onError) {
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  return onSnapshot(
    docRef,
    (docSnap) => {
      onData(docSnap.exists() && docSnap.data().favorites ? docSnap.data().favorites : []);
    },
    (error) => {
      console.warn('[favoritesRepository] snapshot failed:', error);
      onError?.(error);
    }
  );
}

/**
 * Add an item to user's favorites using atomic arrayUnion.
 *
 * @param {string} uid
 * @param {object|string} item
 * @returns {Promise<void>}
 */
export function addFavorite(uid, item) {
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  const sanitized = JSON.parse(JSON.stringify(item));
  return setDoc(docRef, { favorites: arrayUnion(sanitized) }, { merge: true });
}

/**
 * Remove an item from user's favorites using atomic arrayRemove.
 *
 * @param {string} uid
 * @param {object|string} item
 * @returns {Promise<void>}
 */
export function removeFavorite(uid, item) {
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  const sanitized = JSON.parse(JSON.stringify(item));
  return setDoc(docRef, { favorites: arrayRemove(sanitized) }, { merge: true });
}

/**
 * Save favorites delta (or full array fallback) for a user.
 *
 * @param {string} uid
 * @param {Array|object} payload - favorites array or target item
 * @param {boolean} [isAdding] - optional flag if passing target item
 * @returns {Promise<void>}
 */
function saveFavorites(uid, payload, isAdding) {
  if (isAdding !== undefined) {
    return isAdding ? addFavorite(uid, payload) : removeFavorite(uid, payload);
  }
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  const sanitized = JSON.parse(JSON.stringify(payload));
  return setDoc(docRef, { favorites: sanitized }, { merge: true });
}

const favoritesRepository = {
  subscribeFavorites,
  addFavorite,
  removeFavorite,
  saveFavorites,
};
