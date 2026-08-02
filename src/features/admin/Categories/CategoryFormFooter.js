import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/Button';
import styles from './CategoryFormStyles';
import { useDeleteConfirmation } from '../../../hooks/useDeleteConfirmation';

export function CategoryFormFooter({
  canAddChild,
  canDelete,
  hasFirstRow,
  onAddChild,
  onDelete,
  onClose,
  onSave,
  category,
  t,
}) {
  const { confirmDelete, confirmationDialog } = useDeleteConfirmation();

  return (
    <>
      <View style={styles.modalFooterGrid}>
        {hasFirstRow && (
          <View style={styles.modalFooterRow}>
            {canAddChild ? (
              <Button
                title={`+ ${t('adminCategoriesAddSubSection')}`}
                onPress={() => onAddChild(category)}
                variant="outline"
                size="md"
                style={styles.flex1}
              />
            ) : (
              <View style={styles.flex1} />
            )}

            {canDelete ? (
              <Button
                title={t('adminCategoriesDeleteBtn')}
                onPress={() => {
                  confirmDelete({
                    title: t('adminCategoriesDeleteConfirm1Title'),
                    message: t('adminCategoriesDeleteConfirm2Msg'),
                    onConfirm: () => {
                      onDelete(category.id);
                      onClose();
                    }
                  });
                }}
                variant="danger"
                size="md"
                style={styles.flex1}
                haptic="warning"
              />
            ) : (
              <View style={styles.flex1} />
            )}
          </View>
        )}
        <View style={styles.modalFooterRow}>
          <Button
            title={t('btnCancelLabel')}
            onPress={onClose}
            variant="secondary"
            size="md"
            style={styles.flex1}
          />
          <Button
            title={t('btnSaveLabel')}
            onPress={onSave}
            variant="success"
            size="md"
            style={styles.flex1}
            haptic="success"
          />
        </View>
      </View>
      {confirmationDialog}
    </>
  );
}
