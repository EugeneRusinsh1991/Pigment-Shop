import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './ui/Text';
import { colors, layout } from '../theme/tokens';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: layout.borderWidth.thin,
    paddingVertical: layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.spacing.sm,
  },
  question: {
    flex: 1,
  },
  arrow: {
    marginLeft: layout.spacing.sm,
  },
  answer: {
    marginTop: layout.spacing.sm,
    paddingBottom: layout.spacing.xs,
  },
});

export default function FaqCard({ question, answer, isDark }) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = isDark ? colors.borderDark : colors.borderLight;
  const primaryColor = isDark ? colors.textDark : colors.textLight;
  const mutedColor = isDark ? colors.textMutedDark : colors.textMutedLight;

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <Text variant="body2" weight="semibold" style={[styles.question, { color: primaryColor }]}>
          {question}
        </Text>
        <Text variant="body2" style={[styles.arrow, { color: mutedColor }]}>
          {expanded ? '-' : '+'}
        </Text>
      </TouchableOpacity>
      {expanded ? (
        <Text variant="body2" style={[styles.answer, { color: mutedColor }]}>
          {answer}
        </Text>
      ) : null}
    </View>
  );
}
