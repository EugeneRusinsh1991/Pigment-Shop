import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './LoginPageStyles';
import { LockIcon, EyeIcon, EyeOffIcon, ForwardArrowIcon } from '@/components/Icons';
import { useTheme } from '../../context/ThemeContext';

import { IconButton } from '../../components/Button';
import { AnimatedButton } from '../../components/Button';
import { FieldInput } from '../../components/Admin/SharedFormComponents';

const ic = (isDark, dark, light) => (isDark ? dark : light);

export function LoginHeader({ isRegister, isDark }) {
  const { t } = useTheme();
  return (
    <View style={styles.header}>
      <View style={[styles.iconContainer, ic(isDark, styles.iconContainerDark, styles.iconContainerLight), { justifyContent: 'center', alignItems: 'center' }]}>
        <ForwardArrowIcon color={isDark ? '#FFFFFF' : '#1C1C1C'} size={18} />
      </View>
      <Text style={[styles.title, ic(isDark, styles.textDark, styles.textLight)]}>
        {isRegister ? t('loginCreateAccount') : t('loginWelcome')}
      </Text>
      <Text style={[styles.subtitle, ic(isDark, styles.subtextDark, styles.subtextLight)]}>
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
      placeholderTextColor={isDark ? '#888' : '#aaa'}
      secureTextEntry={!showPassword}
      style={{ flex: 1 }}
      styles={{
        fieldInput: [styles.input, ic(isDark, styles.textDark, styles.textLight)],
        inputContainer: [styles.inputContainer, ic(isDark, styles.inputContainerDark, styles.inputContainerLight), { flexDirection: 'row', alignItems: 'center' }],
      }}
      leftIcon={<LockIcon color="#888" size={16} style={{ marginRight: 8 }} />}
      rightIcon={showToggle ? (
        <IconButton
          icon={showPassword ? <EyeOffIcon color={isDark ? '#888' : '#666'} size={16} /> : <EyeIcon color={isDark ? '#888' : '#666'} size={16} />}
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
      <Text style={[styles.footerText, ic(isDark, styles.subtextDark, styles.subtextLight)]}>
        {isRegister ? t('loginAlreadyHaveAccount') : t('loginDontHaveAccount')}{' '}
        <Text 
          style={[styles.footerLink, ic(isDark, styles.textDark, styles.textLight)]}
          onPress={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
        >
          {isRegister ? t('loginFooterLogIn') : t('loginFooterCreateOne')}
        </Text>
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

  return <Text testID="login-error-text" style={styles.errorText}>{errorMsg}</Text>;
}

export function ForgotPasswordLink({ isRegister, isDark }) {
  const { t } = useTheme();
  if (isRegister) return null;
  return (
    <AnimatedButton hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Text style={[styles.forgotText, ic(isDark, styles.subtextDark, styles.subtextLight)]}>{t('loginForgotPassword')}</Text>
    </AnimatedButton>
  );
}

export function ConfirmPasswordField({ isRegister, value, onChangeText, isDark, showPassword, setShowPassword }) {
  const { t } = useTheme();
  if (!isRegister) return null;
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, ic(isDark, styles.textDark, styles.textLight)]}>{t('loginConfirmPassword')}</Text>
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
