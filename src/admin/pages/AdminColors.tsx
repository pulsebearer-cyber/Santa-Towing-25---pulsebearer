import React, { useState, useMemo } from 'react';
import {
  Palette,
  RotateCcw,
  Check,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminToast } from '../context/AdminToastContext';
import { useContent, useContentManager } from '@/context/ContentContext';
import { saveMultiple, resetContent, resetAll } from '@/lib/contentStorage';

const ORIGINAL_COLORS = {
  primary: '#015557',
  secondary: '#192e2e',
  accent: '#d80000',
  dark: '#131514',
  background: '#ffffff',
};

interface ColorDefinition {
  key: keyof typeof ORIGINAL_COLORS;
  label: string;
  original: string;
  description: string;
  usage: string;
  testedAgainstText: string;
}

const COLOR_DEFS: ColorDefinition[] = [
  {
    key: 'primary',
    label: 'Primary Brand Color',
    original: ORIGINAL_COLORS.primary,
    description: 'Dominant brand teal used for primary buttons, active tabs, highlights, and main branding.',
    usage: 'Header accents, action buttons, active indicators, floating tow icon',
    testedAgainstText: '#ffffff',
  },
  {
    key: 'secondary',
    label: 'Secondary Surface / Forest',
    original: ORIGINAL_COLORS.secondary,
    description: 'Deep forest tone used for desktop navbar backdrop, topbar, and authoritative sections.',
    usage: 'Top bar background, navbar on dark heroes, high-contrast sections',
    testedAgainstText: '#ffffff',
  },
  {
    key: 'accent',
    label: 'Accent / Alert Red',
    original: ORIGINAL_COLORS.accent,
    description: 'High-visibility safety red reserved exclusively for urgent towing dispatches and hotlines.',
    usage: 'Call Now buttons, emergency badges, phone hotline pulses, urgent CTAs',
    testedAgainstText: '#ffffff',
  },
  {
    key: 'dark',
    label: 'Dark / Charcoal Neutral',
    original: ORIGINAL_COLORS.dark,
    description: 'Deep neutral tone for headings, footers, body text, and heavy contrast backgrounds.',
    usage: 'Website footer, dark hero banners, primary typography, card titles',
    testedAgainstText: '#ffffff',
  },
  {
    key: 'background',
    label: 'Main Page Background',
    original: ORIGINAL_COLORS.background,
    description: 'Base canvas surface color for pages, article bodies, and card backgrounds.',
    usage: 'Body background, page containers, service grid backdrops',
    testedAgainstText: '#131514',
  },
];

// Helper to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.substring(0, 2), 16),
      parseInt(clean.substring(2, 4), 16),
      parseInt(clean.substring(4, 6), 16),
    ];
  }
  return null;
}

// Relative luminance calculation according to WCAG 2.1
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Contrast ratio formula: (L1 + 0.05) / (L2 + 0.05)
function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 10) / 10;
}

export default function AdminColors() {
  const toast = useAdminToast();
  const { theme } = useContentManager();

  // Active saved values
  const savedPrimary = useContent('theme.primary', ORIGINAL_COLORS.primary);
  const savedSecondary = useContent('theme.secondary', ORIGINAL_COLORS.secondary);
  const savedAccent = useContent('theme.accent', ORIGINAL_COLORS.accent);
  const savedDark = useContent('theme.dark', ORIGINAL_COLORS.dark);
  const savedBackground = useContent('theme.background', ORIGINAL_COLORS.background);

  // Form working state
  const [colors, setColors] = useState({
    primary: savedPrimary,
    secondary: savedSecondary,
    accent: savedAccent,
    dark: savedDark,
    background: savedBackground,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [resetAllConfirmOpen, setResetAllConfirmOpen] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'button' | 'nav' | 'card' | 'footer'>('button');

  // Check unsaved changes
  const hasUnsavedChanges =
    colors.primary !== savedPrimary ||
    colors.secondary !== savedSecondary ||
    colors.accent !== savedAccent ||
    colors.dark !== savedDark ||
    colors.background !== savedBackground;

  const handleColorChange = (key: keyof typeof ORIGINAL_COLORS, val: string) => {
    let clean = val;
    if (!clean.startsWith('#') && clean.length > 0) {
      clean = '#' + clean;
    }
    setColors((prev) => ({ ...prev, [key]: clean }));
  };

  const handleResetSingleColor = (key: keyof typeof ORIGINAL_COLORS) => {
    const originalVal = ORIGINAL_COLORS[key];
    setColors((prev) => ({ ...prev, [key]: originalVal }));
    toast.info(`Reset ${key} color to original: ${originalVal}`);
  };

  const handleSave = () => {
    // Validate hex formats
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    for (const [k, v] of Object.entries(colors)) {
      const colorVal = String(v);
      if (!hexRegex.test(colorVal)) {
        toast.error(`Invalid hex color for "${k}": ${colorVal}. Please use format like #015557.`);
        return;
      }
    }

    setIsSaving(true);
    setTimeout(() => {
      // Save through contentStorage
      const success = saveMultiple({
        'theme.primary': colors.primary,
        'theme.secondary': colors.secondary,
        'theme.accent': colors.accent,
        'theme.dark': colors.dark,
        'theme.background': colors.background,
      });

      setIsSaving(false);
      if (success) {
        toast.success('Saved! Brand palette updated live across the entire website.');
      } else {
        toast.error('Failed to save color settings to browser storage.');
      }
    }, 250);
  };

  const handleResetAllToOriginal = () => {
    setColors({ ...ORIGINAL_COLORS });
    const success = saveMultiple({
      'theme.primary': ORIGINAL_COLORS.primary,
      'theme.secondary': ORIGINAL_COLORS.secondary,
      'theme.accent': ORIGINAL_COLORS.accent,
      'theme.dark': ORIGINAL_COLORS.dark,
      'theme.background': ORIGINAL_COLORS.background,
    });
    setResetAllConfirmOpen(false);
    if (success) {
      toast.success('Saved! All 5 colors restored to their original Santa Towing defaults.');
    } else {
      toast.error('Failed to reset colors.');
    }
  };

  const handleDiscardChanges = () => {
    setColors({
      primary: savedPrimary,
      secondary: savedSecondary,
      accent: savedAccent,
      dark: savedDark,
      background: savedBackground,
    });
    toast.info('Discarded unsaved color changes.');
  };

  return (
    <AdminScreenLayout
      title="Brand Colors Dashboard"
      subtitle="Customize brand teal, dark surfaces, emergency accents, and page background with live contrast compliance."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSave}
      onReset={handleDiscardChanges}
      isSaving={isSaving}
      saveLabel="Save color palette"
      resetLabel="Discard changes"
      previewTitle="Live Component Simulator"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          {/* Preview Navigation Tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-600">
            {(['button', 'nav', 'card', 'footer'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActivePreviewTab(tab)}
                className={`flex-1 py-1.5 px-2 rounded-md capitalize transition-all ${
                  activePreviewTab === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: Buttons Preview */}
          {activePreviewTab === 'button' && (
            <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Button Styles &amp; States
              </p>
              <div className="space-y-2.5">
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Primary Button</span>
                  <button
                    type="button"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                    className="w-full py-2.5 px-4 rounded-lg font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-transform hover:scale-101"
                  >
                    <span>Request Emergency Tow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Accent Alert Button</span>
                  <button
                    type="button"
                    style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                    className="w-full py-2.5 px-4 rounded-lg font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-transform hover:scale-101"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 24/7 Hotline: 0244753849</span>
                  </button>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Secondary Button</span>
                  <button
                    type="button"
                    style={{ backgroundColor: colors.secondary, color: '#ffffff' }}
                    className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>View Haulage Fleet</span>
                  </button>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Outline Button</span>
                  <button
                    type="button"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                    className="w-full py-2 px-4 rounded-lg font-bold text-xs border-2 bg-transparent flex items-center justify-center gap-2"
                  >
                    <span>Browse Genuine Auto Parts</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Navigation Bar Preview */}
          {activePreviewTab === 'nav' && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Simulated Header &amp; Top Bar
              </p>
              {/* Simulated Top Bar */}
              <div
                style={{ backgroundColor: colors.secondary, color: 'rgba(255,255,255,0.85)' }}
                className="p-2.5 rounded-t-lg text-[10px] flex items-center justify-between font-medium"
              >
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3" style={{ color: colors.accent }} />
                  <span>24/7 Hotline: 0244753849</span>
                </div>
                <span className="hidden sm:inline">Nationwide Dispatch</span>
              </div>

              {/* Simulated Main Nav */}
              <div
                style={{ backgroundColor: colors.background, color: colors.dark }}
                className="p-3 border border-slate-200 rounded-b-lg shadow-sm flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: colors.primary }}
                  >
                    ST
                  </span>
                  <span className="font-extrabold text-xs tracking-tight" style={{ color: colors.dark }}>
                    Santa Towing
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                  <span style={{ color: colors.primary }} className="font-bold">Home</span>
                  <span>Towing</span>
                  <span>Haulage</span>
                </div>

                <span
                  style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                  className="px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap shadow-xs"
                >
                  Call Now
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: Card Preview */}
          {activePreviewTab === 'card' && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Service Showcase Card
              </p>
              <div
                style={{ backgroundColor: colors.background, borderColor: '#e2e8f0' }}
                className="p-4 rounded-xl border shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                  >
                    Popular Service
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">GHS 250 avg</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold" style={{ color: colors.dark }}>
                    Heavy-Duty Highway Recovery
                  </h4>
                  <p className="text-xs mt-1 text-slate-600 leading-relaxed">
                    Hydraulic flatbed recovery for SUVs, trucks, and articulated commercial vehicles across Greater Accra.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">20 min average dispatch</span>
                  <button
                    type="button"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Footer Preview */}
          {activePreviewTab === 'footer' && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Footer Styling Preview
              </p>
              <div
                style={{ backgroundColor: colors.dark, color: 'rgba(255,255,255,0.75)' }}
                className="p-4 rounded-xl text-xs space-y-3 shadow-inner"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="font-extrabold text-sm text-white tracking-tight">
                    Santa Towing Ghana
                  </span>
                  <span
                    style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                  >
                    24/7 ACTIVE
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed text-white/80">
                  Ghana&apos;s premier automotive partner for emergency towing, heavy haulage, certified repairs, and vehicle sales.
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-white/50">
                  <span>&copy; {new Date().getFullYear()} Santa Towing</span>
                  <span style={{ color: colors.accent }} className="font-semibold">
                    0244 753 849
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Notice Banner with Reset All */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Santa Towing Unified Design Tokens
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Changes update Tailwind theme variables and persist through contentStorage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setResetAllConfirmOpen(true)}
            className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg flex items-center justify-center gap-1.5 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset all to original</span>
          </button>
        </div>

        {/* 5 Color Cards Grid */}
        <div className="space-y-4">
          {COLOR_DEFS.map((def) => {
            const currentColor = colors[def.key];
            const originalColor = def.original;
            const isOriginal = currentColor.toLowerCase() === originalColor.toLowerCase();

            // Contrast analysis
            const contrast = getContrastRatio(currentColor, def.testedAgainstText);
            const isPassingAA = contrast >= 4.5;
            const isPassingAAA = contrast >= 7.0;
            const isPassingLargeOnly = contrast >= 3.0 && contrast < 4.5;

            return (
              <AdminCard
                key={def.key}
                title={def.label}
                subtitle={def.description}
                action={
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 font-semibold uppercase">
                      {currentColor}
                    </span>
                    {!isOriginal && (
                      <button
                        type="button"
                        onClick={() => handleResetSingleColor(def.key)}
                        aria-label={`Reset ${def.label} to original`}
                        title={`Reset to original (${originalColor})`}
                        className="min-h-[36px] px-2.5 py-1 text-xs font-medium text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                }
              >
                <div className="space-y-4">
                  {/* Color Input Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Swatch & Native Picker */}
                    <div className="flex items-center gap-3">
                      <label className="relative shrink-0 w-12 h-12 rounded-xl border border-slate-300 shadow-inner cursor-pointer overflow-hidden flex items-center justify-center hover:scale-105 transition-transform focus-within:ring-2 focus-within:ring-[#015557]">
                        <span
                          className="absolute inset-0"
                          style={{ backgroundColor: currentColor }}
                        />
                        <input
                          type="color"
                          value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : originalColor}
                          onChange={(e) => handleColorChange(def.key, e.target.value)}
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                          aria-label={`Select ${def.label}`}
                        />
                      </label>

                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Hex Color Code
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={currentColor}
                            onChange={(e) => handleColorChange(def.key, e.target.value)}
                            placeholder="#015557"
                            maxLength={7}
                            className="w-full min-h-[44px] px-3.5 py-2 font-mono text-sm text-slate-900 bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Original Badge & Quick Reference */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Original Santa Towing Default</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block"
                            style={{ backgroundColor: originalColor }}
                          />
                          <span className="font-mono font-semibold text-slate-700 uppercase">
                            {originalColor}
                          </span>
                        </div>
                      </div>
                      {isOriginal ? (
                        <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Original</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleResetSingleColor(def.key)}
                          className="text-xs font-semibold text-[#015557] hover:underline"
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Contrast Warnings & Readability Evaluator */}
                  <div
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isPassingAAA
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : isPassingAA
                        ? 'bg-teal-50/60 border-teal-200'
                        : isPassingLargeOnly
                        ? 'bg-amber-50/80 border-amber-300'
                        : 'bg-red-50/80 border-red-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isPassingAA ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : isPassingLargeOnly ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#d80000] shrink-0 mt-0.5" />
                      )}

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900">
                            Contrast Ratio: {contrast}:1
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              isPassingAAA
                                ? 'bg-emerald-600 text-white'
                                : isPassingAA
                                ? 'bg-[#015557] text-white'
                                : isPassingLargeOnly
                                ? 'bg-amber-600 text-white'
                                : 'bg-[#d80000] text-white'
                            }`}
                          >
                            {isPassingAAA
                              ? 'WCAG AAA Pass'
                              : isPassingAA
                              ? 'WCAG AA Pass'
                              : isPassingLargeOnly
                              ? 'AA Large Only'
                              : 'Fails Contrast'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {isPassingAAA
                            ? 'Excellent contrast! Clear and comfortable to read on all screen types.'
                            : isPassingAA
                            ? 'Passes standard accessibility requirements for normal body and button text.'
                            : isPassingLargeOnly
                            ? 'Warning: Contrast is below 4.5:1. Acceptable only for large headlines (18pt+) and decorative elements.'
                            : 'Warning: Low contrast fails accessibility guidelines. Text will be difficult or impossible to read for many users.'}
                        </p>
                      </div>
                    </div>

                    {/* Live text sample swatch */}
                    <div
                      className="px-3 py-1.5 rounded-lg border text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs"
                      style={{
                        backgroundColor: currentColor,
                        color: def.testedAgainstText,
                        borderColor: 'rgba(0,0,0,0.1)',
                      }}
                    >
                      Sample Text
                    </div>
                  </div>

                  <p className="text-xs text-slate-400">
                    <strong className="text-slate-600 font-medium">Applied to:</strong> {def.usage}
                  </p>
                </div>
              </AdminCard>
            );
          })}
        </div>
      </div>

      {/* Confirmation Dialog for Reset All */}
      <ConfirmDialog
        isOpen={resetAllConfirmOpen}
        title="Reset All Colors to Defaults?"
        description="This will restore the original primary brand teal (#015557), forest secondary (#192e2e), alert red (#d80000), dark neutral (#131514), and background (#ffffff)."
        confirmLabel="Reset All to Defaults"
        cancelLabel="Cancel"
        isDestructive={false}
        onConfirm={handleResetAllToOriginal}
        onCancel={() => setResetAllConfirmOpen(false)}
      />
    </AdminScreenLayout>
  );
}
