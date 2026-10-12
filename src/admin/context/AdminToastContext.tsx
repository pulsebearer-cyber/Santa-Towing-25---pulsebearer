import React, { createContext, useContext, useState, useCallback } from 'react';
import { AdminToastItem } from '../types';
import AdminToast from '../components/AdminToast';

interface ToastContextValue {
  toasts: AdminToastItem[];
  addToast: (toast: Omit<AdminToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  success: (message: string, options?: Partial<Omit<AdminToastItem, 'id' | 'type' | 'message'>>) => string;
  error: (message: string, options?: Partial<Omit<AdminToastItem, 'id' | 'type' | 'message'>>) => string;
  info: (message: string, options?: Partial<Omit<AdminToastItem, 'id' | 'type' | 'message'>>) => string;
}

const AdminToastContext = createContext<ToastContextValue | null>(null);

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<AdminToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toastData: Omit<AdminToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: AdminToastItem = {
      id,
      duration: 4000,
      ...toastData,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, [removeToast]);

  const success = useCallback((message: string, options?: Partial<Omit<AdminToastItem, 'id' | 'type' | 'message'>>) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const error = useCallback((message: string, options?: Partial<Omit<AdminToastItem, 'id' | 'type' | 'message'>>) => {
    return addToast({ type: 'error', message, ...options });
  }, [addToast]);

  const info = useCallback((message: string, options?: Partial<Omit<AdminToastItem, 'id' | 'type' | 'message'>>) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  return (
    <AdminToastContext.Provider value={{ toasts, addToast, removeToast, success, error, info }}>
      {children}
      <AdminToast toasts={toasts} onClose={removeToast} />
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error('useAdminToast must be used within an AdminToastProvider');
  }
  return context;
}
