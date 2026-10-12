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
  Wrench,
  X,
  Package,
} from 'lucide-react';
import { InventoryPart, generateSlug } from '@/data/inventoryDefaults';
import ImageGalleryField from './ImageGalleryField';
import SpecsField from './SpecsField';
import ConfirmDialog from '../../components/ConfirmDialog';
import AdminToggle from '../../components/AdminToggle';

interface PartManagerProps {
  parts: InventoryPart[];
  onChange: (parts: InventoryPart[]) => void;
}

const PART_CATEGORIES = [
  'Car Batteries',
  'Engine Oil & Fluids',
  'Brake Pads & Discs',
  'Tires',
  'Filters',
  'Suspension Parts',
  'Lighting',
  'Accessories',
];

export default function PartManager({ parts, onChange }: PartManagerProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingPart, setEditingPart] = useState<InventoryPart | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletePending, setDeletePending] = useState<InventoryPart | null>(null);

  const filteredParts = parts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    const nextId =
      parts.reduce((max, p) => (typeof p.id === 'number' && p.id > max ? p.id : max), 0) + 1;
    const newPart: InventoryPart = {
      id: nextId,
      slug: '',
      name: '',
      brand: 'Bosch',
      category: 'Car Batteries',
      price: 'GH₵ ',
      rating: 5.0,
      reviews: 1,
      inStock: true,
      status: 'In Stock',
      sku: `PRT-${nextId}`,
      image: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
      images: [
        { url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', alt: 'Part packaging' }
      ],
      specs: [
        { label: 'Standard', value: 'OEM Compatible' }
      ],
      compatibility: 'Fits most passenger vehicles.',
      warranty: '12-Month Replacement Warranty.',
      installation: 'Professional installation recommended at our garage.',
      description: '',
      hidden: false,
      seoTitle: '',
      seoDescription: ''
    };
    setEditingPart(newPart);
    setIsNew(true);
  };

  const handleOpenEdit = (part: InventoryPart) => {
    setEditingPart(JSON.parse(JSON.stringify(part)));
    setIsNew(false);
  };

  const handleToggleHide = (partId: string | number) => {
    onChange(parts.map((p) => (p.id === partId ? { ...p, hidden: !p.hidden } : p)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= parts.length) return;
    const copy = [...parts];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleConfirmDelete = () => {
    if (!deletePending) return;
    onChange(parts.filter((p) => p.id !== deletePending.id));
    setDeletePending(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPart) return;

    let finalPart = { ...editingPart };
    if (!finalPart.slug) {
      finalPart.slug = generateSlug(finalPart.name);
    }
    if (finalPart.images && finalPart.images.length > 0) {
      finalPart.image = finalPart.images[0].url;
    }
    finalPart.inStock = finalPart.status === 'In Stock';

    if (isNew) {
      onChange([finalPart, ...parts]);
    } else {
      onChange(parts.map((p) => (p.id === finalPart.id ? finalPart : p)));
    }
    setEditingPart(null);
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
              placeholder="Search parts by name, brand, SKU, category..."
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
              {PART_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by stock status"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Stock Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Part</span>
        </button>
      </div>

      {/* Parts List */}
      {filteredParts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-2xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No spare parts found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {search ? 'Try adjusting your search query.' : 'Click "Add Part" to add a product to the catalog.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredParts.map((part, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredParts.length - 1;

            return (
              <div
                key={part.id}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  part.hidden
                    ? 'bg-slate-50/80 border-slate-200 opacity-65'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-20 h-16 sm:w-24 sm:h-18 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={part.image || (part.images && part.images[0]?.url)}
                      alt={part.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/120x80?text=Part';
                      }}
                    />
                    {part.hidden && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-[10px] font-bold">
                        HIDDEN
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{part.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {part.brand}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          part.status === 'In Stock'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : part.status === 'Low Stock'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {part.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="font-bold text-[#d80000]">{part.price}</span>
                      <span>•</span>
                      <span>{part.category}</span>
                      <span>•</span>
                      <span className="font-mono">SKU: {part.sku}</span>
                      <span>•</span>
                      <span>★ {part.rating} ({part.reviews})</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      Slug: /parts/{part.id} {part.slug && `(alias: ${part.slug})`}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  <a
                    href={`/parts/${part.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public part page"
                    className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#015557] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleHide(part.id)}
                    title={part.hidden ? 'Unhide item on public website' : 'Hide from public website'}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      part.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {part.hidden ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{part.hidden ? 'Hidden' : 'Visible'}</span>
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
                    onClick={() => handleOpenEdit(part)}
                    title="Edit part details"
                    className="p-2 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletePending(part)}
                    title="Delete part"
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
      {editingPart && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#015557]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isNew ? 'Add New Spare Part' : `Edit: ${editingPart.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPart(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Product Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  1. Product Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Part Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPart.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingPart((prev) =>
                          prev
                            ? {
                                ...prev,
                                name: val,
                                slug: isNew ? generateSlug(val) : prev.slug,
                              }
                            : null
                        );
                      }}
                      placeholder="e.g. Premium Heavy Duty Battery 70Ah"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">URL Slug</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingPart((prev) =>
                            prev ? { ...prev, slug: generateSlug(prev.name) } : null
                          )
                        }
                        className="text-[11px] text-[#015557] hover:underline"
                      >
                        Generate from title
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editingPart.slug}
                      onChange={(e) =>
                        setEditingPart((prev) => (prev ? { ...prev, slug: e.target.value } : null))
                      }
                      placeholder="e.g. battery-70ah"
                      className="w-full px-3.5 py-2 text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={editingPart.category}
                      onChange={(e) =>
                        setEditingPart((prev) =>
                          prev ? { ...prev, category: e.target.value } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      {PART_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brand / Manufacturer
                    </label>
                    <input
                      type="text"
                      value={editingPart.brand}
                      onChange={(e) =>
                        setEditingPart((prev) => (prev ? { ...prev, brand: e.target.value } : null))
                      }
                      placeholder="e.g. Bosch, Brembo, Castrol"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      SKU / Part Code
                    </label>
                    <input
                      type="text"
                      value={editingPart.sku}
                      onChange={(e) =>
                        setEditingPart((prev) => (prev ? { ...prev, sku: e.target.value } : null))
                      }
                      placeholder="e.g. BSH-70AH-HD"
                      className="w-full px-3.5 py-2 text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPart.price}
                      onChange={(e) =>
                        setEditingPart((prev) => (prev ? { ...prev, price: e.target.value } : null))
                      }
                      placeholder="e.g. GH₵ 850"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Stock Status
                    </label>
                    <select
                      value={editingPart.status}
                      onChange={(e) =>
                        setEditingPart((prev) =>
                          prev
                            ? {
                                ...prev,
                                status: e.target.value as any,
                                inStock: e.target.value === 'In Stock',
                              }
                            : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rating &amp; Reviews
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.1"
                        max="5"
                        min="1"
                        value={editingPart.rating}
                        onChange={(e) =>
                          setEditingPart((prev) =>
                            prev ? { ...prev, rating: Number(e.target.value) } : null
                          )
                        }
                        placeholder="Rating 5.0"
                        className="w-1/2 px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                      <input
                        type="number"
                        min="0"
                        value={editingPart.reviews}
                        onChange={(e) =>
                          setEditingPart((prev) =>
                            prev ? { ...prev, reviews: Number(e.target.value) } : null
                          )
                        }
                        placeholder="Reviews count"
                        className="w-1/2 px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <AdminToggle
                    label="Hide part from public catalog"
                    description="When enabled, this product will not appear in the store or search."
                    checked={!!editingPart.hidden}
                    onChange={(checked) =>
                      setEditingPart((prev) => (prev ? { ...prev, hidden: checked } : null))
                    }
                  />
                </div>
              </div>

              {/* Photos & Gallery */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  2. Product Images &amp; Alt Texts
                </h4>
                <ImageGalleryField
                  label="Product Images"
                  images={editingPart.images || []}
                  onChange={(imgs) =>
                    setEditingPart((prev) =>
                      prev
                        ? {
                            ...prev,
                            images: imgs,
                            image: imgs[0]?.url || prev.image,
                          }
                        : null
                    )
                  }
                />
              </div>

              {/* Specifications */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  3. Technical Specifications
                </h4>
                <SpecsField
                  label="Part Specifications"
                  specs={editingPart.specs || []}
                  onChange={(sp) =>
                    setEditingPart((prev) => (prev ? { ...prev, specs: sp } : null))
                  }
                />
              </div>

              {/* Descriptions & Instructions */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  4. Description &amp; Warranty Guidelines
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingPart.description || ''}
                    onChange={(e) =>
                      setEditingPart((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                    placeholder="Product details, material, manufacturing quality..."
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Compatibility
                    </label>
                    <textarea
                      rows={2}
                      value={editingPart.compatibility || ''}
                      onChange={(e) =>
                        setEditingPart((prev) =>
                          prev ? { ...prev, compatibility: e.target.value } : null
                        )
                      }
                      placeholder="Vehicle makes and engines supported..."
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Warranty
                    </label>
                    <textarea
                      rows={2}
                      value={editingPart.warranty || ''}
                      onChange={(e) =>
                        setEditingPart((prev) =>
                          prev ? { ...prev, warranty: e.target.value } : null
                        )
                      }
                      placeholder="Warranty duration and terms..."
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Installation Guidelines
                    </label>
                    <textarea
                      rows={2}
                      value={editingPart.installation || ''}
                      onChange={(e) =>
                        setEditingPart((prev) =>
                          prev ? { ...prev, installation: e.target.value } : null
                        )
                      }
                      placeholder="Installation guidance and safety notes..."
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  5. SEO &amp; Meta Information
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingPart.seoTitle || ''}
                    onChange={(e) =>
                      setEditingPart((prev) =>
                        prev ? { ...prev, seoTitle: e.target.value } : null
                      )
                    }
                    placeholder={`${editingPart.name || 'Auto Part'} | Santa Towing Ghana`}
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                  <textarea
                    rows={2}
                    value={editingPart.seoDescription || ''}
                    onChange={(e) =>
                      setEditingPart((prev) =>
                        prev ? { ...prev, seoDescription: e.target.value } : null
                      )
                    }
                    placeholder="Meta description for search engines..."
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3 -mb-6 -mx-6 px-6">
                <button
                  type="button"
                  onClick={() => setEditingPart(null)}
                  className="min-h-[42px] px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-6 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-2xs"
                >
                  {isNew ? 'Create Spare Part' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletePending}
        title="Delete Spare Part?"
        description={`Are you sure you want to delete "${deletePending?.name}" from inventory?`}
        confirmLabel="Delete part"
        cancelLabel="Keep part"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  );
}
