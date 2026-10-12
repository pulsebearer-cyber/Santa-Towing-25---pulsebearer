import React, { useId } from 'react';

interface AdminFieldProps {
  label: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  id?: string;
  className?: string;
  children?: React.ReactNode;
  // Shorthand simple input props if children is not provided
  type?: 'text' | 'number' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  options?: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
}

export default function AdminField({
  label,
  helpText,
  error,
  required,
  optional,
  id: customId,
  className = '',
  children,
  type = 'text',
  value,
  placeholder,
  disabled,
  rows = 3,
  options,
  onChange,
}: AdminFieldProps) {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const helpId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-800"
        >
          {label}
          {required && <span className="ml-1 text-[#d80000]" aria-hidden="true">*</span>}
        </label>
        {optional && (
          <span className="text-xs text-slate-400 font-normal">Optional</span>
        )}
      </div>

      {children ? (
        children
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          rows={rows}
          value={value ?? ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
          aria-invalid={!!error}
          className={`w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:border-[#015557] disabled:bg-slate-50 disabled:text-slate-400 ${
            error ? 'border-[#d80000]' : 'border-slate-300 hover:border-slate-400'
          }`}
        />
      ) : type === 'select' ? (
        <select
          id={inputId}
          value={value ?? ''}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
          aria-invalid={!!error}
          className={`w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 bg-white border rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:border-[#015557] disabled:bg-slate-50 disabled:text-slate-400 ${
            error ? 'border-[#d80000]' : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={type}
          value={value ?? ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim() || undefined}
          aria-invalid={!!error}
          className={`w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:border-[#015557] disabled:bg-slate-50 disabled:text-slate-400 ${
            error ? 'border-[#d80000]' : 'border-slate-300 hover:border-slate-400'
          }`}
        />
      )}

      {error ? (
        <p id={errorId} className="text-xs font-medium text-[#d80000] mt-1">
          {error}
        </p>
      ) : helpText ? (
        <p id={helpId} className="text-xs text-slate-500 leading-relaxed mt-1">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
