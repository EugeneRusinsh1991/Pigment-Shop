import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLoginForm } from '../../hooks/useLoginForm';
import { MailIcon } from '@/components/Icons';
import { ConfirmPasswordField, ErrorText, ForgotPasswordLink, LoginFooter, LoginHeader, PasswordInputField } from './LoginPageComponents';
import styles from './LoginPageStyles';
import Footer from '../../components/Footer';
import { Button } from '../../components/Button';
import PageTransition from '../../components/PageTransition';
import { FieldInput } from '../../components/Admin/SharedFormComponents';


const ic = (isDark, dark, light) => (isDark ? dark : light);
const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';
const getPlaceholderColor = (isDark) => (isDark ? '#888' : '#aaa');
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
    error,
    setError,
    handleAuth,
    handleGoogleSignIn,
  } = useLoginForm();

  return (
    <KeyboardAvoidingView 
      behavior={KEYBOARD_BEHAVIOR}
      style={[styles.container, ic(isDark, styles.containerDark, styles.containerLight), { padding: 0 }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, width: '100%', paddingTop: 24, paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <PageTransition key={isRegister} trigger={isRegister}>
            <View style={[styles.content, { paddingBottom: 32 }]}>
              <LoginHeader isRegister={isRegister} isDark={isDark} />

              <View style={[styles.formContainer, ic(isDark, styles.formContainerDark, styles.formContainerLight)]}>
                <Button
                  title={t('loginGoogleCta')}
                  onPress={handleGoogleSignIn}
                  variant="outline"
                  size="md"
                  leftIcon={<Text style={styles.googleIcon}>G</Text>}
                  style={{ marginBottom: 16 }}
                />

                <View style={styles.dividerContainer}>
                  <View style={[styles.dividerLine, ic(isDark, styles.dividerLineDark, styles.dividerLineLight)]} />
                  <Text style={[styles.dividerText, ic(isDark, styles.subtextDark, styles.subtextLight)]}>{t('loginDivider').toUpperCase()}</Text>
                  <View style={[styles.dividerLine, ic(isDark, styles.dividerLineDark, styles.dividerLineLight)]} />
                </View>

                <ErrorText error={error} />

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
                  leftIcon={<MailIcon color="#888" size={16} style={{ marginRight: 8 }} />}
                />

                <View style={styles.inputGroup}>
                  <View style={styles.passwordLabelRow}>
                    <Text style={[styles.label, ic(isDark, styles.textDark, styles.textLight)]}>{t('loginPasswordLabel')}</Text>
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
                  style={{ marginTop: 8 }}
                />
              </View>

              <LoginFooter 
                isRegister={isRegister} 
                isDark={isDark} 
                setIsRegister={setIsRegister} 
                setError={setError} 
              />
            </View>
          </PageTransition>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
