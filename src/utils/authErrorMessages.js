export function getAuthErrorMessage(error) {
  if (!error) return null;
  
  const errorMsg = error;
  if (error === 'Passwords do not match') return 'errorPasswordsNotMatch';
  if (error === 'Registration failed') return 'errorRegistrationFailed';
  if (error === 'Invalid credentials') return 'loginErrorInvalid';
  if (error === 'Google Sign-In failed') return 'errorGoogleSignInFailed';
  
  return errorMsg;
}
