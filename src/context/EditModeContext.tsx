import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { isAuthenticated } from '@/admin/lib/auth';
import { useContentManager } from './ContentContext';

export interface HistoryEntry {
  id: string;
  key: string;
  prevValue: any;
  nextValue: any;
  timestamp: number;
  type: 'text' | 'image' | 'color';
}

export interface ActiveImageModalState {
  isOpen: boolean;
  storageKey: string;
  altStorageKey?: string;
  title?: string;
  currentUrl: string;
  currentAlt?: string;
}

interface EditModeContextType {
  isOwner: boolean;
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (active: boolean) => void;
  isColorPanelOpen: boolean;
  toggleColorPanel: () => void;
  setColorPanelOpen: (open: boolean) => void;
  // Undo / Redo
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  recordChange: (key: string, prevValue: any, nextValue: any, type?: 'text' | 'image' | 'color') => void;
  discardAllSessionChanges: () => void;
  sessionEditsCount: number;
  // Image modal
  imageModalState: ActiveImageModalState | null;
  openImageModal: (state: Omit<ActiveImageModalState, 'isOpen'>) => void;
  closeImageModal: () => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

const SESSION_EDIT_MODE_KEY = 'santa_owner_edit_mode_active';

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const { get, set, saveMultiple } = useContentManager();

  // Check if owner is logged in
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return isAuthenticated();
  });

  // Track if Edit Mode is actively turned on
  const [isEditMode, setIsEditModeState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (!isAuthenticated()) return false;
    return window.sessionStorage.getItem(SESSION_EDIT_MODE_KEY) === 'true';
  });

  // Floating Color Panel visibility
  const [isColorPanelOpen, setColorPanelOpen] = useState(false);

  // Undo / Redo stacks
  const [undoStack, setUndoStack] = useState<HistoryEntry[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryEntry[]>([]);
  // Record initial snapshots of edited keys for clean "discard all"
  const [initialKeySnapshots, setInitialKeySnapshots] = useState<Record<string, any>>({});

  // Image Modal
  const [imageModalState, setImageModalState] = useState<ActiveImageModalState | null>(null);

  // Sync auth state whenever sessionStorage or custom auth event fires
  useEffect(() => {
    const handleAuthChange = () => {
      const authenticated = isAuthenticated();
      setIsOwner(authenticated);
      if (!authenticated) {
        setIsEditModeState(false);
        setColorPanelOpen(false);
        if (typeof window !== 'undefined') {
          window.sessionStorage.removeItem(SESSION_EDIT_MODE_KEY);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('santa_admin_auth_changed', handleAuthChange);
      window.addEventListener('storage', handleAuthChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('santa_admin_auth_changed', handleAuthChange);
        window.removeEventListener('storage', handleAuthChange);
      }
    };
  }, []);

  const setEditMode = useCallback((active: boolean) => {
    if (!isAuthenticated()) {
      setIsEditModeState(false);
      return;
    }
    setIsEditModeState(active);
    if (typeof window !== 'undefined') {
      if (active) {
        window.sessionStorage.setItem(SESSION_EDIT_MODE_KEY, 'true');
      } else {
        window.sessionStorage.removeItem(SESSION_EDIT_MODE_KEY);
        setColorPanelOpen(false);
      }
    }
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode(!isEditMode);
  }, [isEditMode, setEditMode]);

  const toggleColorPanel = useCallback(() => {
    setColorPanelOpen((prev) => !prev);
  }, []);

  // Record a change to history
  const recordChange = useCallback(
    (key: string, prevValue: any, nextValue: any, type: 'text' | 'image' | 'color' = 'text') => {
      if (prevValue === nextValue) return;

      // Track first initial value for session discard
      setInitialKeySnapshots((prev) => {
        if (!(key in prev)) {
          return { ...prev, [key]: prevValue };
        }
        return prev;
      });

      const entry: HistoryEntry = {
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        key,
        prevValue,
        nextValue,
        timestamp: Date.now(),
        type,
      };

      setUndoStack((prev) => [...prev, entry]);
      setRedoStack([]); // Clear redo stack on new modification
    },
    []
  );

  // Undo action
  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, prev.length - 1));

    // Revert the value
    set(last.key, last.prevValue);

    // Push to redo stack
    setRedoStack((prev) => [...prev, last]);
  }, [undoStack, set]);

  // Redo action
  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, prev.length - 1));

    // Apply the nextValue
    set(next.key, next.nextValue);

    // Push back to undo stack
    setUndoStack((prev) => [...prev, next]);
  }, [redoStack, set]);

  // Discard all session changes
  const discardAllSessionChanges = useCallback(() => {
    if (Object.keys(initialKeySnapshots).length === 0) return;
    saveMultiple(initialKeySnapshots);
    setUndoStack([]);
    setRedoStack([]);
    setInitialKeySnapshots({});
  }, [initialKeySnapshots, saveMultiple]);

  const openImageModal = useCallback((state: Omit<ActiveImageModalState, 'isOpen'>) => {
    setImageModalState({ ...state, isOpen: true });
  }, []);

  const closeImageModal = useCallback(() => {
    setImageModalState(null);
  }, []);

  // When edit mode is active, disable standard click navigation globally for interactive elements
  // unless user holds Ctrl/Cmd or explicitly leaves edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const handleGlobalLinkClick = (e: MouseEvent) => {
      // Find closest link or button
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      const button = target.closest('button');

      // Do NOT intercept clicks inside our floating toolbar or color panel or image modal
      if (
        target.closest('[data-edit-ui="true"]') ||
        target.closest('[role="dialog"]')
      ) {
        return;
      }

      // Only intercept if user clicked directly on an inline editable text or image element
      const isEditableElement = target.closest('[contenteditable="true"]') || target.closest('[data-edit-key]');
      if (isEditableElement && anchor && !e.ctrlKey && !e.metaKey) {
        // Allow in-page hash anchor jumps (like #about) if desired, but prevent page unloads
        const href = anchor.getAttribute('href');
        if (href && !href.startsWith('#')) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('click', handleGlobalLinkClick, true);
    return () => {
      window.removeEventListener('click', handleGlobalLinkClick, true);
    };
  }, [isEditMode]);

  const contextValue = useMemo<EditModeContextType>(
    () => ({
      isOwner,
      isEditMode,
      toggleEditMode,
      setEditMode,
      isColorPanelOpen,
      toggleColorPanel,
      setColorPanelOpen,
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
      undo,
      redo,
      recordChange,
      discardAllSessionChanges,
      sessionEditsCount: undoStack.length,
      imageModalState,
      openImageModal,
      closeImageModal,
    }),
    [
      isOwner,
      isEditMode,
      toggleEditMode,
      setEditMode,
      isColorPanelOpen,
      toggleColorPanel,
      undoStack.length,
      redoStack.length,
      undo,
      redo,
      recordChange,
      discardAllSessionChanges,
      imageModalState,
      openImageModal,
      closeImageModal,
    ]
  );

  return <EditModeContext.Provider value={contextValue}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    // Graceful fallback for non-edit contexts
    return {
      isOwner: false,
      isEditMode: false,
      toggleEditMode: () => {},
      setEditMode: () => {},
      isColorPanelOpen: false,
      toggleColorPanel: () => {},
      setColorPanelOpen: () => {},
      canUndo: false,
      canRedo: false,
      undo: () => {},
      redo: () => {},
      recordChange: () => {},
      discardAllSessionChanges: () => {},
      sessionEditsCount: 0,
      imageModalState: null,
      openImageModal: () => {},
      closeImageModal: () => {},
    };
  }
  return context;
}
