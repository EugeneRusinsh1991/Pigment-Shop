/**
 * AdminDashboard.js
 *
 * Root admin entry point. Manages auth state.
 * Renders LoginScreen when unauthenticated, AdminPanel otherwise.
 *
 * No manual catalog refresh needed on close — CatalogStore notifies
 * the storefront automatically after every admin mutation.
 */
import React from 'react';
import { useAdminDomain } from '../../services/adminDomain';
import AdminLoginScreen from './AdminLoginScreen';
import AdminPanel from './AdminPanel';

export default function AdminDashboard({ onClose }) {
  const { isAdmin } = useAdminDomain();

  if (!isAdmin) {
    return <AdminLoginScreen />;
  }

  return (
    <AdminPanel onBack={onClose} />
  );
}
