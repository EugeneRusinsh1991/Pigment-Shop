import React from 'react';
import { ScrollView, View } from 'react-native';
import { Heading, Text } from '@/components/ui/Text';
import { colors, layout } from '../../theme/tokens';
import { useLanguage } from '../../context/LanguageContext';
import { CrossIcon } from '@/components/Icons';
import { Button, IconButton } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

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
  const { t } = useLanguage();
  return (
    <View style={styles.modalFooter}>
      {typeof footerLeft === 'string' ? <Text variant="caption" color="muted">{footerLeft}</Text> : (footerLeft ?? <View />)}
      <View style={styles.modalFooterRight ?? { flexDirection: 'row', gap: layout.spacing.md, alignItems: 'center' }}>
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
    <Modal visible={visible} onClose={onClose}>
      <View style={[styles.modalCard, cardWidth ? { width: cardWidth } : null]}>
        <ModalHeader title={title} onClose={onClose} styles={styles} />
        <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
        {footer ?? <ModalFooter onCancel={onClose} onSave={onSave} styles={styles} footerLeft={footerLeft} />}
      </View>
    </Modal>
  );
}
