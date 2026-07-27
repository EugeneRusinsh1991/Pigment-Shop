import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useProfile } from '../features/profile/useProfile';

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

/**
 * Hook for managing user profile form state and persistence.
 * 
 * @param {Object} auth - Authentication object containing user info
 * @param {Function} t - Translation function for localized messages
 * @returns {Object} Profile form state and handlers
 * @returns {Object} returns.form - Form state with firstName, lastName, phone, city
 * @returns {boolean} returns.loading - Loading state for profile data
 * @returns {boolean} returns.saving - Saving state for profile updates
 * @returns {Function} returns.updateField - Function to update a specific field
 * @returns {Function} returns.handleSave - Function to save profile changes
 */
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
