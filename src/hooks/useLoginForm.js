import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useAuthValidation } from './useAuthValidation';

export function useLoginForm() {
  const { login, register, signInWithGoogle } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { showToast } = useToast();
  const { validateRegistration, validateLogin } = useAuthValidation();
  const closeScreen = () => {
    if (params.returnUrl) {
      router.replace(params.returnUrl);
    } else {
      router.replace('/');
    }
  };
  const [isRegister, setIsRegister] = useState(params?.isRegister === 'true' || params?.isRegister === true);

  useEffect(() => {
    if (params?.isRegister !== undefined) {
      setIsRegister(params.isRegister === 'true' || params.isRegister === true);
    }
  }, [params?.isRegister]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!validateRegistration(email, password, confirmPassword)) {
      return;
    }
    const trimmedEmail = email.trim();
    const result = await register(trimmedEmail, password);
    if (!result.success) {
      showToast(result.error?.message || 'Registration failed');
      return;
    }
    closeScreen();
  };

function isUserCancelledAuth(err) {
  return err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user';
}

function showToastIfNotCancelled(err, showToast, fallback) {
  if (!isUserCancelledAuth(err)) {
    showToast(err?.message || fallback);
  }
}

  const handleLogin = async () => {
    if (!validateLogin(email, password)) {
      return;
    }
    const trimmedEmail = email.trim();
    const result = await login(trimmedEmail, password);
    if (result.success) {
      closeScreen();
    } else {
      showToast(result.error?.message || 'Invalid credentials');
    }
  };

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } catch (err) {
      showToast(err.message || (isRegister ? 'Registration failed' : 'Invalid credentials'));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        closeScreen();
        return;
      }
      showToastIfNotCancelled(result.error, showToast, 'Google Sign-In failed');
    } catch (err) {
      showToastIfNotCancelled(err, showToast, 'Google Sign-In failed');
    }
  };

  return {
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
  };
}
