/**
 * UsersManager.js
 *
 * Admin tab: displays all registered platform users fetched from Firebase,
 * enriched with order count and total spend.
 * 
 * Displays a compact list of users. Clicking a user shows their details and orders.
 */
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '../../Text';
import { SearchInput } from '../../Search';
import EmptyState from '../../DataTable/EmptyState';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';
import UserDetails from './UserDetails';
import { loadUsers } from '../../../services/adminUsersService';
import { compareStrings, compareNumbers } from '../../../utils/sorting';
import styles from './UsersStyles';
import DataTable from '../../DataTable/DataTable';
import { MobileUserCard, DesktopUserRow } from './UserRow';


function sortUsers(users, sortField, sortDirection) {
  if (!sortField) return users;

  return [...users].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === 'string') {
      return compareStrings(valA, valB, sortDirection);
    }

    return compareNumbers(valA, valB, sortDirection);
  });
}

function matchUserSearch(user, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const fields = [
    user.firstName,
    user.lastName,
    user.email,
    user.phone,
    user.city,
  ];
  return fields.some((f) => (f || '').toLowerCase().includes(q));
}

function UsersStatus({ loading, error, isEmpty, t }) {
  if (loading) {
    return <ActivityIndicator color="#E87A8E" style={{ marginTop: 40 }} />;
  }
  if (error) {
    return <EmptyState>{error}</EmptyState>;
  }
  if (isEmpty) {
    return <EmptyState>{t('adminUsersEmpty')}</EmptyState>;
  }
  return null;
}

function UsersTable({ t, sortField, sortDirection, handleSort, users, onSelectUser }) {
  const columns = [
    { key: 'firstName', label: `${t('profileFirstName')} / ${t('profileLastName')}`, style: styles.colName, sortable: true },
    { key: 'email', label: t('profileEmail'), style: styles.colEmail, sortable: true },
    { key: 'phone', label: t('profilePhone'), style: styles.colPhone, sortable: true },
    { key: 'city', label: t('profileCity'), style: styles.colPhone, sortable: true },
    { key: 'orderCount', label: t('adminAnalyticsOrders'), style: [styles.colOrders, { justifyContent: 'flex-end' }], sortable: true },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={handleSort}
      emptyText={t('adminUsersEmpty')}
      renderRow={(user, idx) => {
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || t('adminUsersUnnamed');
        return (
          <DesktopUserRow
            key={user.uid}
            user={user}
            index={idx}
            fullName={fullName}
            onPress={() => onSelectUser(user)}
          />
        );
      }}
      renderMobileRow={(user, idx) => {
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || t('adminUsersUnnamed');
        return (
          <MobileUserCard
            key={user.uid}
            user={user}
            index={idx}
            fullName={fullName}
            onPress={() => onSelectUser(user)}
          />
        );
      }}
      keyExtractor={(user) => user.uid}
    />
  );
}

export default function UsersManager() {
  const { t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const { sortField, sortDirection, handleSort } = useSort('firstName');

  const { data: users, loading, error } = useCrudWorkflow({
    loadFn: loadUsers,
  });

  const sortedUsers = React.useMemo(() => {
    return sortUsers(users, sortField, sortDirection);
  }, [users, sortField, sortDirection]);

  const filteredUsers = React.useMemo(() => {
    return sortedUsers.filter((user) => matchUserSearch(user, searchQuery));
  }, [sortedUsers, searchQuery]);

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
      {!loading && (
        <View style={styles.topRow}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t('adminUsersSearchPlaceholder')}
            style={{ flex: 1, height: 44 }}
            onClear={() => setSearchQuery('')}
          />
          <View style={styles.countBadge}>
            <Text style={styles.countText} size={12} weight="600">{filteredUsers.length}</Text>
          </View>
        </View>
      )}

      <UsersStatus loading={loading} error={error} isEmpty={users.length === 0} t={t} />

      {showTable && (
        <UsersTable
          t={t}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          users={filteredUsers}
          onSelectUser={setSelectedUser}
        />
      )}
    </View>
  );
}
