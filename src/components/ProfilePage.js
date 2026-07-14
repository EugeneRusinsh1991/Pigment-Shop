import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../hooks/useProfile';
import commonStyles from '../theme/commonStyles';
import ProfileFormCard from './ProfileFormCard';
import styles from './ProfilePageStyles';
import SharedLayoutWrapper from './SharedLayoutWrapper';

export default function ProfilePage({ isDark, auth }) {
  const { t } = useTheme();
  const selectTheme = (dark, light) => (isDark ? dark : light);

  const { profile, loading, saving, saveProfile } = useProfile(auth?.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!loading) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setPhone(profile.phone || '');
      setCity(profile.city || '');
    }
  }, [profile, loading]);

  const handleSave = async () => {
    try {
      await saveProfile({ firstName, lastName, phone, city });
      setSaveMessage(t('profileSaveSuccess'));
    } catch (error) {
      setSaveMessage('');
    }
  };

  return (
    <SharedLayoutWrapper isDark={isDark}>
      <ScrollView
        style={[commonStyles.container, selectTheme(commonStyles.containerDark, commonStyles.containerLight)]}
        contentContainerStyle={[commonStyles.scrollContent]}
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
            city={city}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhone={setPhone}
            setCity={setCity}
            saving={saving}
            loading={loading}
            onSave={handleSave}
            isDark={isDark}
            selectTheme={selectTheme}
            t={t}
          />

          {!!saveMessage && (
            <View style={[styles.saveMessage, isDark ? styles.saveMessageDark : styles.saveMessageLight]}>
              <Text style={[styles.saveMessageText, isDark ? styles.saveMessageTextDark : styles.saveMessageTextLight]}>
                {saveMessage}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SharedLayoutWrapper>
  );
}
