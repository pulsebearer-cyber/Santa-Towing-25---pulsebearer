import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditMode } from '@/context/EditModeContext';
import { useContentManager } from '@/context/ContentContext';
import {
  Edit3,
  Undo2,
  Redo2,
  Palette,
  RotateCcw,
  LayoutDashboard,
  X,
  Check,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import ImageEditModal from './ImageEditModal';
import FloatingColorsPanel from './FloatingColorsPanel';

export function FloatingEditToolbar() {
  const navigate = useNavigate();
  const {
    isOwner,
    isEditMode,
    toggleEditMode,
    setEditMode,
    isColorPanelOpen,
    toggleColorPanel,
    canUndo,
    canRedo,
    undo,
    redo,
    discardAllSessionChanges,
    sessionEditsCount,
    imageModalState,
    closeImageModal,
    recordChange,
  } = useEditMode();

  const { set } = useContentManager();

  const [confirmDiscardOpen, setConfirmDiscardOpen] = useState(false);

  // If visitor is not authenticated at /admin, never render anything!
  if (!isOwner) {
    return null;
  }

  // State 1: Owner is logged in, but edit mode is currently inactive:
  // Show floating "Edit this page" toggle button
  if (!isEditMode) {
    return (
      <div className="fixed bottom-5 left-5 z-50 animate-in fade-in zoom-in-95 duration-200" data-edit-ui="true">
        <button
          type="button"
          onClick={toggleEditMode}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#015557] hover:bg-[#192e2e] text-white rounded-full shadow-2xl border border-teal-500/40 text-xs font-bold tracking-tight transition-all duration-200 hover:scale-105 active:scale-95 shadow-teal-950/30"
          title="Enable live edit mode on this page"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Edit3 className="w-3 h-3 text-white" />
          </div>
          <span>Edit this page</span>
        </button>
      </div>
    );
  }

  const handleOpenDashboard = () => {
    navigate('/admin/pages-text');
  };

  const handleDiscardConfirm = () => {
    discardAllSessionChanges();
    setConfirmDiscardOpen(false);
  };

  return (
    <>
      {/* Floating Toolbar docked at bottom center */}
      <div
        role="toolbar"
        aria-label="Live Site Editor Toolbar"
        data-edit-ui="true"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] bg-slate-900/95 text-white backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-1.5 sm:gap-2 shadow-black/40 animate-in fade-in slide-in-from-bottom-5 duration-200"
      >
        {/* Active Badge */}
        <div className="flex items-center gap-2 pr-2 border-r border-slate-700/70 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-tight hidden sm:inline">Edit Mode</span>
          {sessionEditsCount > 0 && (
            <span className="text-[10px] font-mono bg-teal-800 text-teal-200 px-1.5 py-0.5 rounded font-semibold">
              {sessionEditsCount}
            </span>
          )}
        </div>

        {/* Undo Button */}
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          aria-label="Undo edit"
          title={canUndo ? 'Undo last change' : 'No changes to undo'}
          className={`min-h-[34px] px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
            canUndo
              ? 'text-slate-200 hover:text-white hover:bg-slate-800 active:scale-95'
              : 'text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Undo</span>
        </button>

        {/* Redo Button */}
        <button
          type="button"
          onClick={redo}
          disabled={!canRedo}
          aria-label="Redo edit"
          title={canRedo ? 'Redo change' : 'No changes to redo'}
          className={`min-h-[34px] px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
            canRedo
              ? 'text-slate-200 hover:text-white hover:bg-slate-800 active:scale-95'
              : 'text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <Redo2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Redo</span>
        </button>

        {/* Theme Colors Panel Toggle */}
        <button
          type="button"
          onClick={toggleColorPanel}
          aria-label="Toggle theme colors editor"
          title="Open live theme color palette"
          className={`min-h-[34px] px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
            isColorPanelOpen
              ? 'bg-teal-600 text-white'
              : 'text-slate-200 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Colors</span>
        </button>

        {/* Discard changes */}
        <button
          type="button"
          onClick={() => setConfirmDiscardOpen(true)}
          disabled={sessionEditsCount === 0}
          aria-label="Discard changes"
          title="Revert all changes made during this editing session"
          className={`min-h-[34px] px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
            sessionEditsCount > 0
              ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-950/40'
              : 'text-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Discard</span>
        </button>

        <div className="h-4 w-px bg-slate-700/70 shrink-0" />

        {/* Open in dashboard */}
        <button
          type="button"
          onClick={handleOpenDashboard}
          aria-label="Open in dashboard"
          title="Open full admin management console"
          className="min-h-[34px] px-2.5 py-1.5 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>

        {/* Exit Edit Mode */}
        <button
          type="button"
          onClick={() => setEditMode(false)}
          aria-label="Exit edit mode"
          title="Exit edit mode"
          className="min-h-[34px] px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>

      {/* Floating Theme Color Panel */}
      <FloatingColorsPanel />

      {/* Reusable Image Edit Modal */}
      {imageModalState?.isOpen && (
        <ImageEditModal
          isOpen={true}
          onClose={closeImageModal}
          title={imageModalState.title}
          storageKey={imageModalState.storageKey}
          altStorageKey={imageModalState.altStorageKey}
          currentUrl={imageModalState.currentUrl}
          currentAlt={imageModalState.currentAlt}
          onApply={(newUrl, newAlt) => {
            const oldUrl = imageModalState.currentUrl;
            const oldAlt = imageModalState.currentAlt || '';

            set(imageModalState.storageKey, newUrl);
            recordChange(imageModalState.storageKey, oldUrl, newUrl, 'image');

            if (imageModalState.altStorageKey) {
              set(imageModalState.altStorageKey, newAlt);
              recordChange(imageModalState.altStorageKey, oldAlt, newAlt, 'text');
            }
          }}
        />
      )}

      {/* Discard Confirmation Dialog */}
      {confirmDiscardOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-slate-900 border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Discard all recent edits?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will revert all {sessionEditsCount} text, image, and color changes made during this editing session.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDiscardOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={handleDiscardConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
              >
                Yes, discard changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingEditToolbar;
