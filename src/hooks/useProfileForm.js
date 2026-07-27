import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useProfile } from './useProfile';

function getVal(str) {
  return typeof str === 'string' ? str : '';
}

function mapProfileToForm(profile) {
  if (!profile) return { firstName: '', lastName: '', phone: '', city: '' };
  return {
    firstName: getVal(profile.firstName),
    lastName: getVal(profile.lastName),
    phone: getVal(profile.phone),
    city: getVal(profile.city),
  };
}

export function useProfileForm(auth, t) {
  const { profile, loading, saving, saveProfile } = useProfile(auth?.user);
  const [form, setForm] = useState(() => mapProfileToForm(profile));
  const { showToast } = useToast();

  useEffect(() => {
    if (!loading) {
      setForm(mapProfileToForm(profile));
    }
  }, [profile, loading]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await saveProfile(form);
      if (showToast) {
        showToast(t('profileSaveSuccess') || 'Profile saved successfully', 'success');
      }
    } catch {
      if (showToast) {
        showToast(t('profileSaveError') || 'Failed to save profile', 'error');
      }
    }
  };

  return { form, loading, saving, updateField, handleSave };
}
