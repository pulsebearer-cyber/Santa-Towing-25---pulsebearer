import React, { useState, useCallback } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { useContent } from '@/context/ContentContext';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EditableImageProps {
  storageKey: string;
  altStorageKey?: string;
  defaultUrl: string;
  defaultAlt?: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  style?: React.CSSProperties;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'lazy' | 'eager';
}

export function EditableImage({
  storageKey,
  altStorageKey,
  defaultUrl,
  defaultAlt = 'Santa Towing image',
  className = '',
  imgClassName = '',
  label,
  style,
  referrerPolicy = 'no-referrer',
  loading = 'lazy',
}: EditableImageProps) {
  const { isEditMode, openImageModal } = useEditMode();

  const currentUrl = useContent<string>(storageKey, defaultUrl);
  const currentAlt = useContent<string>(altStorageKey || `${storageKey}Alt`, defaultAlt);

  const [hasError, setHasError] = useState(false);

  const handleOpenEditor = useCallback(
    (e: React.MouseEvent) => {
      if (!isEditMode) return;
      e.preventDefault();
      e.stopPropagation();

      openImageModal({
        storageKey,
        altStorageKey: altStorageKey || `${storageKey}Alt`,
        title: label ? `Change ${label}` : 'Change Image',
        currentUrl: currentUrl || defaultUrl,
        currentAlt: currentAlt || defaultAlt,
      });
    },
    [isEditMode, openImageModal, storageKey, altStorageKey, label, currentUrl, defaultUrl, currentAlt, defaultAlt]
  );

  // Standard visitor mode: clean, standard <img> without extra wrappers
  if (!isEditMode) {
    if (hasError) {
      return (
        <div
          className={cn(
            'bg-slate-100 flex items-center justify-center text-slate-400 text-xs p-4 border border-slate-200',
            className
          )}
          style={style}
        >
          <div className="text-center">
            <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-300" />
            <span>{currentAlt || 'Image'}</span>
          </div>
        </div>
      );
    }

    return (
      <img
        src={currentUrl || defaultUrl}
        alt={currentAlt || defaultAlt}
        className={cn(className, imgClassName)}
        style={style}
        referrerPolicy={referrerPolicy}
        loading={loading}
        onError={() => setHasError(true)}
      />
    );
  }

  // Owner Edit Mode: wrapper with hover "Change image" button overlay
  return (
    <div
      onClick={handleOpenEditor}
      data-edit-key={storageKey}
      title={label ? `Click to change image: ${label}` : 'Click to change image'}
      style={style}
      className={cn(
        'relative group cursor-pointer overflow-hidden transition-all duration-150',
        'outline-dashed outline-1 outline-[#015557]/60 hover:outline-2 hover:outline-[#015557]',
        className
      )}
    >
      <img
        src={currentUrl || defaultUrl}
        alt={currentAlt || defaultAlt}
        className={cn('w-full h-full object-cover transition-transform duration-300 group-hover:scale-102', imgClassName)}
        referrerPolicy={referrerPolicy}
        loading={loading}
      />

      {/* "Change Image" Hover Overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-3 text-center z-20">
        <span className="px-3 py-1.5 bg-white text-[#015557] rounded-lg font-bold text-xs shadow-lg flex items-center gap-1.5 hover:bg-teal-50 transition-colors">
          <Camera className="w-3.5 h-3.5" />
          <span>Change image</span>
        </span>
        {label && (
          <span className="text-[11px] text-white/90 font-medium truncate max-w-[90%]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export default EditableImage;
