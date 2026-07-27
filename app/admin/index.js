import React from 'react';
import { useRouter } from 'expo-router';
import AdminPanel from '@/features/admin';

export default function AdminRoute() {
  const router = useRouter();

  return <AdminPanel onBack={() => router.push('/')} />;
}
