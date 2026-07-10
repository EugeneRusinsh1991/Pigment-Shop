/**
 * AdminDashboard.js
 *
 * Root admin entry point. Manages auth state.
 * Renders LoginScreen when unauthenticated, AdminPanel otherwise.
 *
 * No manual catalog refresh needed on close — CatalogStore notifies
 * the storefront automatically after every admin mutation.
 */
import React, { useState } from 'react';
import { isAuthenticated } from '../../services/adminAuth';
import AdminLoginScreen from './AdminLoginScreen';
import AdminPanel from './AdminPanel';

export default function AdminDashboard({ onClose }) {
  const [authed, setAuthed] = useState(isAuthenticated());

  if (!authed) {
    return <AdminLoginScreen onAuthenticated={() => setAuthed(true)} />;
  }

  return (
    <AdminPanel
      onBack={onClose}
      onLogout={() => setAuthed(false)}
    />
  );
}
