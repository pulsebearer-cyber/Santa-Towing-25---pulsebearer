import React, { useState } from 'react';
import { Image as ImageIcon, Upload, X, Eye, ExternalLink, RefreshCw } from 'lucide-react';
import UnifiedImageModal from './UnifiedImageModal';

interface AdminImagePickerProps {
  label: string;
  value: string;
  onChange: (url: string, alt?: string) => void;
  altText?: string;
  onAltChange?: (alt: string) => void;
  helpText?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  className?: string;
  presetImages?: Array<{ label: string; url: string }>;
  usedInHint?: string;
  requireAlt?: boolean;
}

export default function AdminImagePicker({
  label,
  value,
  onChange,
  altText = '',
  onAltChange,
  helpText = 'Choose from uploaded site images, upload a new photo, or enter a direct web URL.',
  aspectRatio = '16:9',
  className = '',
  presetImages = [],
  usedInHint,
  requireAlt = false,
}: AdminImagePickerProps) {
  const [imageError, setImageError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pickerModalOpen, setPickerModalOpen] = useState(false);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '4:3'
      ? 'aspect-4/3'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : 'h-44';

  const handleClear = () => {
    onChange('');
    if (onAltChange) onAltChange('');
    setImageError(false);
  };

  const handleModalApply = (newUrl: string, newAlt: string) => {
    onChange(newUrl, newAlt);
    if (onAltChange) {
      onAltChange(newAlt);
    }
    setImageError(false);
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <label className="block text-sm font-semibold text-slate-800">
            {label}
          </label>
          {usedInHint && (
            <span className="text-[11px] text-[#015557] font-medium block">
              {usedInHint}
            </span>
          )}
        </div>
        {value && (
          <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">
            {value.split('/').pop()?.substring(0, 24)}...
          </span>
        )}
      </div>

      {/* Thumbnail Preview Area */}
      <div
        className={`relative w-full ${aspectClass} rounded-xl border border-slate-300 bg-slate-100 overflow-hidden flex items-center justify-center group`}
      >
        {value && !imageError ? (
          <>
            <img
              src={value}
              alt={altText || label}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain p-2 bg-slate-50 transition-transform duration-200 group-hover:scale-101"
            />
            {/* Quick action overlay */}
            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => setPickerModalOpen(true)}
                className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Replace
              </button>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="min-h-[40px] px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="min-h-[40px] px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
            <ImageIcon className="w-8 h-8 mb-2 stroke-1" />
            <p className="text-xs font-medium text-slate-600">
              {imageError ? 'Could not load image from URL' : 'No image assigned'}
            </p>
            <button
              type="button"
              onClick={() => setPickerModalOpen(true)}
              className="mt-2.5 px-3.5 py-1.5 rounded-lg bg-[#015557] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#014345] transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Image or Upload</span>
            </button>
          </div>
        )}
      </div>

      {/* Button Row + Direct Input */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPickerModalOpen(true)}
          className="min-h-[44px] px-4 py-2 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{value ? 'Replace image...' : 'Choose / Upload image...'}</span>
        </button>

        <div className="relative flex-1">
          <input
            type="url"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setImageError(false);
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full min-h-[44px] px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          />
        </div>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear image"
            title="Clear image"
            className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-slate-400 hover:text-[#d80000] bg-slate-100 hover:bg-red-50 border border-slate-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d80000]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Optional In-Place Alt Text Editor */}
      {onAltChange && (
        <div className="pt-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-slate-700">
              Alt Text {requireAlt && <span className="text-[#d80000] font-bold">*</span>}
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              {altText.length} chars
            </span>
          </div>
          <input
            type="text"
            value={altText}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Describe this image for screen readers..."
            className="w-full min-h-[38px] px-3 py-1.5 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          />
        </div>
      )}

      {/* Preset Quick Chooser if supplied */}
      {presetImages.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Quick Presets
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presetImages.map((img) => (
              <button
                key={img.url}
                type="button"
                onClick={() => {
                  onChange(img.url);
                  setImageError(false);
                }}
                className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all ${
                  value === img.url
                    ? 'border-[#015557] bg-emerald-50/50 ring-1 ring-[#015557]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-8 h-8 rounded object-cover shrink-0 bg-slate-100"
                />
                <span className="text-xs font-medium text-slate-700 truncate">
                  {img.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {helpText && (
        <p className="text-xs text-slate-500 leading-relaxed">
          {helpText}
        </p>
      )}

      {/* Unified Image Modal */}
      <UnifiedImageModal
        isOpen={pickerModalOpen}
        onClose={() => setPickerModalOpen(false)}
        title={`Select Image for ${label}`}
        currentUrl={value}
        currentAlt={altText}
        onApply={handleModalApply}
        usedInHint={usedInHint}
        requireAlt={requireAlt}
      />

      {/* Large View Modal */}
      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">{label}</span>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={value}
                alt={altText || label}
                className="max-w-full max-h-[70vh] rounded object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
