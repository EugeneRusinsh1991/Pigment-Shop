import React from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { Heading } from '../Text';
import { colors, layout } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';
import { CrossIcon } from '@/components/Icons';
import { Button, IconButton } from '../Button';

function ModalHeader({ title, onClose, styles }) {
  return (
    <View style={styles.modalHeader}>
      {title ? <Heading level={3} style={styles.modalTitle}>{title}</Heading> : <View />}
      <IconButton
        icon={<CrossIcon color={colors.slateText} size={14} />}
        onPress={onClose}
        variant="transparent"
        size="sm"
      />
    </View>
  );
}

function ModalFooter({ onCancel, onSave, styles, footerLeft }) {
  const { t } = useTheme();
  return (
    <View style={styles.modalFooter}>
      {footerLeft ?? <View />}
      <View style={styles.modalFooterRight ?? { flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Button
          title={t('btnCancelLabel')}
          onPress={onCancel}
          variant="secondary"
          size="md"
        />
        <Button
          title={t('btnSaveLabel')}
          onPress={onSave}
          variant="success"
          size="md"
        />
      </View>
    </View>
  );
}

export function FormModalLayout({ visible, title, onClose, onSave, styles, cardWidth, children, footerLeft, footer }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.modalOverlay, { zIndex: layout.zIndices.modal }]}>
        <View style={[styles.modalCard, cardWidth ? { width: cardWidth } : null]}>
          <ModalHeader title={title} onClose={onClose} styles={styles} />
          <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
          {footer ?? <ModalFooter onCancel={onClose} onSave={onSave} styles={styles} footerLeft={footerLeft} />}
        </View>
      </View>
    </Modal>
  );
}
