import React, { useState, useEffect } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { useContentManager } from '@/context/ContentContext';
import { Palette, X, RotateCcw, Check, Sparkles, RefreshCw } from 'lucide-react';

const COLOR_CONFIGS = [
  {
    key: 'primary',
    storageKey: 'theme.primary',
    label: 'Primary Brand Color',
    defaultHex: '#015557',
    description: 'Header accents, action buttons, brand identity',
  },
  {
    key: 'secondary',
    storageKey: 'theme.secondary',
    label: 'Secondary Surface',
    defaultHex: '#192e2e',
    description: 'Top bar, navigation background, high-contrast sections',
  },
  {
    key: 'accent',
    storageKey: 'theme.accent',
    label: 'Accent / Alert Red',
    defaultHex: '#d80000',
    description: 'Emergency hotline buttons, urgent badges, warning callouts',
  },
  {
    key: 'dark',
    storageKey: 'theme.dark',
    label: 'Dark / Charcoal Neutral',
    defaultHex: '#131514',
    description: 'Dark hero banners, footer, card titles',
  },
  {
    key: 'background',
    storageKey: 'theme.background',
    label: 'Main Page Background',
    defaultHex: '#ffffff',
    description: 'Base page canvas background surface',
  },
];

const PRESETS = [
  {
    name: 'Classic Santa',
    colors: { primary: '#015557', secondary: '#192e2e', accent: '#d80000', dark: '#131514', background: '#ffffff' },
  },
  {
    name: 'Ocean & Coral',
    colors: { primary: '#0284c7', secondary: '#0f172a', accent: '#f43f5e', dark: '#0b132b', background: '#ffffff' },
  },
  {
    name: 'High-Vis Industrial',
    colors: { primary: '#0f766e', secondary: '#134e4a', accent: '#ea580c', dark: '#18181b', background: '#fafaf9' },
  },
  {
    name: 'Midnight & Gold',
    colors: { primary: '#1e3a8a', secondary: '#172554', accent: '#d97706', dark: '#090d16', background: '#ffffff' },
  },
];

export function FloatingColorsPanel() {
  const { isEditMode, isColorPanelOpen, setColorPanelOpen, recordChange } = useEditMode();
  const { theme, set, reset } = useContentManager();

  if (!isEditMode || !isColorPanelOpen) return null;

  const handleColorChange = (storageKey: string, oldVal: string, newVal: string) => {
    let clean = newVal;
    if (!clean.startsWith('#') && clean.length > 0) {
      clean = '#' + clean;
    }
    set(storageKey, clean);
    recordChange(storageKey, oldVal, clean, 'color');
  };

  const handleApplyPreset = (presetColors: Record<string, string>) => {
    COLOR_CONFIGS.forEach((cfg) => {
      const oldVal = (theme as any)[cfg.key] || cfg.defaultHex;
      const newVal = presetColors[cfg.key];
      if (newVal && oldVal !== newVal) {
        set(cfg.storageKey, newVal);
        recordChange(cfg.storageKey, oldVal, newVal, 'color');
      }
    });
  };

  const handleResetAllColors = () => {
    COLOR_CONFIGS.forEach((cfg) => {
      const oldVal = (theme as any)[cfg.key] || cfg.defaultHex;
      if (oldVal !== cfg.defaultHex) {
        set(cfg.storageKey, cfg.defaultHex);
        recordChange(cfg.storageKey, oldVal, cfg.defaultHex, 'color');
      }
    });
  };

  return (
    <div
      role="region"
      aria-label="Live Theme Color Editor"
      data-edit-ui="true"
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-[#015557] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-teal-200" />
          <h3 className="text-xs font-bold tracking-tight">Live Theme Color Palette</h3>
        </div>
        <button
          type="button"
          onClick={() => setColorPanelOpen(false)}
          aria-label="Close color panel"
          className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-teal-200 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto space-y-4 text-xs">
        {/* Curated Presets */}
        <div>
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Quick Color Presets
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(preset.colors)}
                className="p-2 rounded-lg border border-slate-200 hover:border-[#015557] bg-slate-50 hover:bg-teal-50/50 text-left transition-colors flex items-center justify-between group"
              >
                <span className="text-[11px] font-semibold text-slate-700 truncate">{preset.name}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: preset.colors.primary }} />
                  <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: preset.colors.accent }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Color Controls */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Fine-Tune Colors
          </span>

          {COLOR_CONFIGS.map((cfg) => {
            const currentVal = (theme as any)[cfg.key] || cfg.defaultHex;
            return (
              <div key={cfg.key} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 text-[11px]">{cfg.label}</label>
                  <button
                    type="button"
                    onClick={() => handleColorChange(cfg.storageKey, currentVal, cfg.defaultHex)}
                    title="Reset to default"
                    className="text-[10px] text-slate-400 hover:text-[#015557] flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shrink-0 shadow-2xs">
                    <input
                      type="color"
                      value={currentVal}
                      onChange={(e) => handleColorChange(cfg.storageKey, currentVal, e.target.value)}
                      className="absolute inset-0 w-12 h-12 -top-2 -left-2 cursor-pointer border-0"
                    />
                  </div>
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => handleColorChange(cfg.storageKey, currentVal, e.target.value)}
                    className="flex-1 font-mono text-[11px] px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">{cfg.description}</p>
              </div>
            );
          })}
        </div>

        {/* Reset All */}
        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={handleResetAllColors}
            className="text-xs font-semibold text-slate-600 hover:text-red-600 flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All Colors to Default</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingColorsPanel;
