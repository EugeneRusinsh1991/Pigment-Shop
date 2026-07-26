import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text, Heading } from '../../components/Text';
import styles from './LoginPageStyles';
import { LockIcon, EyeIcon, EyeOffIcon, ForwardArrowIcon } from '@/components/Icons';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

import { Button, IconButton, AnimatedButton } from '../../components/Button';
import { FieldInput } from '../../components/Admin/SharedFormComponents';

const ic = (isDark, dark, light) => (isDark ? dark : light);

export function LoginHeader({ isRegister, isDark }) {
  const { t } = useTheme();
  return (
    <View style={styles.header}>
      <View style={[styles.iconContainer, ic(isDark, styles.iconContainerDark, styles.iconContainerLight), { justifyContent: 'center', alignItems: 'center' }]}>
        <ForwardArrowIcon color={isDark ? colors.white : colors.dark} size={18} />
      </View>
      <Heading level={2} style={styles.title}>
        {isRegister ? t('loginCreateAccount') : t('loginWelcome')}
      </Heading>
      <Text variant="body" color="muted" style={styles.subtitle}>
        {isRegister ? t('loginSignUpGetStarted') : t('loginToAccount')}
      </Text>
    </View>
  );
}

export function PasswordInputField({ value, onChangeText, showToggle, isDark, showPassword, setShowPassword }) {
  return (
    <FieldInput
      testID="login-password-input"
      value={value}
      onChangeText={onChangeText}
      placeholder="......"
      isDark={isDark}
      secureTextEntry={!showPassword}
      style={styles.flex1}
      styles={{
        fieldInput: [styles.input, ic(isDark, styles.textDark, styles.textLight)],
        inputContainer: [styles.inputContainer, ic(isDark, styles.inputContainerDark, styles.inputContainerLight), { flexDirection: 'row', alignItems: 'center' }],
      }}
      leftIcon={<LockIcon color={colors.textSubtleLight} size={16} style={styles.iconMargin} />}
      rightIcon={showToggle ? (
        <IconButton
          icon={showPassword ? <EyeOffIcon color={isDark ? colors.textSubtleLight : colors.textMutedLight} size={16} /> : <EyeIcon color={isDark ? colors.textSubtleLight : colors.textMutedLight} size={16} />}
          onPress={() => setShowPassword(!showPassword)}
          variant="transparent"
          size="sm"
        />
      ) : null}
    />
  );
}

export function LoginFooter({ isRegister, isDark, setIsRegister, setError }) {
  const { t } = useTheme();
  return (
    <View style={styles.footer}>
      <Text variant="body" color="muted" style={styles.footerText}>
        {isRegister ? t('loginAlreadyHaveAccount') : t('loginDontHaveAccount')}{' '}
        <Button
          testID="login-toggle-mode-button"
          variant="ghost"
          title={isRegister ? t('loginFooterLogIn') : t('loginFooterCreateOne')}
          size="sm"
          isDark={isDark}
          onPress={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
        />
      </Text>
    </View>
  );
}

export function ErrorText({ error }) {
  const { t } = useTheme();
  if (!error) return null;

  let errorMsg = error;
  if (error === 'Passwords do not match') errorMsg = t('errorPasswordsNotMatch');
  else if (error === 'Registration failed') errorMsg = t('errorRegistrationFailed');
  else if (error === 'Invalid credentials') errorMsg = t('loginErrorInvalid');
  else if (error === 'Google Sign-In failed') errorMsg = t('errorGoogleSignInFailed');

  return <Text testID="login-error-text" variant="body" color="error" style={styles.errorText}>{errorMsg}</Text>;
}

export function ForgotPasswordLink({ isRegister, isDark }) {
  const { t } = useTheme();
  if (isRegister) return null;
  return (
    <Button
      testID="login-forgot-password-link"
      variant="ghost"
      title={t('loginForgotPassword')}
      size="sm"
      isDark={isDark}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    />
  );
}

export function ConfirmPasswordField({ isRegister, value, onChangeText, isDark, showPassword, setShowPassword }) {
  const { t } = useTheme();
  if (!isRegister) return null;
  return (
    <View style={styles.inputGroup}>
      <Text variant="label" style={styles.label}>{t('loginConfirmPassword')}</Text>
      <PasswordInputField
        value={value}
        onChangeText={onChangeText}
        showToggle={false}
        isDark={isDark}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </View>
  );
}
