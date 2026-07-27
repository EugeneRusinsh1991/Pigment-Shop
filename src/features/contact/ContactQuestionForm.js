import { useState } from 'react';
import { Text } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { COLLECTIONS } from '../../services/collections';
import styles from './ContactPageStyles';
import { Button } from '../../components/Button';
import Card from '../../components/Card/Card';
import { colors } from '../../theme/tokens';

function buildSupportMessagePayload(questionText, user) {
  const userId = user?.uid || 'guest';
  const email = user?.email || 'guest';
  return {
    text: questionText,
    userId,
    email,
    createdAt: serverTimestamp(),
  };
}

function useContactQuestionForm(user) {
  const [questionText, setQuestionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const isEmpty = questionText.trim().length === 0;

  const handleChangeText = (text) => {
    setQuestionText(text);
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async () => {
    if (isEmpty) return;
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const payload = buildSupportMessagePayload(questionText, user);
      await addDoc(collection(db, COLLECTIONS.SUPPORT_MESSAGES), payload);
      setQuestionText('');
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting contact question:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    questionText,
    submitting,
    submitStatus,
    isEmpty,
    handleChangeText,
    handleSubmit,
  };
}

function FormFeedbackMessage({ submitStatus, t }) {
  if (!submitStatus) return null;
  const isSuccess = submitStatus === 'success';
  const color = isSuccess ? colors.successMid : colors.danger;
  const textKey = isSuccess ? 'contactUsSuccess' : 'contactUsError';

  return (
    <Text variant="body" weight="medium" style={[styles.feedbackText, { color }]}>
      {t(textKey)}
    </Text>
  );
}

import { FieldTextarea } from '../admin/SharedFormComponents';

export default function ContactQuestionForm({ t, ic, isDark, isMobile, contentWidth }) {
  const { user } = useAuth();
  const { questionText, submitting, submitStatus, isEmpty, handleChangeText, handleSubmit } = useContactQuestionForm(user);

  const cardStyle = [
    styles.questionSection,
    { alignSelf: 'center', width: '100%', maxWidth: isMobile ? contentWidth : undefined }
  ];

  return (
    <Card isDark={isDark} style={[styles.questionSection, { alignSelf: 'center', width: '100%', maxWidth: isMobile ? contentWidth : undefined }]}>
      <FieldTextarea
        label={t('contactUsQuestion')}
        styles={{
          fieldLabel: [styles.questionLabel, ic(styles.textDark, styles.textLight)],
          fieldTextarea: [styles.textarea, ic(styles.textareaDark, styles.textareaLight)],
        }}
        placeholder={t('contactUsQuestionPlaceholder')}
        value={questionText}
        onChangeText={handleChangeText}
        editable={!submitting}
        isDark={isDark}
      />
      <Button
        title={t('contactUsQuestion')}
        onPress={handleSubmit}
        disabled={isEmpty || submitting}
        loading={submitting}
        variant="accent"
        size="lg"
        style={styles.submitBtnTopMargin}
      />
      <FormFeedbackMessage submitStatus={submitStatus} t={t} />
    </Card>
  );
}
