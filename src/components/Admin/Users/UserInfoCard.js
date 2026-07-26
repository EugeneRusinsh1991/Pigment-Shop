import { View } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../context/ThemeContext';
import Card from '../../Card';
import styles from './UsersStyles';


function InfoRow({ label, value }) {
  const displayVal = value || '—';
  return (
    <View style={styles.infoGroup}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{displayVal}</Text>
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
