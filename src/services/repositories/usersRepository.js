import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';
import { withServiceContract } from '../serviceContract.js';

async function _fetchUserNote(uid) {
  const docRef = doc(db, COLLECTIONS.ADMIN_NOTES, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().note || '';
  }
  return '';
}

async function _saveUserNote(uid, noteText) {
  const docRef = doc(db, COLLECTIONS.ADMIN_NOTES, uid);
  const trimmed = (noteText || '').trim();
  await setDoc(docRef, { note: trimmed }, { merge: true });
}

export const fetchUserNote = withServiceContract(_fetchUserNote, 'Failed to fetch user note');
export const saveUserNote = withServiceContract(_saveUserNote, 'Failed to save user note');

