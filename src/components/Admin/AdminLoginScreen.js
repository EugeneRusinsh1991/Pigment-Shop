/**
 * AdminLoginScreen.js
 *
 * Login form for the admin panel.
 * Calls onAuthenticated() on successful login.
 */
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../../services/adminAuth';
import styles from './AdminLoginStyles';

function LoginIcon() {
  return (
    <View style={styles.iconWrapper}>
      <Text style={styles.iconText}>🛡️</Text>
    </View>
  );
}

function LoginField({ label, value, onChangeText, secureTextEntry, icon, placeholder }) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <Text style={styles.inputIcon}>{icon}</Text>
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

export default function AdminLoginScreen({ onAuthenticated }) {
  const [loginVal, setLoginVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!loginVal.trim() || !passwordVal.trim()) {
      setError('Введите логин и пароль');
      return;
    }
    const ok = login(loginVal.trim(), passwordVal.trim());
    if (ok) {
      onAuthenticated();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LoginIcon />
        <Text style={styles.title}>Админ-панель</Text>
        <Text style={styles.subtitle}>Введите учётные данные</Text>

        <LoginField
          label="Логин"
          value={loginVal}
          onChangeText={setLoginVal}
          icon="🔑"
          placeholder="111111"
          secureTextEntry={false}
        />
        <LoginField
          label="Пароль"
          value={passwordVal}
          onChangeText={setPasswordVal}
          icon="🔒"
          placeholder="••••••"
          secureTextEntry
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
