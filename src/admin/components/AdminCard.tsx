import React from 'react';

interface AdminCardProps {
  id?: string;
  key?: React.Key;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export default function AdminCard({
  id,
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = '',
  onClick,
  interactive = false,
}: AdminCardProps) {
  const isClickable = interactive || !!onClick;

  return (
    <div
      id={id}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={`bg-white rounded-xl border border-slate-200 shadow-xs transition-all duration-150 ${
        isClickable
          ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:ring-offset-2'
          : ''
      } ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500 font-normal">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-5 sm:p-6 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
