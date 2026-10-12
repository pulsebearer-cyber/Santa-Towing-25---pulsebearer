import React, { useEffect, useRef } from 'react';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Autofocus confirmation or cancel button
    confirmButtonRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-2.5 rounded-lg shrink-0 ${
                isDestructive
                  ? 'bg-red-50 text-[#d80000]'
                  : 'bg-emerald-50 text-[#015557]'
              }`}
            >
              {isDestructive ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3
                id="confirm-dialog-title"
                className="text-base font-semibold text-slate-900"
              >
                {title}
              </h3>
              <p
                id="confirm-dialog-desc"
                className="mt-2 text-sm text-slate-600 leading-relaxed"
              >
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={onCancel}
              aria-label="Close dialog"
              className="p-1 -mr-1 -mt-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            className={`w-full sm:w-auto min-h-[44px] px-5 py-2 text-sm font-semibold text-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDestructive
                ? 'bg-[#d80000] hover:bg-red-700 focus-visible:ring-red-600'
                : 'bg-[#015557] hover:bg-[#014345] focus-visible:ring-[#015557]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
