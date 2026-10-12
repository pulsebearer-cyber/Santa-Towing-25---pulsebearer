import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import defaultSiteContent from '../data/site-content.json';
import {
  getContent,
  saveContent,
  saveMultiple,
  resetContent,
  resetAll,
  subscribeToContent
} from '../lib/contentStorage';

interface ContentContextType {
  get: <T = any>(key: string, fallback?: T) => T;
  set: (key: string, value: any) => boolean;
  saveContent: (key: string, value: any) => boolean;
  setMultiple: (entries: Record<string, any>) => boolean;
  saveMultiple: (entries: Record<string, any>) => boolean;
  reset: (key: string) => boolean;
  resetContent: (key: string) => boolean;
  resetAll: () => boolean;
  rawOverrides: Record<string, any>;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    background: string;
    white: string;
    black: string;
  };
}

const ContentContext = createContext<ContentContextType | null>(null);

/**
 * Traverse nested object by dot notation path (e.g., 'global.links.phone' or 'home.hero.slides.0.headline')
 */
export function getByDotPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  if (typeof obj === 'object' && path in obj) {
    return obj[path];
  }
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === null || curr === undefined || typeof curr !== 'object') {
      return undefined;
    }
    curr = curr[part];
  }
  return curr;
}

/**
 * Set value on a nested object/array by dot notation path
 */
function setByDotPath(obj: any, path: string, value: any): void {
  if (!obj || !path) return;
  const parts = path.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    if (curr[part] === undefined || curr[part] === null || typeof curr[part] !== 'object') {
      curr[part] = /^\d+$/.test(nextPart) ? [] : {};
    }
    curr = curr[part];
  }
  curr[parts[parts.length - 1]] = value;
}

function buildMergedContent(base: any, overrides: Record<string, any>): any {
  const cloned = JSON.parse(JSON.stringify(base));
  for (const [k, v] of Object.entries(overrides)) {
    if (v !== undefined) {
      setByDotPath(cloned, k, v);
    }
  }
  return cloned;
}

/**
 * Apply CSS variables to root element for runtime Tailwind v4 theme styling
 */
function applyThemeToDocument(theme: Record<string, string>) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (theme.primary) root.style.setProperty('--color-primary', theme.primary);
  if (theme.secondary) root.style.setProperty('--color-secondary', theme.secondary);
  if (theme.accent) root.style.setProperty('--color-accent', theme.accent);
  if (theme.dark) root.style.setProperty('--color-dark', theme.dark);
  if (theme.background) {
    root.style.setProperty('--color-background', theme.background);
    document.body.style.backgroundColor = theme.background;
  }
  if (theme.white) root.style.setProperty('--color-white', theme.white);
  if (theme.black) root.style.setProperty('--color-black', theme.black);
}

/**
 * Updates browser favicon link in head dynamically
 */
export function updateFavicon(url: string) {
  if (typeof document === 'undefined' || !url) return;
  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  if (link.href !== url) {
    link.href = url;
  }
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, any>>(() => getContent());

  useEffect(() => {
    // Subscribe to content storage changes (same tab & cross-tab)
    const unsubscribe = subscribeToContent(() => {
      setOverrides({ ...getContent() });
    });
    return unsubscribe;
  }, []);

  const mergedContent = useMemo(() => {
    return buildMergedContent(defaultSiteContent, overrides);
  }, [overrides]);

  // Compute active theme colors
  const activeTheme = useMemo(() => {
    const themeObj = mergedContent.theme || {};
    return {
      primary: overrides['theme.primary'] || themeObj.primary || '#015557',
      secondary: overrides['theme.secondary'] || themeObj.secondary || '#192e2e',
      accent: overrides['theme.accent'] || themeObj.accent || '#d80000',
      dark: overrides['theme.dark'] || themeObj.dark || '#131514',
      background: overrides['theme.background'] || themeObj.background || '#ffffff',
      white: overrides['theme.white'] || themeObj.white || '#ffffff',
      black: overrides['theme.black'] || themeObj.black || '#000000',
    };
  }, [overrides, mergedContent]);

  // Synchronize CSS variables whenever theme updates
  useEffect(() => {
    applyThemeToDocument(activeTheme);
  }, [activeTheme]);

  // Synchronize browser favicon whenever logo updates
  const activeLogoUrl = useMemo(() => {
    return overrides['global.logo.url'] || mergedContent.global?.logo?.url || 'https://i.ibb.co/KgkfFKV/Santa-Logo.png';
  }, [overrides, mergedContent]);

  useEffect(() => {
    updateFavicon(activeLogoUrl);
  }, [activeLogoUrl]);

  /**
   * Resolution hierarchy:
   * 1. Edited value from storage (overrides[key] or merged tree)
   * 2. Default value from site-content.json
   * 3. Fallback provided by caller
   */
  const get = useCallback(<T = any>(key: string, fallback?: T): T => {
    if (key in overrides && overrides[key] !== undefined) {
      return overrides[key] as T;
    }
    const fromMerged = getByDotPath(mergedContent, key);
    if (fromMerged !== undefined) {
      return fromMerged as T;
    }
    return fallback as T;
  }, [overrides, mergedContent]);

  const set = useCallback((key: string, value: any): boolean => {
    return saveContent(key, value);
  }, []);

  const setMultiple = useCallback((entries: Record<string, any>): boolean => {
    return saveMultiple(entries);
  }, []);

  const reset = useCallback((key: string): boolean => {
    return resetContent(key);
  }, []);

  const handleResetAll = useCallback((): boolean => {
    return resetAll();
  }, []);

  const contextValue = useMemo(() => ({
    get,
    set,
    saveContent: set,
    setMultiple,
    saveMultiple: setMultiple,
    reset,
    resetContent: reset,
    resetAll: handleResetAll,
    rawOverrides: overrides,
    theme: activeTheme,
  }), [get, set, setMultiple, reset, handleResetAll, overrides, activeTheme]);

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

/**
 * Custom hook to get editable content value.
 * Order of precedence:
 * 1. Edited value in storage
 * 2. site-content.json value
 * 3. Fallback provided in component
 */
export function useContent<T = any>(key: string, fallback?: T): T {
  const context = useContext(ContentContext);
  if (!context) {
    // Graceful fallback if invoked outside of provider (e.g. testing or static init)
    const stored = getContent();
    if (key in stored && stored[key] !== undefined) {
      return stored[key] as T;
    }
    const fromDefault = getByDotPath(defaultSiteContent, key);
    if (fromDefault !== undefined) {
      return fromDefault as T;
    }
    return fallback as T;
  }
  return context.get<T>(key, fallback);
}

export function useContentManager() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContentManager must be used within a ContentProvider');
  }
  return context;
}
