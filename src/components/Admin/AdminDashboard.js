/**
 * AdminDashboard.js
 *
 * Root admin entry point. Manages auth state.
 * Renders LoginScreen when unauthenticated, AdminPanel otherwise.
 * Calls CatalogContext.refresh() when the panel closes so the storefront
 * immediately reflects any changes made in the admin.
 */
import React, { useState } from 'react';
import { isAuthenticated } from '../../services/adminAuth';
import { useCatalog } from '../../context/CatalogContext';
import AdminLoginScreen from './AdminLoginScreen';
import AdminPanel from './AdminPanel';

export default function AdminDashboard({ onClose }) {
  const [authed, setAuthed] = useState(isAuthenticated());
  const { refresh } = useCatalog();

  const handleClose = () => {
    refresh();
    onClose();
  };

  if (!authed) {
    return <AdminLoginScreen onAuthenticated={() => setAuthed(true)} />;
  }

  return (
    <AdminPanel
      onBack={handleClose}
      onLogout={() => setAuthed(false)}
    />
  );
}
