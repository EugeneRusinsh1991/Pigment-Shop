import React from 'react';
import { Slot, Redirect } from 'expo-router';
import { useAdminAuth } from '@/services/adminDomain';
import { ErrorBoundary } from '@/components/Feedback';

export default function AdminLayout() {
  const { isAdmin } = useAdminAuth();
  console.log('AdminLayout evaluating useAdminAuth. isAdmin:', isAdmin);

  if (!isAdmin) {
    return <Redirect href="/login" />;
  }

  return (
    <ErrorBoundary>
      <Slot />
    </ErrorBoundary>
  );
}
