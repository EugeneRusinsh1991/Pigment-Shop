import { ProfileSkeleton } from '../../components/ui/Feedback';
import { useLanguage } from '../../context/LanguageContext';
import { useProfileForm } from '../../hooks/useProfileForm';
import AccountLayout from './components/AccountLayout';
import ProfileFormCard from './ProfileFormCard';

export default function ProfilePage({ isDark, auth }) {
  const { t } = useLanguage();
  const selectTheme = (dark, light) => (isDark ? dark : light);
  const { form, loading, saving, updateField, handleSave } = useProfileForm(auth, t);

  if (loading) {
    return (
      <AccountLayout title={t('profileTitle')} isDark={isDark} auth={auth}>
        <ProfileSkeleton />
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title={t('profileTitle')} isDark={isDark} auth={auth}>
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
    </AccountLayout>
  );
}
