import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './LoginPageStyles';
import { LoginHeader, PasswordInputField, LoginFooter, ErrorText, ForgotPasswordLink, ConfirmPasswordField } from './LoginPageComponents';
import { useLoginForm } from '../hooks/useLoginForm';
import { MailIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

const ic = (isDark, dark, light) => (isDark ? dark : light);
const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';
const getPlaceholderColor = (isDark) => (isDark ? '#888' : '#aaa');
const getSubmitButtonText = (isRegister, t) => (isRegister ? t('registerSubmitBtn') : t('loginSubmitBtn'));

export default function LoginPage({ isDark }) {
  const { t } = useTheme();
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
      style={[styles.container, ic(isDark, styles.containerDark, styles.containerLight)]}
    >
      <View style={styles.content}>
        <LoginHeader isRegister={isRegister} isDark={isDark} />

        <View style={[styles.formContainer, ic(isDark, styles.formContainerDark, styles.formContainerLight)]}>
          <TouchableOpacity style={[styles.googleBtn, ic(isDark, styles.googleBtnDark, styles.googleBtnLight)]} onPress={handleGoogleSignIn}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={[styles.googleBtnText, ic(isDark, styles.textDark, styles.textLight)]}>{t('loginGoogleCta')}</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, ic(isDark, styles.dividerLineDark, styles.dividerLineLight)]} />
            <Text style={[styles.dividerText, ic(isDark, styles.subtextDark, styles.subtextLight)]}>{t('loginDivider').toUpperCase()}</Text>
            <View style={[styles.dividerLine, ic(isDark, styles.dividerLineDark, styles.dividerLineLight)]} />
          </View>

          <ErrorText error={error} />

          <View style={styles.inputGroup}>
            <Text style={[styles.label, ic(isDark, styles.textDark, styles.textLight)]}>{t('loginEmailLabel')}</Text>
            <View style={[styles.inputContainer, ic(isDark, styles.inputContainerDark, styles.inputContainerLight), { flexDirection: 'row', alignItems: 'center' }]}>
              <MailIcon color="#888" size={16} style={{ marginRight: 8 }} />
              <TextInput
                style={[styles.input, ic(isDark, styles.textDark, styles.textLight)]}
                placeholder="email@example.com"
                placeholderTextColor={getPlaceholderColor(isDark)}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

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

          <TouchableOpacity 
            style={[styles.loginBtn, ic(isDark, styles.loginBtnDark, styles.loginBtnLight)]}
            onPress={handleAuth}
          >
            <Text style={[styles.loginBtnText, ic(isDark, styles.loginBtnTextDark, styles.loginBtnTextLight)]}>
              {getSubmitButtonText(isRegister, t)}
            </Text>
          </TouchableOpacity>
        </View>

        <LoginFooter 
          isRegister={isRegister} 
          isDark={isDark} 
          setIsRegister={setIsRegister} 
          setError={setError} 
        />
      </View>
    </KeyboardAvoidingView>
  );
}
