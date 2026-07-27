import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAuthValidation } from './useAuthValidation';
import { useErrorHandler } from './useErrorHandler';

export function useLoginForm() {
  const { login, register, signInWithGoogle } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { handleError } = useErrorHandler();
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
      handleError(result.error, { message: 'Registration failed' });
      return;
    }
    closeScreen();
  };

function isUserCancelledAuth(err) {
  return err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user';
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
      handleError(result.error, { message: 'Invalid credentials' });
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
      handleError(err, { message: isRegister ? 'Registration failed' : 'Invalid credentials' });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        closeScreen();
        return;
      }
      if (!isUserCancelledAuth(result.error)) {
        handleError(result.error, { message: 'Google Sign-In failed' });
      }
    } catch (err) {
      if (!isUserCancelledAuth(err)) {
        handleError(err, { message: 'Google Sign-In failed' });
      }
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
