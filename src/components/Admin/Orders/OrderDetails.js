/**
 * OrderDetails.js — reorganized section order + full localization
 *
 * Section order:
 * 1. Customer information (name, email, phone, city, date)
 * 2. Customer comment
 * 3. Order items (with total)
 * 4. Order status
 * 5. Admin notes
 */
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AnimatedButton } from '../../Button';
import { useTheme } from '../../../context/ThemeContext';
import { useToast } from '../../../context/ToastContext';
import { BackArrowIcon } from '@/components/Icons';
import AdminNoteSection from './AdminNoteSection';
import OrderCustomerCard from './OrderCustomerCard';
import OrderItemsList from './OrderItemsList';
import { updateOrderStatus, updateAdminNote } from '../../../services/adminOrdersService';
import OrderStatusSelector from './OrderStatusSelector';
import styles from './OrdersStyles';
import { useCrudWorkflow } from '../../../hooks/useCrudWorkflow';
import AdminSaveFooter from '../shared/AdminSaveFooter';
import { colors } from '../../../theme/tokens';

function useOrderNote(order) {
  const [note, setNote] = useState(order?.adminNote || '');

  const { isSaving, handleSave } = useCrudWorkflow({
    saveFn: async () => {
      return updateAdminNote(order.id, note);
    },
    successMessageTitle: 'Admin note saved',
    errorMessageTitle: 'Failed to save admin note'
  });

  // Keep note in sync if order.adminNote changes from outside
  React.useEffect(() => {
    setNote(order?.adminNote || '');
  }, [order?.adminNote]);

  const isDirty = note !== (order?.adminNote || '');

  return { note, setNote, savingNote: isSaving, handleSave, isDirty };
}

export default function OrderDetails({ order, onBack, onStatusUpdated }) {
  const { t } = useTheme();
  const { showToast } = useToast();
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);
  
  const { note, setNote, savingNote, handleSave, isDirty } = useOrderNote(order);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setUpdating(true);
    try {
      const res = await updateOrderStatus(order.id, newStatus);
      if (!res.success) throw new Error(res.error);
      
      setCurrentStatus(newStatus);
      onStatusUpdated(order.id, newStatus);
    } catch (e) {
      console.error('Failed to update status', e);
      if (showToast) {
        showToast(t('adminOrdersStatusUpdateError') || 'Failed to update status', 'error');
      }
    } finally {
      setUpdating(false);
    }
  };

  const orderNumber = order.id.slice(-5).toUpperCase();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Back button */}
      <AnimatedButton style={styles.backBtn} onPress={onBack}>
        <BackArrowIcon color={colors.textDescLight} size={16} />
        <Text style={styles.backBtnText}>{t('adminOrdersBackBtn')}</Text>
      </AnimatedButton>

      {/* Title row — only order number, no date/total captions */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t('orderNumber')}#{orderNumber}</Text>
      </View>

      {/* 1. Customer information */}
      <Text style={styles.sectionTitle}>{t('adminOrdersCustomer')}</Text>
      <OrderCustomerCard order={order} />

      {/* 2. Customer comment */}
      <Text style={styles.sectionTitle}>{t('adminOrdersCustNote')}</Text>
      <View style={styles.detailCard}>
        <Text style={[styles.detailValue, !order.note && { color: colors.textDescDark }]}>
          {order.note || ''}
        </Text>
      </View>

      {/* 3. Order items */}
      <Text style={styles.sectionTitle}>
        {t('adminOrdersItems')} ({order.totalItems})
      </Text>
      <OrderItemsList items={order.items} totalPrice={order.totalPrice} />

      {/* 4. Order status */}
      <Text style={styles.sectionTitle}>{t('adminOrdersStatus')}</Text>
      <OrderStatusSelector
        currentStatus={currentStatus}
        updating={updating}
        onStatusChange={handleStatusChange}
        t={t}
      />

      {/* 5. Admin notes */}
      <AdminNoteSection
        note={note}
        setNote={setNote}
      />
      
      <AdminSaveFooter 
        isDirty={isDirty} 
        isSaving={savingNote} 
        onSave={handleSave} 
      />
    </ScrollView>
  );
}
