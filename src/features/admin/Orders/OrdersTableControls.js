import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text, Heading } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { CrossIcon } from '@/components/Icons';
import { Flag, FlagGroup } from '@/components/domain/Flag';
import { layout, colors } from '../../../theme/tokens';
import styles from './OrdersStyles';

// Canonical statuses with their locale keys
export const STATUS_FILTERS = [
  { key: 'all',        localeKey: 'all',                  values: [] },
  { key: 'pending',    localeKey: 'orderStatusPending',    values: ['Новый заказ', 'Нове замовлення', 'Новий замовлення', 'Новий', 'New', 'Pending', 'pending'] },
  { key: 'processing', localeKey: 'orderStatusProcessing', values: ['В обработке', 'В обробці', 'Processing', 'processing'] },
  { key: 'completed',  localeKey: 'orderStatusCompleted',  values: ['Выполнен', 'Виконано', 'Completed', 'completed'] },
  { key: 'cancelled',  localeKey: 'orderStatusCancelled',  values: ['Отменён', 'Отменен', 'Скасовано', 'Cancelled', 'cancelled'] },
];

export function StatusFilterBar({ t, activeFilter, onSelectFilter, count, isDark }) {
  const { width } = useWindowDimensions();
  const isMobile = width < layout.breakpoints.sm;
  const [modalVisible, setModalVisible] = useState(false);

  const filterList = useMemo(
    () =>
      STATUS_FILTERS.map((sf) => ({
        key: sf.key,
        label: t(sf.localeKey) || sf.key,
      })),
    [t]
  );

  const activeArray = useMemo(() => {
    if (Array.isArray(activeFilter)) return activeFilter;
    return activeFilter ? [activeFilter] : ['all'];
  }, [activeFilter]);

  const activeLabels = useMemo(() => {
    if (activeArray.includes('all') || activeArray.length === 0) {
      return t('all') || 'All';
    }
    return filterList
      .filter((sf) => activeArray.includes(sf.key))
      .map((sf) => sf.label)
      .join(', ');
  }, [activeArray, filterList, t]);

  const handleGroupChange = (selectedValues) => {
    if (!Array.isArray(selectedValues) || selectedValues.length === 0) {
      onSelectFilter(['all']);
      return;
    }

    const hadAll = activeArray.includes('all');
    const hasAll = selectedValues.includes('all');

    if (hasAll && !hadAll) {
      onSelectFilter(['all']);
    } else if (hasAll && hadAll && selectedValues.length > 1) {
      onSelectFilter(selectedValues.filter((v) => v !== 'all'));
    } else {
      onSelectFilter(selectedValues);
    }
  };

  const flagsNode = (
    <FlagGroup
      value={activeArray}
      onChange={handleGroupChange}
      multiple={true}
    >
      {filterList.map((sf) => (
        <Flag key={sf.key} value={sf.key} variant="chip" isDark={isDark}>
          {sf.label}
        </Flag>
      ))}
    </FlagGroup>
  );

  if (isMobile) {
    return (
      <View style={styles.filterBarContainer}>
        <Button
          title={`${t('catalogFilters') || 'Filter'}: ${activeLabels}`}
          onPress={() => setModalVisible(true)}
          variant="secondary"
          size="md"
          style={{ flex: 1, marginRight: layout.spacing.sm }}
          textStyle={{ numberOfLines: 1 }}
        />

        {count !== null && count !== undefined && (
          <View style={styles.countBadge}>
            <Text variant="subtitle2" weight="bold" style={styles.countText}>{count}</Text>
          </View>
        )}

        <Modal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          closeOnBackdropPress={true}
        >
          <View style={[styles.filterModalContainer, isDark && { backgroundColor: colors.surfaceDark }]}>
            <View style={styles.filterModalHeader}>
              <Heading level={4} isDark={isDark}>
                {t('catalogFilters') || 'Filter'}
              </Heading>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel={t('close') || 'Close'}
              >
                <CrossIcon size={18} color={isDark ? colors.textDark : colors.dark} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterModalContent}>
              <FlagGroup
                value={activeArray}
                onChange={handleGroupChange}
                multiple={true}
              >
                {/* Row 1: New Order (pending) | Processing (processing) */}
                <View style={styles.modalRow}>
                  {filterList.filter(f => f.key === 'pending' || f.key === 'processing').map(sf => (
                    <Flag key={sf.key} value={sf.key} variant="chip" isDark={isDark} style={styles.modalFlagHalf}>
                      {sf.label}
                    </Flag>
                  ))}
                </View>

                {/* Row 2: Completed (completed) | Cancelled (cancelled) */}
                <View style={styles.modalRow}>
                  {filterList.filter(f => f.key === 'completed' || f.key === 'cancelled').map(sf => (
                    <Flag key={sf.key} value={sf.key} variant="chip" isDark={isDark} style={styles.modalFlagHalf}>
                      {sf.label}
                    </Flag>
                  ))}
                </View>

                {/* Row 3: All (all) */}
                <View style={styles.modalRow}>
                  {filterList.filter(f => f.key === 'all').map(sf => (
                    <Flag key={sf.key} value={sf.key} variant="chip" isDark={isDark} style={styles.modalFlagFull}>
                      {sf.label}
                    </Flag>
                  ))}
                </View>
              </FlagGroup>
            </View>

            <Button
              title={t('applyFilter') || t('catalogApplyFilters') || 'Apply Filter'}
              onPress={() => setModalVisible(false)}
              variant="primary"
              size="md"
              style={{ width: '100%', marginTop: layout.spacing.md }}
            />
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.filterBarContainer}>
      {flagsNode}

      {count !== null && count !== undefined && (
        <View style={styles.countBadge}>
          <Text variant="subtitle2" weight="bold" style={styles.countText}>{count}</Text>
        </View>
      )}
    </View>
  );
}

