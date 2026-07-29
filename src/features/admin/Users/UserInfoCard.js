import Card from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './UsersStyles';


function InfoRow({ label, value }) {
  const displayVal = value || '—';
  return (
    <View style={styles.infoGroup}>
      <Text variant="overline" color="desc" style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} size={14} weight="500">{displayVal}</Text>
    </View>
  );
}

export default function UserInfoCard({ user, t }) {
  const { isDark } = useTheme();
  return (
    <Card variant="compact" isDark={isDark} style={styles.clientInfoCard}>
      <InfoRow label={t('profileFirstName')} value={user.firstName} />
      <InfoRow label={t('profileLastName')}  value={user.lastName}  />
      <InfoRow label={t('profileEmail')}     value={user.email}     />
      <InfoRow label={t('profilePhone')}     value={user.phone}     />
      <InfoRow label={t('profileCity')}      value={user.city}      />
      {!!user.promoCode && (
        <InfoRow label={t('profilePromo')} value={user.promoCode} />
      )}
    </Card>
  );
}
