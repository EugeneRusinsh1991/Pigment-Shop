/**
 * UsersManager.js
 *
 * Admin tab: displays all registered platform users fetched from Firebase,
 * enriched with order count and total spend.
 * 
 * Displays a compact list of users. Clicking a user shows their details and orders.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import UserDetails from './UserDetails';
import UserRow from './UserRow';
import { loadUsers } from './UsersService';
import { sortUsers } from './UsersSort';
import styles from './UsersStyles';
import UsersTableHeader from './UsersTableHeader';

function UsersStatus({ loading, error, isEmpty, t }) {
  if (loading) {
    return <ActivityIndicator color="#E87A8E" style={{ marginTop: 40 }} />;
  }
  if (error) {
    return <Text style={styles.emptyText}>{error}</Text>;
  }
  if (isEmpty) {
    return <Text style={styles.emptyText}>{t('adminUsersEmpty')}</Text>;
  }
  return null;
}

function UsersTable({ t, sortField, sortDirection, handleSort, users, onSelectUser }) {
  return (
    <View style={styles.tableCard}>
      <UsersTableHeader
        t={t}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
      {users.map((user, idx) => (
        <UserRow
          key={user.uid}
          user={user}
          index={idx}
          onPress={() => onSelectUser(user)}
        />
      ))}
    </View>
  );
}

export default function UsersManager() {
  const { t } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const { sortField, sortDirection, handleSort } = useSort('firstName');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadUsers();
      setUsers(data);
    } catch (err) {
      console.error('[UsersManager] Failed to load users:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortedUsers = React.useMemo(() => {
    return sortUsers(users, sortField, sortDirection);
  }, [users, sortField, sortDirection]);

  if (selectedUser) {
    return (
      <View style={styles.container}>
        <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />
      </View>
    );
  }

  const showTable = !loading && !error && users.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('adminTabUsers')}</Text>
        {!loading && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{users.length}</Text>
          </View>
        )}
      </View>

      <UsersStatus loading={loading} error={error} isEmpty={users.length === 0} t={t} />

      {showTable && (
        <UsersTable
          t={t}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          users={sortedUsers}
          onSelectUser={setSelectedUser}
        />
      )}
    </View>
  );
}
