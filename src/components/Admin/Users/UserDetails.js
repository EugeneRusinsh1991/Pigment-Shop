import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { BackArrowIcon } from '../../Icons';
import styles from './UsersStyles';
import { fetchUserNote, saveUserNote } from './UsersService';
import UserInfoCard from './UserInfoCard';
import UserNoteSection from './UserNoteSection';
import UserOrdersList from './UserOrdersList';

function useUserNote(user) {
  const [note, setNote] = useState('');
  const [loadingNote, setLoadingNote] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    setLoadingNote(true);
    fetchUserNote(user.uid)
      .then(setNote)
      .catch(err => console.error('[UserDetails] Failed to fetch note:', err))
      .finally(() => setLoadingNote(false));
  }, [user]);

  const handleSave = async () => {
    if (!user?.uid) return;
    setSavingNote(true);
    try {
      await saveUserNote(user.uid, note);
    } catch (err) {
      console.error('[UserDetails] Failed to save note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  return { note, setNote, loadingNote, savingNote, handleSave };
}

export default function UserDetails({ user, onBack }) {
  const { t } = useTheme();
  const [expandedOrders, setExpandedOrders] = useState({});
  const { note, setNote, loadingNote, savingNote, handleSave } = useUserNote(user);

  const toggleExpand = (orderId) =>
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));

  return (
    <View style={styles.detailsPanel}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <BackArrowIcon color="#475569" size={14} />
        <Text style={styles.backBtnText}>{t('btnBackLabel')}</Text>
      </TouchableOpacity>

      <UserInfoCard user={user} t={t} />

      <UserNoteSection
        note={note}
        setNote={setNote}
        loadingNote={loadingNote}
        savingNote={savingNote}
        onSave={handleSave}
      />

      <Text style={styles.sectionTitle}>{t('ordersTitle')}</Text>
      <UserOrdersList
        orders={user.orders}
        expandedOrders={expandedOrders}
        onToggle={toggleExpand}
      />
    </View>
  );
}
