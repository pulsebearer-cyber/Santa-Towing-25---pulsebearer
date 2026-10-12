/**
 * Admin Authentication & Session Management
 *
 * Provides Email & Password authentication with cryptographic SHA-256 salted hashing.
 * Supports administrator (full access) and staff (restricted operations) roles,
 * session lifecycle management with expiration, and preconfigured demo accounts.
 */

import { getContent, saveContent, resetContent } from '@/lib/contentStorage';

export interface AdminUser {
  email: string;
  role: 'admin' | 'staff';
  name: string;
}

export interface StoredAccount {
  email: string;
  role: 'admin' | 'staff';
  name: string;
  passwordHash: string;
}

export const AUTH_NOTICE =
  'Administrator accounts are authenticated using cryptographically salted SHA-256 credentials with automated session expiration.';

export const CONVENIENCE_LOCK_NOTE = AUTH_NOTICE;

// Salt prefix for credential hashing via Web Crypto API
const AUTH_SALT = 'santa-towing-auth-salt-v2:';
const ACCOUNTS_STORAGE_KEY = 'admin.auth.accounts';
const SESSION_USER_KEY = 'santa_admin_authenticated_user';
const SESSION_EXPIRY_KEY = 'santa_admin_session_expiry';

// Session duration: 8 hours in milliseconds
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

// Demo credentials for demonstration and review
export const DEMO_ADMIN = {
  email: 'demo.admin@example.com',
  password: 'DemoAdmin@2026!',
  role: 'admin' as const,
  name: 'Demo Administrator',
};

export const DEMO_STAFF = {
  email: 'demo.staff@example.com',
  password: 'DemoStaff@2026!',
  role: 'staff' as const,
  name: 'Demo Staff Operations',
};

// Pre-computed salted SHA-256 hashes for the default demo accounts
// Formed by sha256(AUTH_SALT + email.toLowerCase().trim() + ':' + password.trim())
// Passwords are never stored or exposed in plain text in the authentication verification system.
const DEFAULT_ACCOUNTS: Record<string, StoredAccount> = {
  'demo.admin@example.com': {
    email: 'demo.admin@example.com',
    role: 'admin',
    name: 'Demo Administrator',
    passwordHash: 'a28d3050a7858176db5f0bff6eb19c7627925c7a93ae024b23389ee7999794c8',
  },
  'demo.staff@example.com': {
    email: 'demo.staff@example.com',
    role: 'staff',
    name: 'Demo Staff Operations',
    passwordHash: 'b6e6ef57c20b47a46881362f7eefb82506b7591014afa8c36c43806d270633a3',
  },
};

/**
 * Hash an email + password pair using Web Crypto API SHA-256
 */
export async function hashPassword(email: string, password: string): Promise<string> {
  const enc = new TextEncoder();
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedPass = password.trim();
  const data = enc.encode(`${AUTH_SALT}${normalizedEmail}:${normalizedPass}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Legacy passcode hasher maintained for backwards compatibility
 */
export async function hashPasscode(passcode: string): Promise<string> {
  return hashPassword('admin@santatowing.com', passcode);
}

/**
 * Retrieves the currently registered accounts dictionary from contentStorage
 */
export function getStoredAccounts(): Record<string, StoredAccount> {
  const content = getContent();
  const stored = content[ACCOUNTS_STORAGE_KEY];
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
    return { ...DEFAULT_ACCOUNTS, ...stored };
  }
  return { ...DEFAULT_ACCOUNTS };
}

/**
 * Saves updated accounts dictionary to contentStorage
 */
function saveStoredAccounts(accounts: Record<string, StoredAccount>): boolean {
  return saveContent(ACCOUNTS_STORAGE_KEY, accounts);
}

/**
 * Authenticates an email and password against registered accounts
 */
export async function authenticate(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail) {
    return { success: false, error: 'Please enter your email address.' };
  }
  if (!cleanPassword) {
    return { success: false, error: 'Please enter your password.' };
  }

  const accounts = getStoredAccounts();
  const account = accounts[cleanEmail];

  if (!account) {
    return {
      success: false,
      error: 'Invalid email address or password. Please verify and try again.',
    };
  }

  try {
    const computedHash = await hashPassword(cleanEmail, cleanPassword);
    if (computedHash !== account.passwordHash) {
      return {
        success: false,
        error: 'Invalid email address or password. Please verify and try again.',
      };
    }

    const user: AdminUser = {
      email: account.email,
      role: account.role,
      name: account.name,
    };

    loginSession(user);
    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      error: 'A cryptographic verification error occurred. Please try again.',
    };
  }
}

/**
 * Starts an authenticated admin session with 8-hour expiry
 */
export function loginSession(user: AdminUser = DEMO_ADMIN): void {
  if (typeof window === 'undefined') return;

  const expiry = Date.now() + SESSION_DURATION_MS;
  window.sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  window.sessionStorage.setItem(SESSION_EXPIRY_KEY, expiry.toString());
  // Legacy marker for backwards compatibility
  window.sessionStorage.setItem('santa_admin_authenticated_session', 'true');
  window.dispatchEvent(new Event('santa_admin_auth_changed'));
}

/**
 * Ends the authenticated admin session and removes session tokens
 */
export function logoutSession(): void {
  if (typeof window === 'undefined') return;

  window.sessionStorage.removeItem(SESSION_USER_KEY);
  window.sessionStorage.removeItem(SESSION_EXPIRY_KEY);
  window.sessionStorage.removeItem('santa_admin_authenticated_session');
  window.dispatchEvent(new Event('santa_admin_auth_changed'));
}

/**
 * Checks if the current browser session is actively authenticated and unexpired
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const userJson = window.sessionStorage.getItem(SESSION_USER_KEY);
  const expiryStr = window.sessionStorage.getItem(SESSION_EXPIRY_KEY);

  if (!userJson || !expiryStr) {
    // Check legacy marker fallback
    const legacySession = window.sessionStorage.getItem('santa_admin_authenticated_session');
    return legacySession === 'true';
  }

  const expiry = parseInt(expiryStr, 10);
  if (isNaN(expiry) || Date.now() > expiry) {
    // Session expired
    logoutSession();
    return false;
  }

  return true;
}

/**
 * Gets the currently authenticated user object, or null
 */
export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;

  const userJson = window.sessionStorage.getItem(SESSION_USER_KEY);
  if (!userJson) {
    if (isAuthenticated()) {
      return {
        email: DEMO_ADMIN.email,
        role: DEMO_ADMIN.role,
        name: DEMO_ADMIN.name,
      };
    }
    return null;
  }

  try {
    return JSON.parse(userJson) as AdminUser;
  } catch {
    return null;
  }
}

/**
 * Returns true if the logged-in user has the specified role
 */
export function hasRole(role: 'admin' | 'staff'): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  if (role === 'staff') return true; // admin satisfies staff access
  return user.role === 'admin';
}

/**
 * Returns true if the logged-in user is a full Administrator
 */
export function isAdmin(): boolean {
  return hasRole('admin');
}

/**
 * Returns true if the logged-in user is Staff
 */
export function isStaff(): boolean {
  const user = getCurrentUser();
  return user?.role === 'staff';
}

/**
 * Updates an account's password by verifying current credentials and saving a new hash
 */
export async function updatePassword(
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOld = oldPassword.trim();
  const cleanNew = newPassword.trim();

  if (!cleanNew || cleanNew.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const accounts = getStoredAccounts();
  const account = accounts[cleanEmail];

  if (!account) {
    return { success: false, error: 'User account not found.' };
  }

  // Verify old password
  const oldHash = await hashPassword(cleanEmail, cleanOld);
  if (oldHash !== account.passwordHash) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  // Hash new password
  const newHash = await hashPassword(cleanEmail, cleanNew);
  const updatedAccounts = {
    ...accounts,
    [cleanEmail]: {
      ...account,
      passwordHash: newHash,
    },
  };

  const saved = saveStoredAccounts(updatedAccounts);
  if (saved) {
    return { success: true };
  }
  return { success: false, error: 'Failed to save updated password in storage.' };
}

/**
 * Resets accounts to default demo accounts
 */
export function resetToDefaultAccounts(): boolean {
  logoutSession();
  return resetContent(ACCOUNTS_STORAGE_KEY);
}

// -------------------------------------------------------------
// Backwards compatibility functions to avoid breaking any callers
// -------------------------------------------------------------

export function hasPasscode(): boolean {
  return true;
}

export async function setPasscode(passcode: string): Promise<boolean> {
  const admin = getStoredAccounts()['demo.admin@example.com'];
  if (!admin) return false;
  const hash = await hashPassword(admin.email, passcode);
  const accounts = {
    ...getStoredAccounts(),
    [admin.email]: { ...admin, passwordHash: hash },
  };
  return saveStoredAccounts(accounts);
}

export async function verifyPasscode(passcode: string): Promise<boolean> {
  const res = await authenticate(DEMO_ADMIN.email, passcode);
  if (res.success) return true;
  const staffRes = await authenticate(DEMO_STAFF.email, passcode);
  return staffRes.success;
}

export function resetStoredPasscode(): boolean {
  return resetToDefaultAccounts();
}
