import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  HardDrive,
  Eye,
  Globe,
  Sun,
  Moon,
  Trash2,
  FileCode,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminToast } from '../context/AdminToastContext';
import { useContent } from '@/context/ContentContext';
import { saveContent, resetContent, getStorageStats } from '@/lib/contentStorage';

const ORIGINAL_LOGO_URL = 'https://i.ibb.co/KgkfFKV/Santa-Logo.png';
const MAX_FILE_SIZE_BYTES = 1048576; // 1 MB

export default function AdminLogo() {
  const toast = useAdminToast();
  const currentSavedLogo = useContent('global.logo.url', ORIGINAL_LOGO_URL);
  const brandName = useContent('global.brand.name', 'Santa Towing & Garage Services Ltd.');
  const brandShort = useContent('global.brand.shortName', 'Santa Towing');

  const [logoUrl, setLogoUrl] = useState(currentSavedLogo);
  const [altText, setAltText] = useState('Santa Towing & Garage Services Ltd. Official Logo');
  const [imageError, setImageError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewBg, setPreviewBg] = useState<'light' | 'dark' | 'split'>('split');
  const [storageStats, setStorageStats] = useState(() => getStorageStats());
  const [restoreConfirmOpen, setRestoreConfirmOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if saved logo updates externally
  useEffect(() => {
    setLogoUrl(currentSavedLogo);
    setStorageStats(getStorageStats());
  }, [currentSavedLogo]);

  const hasUnsavedChanges = logoUrl !== currentSavedLogo;
  const isOriginal = logoUrl === ORIGINAL_LOGO_URL;

  // File upload processing
  const handleFileUpload = (file: File) => {
    setImageError(false);

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file format. Please upload a PNG, JPG, SVG, or WebP image.');
      return;
    }

    // Validate size (max 1 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(`File is too large (${sizeMb} MB). Maximum allowed size is 1 MB.`);
      return;
    }

    // Check if adding this file might overflow local storage
    const projectedBytes = storageStats.usedBytes + file.size * 1.37; // base64 overhead
    if (projectedBytes > 4.5 * 1024 * 1024) {
      toast.error('Warning: Browser storage is nearly full. This large file may cause quota failure. Consider using an image URL instead.');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setLogoUrl(dataUrl);
        setImageError(false);
        toast.info(`Loaded image "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`);
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read the selected file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (!logoUrl || logoUrl.trim().length === 0) {
      toast.error('Logo source cannot be empty. Please upload an image or provide a valid URL.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const success = saveContent('global.logo.url', logoUrl);
      setIsSaving(false);

      if (success) {
        toast.success('Saved! Logo applied to navigation bar, footer, and browser favicon.');
        setStorageStats(getStorageStats());
      } else {
        toast.error('Failed to save logo. Browser storage quota may be exceeded.');
      }
    }, 250);
  };

  const handleRestoreOriginal = () => {
    setLogoUrl(ORIGINAL_LOGO_URL);
    const success = resetContent('global.logo.url');
    setRestoreConfirmOpen(false);

    if (success) {
      toast.success('Saved! Restored official original Santa Towing logo.');
      setStorageStats(getStorageStats());
    } else {
      toast.error('Failed to restore original logo.');
    }
  };

  const handleDiscard = () => {
    setLogoUrl(currentSavedLogo);
    setImageError(false);
    toast.info('Discarded unsaved logo changes.');
  };

  return (
    <AdminScreenLayout
      title="Brand Logo & Favicon"
      subtitle="Upload or paste your company logo. Automatically synchronizes across the navigation header, footer, and browser tab favicon."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSave}
      onReset={handleDiscard}
      isSaving={isSaving}
      saveLabel="Save & apply logo"
      resetLabel="Discard changes"
      previewTitle="Live Context Previews"
      preview={
        <div className="p-4 sm:p-5 space-y-5">
          {/* 1. Favicon in Simulated Browser Tab */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              1. Browser Favicon Tab
            </span>
            <div className="bg-slate-200 p-2 rounded-t-lg">
              <div className="bg-white rounded-t-md px-3 py-1.5 flex items-center gap-2 max-w-[220px] shadow-xs border-t border-x border-slate-300">
                <img
                  src={logoUrl}
                  alt="Favicon"
                  className="w-4 h-4 object-contain rounded-xs shrink-0"
                  onError={() => setImageError(true)}
                />
                <span className="text-[11px] font-semibold text-slate-800 truncate">
                  Santa Towing &middot; 24/7 Dispatch
                </span>
              </div>
            </div>
          </div>

          {/* 2. Header Navigation Simulator */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              2. Navigation Bar (Light Mode)
            </span>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={logoUrl}
                  alt={altText}
                  className="h-8 max-w-[120px] object-contain p-0.5 bg-white rounded shadow-2xs border border-slate-100"
                  onError={() => setImageError(true)}
                />
                <span className="font-extrabold text-xs text-slate-900 tracking-tight">
                  {brandShort}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#d80000] text-white">
                Call Now
              </span>
            </div>
          </div>

          {/* 3. Dark Footer Simulator */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              3. Footer Display (Dark Mode)
            </span>
            <div className="bg-[#131514] p-4 rounded-xl text-white space-y-2.5">
              <div className="flex items-center gap-2.5">
                <img
                  src={logoUrl}
                  alt={altText}
                  className="h-9 max-w-[130px] object-contain p-1 bg-white rounded shadow-xs"
                  onError={() => setImageError(true)}
                />
                <div>
                  <span className="font-bold text-xs text-white block">
                    {brandShort}
                  </span>
                  <span className="text-[10px] text-white/60 block">
                    Accra &amp; Kumasi, Ghana
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Ghana&apos;s premier automotive emergency towing, haulage, and garage services partner.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Storage Warning Banner (Triggered when nearly full) */}
        {storageStats.isNearlyFull && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-start gap-3 shadow-sm animate-in fade-in"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-sm text-amber-950 block">
                Warning: Browser Storage is Nearly Full ({Math.round(storageStats.usedBytes / 1024)} KB of ~5 MB)
              </span>
              <p className="leading-relaxed text-amber-800">
                Your browser local storage is at {storageStats.percentage}% capacity. Large Base64 uploaded files can exhaust the browser&apos;s storage quota.
                We strongly recommend pasting a hosted image URL (e.g. from your website host, Imgur, or cloud storage) rather than uploading huge image files directly.
              </p>
            </div>
          </div>
        )}

        {/* Storage Status Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <HardDrive className="w-4 h-4 text-slate-400" />
            <span className="font-medium">
              Browser Storage Usage:
            </span>
            <span className="font-mono font-bold text-slate-900">
              {(storageStats.usedBytes / 1024).toFixed(1)} KB / ~5,120 KB ({storageStats.percentage}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-32 sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className={`h-full transition-all duration-300 ${
                  storageStats.percentage > 70
                    ? 'bg-red-500'
                    : storageStats.percentage > 45
                    ? 'bg-amber-500'
                    : 'bg-[#015557]'
                }`}
                style={{ width: `${Math.min(100, storageStats.percentage)}%` }}
              />
            </div>
            {!isOriginal && (
              <button
                type="button"
                onClick={() => setRestoreConfirmOpen(true)}
                className="text-xs font-semibold text-[#015557] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restore original</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. Upload or Paste URL Card */}
        <AdminCard
          title="Logo Source &amp; File Manager"
          subtitle="Choose between direct file upload (PNG, JPG, SVG, WebP up to 1 MB) or external image URL."
          action={
            isOriginal ? (
              <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Original Logo Active
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setRestoreConfirmOpen(true)}
                className="min-h-[36px] px-3 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Restore original logo</span>
              </button>
            )
          }
        >
          <div className="space-y-5">
            {/* Drag & Drop File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                dragActive
                  ? 'border-[#015557] bg-emerald-50/50 scale-101'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg,.webp"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
                aria-label="Upload logo file"
              />

              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#015557] flex items-center justify-center mb-3 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Upload image file
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Drag and drop your file here, or click to browse. Supports PNG, JPG, SVG, WebP (maximum 1 MB).
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <FileCode className="w-3.5 h-3.5 text-slate-400" />
                <span>Browse Files</span>
              </span>
            </div>

            {/* Alternative: Image URL Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Or Paste Image URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => {
                      setLogoUrl(e.target.value);
                      setImageError(false);
                    }}
                    placeholder="https://example.com/logo.png"
                    className="w-full min-h-[44px] px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>
                {logoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoUrl('');
                      setImageError(false);
                    }}
                    className="min-h-[44px] px-3 text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-300 rounded-lg transition-colors flex items-center justify-center"
                    title="Clear URL"
                    aria-label="Clear URL"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Hosting images on a fast CDN or image host saves browser local storage space.
              </p>
            </div>
          </div>
        </AdminCard>

        {/* 2. Light vs. Dark Background Dual Preview */}
        <AdminCard
          title="Contrast &amp; Background Preview"
          subtitle="Ensure transparency and contrast work seamlessly on both light and dark backgrounds."
          action={
            <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPreviewBg('split')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  previewBg === 'split' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                }`}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setPreviewBg('light')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  previewBg === 'light' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewBg('dark')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                  previewBg === 'dark' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
                }`}
              >
                <Moon className="w-3 h-3" />
                <span>Dark</span>
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Light Background Box */}
            {(previewBg === 'split' || previewBg === 'light') && (
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-100 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light Background (#FFFFFF)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Header Nav Context</span>
                </div>
                <div className="h-44 bg-white flex items-center justify-center p-6 relative">
                  {/* Subtle checker pattern */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(#000 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  {logoUrl && !imageError ? (
                    <img
                      src={logoUrl}
                      alt="Logo preview on light"
                      className="max-h-24 max-w-full object-contain relative z-10 transition-transform hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 stroke-1" />
                      <p className="text-xs font-medium">No valid image to display</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dark Background Box */}
            {(previewBg === 'split' || previewBg === 'dark') && (
              <div className="rounded-xl border border-slate-800 overflow-hidden shadow-xs">
                <div className="bg-slate-900 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Dark Background (#131514)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Footer Context</span>
                </div>
                <div className="h-44 bg-[#131514] flex items-center justify-center p-6 relative">
                  {logoUrl && !imageError ? (
                    <img
                      src={logoUrl}
                      alt="Logo preview on dark"
                      className="max-h-24 max-w-full object-contain relative z-10 transition-transform hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="text-center text-slate-600">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 stroke-1" />
                      <p className="text-xs font-medium">No valid image to display</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </AdminCard>
      </div>

      {/* Confirmation Dialog for Restoring Original Logo */}
      <ConfirmDialog
        isOpen={restoreConfirmOpen}
        title="Restore Original Santa Towing Logo?"
        description="This will revert the active logo across the header navigation bar, footer, and browser favicon back to the official Santa Towing wordmark badge."
        confirmLabel="Restore Original"
        cancelLabel="Cancel"
        isDestructive={false}
        onConfirm={handleRestoreOriginal}
        onCancel={() => setRestoreConfirmOpen(false)}
      />
    </AdminScreenLayout>
  );
}
