import React from 'react';
import { View, Text } from 'react-native';
import commonStyles from '../theme/commonStyles';
import { TagIcon, CheckIcon, CrossIcon } from './Icons';
import styles from './ProfilePageStyles';

export default function ProfilePromoCard({ isDark, selectTheme, t }) {
  const iconColor = isDark ? '#FFFFFF' : '#1C1C1C';
  const successColor = isDark ? '#34D399' : '#15803D';

  return (
    <View style={[commonStyles.card, selectTheme(commonStyles.cardDark, commonStyles.cardLight), styles.cardSpecific]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <TagIcon color={iconColor} size={18} />
        <Text style={[styles.sectionTitle, selectTheme(commonStyles.textDark, commonStyles.textLight), { marginBottom: 0, marginLeft: 6 }]}>
          {t('profilePromo')}
        </Text>
      </View>

      <Text style={[styles.description, selectTheme(commonStyles.subtextDark, commonStyles.subtextLight)]}>
        {t('profilePromoDesc')}
      </Text>

      <View style={[styles.promoSuccess, isDark ? styles.promoSuccessDark : styles.promoSuccessLight]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckIcon color={successColor} size={14} />
          <Text style={[styles.promoText, isDark ? styles.promoTextDark : styles.promoTextLight, { marginLeft: 6 }]}>
            {t('profilePromoActive')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CrossIcon color={successColor} size={10} />
          <Text style={[styles.promoRemove, isDark ? styles.promoTextDark : styles.promoTextLight, { marginLeft: 4 }]}>
            {t('profilePromoRemove')}
          </Text>
        </View>
      </View>
    </View>
  );
}
