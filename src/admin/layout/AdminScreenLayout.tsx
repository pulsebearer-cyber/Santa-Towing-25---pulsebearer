import React, { useState } from 'react';
import { Save, RotateCcw, Check, AlertCircle, Eye, Monitor, Smartphone } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

interface AdminScreenLayoutProps {
  title: string;
  subtitle?: string;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onReset?: () => void;
  isSaving?: boolean;
  saveLabel?: string;
  resetLabel?: string;
  resetConfirmTitle?: string;
  resetConfirmDescription?: string;
  children: React.ReactNode; // Left column form
  preview?: React.ReactNode; // Right column live preview
  previewTitle?: string;
  extraHeaderActions?: React.ReactNode;
}

export default function AdminScreenLayout({
  title,
  subtitle,
  hasUnsavedChanges = false,
  onSave,
  onReset,
  isSaving = false,
  saveLabel = 'Save changes',
  resetLabel = 'Reset',
  resetConfirmTitle = 'Discard Unsaved Changes?',
  resetConfirmDescription = 'Are you sure you want to revert your changes? Any unsaved edits will be discarded and restored to their previous values.',
  children,
  preview,
  previewTitle = 'Live Preview',
  extraHeaderActions,
}: AdminScreenLayoutProps) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleConfirmReset = () => {
    setResetDialogOpen(false);
    if (onReset) onReset();
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>

            {/* Unsaved Changes Indicator */}
            {hasUnsavedChanges ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
                Unsaved changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                <Check className="w-3.5 h-3.5 text-[#015557]" />
                All changes saved
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Top-Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {extraHeaderActions}

          {onSave && (
            <>
              <button
                type="button"
                onClick={() => setResetDialogOpen(true)}
                disabled={!hasUnsavedChanges && !isSaving}
                className="min-h-[44px] px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>{resetLabel}</span>
              </button>

              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="min-h-[44px] px-5 py-2 text-sm font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:ring-offset-2 disabled:opacity-75"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : saveLabel}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Two-Column Grid: Form on the Left, Live Preview on the Right (Mobile: Form top, Preview below) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Controls */}
        <div className={`space-y-6 ${preview ? 'lg:col-span-7 xl:col-span-7' : 'lg:col-span-12'}`}>
          {children}
        </div>

        {/* Right Column: Live Preview */}
        {preview && (
          <div className="lg:col-span-5 xl:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Preview Header & Viewport switcher */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#015557]" />
                  <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                    {previewTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    aria-label="Desktop preview mode"
                    className={`p-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                      previewDevice === 'desktop'
                        ? 'bg-slate-100 text-[#015557] font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    aria-label="Mobile preview mode"
                    className={`p-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                      previewDevice === 'mobile'
                        ? 'bg-slate-100 text-[#015557] font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>

              {/* Preview Canvas */}
              <div className="p-4 sm:p-5 bg-slate-100 flex items-center justify-center min-h-[380px] overflow-hidden">
                <div
                  className={`transition-all duration-200 w-full ${
                    previewDevice === 'mobile'
                      ? 'max-w-[340px] bg-white rounded-2xl shadow-md border-4 border-slate-800 overflow-hidden'
                      : 'w-full bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden'
                  }`}
                >
                  {preview}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar for Mobile (Save and Reset touch controls) */}
      {onSave && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-4 py-3 shadow-lg flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setResetDialogOpen(true)}
            disabled={!hasUnsavedChanges && !isSaving}
            className="flex-1 min-h-[44px] px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{resetLabel}</span>
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex-1 min-h-[44px] px-5 py-2.5 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : saveLabel}</span>
          </button>
        </div>
      )}

      {/* Confirmation Dialog on Reset */}
      <ConfirmDialog
        isOpen={resetDialogOpen}
        title={resetConfirmTitle}
        description={resetConfirmDescription}
        confirmLabel="Discard changes"
        cancelLabel="Continue editing"
        isDestructive={false}
        onConfirm={handleConfirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
}
