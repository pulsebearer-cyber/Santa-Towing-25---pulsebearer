import React, { useId } from 'react';

interface AdminToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export default function AdminToggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  id: customId,
  className = '',
}: AdminToggleProps) {
  const generatedId = useId();
  const toggleId = customId || generatedId;
  const descId = `${toggleId}-desc`;

  return (
    <div className={`flex items-start justify-between gap-4 py-2 ${className}`}>
      <div className="flex-1 min-w-0 pr-2">
        <label
          htmlFor={toggleId}
          className={`block text-sm font-medium ${
            disabled ? 'text-slate-400' : 'text-slate-900 cursor-pointer'
          }`}
        >
          {label}
        </label>
        {description && (
          <p id={descId} className="mt-0.5 text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descId : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] min-w-[48px] items-center p-0.5`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
          style={{
            backgroundColor: '#ffffff',
          }}
        />
        {/* Track background */}
        <span
          className={`absolute inset-0 -z-10 rounded-full transition-colors ${
            checked ? 'bg-[#015557]' : 'bg-slate-300'
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
