/**
 * OrderDetails.js
 */
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { BackArrowIcon } from '../../Icons';
import OrderCustomerCard from './OrderCustomerCard';
import OrderItemsList from './OrderItemsList';
import { updateAdminNote, updateOrderStatus } from './OrdersService';
import styles from './OrdersStyles';
import OrderStatusSelector from './OrderStatusSelector';

function getFormattedDate(createdAt, lang) {
  if (!createdAt) return '—';
  try {
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  } catch (e) {
    return '—';
  }
}

export default function OrderDetails({ order, onBack, onStatusUpdated }) {
  const { t, lang } = useTheme();
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);
  const [adminNote, setAdminNote] = useState(order.adminNote || '');
  const [isSavingAdminNote, setIsSavingAdminNote] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(null);
  const feedbackTimeoutRef = useRef(null);

  // Check if note has been modified
  const isAdminNoteModified = adminNote !== (order.adminNote || '');

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const showFeedback = (message, type = 'success') => {
    setFeedbackMessage(message);
    setFeedbackType(type);

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackMessage('');
      setFeedbackType(null);
    }, 2500);
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, newStatus);
      setCurrentStatus(newStatus);
      onStatusUpdated(order.id, newStatus);
    } catch (e) {
      console.error("Failed to update status", e);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveAdminNote = async () => {
    setIsSavingAdminNote(true);
    try {
      await updateAdminNote(order.id, adminNote);
      showFeedback('Admin note saved successfully', 'success');
    } catch (e) {
      console.error("Failed to save admin note", e);
      showFeedback('Failed to save admin note', 'error');
    } finally {
      setIsSavingAdminNote(false);
    }
  };

  const handleCancelAdminNote = () => {
    setAdminNote(order.adminNote || '');
  };

  const getOrderNumber = () => order.id.slice(-5).toUpperCase();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <BackArrowIcon color="#475569" size={16} />
        <Text style={styles.backBtnText}>Back to Orders</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <Text style={styles.title}>Order #{getOrderNumber()}</Text>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t('adminOrdersDate')}</Text>
          <Text style={styles.detailValue}>{getFormattedDate(order.createdAt, lang)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t('adminOrdersTotal')}</Text>
          <Text style={styles.detailValue}>${order.totalPrice?.toLocaleString()}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t('orderNoteLabel') || 'Customer Comment:'}</Text>
      <View style={styles.detailCard}>
        <Text style={styles.detailValue}>
          {order.note ? order.note : 'No comment was provided'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Admin Note:</Text>
      <View style={styles.detailCard}>
        {feedbackMessage ? (
          <View style={[styles.feedbackBanner, feedbackType === 'error' ? styles.feedbackError : styles.feedbackSuccess]}>
            <Text style={[styles.feedbackText, feedbackType === 'error' ? styles.feedbackErrorText : styles.feedbackSuccessText]}>
              {feedbackMessage}
            </Text>
          </View>
        ) : null}
        <TextInput
          style={[styles.adminNoteInput, { borderColor: '#e2e8f0', borderWidth: 1, borderRadius: 6, padding: 12, marginBottom: isAdminNoteModified ? 12 : 0, minHeight: 100 }]}
          multiline
          numberOfLines={4}
          placeholder="Add internal admin note here..."
          placeholderTextColor="#94a3b8"
          value={adminNote}
          onChangeText={setAdminNote}
          editable={!isSavingAdminNote}
        />
        {isAdminNoteModified && (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={[styles.btn, { flex: 1, backgroundColor: isSavingAdminNote ? '#cbd5e1' : '#3b82f6' }]}
              onPress={handleSaveAdminNote}
              disabled={isSavingAdminNote}
            >
              {isSavingAdminNote ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Save Note</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { flex: 1, backgroundColor: '#e2e8f0' }]}
              onPress={handleCancelAdminNote}
              disabled={isSavingAdminNote}
            >
              <Text style={{ color: '#475569', fontWeight: '600', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>{t('adminOrdersCustomer')}</Text>
      <OrderCustomerCard order={order} />

      <Text style={styles.sectionTitle}>{t('adminOrdersStatus')}</Text>
      <OrderStatusSelector 
        currentStatus={currentStatus} 
        updating={updating} 
        onStatusChange={handleStatusChange} 
        t={t} 
      />

      <Text style={styles.sectionTitle}>Items ({order.totalItems})</Text>
      <OrderItemsList items={order.items} />

    </ScrollView>
  );
}
