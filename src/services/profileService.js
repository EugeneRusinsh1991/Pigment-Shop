import { doc, getDoc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from './collections';
import { db } from './firebase';
import { withServiceContract } from './serviceContract';

async function _getUserProfile(uid) {
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().profile) {
    return docSnap.data().profile;
  }
  return null;
}

async function _updateUserProfile(uid, profileData) {
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  await setDoc(docRef, { profile: profileData }, { merge: true });
  return profileData;
}

export const getUserProfile = withServiceContract(_getUserProfile, 'Failed to fetch user profile');
export const updateUserProfile = withServiceContract(_updateUserProfile, 'Failed to update user profile');
