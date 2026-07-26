import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Heading } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useProfile } from '../../hooks/useProfile';
import useGridLayout from '../../hooks/useGridLayout';
import ProfileFormCard from './ProfileFormCard';
import styles from './ProfilePageStyles';
import Footer from '../../components/Footer';
import ScrollFadeUp from '../../components/ScrollFadeUp';

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

function useProfileForm(auth, t) {
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

export default function ProfilePage({ isDark, auth }) {
  const { t } = useTheme();
  const selectTheme = (dark, light) => (isDark ? dark : light);
  const { isWide, gridWidth } = useGridLayout();
  const { form, loading, saving, updateField, handleSave } = useProfileForm(auth, t);

  return (
    <ScrollView
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={[styles.scrollContent, { paddingBottom: 0 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.pageContent,
            {
              alignSelf: 'center',
              width: '100%',
              maxWidth: isWide ? 580 : gridWidth,
            },
          ]}
        >
          <ScrollFadeUp>
            <Heading level={1} style={styles.title} isDark={isDark}>
              {t('profileTitle')}
            </Heading>
          </ScrollFadeUp>

          <ScrollFadeUp>
            <ProfileFormCard
              email={auth?.user?.email}
              firstName={form.firstName}
              lastName={form.lastName}
              phone={form.phone}
              city={form.city}
              setFirstName={(v) => updateField('firstName', v)}
              setLastName={(v) => updateField('lastName', v)}
              setPhone={(v) => updateField('phone', v)}
              setCity={(v) => updateField('city', v)}
              saving={saving}
              loading={loading}
              onSave={handleSave}
              isDark={isDark}
              selectTheme={selectTheme}
              t={t}
            />
          </ScrollFadeUp>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
