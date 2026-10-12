import React, { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (nextOpen: boolean) => void;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  badge,
  children,
  className = '',
}: CollapsibleSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalOpen;
  const contentId = useId();

  const handleToggle = () => {
    const nextState = !open;
    if (!isControlled) {
      setInternalOpen(nextState);
    }
    onToggle?.(nextState);
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full min-h-[52px] px-5 py-4 sm:px-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#015557]"
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm sm:text-base font-semibold text-slate-900">
              {title}
            </span>
            {badge && <div>{badge}</div>}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500 font-normal">
              {description}
            </p>
          )}
        </div>
        <div
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-100 transition-transform duration-200 ${
            open ? 'rotate-180 text-slate-700' : ''
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {open && (
        <div
          id={contentId}
          role="region"
          aria-label={title}
          className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100"
        >
          {children}
        </div>
      )}
    </div>
  );
}
