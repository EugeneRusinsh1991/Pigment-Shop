/**
 * App.js
 *
 * Root entry point. Provides all feature contexts via AppProviders, then
 * renders AppShell which reads from those contexts directly — no prop drilling.
 *
 * AppGate blocks rendering of AppShell until both auth resolution (loading)
 * and the optional visitor bootstrap (bootstrapping) have completed.
 * This prevents a flash of unauthenticated UI or premature catalog renders.
 */
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppProviders from './context/AppProviders';
import AppShell from './components/AppShell';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

/**
 * AppGate
 *
 * Renders a loading spinner while auth is resolving or the visitor bootstrap
 * is running. Once both are done, renders children.
 */
function AppGate({ children }) {
  const { loading, bootstrapping } = useAuth();

  if (loading || bootstrapping) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <AppProviders>
      <AppGate>
        {showAdmin
          ? <AdminDashboard onClose={() => setShowAdmin(false)} />
          : <AppShell onOpenAdmin={() => setShowAdmin(true)} />
        }
      </AppGate>
    </AppProviders>
  );
}
