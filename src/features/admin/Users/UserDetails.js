import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../context/ThemeContext';
import { BackArrowIcon } from '@/components/Icons';
import { Button } from '../../Button';
import styles from './UsersStyles';
import { fetchUserNote, saveUserNote } from '../../../services/adminUsersService';
import UserInfoCard from './UserInfoCard';
import UserNoteSection from './UserNoteSection';
import UserOrdersList from './UserOrdersList';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';
import AdminSaveFooter from '../shared/AdminSaveFooter';
import { colors } from '../../../theme/tokens';

function useUserNote(user) {
  const [note, setNote] = useState('');
  const loadFn = useCallback(() => fetchUserNote(user?.uid), [user?.uid]);
  
  const { data, loading, isSaving, handleSave } = useCrudWorkflow({
    loadFn: user?.uid ? loadFn : null,
    saveFn: async () => {
      return saveUserNote(user.uid, note);
    },
    successMessageTitle: 'Note saved successfully',
    errorMessageTitle: 'Failed to save note'
  });

  // Sync data with local note state
  useEffect(() => {
    if (data !== undefined) {
      setNote(data);
    }
  }, [data]);

  const isDirty = note !== data && !(note === '' && !data);

  return { note, setNote, loadingNote: loading, savingNote: isSaving, handleSave, isDirty };
}

export default function UserDetails({ user, onBack }) {
  const { t } = useTheme();
  const [expandedOrders, setExpandedOrders] = useState({});
  const { note, setNote, loadingNote, savingNote, handleSave, isDirty } = useUserNote(user);

  const toggleExpand = (orderId) =>
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));

  return (
    <View style={styles.detailsPanel}>
      <Button
        leftIcon={<BackArrowIcon color={colors.secondaryLightText} size={14} />}
        title={t('btnBackLabel')}
        onPress={onBack}
        variant="ghost"
        size="sm"
        style={styles.backBtnStyle}
      />

      <UserInfoCard user={user} t={t} />

      <UserNoteSection
        note={note}
        setNote={setNote}
        loadingNote={loadingNote}
      />

      <Text style={styles.sectionTitle} size={16} weight="bold">{t('ordersTitle')}</Text>
      <UserOrdersList
        orders={user.orders}
        expandedOrders={expandedOrders}
        onToggle={toggleExpand}
      />
      
      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={savingNote} 
        onSave={handleSave} 
      />
    </View>
  );
}
