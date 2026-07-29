import { useState } from 'react';
import { Button } from '../../components/Button';
import Card from '../../components/Card/Card';
import { Text } from '../../components/Text';
import { useAuth } from '../../context/AuthContext';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { sendSupportMessage } from '../../services/contactService';
import { colors } from '../../theme/tokens';
import styles from './ContactPageStyles';

async function executeSupportSubmission(questionText, user) {
  const res = await sendSupportMessage({
    text: questionText,
    userId: user?.uid,
    email: user?.email,
  });
  if (!res.success) {
    throw new Error(res.error || 'Failed to submit contact question');
  }
}

function useContactQuestionForm(user) {
  const [questionText, setQuestionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { handleError } = useErrorHandler();
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
      await executeSupportSubmission(questionText, user);
      setQuestionText('');
      setSubmitStatus('success');
    } catch (error) {
      handleError(error, { message: 'Error submitting contact question' });
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
    <Text variant="body1" weight="medium" style={[styles.feedbackText, { color }]}>
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
