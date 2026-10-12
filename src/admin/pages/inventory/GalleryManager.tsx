import React, { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ImageIcon,
  X,
} from 'lucide-react';
import { InventoryGalleryItem, generateSlug } from '@/data/inventoryDefaults';
import ImageGalleryField from './ImageGalleryField';
import ConfirmDialog from '../../components/ConfirmDialog';
import AdminToggle from '../../components/AdminToggle';

interface GalleryManagerProps {
  galleryItems: InventoryGalleryItem[];
  onChange: (items: InventoryGalleryItem[]) => void;
}

const GALLERY_CATEGORIES = [
  'Towing Fleet',
  'Workshop',
  'Body Works',
  'Rental Fleet',
  'Car Sales',
  'Team & Facilities',
];

export default function GalleryManager({ galleryItems, onChange }: GalleryManagerProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingItem, setEditingItem] = useState<InventoryGalleryItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletePending, setDeletePending] = useState<InventoryGalleryItem | null>(null);

  const filteredItems = galleryItems.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase()) ||
      (g.description && g.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    const nextId =
      galleryItems.reduce((max, g) => (typeof g.id === 'number' && g.id > max ? g.id : max), 0) + 1;
    const newItem: InventoryGalleryItem = {
      id: nextId,
      slug: '',
      title: '',
      category: 'Workshop',
      url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
      alt: '',
      span: 'col-span-1 row-span-1',
      description: '',
      status: 'Published',
      hidden: false,
      images: [
        { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: 'Gallery image' }
      ],
      seoTitle: '',
      seoDescription: ''
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleOpenEdit = (item: InventoryGalleryItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleToggleHide = (itemId: string | number) => {
    onChange(galleryItems.map((g) => (g.id === itemId ? { ...g, hidden: !g.hidden } : g)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= galleryItems.length) return;
    const copy = [...galleryItems];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleConfirmDelete = () => {
    if (!deletePending) return;
    onChange(galleryItems.filter((g) => g.id !== deletePending.id));
    setDeletePending(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let finalItem = { ...editingItem };
    if (!finalItem.slug) {
      finalItem.slug = generateSlug(finalItem.title);
    }
    if (finalItem.images && finalItem.images.length > 0) {
      finalItem.url = finalItem.images[0].url;
      finalItem.alt = finalItem.images[0].alt || finalItem.title;
    }

    if (isNew) {
      onChange([finalItem, ...galleryItems]);
    } else {
      onChange(galleryItems.map((g) => (g.id === finalItem.id ? finalItem : g)));
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gallery photos by title, category, description..."
              className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#015557] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Categories</option>
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Gallery List */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-2xs">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No gallery photos found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {search ? 'Try adjusting your search query.' : 'Click "Add Photo" to showcase your work.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredItems.length - 1;

            return (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  item.hidden
                    ? 'bg-slate-50/80 border-slate-200 opacity-65'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-20 h-16 sm:w-24 sm:h-18 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={item.url || (item.images && item.images[0]?.url)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/120x80?text=Gallery';
                      }}
                    />
                    {item.hidden && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-[10px] font-bold">
                        HIDDEN
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                    )}

                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      Span: {item.span || 'col-span-1'} • Alt: {item.alt || item.title}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  <a
                    href="/gallery"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public gallery"
                    className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#015557] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleHide(item.id)}
                    title={item.hidden ? 'Unhide item on public website' : 'Hide from public website'}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      item.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item.hidden ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{item.hidden ? 'Hidden' : 'Visible'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMove(index, 'up')}
                    title="Move up"
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMove(index, 'down')}
                    title="Move down"
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    title="Edit gallery photo"
                    className="p-2 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletePending(item)}
                    title="Delete photo"
                    className="p-2 text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#015557]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isNew ? 'Add Photo to Gallery' : `Edit: ${editingItem.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Photo Title / Caption *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingItem((prev) =>
                          prev
                            ? {
                                ...prev,
                                title: val,
                                slug: isNew ? generateSlug(val) : prev.slug,
                              }
                            : null
                        );
                      }}
                      placeholder="e.g. State-of-the-art diagnostic bay"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem((prev) =>
                          prev ? { ...prev, category: e.target.value } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      {GALLERY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Grid Layout Span
                    </label>
                    <select
                      value={editingItem.span || 'col-span-1 row-span-1'}
                      onChange={(e) =>
                        setEditingItem((prev) =>
                          prev ? { ...prev, span: e.target.value } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="col-span-1 row-span-1">Standard (1 x 1)</option>
                      <option value="col-span-2 row-span-1">Wide Hero (2 Columns Wide)</option>
                      <option value="col-span-1 row-span-2">Tall Portrait (2 Rows Tall)</option>
                      <option value="col-span-2 row-span-2">Large Feature (2 x 2)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publish Status
                    </label>
                    <select
                      value={editingItem.status}
                      onChange={(e) =>
                        setEditingItem((prev) =>
                          prev ? { ...prev, status: e.target.value as any } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <AdminToggle
                    label="Hide photo from public gallery"
                    description="When enabled, this photo will not be displayed on the gallery page."
                    checked={!!editingItem.hidden}
                    onChange={(checked) =>
                      setEditingItem((prev) => (prev ? { ...prev, hidden: checked } : null))
                    }
                  />
                </div>
              </div>

              {/* Photo & Alt */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  2. Photo Asset &amp; Alt Text
                </h4>
                <ImageGalleryField
                  label="Gallery Photos & Alt Text"
                  images={
                    editingItem.images && editingItem.images.length > 0
                      ? editingItem.images
                      : [{ url: editingItem.url, alt: editingItem.alt || editingItem.title }]
                  }
                  onChange={(imgs) =>
                    setEditingItem((prev) =>
                      prev
                        ? {
                            ...prev,
                            images: imgs,
                            url: imgs[0]?.url || prev.url,
                            alt: imgs[0]?.alt || prev.alt,
                          }
                        : null
                    )
                  }
                />
              </div>

              {/* Description */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  3. Description
                </h4>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Describe this photo or project in detail..."
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              {/* SEO */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  4. SEO &amp; Meta Information
                </h4>
                <input
                  type="text"
                  value={editingItem.seoTitle || ''}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, seoTitle: e.target.value } : null
                    )
                  }
                  placeholder="SEO Title (optional)"
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
                <textarea
                  rows={2}
                  value={editingItem.seoDescription || ''}
                  onChange={(e) =>
                    setEditingItem((prev) =>
                      prev ? { ...prev, seoDescription: e.target.value } : null
                    )
                  }
                  placeholder="SEO Description (optional)"
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3 -mb-6 -mx-6 px-6">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="min-h-[42px] px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-6 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-2xs"
                >
                  {isNew ? 'Add to Gallery' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletePending}
        title="Delete Photo from Gallery?"
        description={`Are you sure you want to remove "${deletePending?.title}" from the gallery?`}
        confirmLabel="Delete photo"
        cancelLabel="Keep photo"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  );
}
