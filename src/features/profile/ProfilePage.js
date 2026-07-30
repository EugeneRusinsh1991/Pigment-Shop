import { ScrollView, View } from 'react-native';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { Heading } from '../../components/ui/Text';
import { ProfileSkeleton } from '../../components/ui/Feedback';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import useGridLayout from '../../hooks/useGridLayout';
import { useProfileForm } from '../../hooks/useProfileForm';
import Footer from '../shell/components/Footer';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileFormCard from './ProfileFormCard';
import styles from './ProfilePageStyles';

export default function ProfilePage({ isDark, auth }) {
  const { t } = useLanguage();
  const selectTheme = (dark, light) => (isDark ? dark : light);
  const { isWide, gridWidth } = useGridLayout();
  const { form, loading, saving, updateField, handleSave } = useProfileForm(auth, t);

  if (loading) {
    return (
      <ScrollView
        style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
        contentContainerStyle={[styles.scrollContent, styles.noPaddingBottom]}
      >
        <ProfileSkeleton />
        <Footer />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}
      contentContainerStyle={[styles.scrollContent, styles.noPaddingBottom]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flex1}>
        <View
          style={[
            styles.pageContent,
            {
              alignSelf: 'center',
              width: '100%',
              maxWidth: isWide ? 1140 : gridWidth,
            },
          ]}
        >
          <ScrollFadeUp>
            <Heading level={1} style={styles.title} isDark={isDark}>
              {t('profileTitle')}
            </Heading>
          </ScrollFadeUp>

          <View
            style={[
              styles.layoutWrapper,
              {
                flexDirection: isWide ? 'row' : 'column',
                alignItems: isWide ? 'flex-start' : 'stretch',
              },
            ]}
          >
            <View style={isWide ? styles.sidebarContainer : { width: '100%' }}>
              <ScrollFadeUp>
                <ProfileSidebar onLogout={auth?.logout} />
              </ScrollFadeUp>
            </View>

            <View style={isWide ? styles.contentContainer : { width: '100%' }}>
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
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
