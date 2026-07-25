import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './ProductReviewsStyles';
import { useTheme } from '../../context/ThemeContext';
import Button, { AnimatedButton } from '../../components/Button';
import { Link } from 'expo-router';
import { colors } from '../../theme/tokens';
import { FieldTextarea } from '../../components/Admin/SharedFormComponents';

export { getAccountName, useReviewsState } from './useReviewsState';

const SEGMENTED_THEME = {
  active: {
    dark: { bg: colors.white, border: colors.white, text: colors.dark },
    light: { bg: colors.dark, border: colors.dark, text: colors.white },
  },
  inactive: {
    dark: { bg: colors.secondaryDarkBg, border: colors.secondaryDarkBorder, text: colors.secondaryDarkText },
    light: { bg: colors.slateMid, border: colors.secondaryLightBorder, text: colors.secondaryLightText },
  },
};

function getSegmentedTheme(isActive, isDark) {
  const stateKey = isActive ? 'active' : 'inactive';
  const modeKey = isDark ? 'dark' : 'light';
  return SEGMENTED_THEME[stateKey][modeKey];
}

export function SegmentedToggle({ options, activeValue, onChange, isDark }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
      {options.map((opt) => {
        const theme = getSegmentedTheme(activeValue === opt.value, isDark);
        return (
          <AnimatedButton
            key={opt.value}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              minHeight: 44,
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: theme.bg,
              borderWidth: 1,
              borderColor: theme.border,
            }}
            onPress={() => onChange(opt.value)}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: theme.text }}>
              {opt.label}
            </Text>
          </AnimatedButton>
        );
      })}
    </View>
  );
}

export function ReviewCard({ rev, isDark }) {
  return (
    <View style={[styles.reviewCard, isDark ? styles.reviewCardDark : styles.reviewCardLight]}>
      <View style={styles.reviewHeader}>
        <Text style={[styles.author, isDark ? styles.textDark : styles.textLight]}>{rev.author}</Text>
      </View>
      <Text style={[styles.comment, isDark ? styles.descDark : styles.descLight]}>{rev.comment}</Text>
      <Text style={styles.dateText}>{rev.date}</Text>
    </View>
  );
}

export function RegistrationPrompt({ isDark }) {
  const { t } = useTheme();
  return (
    <View style={[styles.reviewForm, isDark ? styles.formDark : styles.formLight, { alignItems: 'center', gap: 12 }]}>
      <Text style={[styles.comment, isDark ? styles.textDark : styles.textLight, { textAlign: 'center', fontSize: 14 }]}>
        {t('reviewsRegisterRequired')}
      </Text>
      <Link href={{ pathname: '/login', params: { isRegister: 'true' } }} asChild>
        <AnimatedButton
          scaleTo={1.03}
          style={StyleSheet.flatten([styles.submitBtn, { paddingHorizontal: 24, alignSelf: 'center' }])}
        >
          <Text style={styles.submitBtnText}>{t('reviewsRegisterBtn')}</Text>
        </AnimatedButton>
      </Link>
    </View>
  );
}

function getFormConfig(isQuestion, t, formState) {
  const { newQuestion, newComment, setNewQuestion, setNewComment, addQuestion, addReview } = formState;
  const keyPrefix = isQuestion ? 'questions' : 'reviews';

  return {
    title: t(isQuestion ? 'toggleAskQuestion' : 'reviewsWrite'),
    placeholder: t(`${keyPrefix}Placeholder`),
    value: isQuestion ? newQuestion : newComment,
    onChangeText: isQuestion ? setNewQuestion : setNewComment,
    onSubmit: isQuestion ? addQuestion : addReview,
    submitLabel: t(`${keyPrefix}SubmitBtn`),
  };
}

function ReviewFormHeader({ showModeToggle, setSubmitMode, hideHeading, isDark, submitMode, options, title }) {
  if (showModeToggle && setSubmitMode) {
    return (
      <SegmentedToggle
        options={options}
        activeValue={submitMode || 'review'}
        onChange={setSubmitMode}
        isDark={isDark}
      />
    );
  }
  if (!hideHeading) {
    return (
      <Text style={[styles.formTitle, isDark ? styles.textDark : styles.textLight]}>
        {title}
      </Text>
    );
  }
  return null;
}

export function ReviewForm({
  isDark,
  submitMode,
  setSubmitMode,
  newComment,
  setNewComment,
  newQuestion,
  setNewQuestion,
  addReview,
  addQuestion,
  hideHeading,
  showModeToggle,
}) {
  const { t } = useTheme();
  const isQuestion = submitMode === 'question';

  const modeOptions = [
    { value: 'review', label: t('toggleLeaveReview') },
    { value: 'question', label: t('toggleAskQuestion') },
  ];

  const config = getFormConfig(isQuestion, t, {
    newQuestion,
    newComment,
    setNewQuestion,
    setNewComment,
    addQuestion,
    addReview,
  });

  return (
    <View style={[styles.reviewForm, isDark ? styles.formDark : styles.formLight]}>
      <ReviewFormHeader
        showModeToggle={showModeToggle}
        setSubmitMode={setSubmitMode}
        hideHeading={hideHeading}
        isDark={isDark}
        submitMode={submitMode}
        options={modeOptions}
        title={config.title}
      />
      <FieldTextarea
        styles={{
          fieldTextarea: [styles.input, isDark ? styles.inputDark : styles.inputLight, styles.textArea],
        }}
        placeholder={config.placeholder}
        placeholderTextColor={colors.secondaryDarkText}
        numberOfLines={3}
        value={config.value}
        onChangeText={config.onChangeText}
      />
      <Button
        title={config.submitLabel}
        variant="accent"
        size="lg"
        fullWidth
        style={{ marginTop: 12 }}
        onPress={config.onSubmit}
      />
    </View>
  );
}


