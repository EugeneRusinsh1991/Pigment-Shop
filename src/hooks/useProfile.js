import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function parseDisplayName(displayName) {
  if (!displayName) return { firstName: '', lastName: '' };
  const parts = displayName.trim().split(' ');
  return { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '' };
}

function buildGoogleFallbackProfile(user) {
  const { firstName, lastName } = parseDisplayName(user.displayName);
  return { firstName, lastName, phone: user.phoneNumber || '' };
}

export function useProfile(user) {
  const [profile, setProfile] = useState({ firstName: '', lastName: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfile({ firstName: '', lastName: '', phone: '' });
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const saved = docSnap.exists() && docSnap.data().profile;
        setProfile(saved ? docSnap.data().profile : buildGoogleFallbackProfile(user));
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
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { profile: newProfile }, { merge: true });
      setProfile(newProfile);
    } catch (error) {
      console.warn("Failed to save profile", error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  return { profile, loading, saving, saveProfile };
}
