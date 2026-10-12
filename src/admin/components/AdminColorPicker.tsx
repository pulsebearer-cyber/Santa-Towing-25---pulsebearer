import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

interface AdminColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  helpText?: string;
  presets?: string[];
  className?: string;
}

const DEFAULT_PRESETS = [
  '#015557', // Brand Teal
  '#192e2e', // Deep Teal / Secondary
  '#d80000', // Brand Red Accent
  '#131514', // Charcoal Dark
  '#ffffff', // Pure White
  '#f8fafc', // Light Neutral
  '#64748b', // Slate Gray
  '#0284c7', // Sky Blue
  '#16a34a', // Emerald Green
  '#d97706', // Amber Warning
];

export default function AdminColorPicker({
  label,
  value,
  onChange,
  helpText,
  presets = DEFAULT_PRESETS,
  className = '',
}: AdminColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#') && val.length > 0) {
      val = '#' + val;
    }
    setInputValue(val);
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
      onChange(val);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-slate-800">
          {label}
        </label>
        <span className="text-xs font-mono tabular-nums text-slate-500 uppercase">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Color preview circle with hidden native input */}
        <label className="relative shrink-0 w-11 h-11 rounded-lg border border-slate-300 shadow-inner cursor-pointer overflow-hidden flex items-center justify-center hover:border-slate-400 transition-colors focus-within:ring-2 focus-within:ring-[#015557]">
          <span
            className="absolute inset-0"
            style={{ backgroundColor: value || '#000000' }}
          />
          <input
            type="color"
            value={value.startsWith('#') && value.length === 7 ? value : '#015557'}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`${label} color picker`}
          />
        </label>

        {/* Hex input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="#015557"
            className="w-full min-h-[44px] px-3.5 py-2 font-mono text-sm text-slate-900 bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:border-[#015557]"
          />
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy hex code"
          title="Copy hex code"
          className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#015557]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Preset Swatches */}
      {presets.length > 0 && (
        <div className="pt-1">
          <p className="text-xs text-slate-500 mb-1.5 font-normal">
            Suggested Brand Palette
          </p>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((color) => {
              const isSelected = value.toLowerCase() === color.toLowerCase();
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setInputValue(color);
                    onChange(color);
                  }}
                  className={`w-7 h-7 rounded-md border transition-transform hover:scale-110 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] ${
                    isSelected
                      ? 'ring-2 ring-[#015557] border-white shadow-sm'
                      : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`Select color ${color}`}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        color === '#ffffff' || color === '#f8fafc'
                          ? 'text-slate-900'
                          : 'text-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {helpText && (
        <p className="text-xs text-slate-500 leading-relaxed mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
}
