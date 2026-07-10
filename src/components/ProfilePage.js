import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import commonStyles from '../theme/commonStyles';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../hooks/useProfile';
import ProfileFormCard from './ProfileFormCard';
import ProfilePromoCard from './ProfilePromoCard';

export default function ProfilePage({ isDark, auth }) {
  const { t } = useTheme();
  const selectTheme = (dark, light) => (isDark ? dark : light);

  const { profile, loading, saving, saveProfile } = useProfile(auth?.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!loading) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setPhone(profile.phone || '');
    }
  }, [profile, loading]);

  const handleSave = async () => {
    await saveProfile({ firstName, lastName, phone });
  };

  return (
    <ScrollView
      style={[commonStyles.container, selectTheme(commonStyles.containerDark, commonStyles.containerLight)]}
      showsVerticalScrollIndicator={false}
    >
      <View style={commonStyles.content}>
        <Text style={[commonStyles.title, selectTheme(commonStyles.textDark, commonStyles.textLight)]}>
          {t('profileTitle')}
        </Text>

        <ProfileFormCard
          email={auth?.user?.email}
          firstName={firstName}
          lastName={lastName}
          phone={phone}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setPhone={setPhone}
          saving={saving}
          loading={loading}
          onSave={handleSave}
          isDark={isDark}
          selectTheme={selectTheme}
          t={t}
        />

        <ProfilePromoCard isDark={isDark} selectTheme={selectTheme} t={t} />
      </View>
    </ScrollView>
  );
}
