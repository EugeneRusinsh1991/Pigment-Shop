import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';

export function useLoginForm() {
  const { login, register, signInWithGoogle } = useAuth();
  const { setShowLogin } = useNavigation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const success = await register(email, password);
    if (success) {
      setShowLogin(false);
    } else {
      setError('Registration failed');
    }
  };

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      setShowLogin(false);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAuth = async () => {
    try {
      setError('');
      if (isRegister) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } catch (err) {
      setError(err.message || (isRegister ? 'Registration failed' : 'Invalid credentials'));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const success = await signInWithGoogle();
      if (success) {
        setShowLogin(false);
      }
    } catch (err) {
      setError(err.message || 'Google Sign-In failed');
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
    error,
    setError,
    handleAuth,
    handleGoogleSignIn,
  };
}
