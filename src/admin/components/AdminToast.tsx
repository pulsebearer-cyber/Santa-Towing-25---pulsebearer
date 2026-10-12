import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AdminToastItem } from '../types';

interface AdminToastProps {
  toasts: AdminToastItem[];
  onClose: (id: string) => void;
}

export default function AdminToast({ toasts, onClose }: AdminToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        let borderClass = 'border-slate-200';
        let icon = <Info className="w-5 h-5 text-sky-600 shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-200 bg-white text-slate-800';
          icon = <CheckCircle2 className="w-5 h-5 text-[#015557] shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-red-200 bg-white text-slate-800';
          icon = <AlertCircle className="w-5 h-5 text-[#d80000] shrink-0" />;
        } else {
          borderClass = 'border-sky-200 bg-white text-slate-800';
          icon = <Info className="w-5 h-5 text-[#015557] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-lg border shadow-lg ${borderClass} transition-all duration-200 ease-out`}
          >
            <div className="pt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {toast.title}
                </p>
              )}
              <p className="text-sm text-slate-600 leading-relaxed break-words">
                {toast.message}
              </p>
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action?.onClick();
                    onClose(toast.id);
                  }}
                  className="mt-2 text-xs font-semibold text-[#015557] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => onClose(toast.id)}
              aria-label="Dismiss notification"
              className="p-1 -mr-1 -mt-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
