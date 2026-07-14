/**
 * AdminLoginScreen.js
 *
 * Login form for the admin panel.
 * Calls onAuthenticated() on successful login.
 */
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAdminDomain } from '../../services/adminDomain';
import styles from './AdminLoginStyles';
import { ShieldIcon, KeyIcon, LockIcon } from '../Icons';
import { useTheme } from '../../context/ThemeContext';

function LoginIcon() {
  return (
    <View style={[styles.iconWrapper, { justifyContent: 'center', alignItems: 'center' }]}>
      <ShieldIcon color="#E87A8E" size={32} />
    </View>
  );
}

function LoginField({ label, value, onChangeText, secureTextEntry, icon, placeholder }) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        {icon}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor="#CBD5E1"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </>
  );
}

export default function AdminLoginScreen() {
  const { t } = useTheme();
  const { loginAdmin } = useAdminDomain();
  const [loginVal, setLoginVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!loginVal.trim() || !passwordVal.trim()) {
      setError(t('adminLoginRequiredError'));
      return;
    }
    const ok = await loginAdmin(loginVal.trim(), passwordVal.trim());
    if (!ok) {
      setError(t('loginErrorInvalid'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LoginIcon />
        <Text style={styles.title}>{t('adminTitle')}</Text>
        <Text style={styles.subtitle}>{t('adminLoginPrompt')}</Text>

        <LoginField
          label={t('adminUsernameLabel')}
          value={loginVal}
          onChangeText={setLoginVal}
          icon={<KeyIcon color="#94a3b8" size={16} style={{ marginRight: 8 }} />}
          placeholder="111111"
          secureTextEntry={false}
        />
        <LoginField
          label={t('loginPasswordLabel')}
          value={passwordVal}
          onChangeText={setPasswordVal}
          icon={<LockIcon color="#94a3b8" size={16} style={{ marginRight: 8 }} />}
          placeholder="••••••"
          secureTextEntry
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>{t('adminLoginBtn')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
