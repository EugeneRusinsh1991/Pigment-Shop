import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';

/**
 * Fetches the admin note for a user.
 * @param {string} uid - The user's ID.
 * @returns {Promise<string>} The user's note.
 */
export async function fetchUserNote(uid) {
  const docRef = doc(db, COLLECTIONS.ADMIN_NOTES, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().note || '';
  }
  return '';
}

/**
 * Saves an admin note for a user.
 * @param {string} uid - The user's ID.
 * @param {string} noteText - The text of the note.
 * @returns {Promise<void>}
 */
export async function saveUserNote(uid, noteText) {
  const docRef = doc(db, COLLECTIONS.ADMIN_NOTES, uid);
  const trimmed = (noteText || '').trim();
  await setDoc(docRef, { note: trimmed }, { merge: true });
}
