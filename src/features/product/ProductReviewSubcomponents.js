import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './ProductReviewsStyles';
import { useTheme } from '../../context/ThemeContext';
import Button, { AnimatedButton } from '../../components/Button';
import Toggle from '../../components/Toggle';
import { Link } from 'expo-router';
import { colors } from '../../theme/tokens';
import { FieldTextarea } from '../../components/Admin/SharedFormComponents';

export { getAccountName, useReviewsState } from './useReviewsState';

export function SegmentedToggle({ options, activeValue, onChange, isDark }) {
  return (
    <Toggle
      options={options}
      value={activeValue}
      onChange={onChange}
      isDark={isDark}
      style={{ marginBottom: 16 }}
    />
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
        isDark={isDark}
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


