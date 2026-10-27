import React, { useState, useEffect, useMemo } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  Sliders,
  Download,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  RotateCcw,
  Sparkles,
  Layers,
  FileImage,
  Plus,
  RefreshCw,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageCanvasEditor from '../components/image-studio/ImageCanvasEditor';
import {
  StudioImage,
  ImageCategory,
  ImageFormat,
  getAllStudioImages,
  saveStudioImage,
  deleteStudioImage,
  updateStudioImage,
} from '@/lib/imageStudioStorage';
import { formatFileSize } from '../lib/imageCompressor';
import { useAdminToast } from '../context/AdminToastContext';

const CATEGORIES: ('All' | ImageCategory)[] = [
  'All',
  'Fleet',
  'Towing',
  'Haulage',
  'Garage',
  'Documents',
  'General',
];

export default function AdminImageStudio() {
  const toast = useAdminToast();
  const [images, setImages] = useState<StudioImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<'All' | ImageCategory>('All');
  const [typeFilter, setTypeFilter] = useState<'all' | 'original' | 'edited'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active editor target
  const [editingImage, setEditingImage] = useState<StudioImage | null>(null);

  // Enlarged preview modal
  const [previewImage, setPreviewImage] = useState<StudioImage | null>(null);

  // Rename modal
  const [renamingImage, setRenamingImage] = useState<StudioImage | null>(null);
  const [newImageName, setNewImageName] = useState('');

  // Delete confirmation
  const [deletingImage, setDeletingImage] = useState<StudioImage | null>(null);

  // Fetch images from storage
  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await getAllStudioImages();
      setImages(data);
    } catch (err) {
      toast.error('Failed to load images from local studio library.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Filtered images
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
      const matchesType =
        typeFilter === 'all' ||
        (typeFilter === 'original' && !img.isEdited) ||
        (typeFilter === 'edited' && img.isEdited);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        img.name.toLowerCase().includes(q) ||
        img.category.toLowerCase().includes(q) ||
        img.format.toLowerCase().includes(q);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [images, selectedCategory, typeFilter, searchQuery]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = async () => {
          const newStudioImg: StudioImage = {
            id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            dataUrl,
            width: img.naturalWidth,
            height: img.naturalHeight,
            format: (file.type as ImageFormat) || 'image/jpeg',
            size: file.size,
            category: selectedCategory === 'All' ? 'General' : selectedCategory,
            isEdited: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          await saveStudioImage(newStudioImg);
          toast.success(`Uploaded "${file.name}" to library.`);
          loadImages();
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Save new copy from editor
  const handleSaveAsNewCopy = async (editedData: {
    name: string;
    dataUrl: string;
    width: number;
    height: number;
    format: ImageFormat;
    size: number;
    category: ImageCategory;
  }) => {
    const newImage: StudioImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: editedData.name,
      dataUrl: editedData.dataUrl,
      width: editedData.width,
      height: editedData.height,
      format: editedData.format,
      size: editedData.size,
      category: editedData.category,
      isEdited: true,
      originalId: editingImage?.id,
      originalName: editingImage?.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveStudioImage(newImage);
    toast.success(`Saved edited copy "${newImage.name}" without modifying the original.`);
    setEditingImage(null);
    loadImages();
  };

  // Overwrite original
  const handleOverwriteOriginal = async (editedData: {
    id: string;
    name: string;
    dataUrl: string;
    width: number;
    height: number;
    format: ImageFormat;
    size: number;
  }) => {
    await updateStudioImage(editedData.id, {
      name: editedData.name,
      dataUrl: editedData.dataUrl,
      width: editedData.width,
      height: editedData.height,
      format: editedData.format,
      size: editedData.size,
      isEdited: true,
    });
    toast.success(`Overwrote original image "${editedData.name}".`);
    setEditingImage(null);
    loadImages();
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingImage) return;
    await deleteStudioImage(deletingImage.id);
    toast.success(`Deleted "${deletingImage.name}" from image library.`);
    setDeletingImage(null);
    loadImages();
  };

  // Confirm Rename
  const handleConfirmRename = async () => {
    if (!renamingImage || !newImageName.trim()) return;
    await updateStudioImage(renamingImage.id, { name: newImageName.trim() });
    toast.success(`Renamed image to "${newImageName.trim()}".`);
    setRenamingImage(null);
    loadImages();
  };

  // Download single image
  const handleDownload = (img: StudioImage) => {
    const ext = img.format === 'image/png' ? 'png' : img.format === 'image/webp' ? 'webp' : 'jpg';
    const filename = `${img.name.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;
    const a = document.createElement('a');
    a.href = img.dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 200);
  };

  return (
    <AdminScreenLayout
      title="Image Studio &amp; Media Library"
      subtitle="Comprehensive non-AI deterministic image editing, aspect cropping (1:1, 3:2, 2:3, 16:9, 9:16), pixel resizing, watermarking, and gallery management."
      previewTitle="Studio Storage Information"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Studio Metrics
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              {images.length} Total Assets
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 block text-[11px]">Original Assets</span>
              <span className="text-lg font-bold text-slate-900">
                {images.filter((i) => !i.isEdited).length}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 block text-[11px]">Edited Versions</span>
              <span className="text-lg font-bold text-[#015557]">
                {images.filter((i) => i.isEdited).length}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-semibold text-slate-700 block">Browser Storage Architecture:</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Images are stored securely inside your browser's persistent <strong>IndexedDB</strong> engine. This avoids standard 5MB localStorage limits and maintains crisp resolution.
            </p>
          </div>

          {images.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Recently Added Asset
              </span>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 relative border border-slate-200">
                <img
                  src={images[0].dataUrl}
                  alt={images[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1 truncate">{images[0].name}</p>
              <p className="text-[10px] text-slate-500 font-mono">
                {images[0].width} &times; {images[0].height} px &bull; {formatFileSize(images[0].size)}
              </p>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Control Bar: Search, Upload & Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images by filename, format, or category..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:bg-white"
              />
            </div>

            {/* Upload Button */}
            <label className="min-h-[44px] px-4 py-2 bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0">
              <Upload className="w-4 h-4" />
              <span>Upload New Photos</span>
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All' ? images.length : images.filter((i) => i.category === cat).length;
                const isActive = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#015557] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  typeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('original')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  typeFilter === 'original' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Originals
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('edited')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  typeFilter === 'edited' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Edited Copies
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <RefreshCw className="w-8 h-8 text-[#015557] animate-spin mx-auto mb-2" />
            <p className="text-sm text-slate-500">Loading image studio library...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No images found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Upload new photos or clear your search and category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs overflow-hidden flex flex-col justify-between group transition-all"
              >
                {/* Image Thumbnail Container */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-102"
                    loading="lazy"
                  />

                  {/* Badges: Original vs Edited */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider ${
                        img.isEdited
                          ? 'bg-amber-500 text-white'
                          : 'bg-[#015557] text-white'
                      }`}
                    >
                      {img.isEdited ? 'Edited Copy' : 'Original'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900/75 text-white backdrop-blur-xs">
                      {img.category}
                    </span>
                  </div>

                  {/* Dimension pill */}
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {img.width} &times; {img.height} px
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                    <button
                      type="button"
                      onClick={() => setEditingImage(img)}
                      className="px-3 py-1.5 bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Edit Studio</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewImage(img)}
                      className="px-2.5 py-1.5 bg-white text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1 shadow-md hover:bg-slate-50 transition-colors"
                      title="Quick Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Info & Meta */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 truncate" title={img.name}>
                        {img.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setRenamingImage(img);
                          setNewImageName(img.name);
                        }}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>

                    {img.originalName && (
                      <p className="text-[11px] text-slate-400 truncate">
                        Derived from: {img.originalName}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{formatFileSize(img.size)}</span>
                    <span className="uppercase">{img.format.replace('image/', '')}</span>
                  </div>
                </div>

                {/* Bottom Footer Action Strip */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingImage(img)}
                    className="text-xs font-semibold text-[#015557] hover:text-[#014345] flex items-center gap-1.5 transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Open Editor</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDownload(img)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors"
                      title="Download image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingImage(img)}
                      className="p-1.5 text-slate-400 hover:text-[#d80000] rounded hover:bg-red-50 transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Canvas Editor Modal */}
      {editingImage && (
        <ImageCanvasEditor
          sourceImage={editingImage}
          onSaveAsNew={handleSaveAsNewCopy}
          onOverwrite={handleOverwriteOriginal}
          onClose={() => setEditingImage(null)}
        />
      )}

      {/* Enlarged Lightbox Preview */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{previewImage.name}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {previewImage.width} &times; {previewImage.height} px &bull; {formatFileSize(previewImage.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="text-slate-400 hover:text-slate-800 p-1 rounded"
              >
                &times;
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto flex items-center justify-center p-2 bg-slate-50 rounded-xl">
              <img
                src={previewImage.dataUrl}
                alt={previewImage.name}
                className="max-w-full max-h-[65vh] object-contain rounded"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleDownload(previewImage)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingImage(previewImage);
                  setPreviewImage(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#015557] hover:bg-[#014345] text-white rounded-lg flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open in Editor</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Dialog */}
      {renamingImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setRenamingImage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-900">Rename Image</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Filename</label>
              <input
                type="text"
                value={newImageName}
                onChange={(e) => setNewImageName(e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015557]"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRenamingImage(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRename}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg"
              >
                Save Name
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingImage}
        title={`Delete "${deletingImage?.name}"?`}
        description="Are you sure you want to permanently remove this image from the library? This operation cannot be undone."
        confirmLabel="Delete Image"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingImage(null)}
      />
    </AdminScreenLayout>
  );
}
