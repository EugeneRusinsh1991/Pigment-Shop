import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import Card from '../../components/ui/Card/Card';
import { Heading, Text } from '../../components/ui/Text';
import TextField from '../../components/ui/TextField/TextField';
import { useAuth } from '../../context/AuthContext';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { sendSupportMessage } from '../../services/contactService';
import { colors, layout } from '../../theme/tokens';

const styles = StyleSheet.create({
  card: {
    padding: layout.spacing.xl,
    gap: layout.spacing.lg,
  },
  headline: {
    marginBottom: layout.spacing.xs,
  },
  submitBtn: {
    marginTop: layout.spacing.sm,
  },
  feedbackText: {
    marginTop: layout.spacing.md,
    textAlign: 'center',
  },
});

async function executeSupportSubmission(text, user) {
  const res = await sendSupportMessage({
    text,
    userId: user?.uid,
    email: user?.email,
  });
  if (!res.success) {
    throw new Error(res.error || 'Failed to submit contact question');
  }
}

function useContactForm(user) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const { handleError } = useErrorHandler();
  const isEmpty = text.trim().length === 0;

  const handleChange = (value) => {
    setText(value);
    if (status) setStatus(null);
  };

  const handleSubmit = async () => {
    if (isEmpty) return;
    setSubmitting(true);
    setStatus(null);
    try {
      await executeSupportSubmission(text, user);
      setText('');
      setStatus('success');
    } catch (error) {
      handleError(error, { message: 'Error submitting contact question' });
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return { text, submitting, status, isEmpty, handleChange, handleSubmit };
}

function FormFeedback({ status, t }) {
  if (!status) return null;
  const isSuccess = status === 'success';
  const color = isSuccess ? colors.successMid : colors.danger;
  const key = isSuccess ? 'contactUsSuccess' : 'contactUsError';
  return (
    <Text variant="body2" weight="medium" style={[styles.feedbackText, { color }]}>
      {t(key)}
    </Text>
  );
}

export default function ContactFormSection({ t, isDark }) {
  const { user } = useAuth();
  const { text, submitting, status, isEmpty, handleChange, handleSubmit } = useContactForm(user);

  return (
    <Card isDark={isDark} style={styles.card}>
      <View>
        <Heading level={2} isDark={isDark} style={styles.headline}>
          {t('contactFormHeadline')}
        </Heading>
        <Text variant="body2" isDark={isDark} color="muted">
          {t('contactFormDesc')}
        </Text>
      </View>

      <TextField
        label={t('contactUsQuestion')}
        placeholder={t('contactUsQuestionPlaceholder')}
        value={text}
        onChangeText={handleChange}
        multiline
        numberOfLines={5}
        disabled={submitting}
        isDark={isDark}
        fullWidth
      />

      <Button
        title={t('contactSubmitBtn')}
        onPress={handleSubmit}
        disabled={isEmpty || submitting}
        loading={submitting}
        variant="accent"
        size="lg"
        fullWidth
        style={styles.submitBtn}
      />

      <FormFeedback status={status} t={t} />
    </Card>
  );
}
