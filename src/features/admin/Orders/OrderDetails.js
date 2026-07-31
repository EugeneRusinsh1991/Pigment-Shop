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
import { AnimatedButton } from '@/components/ui/Button';
import { BackArrowIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLanguage } from '../../../context/LanguageContext';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { updateAdminNote, updateOrderStatus } from '../../../services/adminOrdersService';
import { colors, layout } from '../../../theme/tokens';
import AdminSaveFooter from '../AdminSaveFooter';
import { useCrudWorkflow } from '../useCrudWorkflow';
import AdminNoteSection from './AdminNoteSection';
import OrderCustomerCard from './OrderCustomerCard';
import OrderItemsList from './OrderItemsList';
import OrderStatusSelector from './OrderStatusSelector';
import styles from './OrdersStyles';

function useOrderNote(order) {
  const [note, setNote] = useState(order.adminNotes || '');
  
  const { isSaving, handleSave } = useCrudWorkflow({
    saveFn: async () => {
      return updateAdminNote(order.id, note);
    },
    successMessageTitle: 'Admin note saved successfully',
    errorMessageTitle: 'Failed to save admin note'
  });

  const isDirty = note !== (order.adminNotes || '');

  return { note, setNote, savingNote: isSaving, handleSave, isDirty };
}

export default function OrderDetails({ order, onBack, onStatusUpdated }) {
  const { t } = useLanguage();
  const { handleError } = useErrorHandler();
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
      handleError(e, { message: t('adminOrdersStatusUpdateError') || 'Failed to update status' });
    } finally {
      setUpdating(false);
    }
  };

  const orderNumber = order.id.slice(-5).toUpperCase();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: layout.spacing.xxl + layout.spacing.sm }}>
      {/* Back button */}
      <AnimatedButton size="sm" style={styles.backBtn} onPress={onBack}>
        <BackArrowIcon color={colors.textDescLight} size={16} />
        <Text style={styles.backBtnText} size={14} weight="500">{t('adminOrdersBackBtn')}</Text>
      </AnimatedButton>

      {/* Title row — only order number, no date/total captions */}
      <View style={styles.headerRow}>
        <Text style={styles.title} size={24} weight="bold">{t('orderNumber')}#{orderNumber}</Text>
      </View>

      {/* 1. Customer information */}
      <Text style={styles.sectionTitle} size={16} weight="600">{t('adminOrdersCustomer')}</Text>
      <OrderCustomerCard order={order} />

      {/* 2. Customer comment */}
      <Text style={styles.sectionTitle} size={16} weight="600">{t('adminOrdersCustNote')}</Text>
      <View style={styles.detailCard}>
        <Text style={[styles.detailValue, !order.note && { color: colors.textDescDark }]} size={14} weight="500">
          {order.note || ''}
        </Text>
      </View>

      {/* 3. Order items */}
      <Text style={styles.sectionTitle} size={16} weight="600">
        {t('adminOrdersItems')} ({order.totalItems})
      </Text>
      <OrderItemsList items={order.items} totalPrice={order.totalPrice} />

      {/* 4. Order status */}
      <Text style={styles.sectionTitle} size={16} weight="600">{t('adminOrdersStatus')}</Text>
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
