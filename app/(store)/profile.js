import React from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { useAuth } from '../../src/context/AuthContext';
import ProfilePage from '../../src/features/profile/ProfilePage';
import PageTransition from '../../src/components/PageTransition';

export default function ProfileRoute() {
  const { isDark } = useTheme();
  const auth = useAuth();
  return (
    <PageTransition trigger="profile">
      <ProfilePage isDark={isDark} auth={auth} />
    </PageTransition>
  );
}
