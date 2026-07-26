import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import ProfilePage from '@/features/profile/ProfilePage';
import { PageTransition } from '@\/components\/Motion';

export default function ProfileRoute() {
  const { isDark } = useTheme();
  const auth = useAuth();
  return (
    <PageTransition trigger="profile">
      <ProfilePage isDark={isDark} auth={auth} />
    </PageTransition>
  );
}
