export interface AuthCredentials {
  username: string;
  password: string;
}

export function validateAuthEnv(): AuthCredentials {
  const username = process.env.SMOKE_ADMIN_USERNAME || 'admin@pigment-shop.com';
  const password = process.env.SMOKE_ADMIN_PASSWORD || 'admin123456';

  if (!username || !password) {
    throw new Error(
      'Environment Validation Error: Missing required credentials.'
    );
  }

  return { username, password };
}
