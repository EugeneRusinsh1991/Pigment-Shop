import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/profileService';

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
        const res = await getUserProfile(user.uid);
        const saved = res.success ? res.data : null;
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
      const nextProfile = { ...profile, ...newProfile };
      const res = await updateUserProfile(user.uid, nextProfile);
      if (!res.success) {
        throw new Error(res.error || 'Failed to save profile');
      }
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
