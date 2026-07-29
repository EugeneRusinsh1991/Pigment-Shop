import React from 'react';
import LoginPage from '@/features/auth/LoginPage';
import { PageTransition } from '@/components/ui/Motion';

export default function LoginRoute() {
  return (
    <PageTransition trigger="login">
      <LoginPage />
    </PageTransition>
  );
}
