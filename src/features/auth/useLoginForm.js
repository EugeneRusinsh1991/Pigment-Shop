import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuthValidation } from '../../hooks/useAuthValidation';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { hapticsService } from '../../services/haptics/hapticsService';
import { hapticTokens } from '../../theme/tokens';

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
      hapticsService.trigger(hapticTokens.error);
      return;
    }
    const trimmedEmail = email.trim();
    const result = await register(trimmedEmail, password);
    if (!result.success) {
      handleError(result.error, { message: 'Registration failed' });
      hapticsService.trigger(hapticTokens.error);
      return;
    }
    hapticsService.trigger(hapticTokens.success);
    closeScreen();
  };

function isUserCancelledAuth(err) {
  return err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user';
}

  const handleLogin = async () => {
    if (!validateLogin(email, password)) {
      hapticsService.trigger(hapticTokens.error);
      return;
    }
    const trimmedEmail = email.trim();
    const result = await login(trimmedEmail, password);
    if (result.success) {
      hapticsService.trigger(hapticTokens.success);
      closeScreen();
    } else {
      handleError(result.error, { message: 'Invalid credentials' });
      hapticsService.trigger(hapticTokens.error);
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
      hapticsService.trigger(hapticTokens.error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        hapticsService.trigger(hapticTokens.success);
        closeScreen();
        return;
      }
      if (!isUserCancelledAuth(result.error)) {
        handleError(result.error, { message: 'Google Sign-In failed' });
        hapticsService.trigger(hapticTokens.error);
      }
    } catch (err) {
      if (!isUserCancelledAuth(err)) {
        handleError(err, { message: 'Google Sign-In failed' });
        hapticsService.trigger(hapticTokens.error);
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
