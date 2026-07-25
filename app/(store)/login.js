import React from 'react';
import LoginPage from '../../src/features/auth/LoginPage';
import PageTransition from '../../src/components/PageTransition';

export default function LoginRoute() {
  return (
    <PageTransition trigger="login">
      <LoginPage />
    </PageTransition>
  );
}
