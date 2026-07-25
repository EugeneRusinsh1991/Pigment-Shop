import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { COLLECTIONS } from '../services/collections';

function parseDisplayName(displayName) {
  if (!displayName) return { firstName: '', lastName: '' };
  const parts = displayName.trim().split(' ');
  return { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '' };
}

const EMPTY_PROFILE = { firstName: '', lastName: '', phone: '', city: '' };

function buildGoogleFallbackProfile(user) {
  const { firstName, lastName } = parseDisplayName(user.displayName);
  return { ...EMPTY_PROFILE, firstName, lastName, phone: user.phoneNumber || '' };
}

export function useProfile(user) {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfile(EMPTY_PROFILE);
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, COLLECTIONS.USERS, user.uid);
        const docSnap = await getDoc(docRef);
        const saved = docSnap.exists() && docSnap.data().profile;
        const normalizedProfile = saved ? { ...EMPTY_PROFILE, ...saved } : buildGoogleFallbackProfile(user);
        setProfile(normalizedProfile);
      } catch (error) {
        console.warn('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const saveProfile = async (newProfile) => {
    if (!user) return;
    setSaving(true);
    try {
      const docRef = doc(db, COLLECTIONS.USERS, user.uid);
      const nextProfile = { ...profile, ...newProfile };
      await setDoc(docRef, { profile: nextProfile }, { merge: true });
      setProfile(nextProfile);
    } catch (error) {
      console.warn("Failed to save profile", error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  return { profile, loading, saving, saveProfile };
}
