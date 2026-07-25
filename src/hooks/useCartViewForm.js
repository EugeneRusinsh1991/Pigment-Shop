import { useState, useEffect, useMemo } from 'react';

function getEmptyProfileValues() {
  return {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
  };
}

const PROFILE_FIELDS = ['email', 'firstName', 'lastName', 'phone', 'city'];

function getProfileValues(user, profile) {
  if (!user) {
    return getEmptyProfileValues();
  }

  const profileMap = { email: user.email };
  PROFILE_FIELDS.slice(1).forEach(field => {
    profileMap[field] = profile?.[field] || '';
  });
  return profileMap;
}

export function useCartViewForm({ user, profile }) {
  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [initializedUserId, setInitializedUserId] = useState(null);

  useEffect(() => {
    const currentUserId = user?.uid || 'guest';
    if (initializedUserId !== currentUserId) {
      const nextValues = getProfileValues(user, profile);
      setEmail(nextValues.email);
      setFirstName(nextValues.firstName);
      setLastName(nextValues.lastName);
      setPhone(nextValues.phone);
      setCity(nextValues.city);
      setInitializedUserId(currentUserId);
    } else if (profile) {
      const nextValues = getProfileValues(user, profile);
      setEmail((prev) => (prev ? prev : nextValues.email));
      setFirstName((prev) => (prev ? prev : nextValues.firstName));
      setLastName((prev) => (prev ? prev : nextValues.lastName));
      setPhone((prev) => (prev ? prev : nextValues.phone));
      setCity((prev) => (prev ? prev : nextValues.city));
    }
  }, [user, profile, initializedUserId]);

  const customerInfo = useMemo(
    () => ({ email, firstName, lastName, phone, city }),
    [email, firstName, lastName, phone, city]
  );

  return {
    note,
    setNote,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    city,
    setCity,
    customerInfo,
  };
}
