import { EyeIcon, EyeOffIcon, ForwardArrowIcon, LockIcon } from '@/components/Icons';
import { View } from 'react-native';
import { Heading, Text } from '../../components/ui/Text';
import { useLanguage } from '../../context/LanguageContext';
import { colors } from '../../theme/tokens';
import styles from './LoginPageStyles';

import { Button, IconButton } from '../../components/ui/Button';
import { FieldInput } from '../admin/SharedFormComponents';

const ic = (isDark, dark, light) => (isDark ? dark : light);

export function LoginHeader({ isRegister, isDark }) {
  const { t } = useLanguage();
  return (
    <View style={styles.header}>
      <View style={[styles.iconContainer, ic(isDark, styles.iconContainerDark, styles.iconContainerLight), { justifyContent: 'center', alignItems: 'center' }]}>
        <ForwardArrowIcon color={isDark ? colors.white : colors.dark} size={18} />
      </View>
      <Heading level={2} style={styles.title}>
        {isRegister ? t('loginCreateAccount') : t('loginWelcome')}
      </Heading>
      <Text variant="body1" color="muted" style={styles.subtitle}>
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

export function LoginFooter({ isRegister, isDark, setIsRegister }) {
  const { t } = useLanguage();
  return (
    <View style={styles.footer}>
      <Text variant="body1" color="muted" style={styles.footerText}>
        {isRegister ? t('loginAlreadyHaveAccount') : t('loginDontHaveAccount')}{' '}
        <Button
          testID="login-toggle-mode-button"
          variant="ghost"
          title={isRegister ? t('loginFooterLogIn') : t('loginFooterCreateOne')}
          size="sm"
          isDark={isDark}
          onPress={() => {
            setIsRegister(!isRegister);
          }}
        />
      </Text>
    </View>
  );
}

function ErrorText({ error }) {
  const { t } = useLanguage();
  if (!error) return null;

  let errorMsg = error;
  if (error === 'Passwords do not match') errorMsg = t('errorPasswordsNotMatch');
  else if (error === 'Registration failed') errorMsg = t('errorRegistrationFailed');
  else if (error === 'Invalid credentials') errorMsg = t('loginErrorInvalid');
  else if (error === 'Google Sign-In failed') errorMsg = t('errorGoogleSignInFailed');

  return <Text testID="login-error-text" variant="body1" color="error" style={styles.errorText}>{errorMsg}</Text>;
}

export function ForgotPasswordLink({ isRegister, isDark }) {
  const { t } = useLanguage();
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
  const { t } = useLanguage();
  if (!isRegister) return null;
  return (
    <View style={styles.inputGroup}>
      <Text variant="caption" style={styles.label}>{t('loginConfirmPassword')}</Text>
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
