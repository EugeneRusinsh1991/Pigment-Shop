import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedButton } from '../../components/Button';
import { colors } from '../../theme/tokens';

function PaginationButton({ label, onPress, isDisabled, isDark }) {
  return (
    <AnimatedButton
      style={[
        styles.button,
        isDark ? styles.buttonDark : styles.buttonLight,
        isDisabled && styles.disabled,
      ]}
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
    >
      <Text
        style={[
          styles.buttonText,
          isDark ? styles.textDark : styles.textLight,
          isDisabled && styles.textDisabled,
        ]}
      >
        {label}
      </Text>
    </AnimatedButton>
  );
}

function formatPageInfo(template = 'Page {current} of {total}', current, total) {
  return template.replace('{current}', current).replace('{total}', total);
}

function getPaginationLabels(t, currentPage, totalPages) {
  const prev = t('paginationPrevious') || 'Previous';
  const next = t('paginationNext') || 'Next';
  const infoText = formatPageInfo(t('paginationPageInfo'), currentPage, totalPages);
  return {
    prevText: `← ${prev}`,
    nextText: `${next} →`,
    infoText,
  };
}

function PageIndicator({ loading, isDark, infoText }) {
  if (loading) {
    return <ActivityIndicator size="small" color={isDark ? colors.white : colors.dark} />;
  }
  return (
    <Text style={[styles.pageText, isDark ? styles.textDark : styles.textLight]}>
      {infoText}
    </Text>
  );
}

export default function CatalogPagination({ currentPage, totalPages, onPrev, onNext, loading, isDark }) {
  const { t } = useTheme();

  if (totalPages <= 1) return null;

  const isPrevDisabled = currentPage <= 1 || loading;
  const isNextDisabled = currentPage >= totalPages || loading;
  const { prevText, nextText, infoText } = getPaginationLabels(t, currentPage, totalPages);

  return (
    <View style={styles.container}>
      <PaginationButton
        label={prevText}
        onPress={onPrev}
        isDisabled={isPrevDisabled}
        isDark={isDark}
      />
      <View style={styles.pageInfo}>
        <PageIndicator loading={loading} isDark={isDark} infoText={infoText} />
      </View>
      <PaginationButton
        label={nextText}
        onPress={onNext}
        isDisabled={isNextDisabled}
        isDark={isDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  button: {
    width: 120,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLight: {
    borderColor: colors.secondaryLightBorder,
    backgroundColor: colors.secondaryLightBg,
  },
  buttonDark: {
    borderColor: colors.secondaryDarkBorder,
    backgroundColor: colors.secondaryDarkBg,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  textLight: {
    color: colors.secondaryLightText,
  },
  textDark: {
    color: colors.secondaryDarkText,
  },
  disabled: {
    opacity: 0.5,
  },
  textDisabled: {
    color: colors.secondaryDarkText,
  },
  pageInfo: {
    marginHorizontal: 12,
    minWidth: 110,
    alignItems: 'center',
  },
  pageText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
