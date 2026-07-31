import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/Text';
import { colors, layout } from '../theme/tokens';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
  },
  iconWrapper: {
    width: layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    marginBottom: layout.spacing.xxxs,
  },
});

export default function ContactDetailItem({ icon, label, value, href, isDark }) {
  const primaryColor = isDark ? colors.textDark : colors.textLight;
  const mutedColor = isDark ? colors.textMutedDark : colors.textMutedLight;

  const content = (
    <View style={styles.row}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.textWrapper}>
        {label ? (
          <Text variant="label" style={[styles.label, { color: mutedColor }]}>
            {label}
          </Text>
        ) : null}
        <Text variant="body2" weight="medium" style={{ color: primaryColor }}>
          {value}
        </Text>
      </View>
    </View>
  );

  if (href) {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(href)} activeOpacity={0.75}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}
