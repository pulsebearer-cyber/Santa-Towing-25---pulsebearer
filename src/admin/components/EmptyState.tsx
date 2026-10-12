import React from 'react';
import { Layers } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 sm:p-12 text-center rounded-xl border border-dashed border-slate-300 bg-white shadow-xs flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#015557] flex items-center justify-center mb-4">
        {icon || <Layers className="w-6 h-6 stroke-1.5" />}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 leading-relaxed max-w-sm">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:ring-offset-2"
            >
              {actionLabel}
            </button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
