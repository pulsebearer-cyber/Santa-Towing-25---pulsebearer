import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, RefreshCw } from 'lucide-react';
import UnifiedImageModal from '../../components/UnifiedImageModal';
import { ImageItem } from '@/data/inventoryDefaults';

interface ImageGalleryFieldProps {
  label: string;
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  helpText?: string;
}

export default function ImageGalleryField({
  label,
  images = [],
  onChange,
  helpText = 'Add multiple gallery photos with descriptive alternative text for accessibility and SEO.',
}: ImageGalleryFieldProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleModalApply = (url: string, alt: string) => {
    if (editingIndex !== null) {
      // Editing existing image
      const updated = [...images];
      updated[editingIndex] = { url, alt: alt || updated[editingIndex].alt || 'Gallery photo' };
      onChange(updated);
    } else {
      // Adding new image
      onChange([...images, { url, alt: alt || 'Gallery photo' }]);
    }
    setModalOpen(false);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= images.length) return;
    const copy = [...images];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleAltChange = (index: number, newAlt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt: newAlt };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-semibold text-slate-800">{label}</label>
          <span className="text-xs text-slate-500 font-normal">
            {images.length} {images.length === 1 ? 'image' : 'images'} configured
          </span>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[38px] px-3 py-1.5 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Photo</span>
        </button>
      </div>

      {images.length === 0 ? (
        <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
          <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No images added yet</p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="mt-2 text-xs font-semibold text-[#015557] hover:underline"
          >
            Click here to add your first photo
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {images.map((img, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === images.length - 1;

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
              >
                {/* Thumbnail Preview */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative w-16 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={img.url}
                      alt={img.alt || `Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/100x75?text=Image';
                      }}
                    />
                    {isFirst && (
                      <span className="absolute bottom-0 inset-x-0 bg-[#015557] text-white text-[9px] font-bold text-center leading-tight py-0.5">
                        Primary
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 w-5">
                    #{idx + 1}
                  </span>
                </div>

                {/* Alt Text & URL Editor */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => handleAltChange(idx, e.target.value)}
                    placeholder="Image Alt Text (accessibility & SEO)..."
                    className="w-full px-3 py-1.5 text-xs text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#015557] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={img.url}
                      onChange={(e) => {
                        const copy = [...images];
                        copy[idx] = { ...copy[idx], url: e.target.value };
                        onChange(copy);
                      }}
                      placeholder="https://..."
                      className="flex-1 px-2.5 py-1 text-[11px] font-mono text-slate-600 bg-transparent border-0 border-b border-slate-200 focus:border-[#015557] transition-colors focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(idx)}
                      title="Replace via library or file upload"
                      className="px-2 py-1 text-[11px] font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 rounded transition-colors flex items-center gap-1 shrink-0"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Browse</span>
                    </button>
                  </div>
                </div>

                {/* Move & Remove Controls */}
                <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMove(idx, 'up')}
                    title="Move up"
                    className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-25 rounded transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMove(idx, 'down')}
                    title="Move down"
                    className="p-1.5 text-slate-400 hover:text-slate-800 disabled:opacity-25 rounded transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    title="Remove image"
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {helpText && <p className="text-xs text-slate-500 leading-relaxed">{helpText}</p>}

      {/* Unified Image Picker Modal */}
      <UnifiedImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingIndex !== null ? `Replace Photo #${editingIndex + 1}` : 'Add New Gallery Photo'}
        currentUrl={editingIndex !== null ? images[editingIndex]?.url : ''}
        currentAlt={editingIndex !== null ? images[editingIndex]?.alt : ''}
        onApply={handleModalApply}
        requireAlt={false}
      />
    </div>
  );
}
