import { MailIcon } from '@/components/Icons';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { PageTransition } from '../../components/ui/Motion';
import { Text } from '../../components/ui/Text';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';
import { FieldInput } from '../admin/SharedFormComponents';
import Footer from '../shell/components/Footer';
import { ConfirmPasswordField, ForgotPasswordLink, LoginFooter, LoginHeader, PasswordInputField } from './LoginPageComponents';
import styles from './LoginPageStyles';
import { useLoginForm } from './useLoginForm';


const ic = (isDark, dark, light) => (isDark ? dark : light);
const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';
const getPlaceholderColor = (isDark) => (isDark ? colors.textSubtleLight : colors.textMutedDark);
const getSubmitButtonText = (isRegister, t) => (isRegister ? t('registerSubmitBtn') : t('loginSubmitBtn'));

export default function LoginPage({ isDark: isDarkProp }) {
  const { isDark: isDarkContext } = useTheme();
  const { t } = useLanguage();
  const isDark = isDarkProp ?? isDarkContext;
  const {
    isRegister,
    setIsRegister,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    handleAuth,
    handleGoogleSignIn,
  } = useLoginForm();

  return (
    <KeyboardAvoidingView 
      behavior={KEYBOARD_BEHAVIOR}
      style={[styles.container, ic(isDark, styles.containerDark, styles.containerLight), styles.noPadding]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContainer}>
          <PageTransition key={isRegister} trigger={isRegister}>
            <View style={[styles.content, styles.contentPadding]}>
              <LoginHeader isRegister={isRegister} isDark={isDark} />

              <View style={[styles.formContainer, ic(isDark, styles.formContainerDark, styles.formContainerLight)]}>
                <Button
                  title={t('loginGoogleCta')}
                  onPress={handleGoogleSignIn}
                  variant="outline"
                  size="md"
                  leftIcon={<Text style={styles.googleIcon}>G</Text>}
                  style={styles.marginBottom16}
                />

                <View style={styles.dividerContainer}>
                  <View style={[styles.dividerLine, ic(isDark, styles.dividerLineDark, styles.dividerLineLight)]} />
                  <Text variant="caption" color="muted" style={styles.dividerText}>{t('loginDivider').toUpperCase()}</Text>
                  <View style={[styles.dividerLine, ic(isDark, styles.dividerLineDark, styles.dividerLineLight)]} />
                </View>


                <FieldInput
                  testID="login-email-input"
                  label={t('loginEmailLabel')}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  isDark={isDark}
                  style={styles.inputGroup}
                  styles={{
                    fieldLabel: [styles.label, ic(isDark, styles.textDark, styles.textLight)],
                    fieldInput: [styles.input, ic(isDark, styles.textDark, styles.textLight)],
                    inputContainer: [styles.inputContainer, ic(isDark, styles.inputContainerDark, styles.inputContainerLight), { flexDirection: 'row', alignItems: 'center' }],
                  }}
                  leftIcon={<MailIcon color={colors.textSubtleLight} size={16} style={styles.iconMargin} />}
                />

                <View style={styles.inputGroup}>
                  <View style={styles.passwordLabelRow}>
                    <Text variant="caption" style={styles.label}>{t('loginPasswordLabel')}</Text>
                    <ForgotPasswordLink isRegister={isRegister} isDark={isDark} />
                  </View>
                  <PasswordInputField
                    value={password}
                    onChangeText={setPassword}
                    showToggle={true}
                    isDark={isDark}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </View>

                <ConfirmPasswordField
                  isRegister={isRegister}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  isDark={isDark}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                <Button
                  testID="login-submit-button"
                  title={getSubmitButtonText(isRegister, t)}
                  onPress={handleAuth}
                  variant="primary"
                  size="lg"
                  style={styles.marginTop8}
                />
              </View>

              <LoginFooter 
                isRegister={isRegister} 
                isDark={isDark} 
                setIsRegister={setIsRegister} 
              />
            </View>
          </PageTransition>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
