import { StyleSheet, View } from 'react-native';
import Card from '../../components/ui/Card/Card';
import FaqCard from '../../components/FaqCard';
import { Heading, Text } from '../../components/ui/Text';
import { colors, layout } from '../../theme/tokens';

const styles = StyleSheet.create({
  section: {
    gap: layout.spacing.xl,
  },
  headline: {
    marginBottom: layout.spacing.md,
  },
  faqList: {
    gap: layout.spacing.none,
  },
  hoursCard: {
    padding: layout.spacing.xl,
    gap: layout.spacing.md,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: layout.spacing.xs,
  },
  hoursDivider: {
    height: layout.borderWidth.thin,
  },
});

function BusinessHoursRow({ day, value, isDark }) {
  const primaryColor = isDark ? colors.textDark : colors.textLight;
  const mutedColor = isDark ? colors.textMutedDark : colors.textMutedLight;
  return (
    <View style={styles.hoursRow}>
      <Text variant="body2" style={{ color: mutedColor }}>{day}</Text>
      <Text variant="body2" weight="medium" style={{ color: primaryColor }}>{value}</Text>
    </View>
  );
}

function buildFaqItems(t) {
  return [
    { key: 'faq1', question: t('contactFaq1Q'), answer: t('contactFaq1A') },
    { key: 'faq2', question: t('contactFaq2Q'), answer: t('contactFaq2A') },
    { key: 'faq3', question: t('contactFaq3Q'), answer: t('contactFaq3A') },
  ];
}

function buildHoursRows(t) {
  return [
    { key: 'mon', day: t('contactHoursMon'), value: t('contactHoursMonValue') },
    { key: 'sat', day: t('contactHoursSat'), value: t('contactHoursSatValue') },
    { key: 'sun', day: t('contactHoursSun'), value: t('contactHoursSunValue') },
  ];
}

export default function ContactAuxiliarySection({ t, isDark }) {
  const borderColor = isDark ? colors.borderDark : colors.borderLight;
  const faqItems = buildFaqItems(t);
  const hoursRows = buildHoursRows(t);

  return (
    <View style={styles.section}>
      <View>
        <Heading level={2} isDark={isDark} style={styles.headline}>
          {t('contactFaqHeadline')}
        </Heading>
        <View style={styles.faqList}>
          {faqItems.map((item) => (
            <FaqCard
              key={item.key}
              question={item.question}
              answer={item.answer}
              isDark={isDark}
            />
          ))}
        </View>
      </View>

      <Card isDark={isDark} style={styles.hoursCard}>
        <Heading level={3} isDark={isDark} style={styles.headline}>
          {t('contactHoursHeadline')}
        </Heading>
        {hoursRows.map((row, index) => (
          <View key={row.key}>
            {index > 0 ? (
              <View style={[styles.hoursDivider, { backgroundColor: borderColor }]} />
            ) : null}
            <BusinessHoursRow day={row.day} value={row.value} isDark={isDark} />
          </View>
        ))}
      </Card>
    </View>
  );
}
