/**
 * Santa Towing - Content Storage Abstraction
 * 
 * ============================================================================
 * IMPORTANT ARCHITECTURE NOTE:
 * THIS IS THE ONLY FILE TO REPLACE WHEN A REAL DATABASE (e.g., PostgreSQL,
 * Cloud SQL, or Firebase Firestore) IS ADDED IN THE FUTURE.
 * 
 * Nothing else in the application may access localStorage or storage drivers
 * directly. All components, hooks, and administrative interfaces interact with
 * content exclusively through this unified storage layer.
 * ============================================================================
 */

import defaultSiteContent from '../data/site-content.json';

const STORAGE_KEY = 'santa_towing_custom_content_v1';
const LISTENERS_KEY = 'santa_content_update_event';

type StorageListener = () => void;
const listeners = new Set<StorageListener>();

/**
 * Safely parse JSON from localStorage
 */
function readStorage(): Record<string, any> {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn('[contentStorage] Failed to read from localStorage:', error);
    return {};
  }
}

/**
 * Safely write JSON to localStorage
 */
/**
 * Safely write JSON to localStorage
 */
function writeStorage(data: Record<string, any>): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    notifyListeners();
    return true;
  } catch (error) {
    console.error('[contentStorage] Failed to save to localStorage:', error);
    return false;
  }
}

/**
 * Notify all subscribers in the current tab and dispatch storage event
 */
function notifyListeners(): void {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('[contentStorage] Listener error:', e);
    }
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LISTENERS_KEY));
  }
}

/**
 * Returns all custom saved edits merged with defaults.
 * Callers receive an object of all key-value overrides.
 */
export function getContent(): Record<string, any> {
  return readStorage();
}

/**
 * Saves a single key-value content override.
 * Returns true if the save succeeded, false otherwise.
 * Key can be dot-notated (e.g., 'global.links.phone' or 'theme.primary').
 */
export function saveContent(key: string, value: any): boolean {
  try {
    const current = readStorage();
    current[key] = value;
    return writeStorage(current);
  } catch (error) {
    console.error('[contentStorage] saveContent failed:', error);
    return false;
  }
}

/**
 * Saves multiple key-value content overrides in a single atomic write.
 * Returns true if the write succeeded, false otherwise.
 */
export function saveMultiple(entries: Record<string, any>): boolean {
  try {
    const current = readStorage();
    for (const [key, value] of Object.entries(entries)) {
      if (value === undefined) {
        delete current[key];
      } else {
        current[key] = value;
      }
    }
    return writeStorage(current);
  } catch (error) {
    console.error('[contentStorage] saveMultiple failed:', error);
    return false;
  }
}

/**
 * Calculates current localStorage usage in bytes and percentage of typical quota (~5 MB).
 */
export function getStorageStats(): { usedBytes: number; quotaBytes: number; percentage: number; isNearlyFull: boolean } {
  if (typeof window === 'undefined') {
    return { usedBytes: 0, quotaBytes: 5242880, percentage: 0, isNearlyFull: false };
  }
  try {
    let totalLength = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        const val = window.localStorage.getItem(key) || '';
        totalLength += (key.length + val.length) * 2; // UTF-16 characters = 2 bytes
      }
    }
    const quotaBytes = 5 * 1024 * 1024; // typical 5 MB browser quota
    const percentage = Math.min(100, Math.round((totalLength / quotaBytes) * 100));
    // Warn when usage exceeds ~3.5 MB or 70% capacity
    const isNearlyFull = totalLength >= 3.5 * 1024 * 1024 || percentage >= 70;
    return { usedBytes: totalLength, quotaBytes, percentage, isNearlyFull };
  } catch (e) {
    return { usedBytes: 0, quotaBytes: 5242880, percentage: 0, isNearlyFull: false };
  }
}

/**
 * Backup and Restore helper types & functions
 */
export interface BackupFileStructure {
  schema: 'santa-towing-backup-v1';
  version: string;
  exportedAt: string;
  app: string;
  stats: {
    totalKeys: number;
    sizeBytes: number;
  };
  metadata?: {
    adminDisplayName?: string;
    businessName?: string;
    tagline?: string;
    contactPerson?: string;
  };
  content: Record<string, any>;
}

/**
 * Exports all custom stored overrides as a formatted JSON backup string
 */
export function exportBackupData(metadata?: Record<string, any>): string {
  const overrides = readStorage();
  const keys = Object.keys(overrides);
  const jsonContent = JSON.stringify(overrides, null, 2);
  const sizeBytes = typeof Blob !== 'undefined' ? new Blob([jsonContent]).size : jsonContent.length;

  const backup: BackupFileStructure = {
    schema: 'santa-towing-backup-v1',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    app: 'Santa Towing & Garage Services Ltd.',
    stats: {
      totalKeys: keys.length,
      sizeBytes,
    },
    metadata,
    content: overrides,
  };
  return JSON.stringify(backup, null, 2);
}

/**
 * Imports and applies backup data from a JSON string.
 * Supports either an enveloped BackupFileStructure or a raw key-value override dictionary.
 */
export function importBackupData(
  jsonString: string,
  mode: 'merge' | 'replace' = 'merge'
): { success: boolean; count: number; error?: string; metadata?: Record<string, any> } {
  try {
    const parsed = JSON.parse(jsonString);
    let targetContent: Record<string, any> = {};

    if (parsed && typeof parsed === 'object') {
      if (parsed.content && typeof parsed.content === 'object' && !Array.isArray(parsed.content)) {
        targetContent = parsed.content;
      } else {
        // Direct key-value dictionary
        targetContent = parsed;
      }
    } else {
      return { success: false, count: 0, error: 'Invalid JSON format: file root is not an object.' };
    }

    const keys = Object.keys(targetContent);
    if (keys.length === 0) {
      return { success: false, count: 0, error: 'The backup file does not contain any customization keys.' };
    }

    if (mode === 'replace') {
      const ok = writeStorage(targetContent);
      return { success: ok, count: keys.length, metadata: parsed.metadata };
    } else {
      const current = readStorage();
      const merged = { ...current, ...targetContent };
      const ok = writeStorage(merged);
      return { success: ok, count: keys.length, metadata: parsed.metadata };
    }
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || 'Failed to parse JSON backup file.' };
  }
}

/**
 * Removes a customized key-value override, reverting back to site-content.json default.
 */
export function resetContent(key: string): boolean {
  const current = readStorage();
  if (key in current) {
    delete current[key];
    return writeStorage(current);
  }
  return true;
}

/**
 * Reverts all overrides, restoring the default site-content.json across the entire website.
 */
export function resetAll(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    notifyListeners();
    return true;
  } catch (error) {
    console.error('[contentStorage] Failed to clear overrides:', error);
    return false;
  }
}

/**
 * Subscribe to storage updates for React state synchronization
 */
export function subscribeToContent(listener: StorageListener): () => void {
  listeners.add(listener);

  // Cross-tab sync
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      listener();
    }
  };

  const handleCustomEvent = () => {
    listener();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener(LISTENERS_KEY, handleCustomEvent);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener(LISTENERS_KEY, handleCustomEvent);
    }
  };
}

/**
 * Helper to get initial default value from site-content.json
 */
export function getDefaultSiteContent(): Record<string, any> {
  return defaultSiteContent;
}
