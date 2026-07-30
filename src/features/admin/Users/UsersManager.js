/**
 * UsersManager.js
 *
 * Admin tab: displays all registered platform users fetched from Firebase,
 * enriched with order count and total spend.
 * 
 * Displays a compact list of users. Clicking a user shows their details and orders.
 */
import DataTable from '@/components/domain/DataTable/DataTable';
import EmptyState from '@/components/domain/DataTable/EmptyState';
import { SearchInput } from '@/components/domain/Search';
import { Text } from '@/components/ui/Text';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import useSort from '../../../hooks/useSort';
import { loadUsers } from '../../../services/adminUsersService';
import { colors } from '../../../theme/tokens';
import { compareNumbers, compareStrings } from '../../../utils/sorting';
import { useCrudWorkflow } from '../useCrudWorkflow';
import UserDetails from './UserDetails';
import { DesktopUserRow, MobileUserCard } from './UserRow';
import styles from './UsersStyles';
import CatalogPagination from '../../catalog/CatalogPagination';

const PAGE_SIZE = 50;

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
    return <ActivityIndicator color={colors.accentPinkLight} style={styles.loadingIndicatorTop} />;
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
    { key: 'orderCount', label: t('adminAnalyticsOrders'), style: [styles.colOrders, styles.colOrdersHeader], sortable: true },
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
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const { sortField, sortDirection, handleSort } = useSort('firstName');

  const { data: users, loading, error } = useCrudWorkflow({
    loadFn: loadUsers,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortField, sortDirection]);

  const sortedUsers = React.useMemo(() => {
    return sortUsers(users, sortField, sortDirection);
  }, [users, sortField, sortDirection]);

  const filteredUsers = React.useMemo(() => {
    return sortedUsers.filter((user) => matchUserSearch(user, searchQuery));
  }, [sortedUsers, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE) || 1;
  const paginatedUsers = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

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
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('adminUsersSearchPlaceholder')}
          style={styles.toolbar}
          onClear={() => setSearchQuery('')}
        />
      )}

      <UsersStatus loading={loading} error={error} isEmpty={users.length === 0} t={t} />

      {showTable && (
        <>
          <UsersTable
            t={t}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            users={paginatedUsers}
            onSelectUser={setSelectedUser}
          />
          {totalPages > 1 && (
            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            />
          )}
        </>
      )}
    </View>
  );
}
