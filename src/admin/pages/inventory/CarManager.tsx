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
  Car,
  Filter,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { InventoryCar, generateSlug, SpecItem } from '@/data/inventoryDefaults';
import ImageGalleryField from './ImageGalleryField';
import SpecsField from './SpecsField';
import StringListField from './StringListField';
import ConfirmDialog from '../../components/ConfirmDialog';
import AdminToggle from '../../components/AdminToggle';

interface CarManagerProps {
  cars: InventoryCar[];
  onChange: (cars: InventoryCar[]) => void;
}

export default function CarManager({ cars, onChange }: CarManagerProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingCar, setEditingCar] = useState<InventoryCar | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletePending, setDeletePending] = useState<InventoryCar | null>(null);

  // Filtered cars
  const filteredCars = cars.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase()) ||
      c.price.toLowerCase().includes(search.toLowerCase()) ||
      (c.fuel && c.fuel.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenAdd = () => {
    const nextId =
      cars.reduce((max, c) => (typeof c.id === 'number' && c.id > max ? c.id : max), 0) + 1;
    const newCar: InventoryCar = {
      id: nextId,
      name: '',
      slug: '',
      type: 'New',
      price: 'GH₵ ',
      year: new Date().getFullYear(),
      fuel: 'Petrol',
      transmission: 'Automatic',
      mileage: '0 km',
      image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
      images: [
        { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: 'Car front view' }
      ],
      status: 'Available',
      hidden: false,
      description: '',
      specs: {
        engine: [],
        performance: [],
        dimensions: [],
        features: []
      },
      seoTitle: '',
      seoDescription: ''
    };
    setEditingCar(newCar);
    setIsNew(true);
  };

  const handleOpenEdit = (car: InventoryCar) => {
    // Clone car deeply
    setEditingCar(JSON.parse(JSON.stringify(car)));
    setIsNew(false);
  };

  const handleToggleHide = (carId: string | number) => {
    const updated = cars.map((c) => (c.id === carId ? { ...c, hidden: !c.hidden } : c));
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= cars.length) return;
    const copy = [...cars];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleConfirmDelete = () => {
    if (!deletePending) return;
    onChange(cars.filter((c) => c.id !== deletePending.id));
    setDeletePending(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    // Auto-assign slug if missing
    let finalCar = { ...editingCar };
    if (!finalCar.slug) {
      finalCar.slug = generateSlug(finalCar.name);
    }
    // Sync main image with first gallery image if present
    if (finalCar.images && finalCar.images.length > 0) {
      finalCar.image = finalCar.images[0].url;
    }

    if (isNew) {
      onChange([finalCar, ...cars]);
    } else {
      onChange(cars.map((c) => (c.id === finalCar.id ? finalCar : c)));
    }
    setEditingCar(null);
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
              placeholder="Search cars by name, slug, price, fuel..."
              className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#015557] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by condition"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Conditions</option>
              <option value="New">New</option>
              <option value="Foreign Used">Foreign Used</option>
              <option value="Ghana Used">Ghana Used</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Car</span>
        </button>
      </div>

      {/* Car List */}
      {filteredCars.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-2xs">
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No cars found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {search || typeFilter !== 'All' || statusFilter !== 'All'
              ? 'Try adjusting your search query or filters.'
              : 'Start by clicking "Add Car" to create your first vehicle listing.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCars.map((car, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredCars.length - 1;

            return (
              <div
                key={car.id}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  car.hidden
                    ? 'bg-slate-50/80 border-slate-200 opacity-65'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Left: Image, Title, Attributes */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-16 sm:w-24 sm:h-18 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={car.image || (car.images && car.images[0]?.url)}
                      alt={car.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/120x80?text=Car';
                      }}
                    />
                    {car.hidden && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-[10px] font-bold">
                        HIDDEN
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{car.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {car.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          car.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : car.status === 'Sold'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {car.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="font-bold text-[#d80000]">{car.price}</span>
                      <span>•</span>
                      <span>{car.year}</span>
                      <span>•</span>
                      <span>{car.transmission}</span>
                      <span>•</span>
                      <span>{car.fuel}</span>
                      <span>•</span>
                      <span>{car.mileage}</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      Slug: /sales/{car.id} {car.slug && `(alias: ${car.slug})`}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  {/* Public Link */}
                  <a
                    href={`/sales/${car.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public page"
                    className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#015557] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>

                  {/* Hide Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleHide(car.id)}
                    title={car.hidden ? 'Unhide item on public website' : 'Hide from public website'}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      car.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {car.hidden ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{car.hidden ? 'Hidden' : 'Visible'}</span>
                  </button>

                  {/* Reorder Buttons */}
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

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(car)}
                    title="Edit car details"
                    className="p-2 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => setDeletePending(car)}
                    title="Delete car"
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

      {/* Car Edit / Create Modal Form */}
      {editingCar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-[#015557]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isNew ? 'Add New Car to Inventory' : `Edit: ${editingCar.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCar(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  1. General Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Car Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCar.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingCar((prev) =>
                          prev
                            ? {
                                ...prev,
                                name: val,
                                slug: isNew ? generateSlug(val) : prev.slug,
                              }
                            : null
                        );
                      }}
                      placeholder="e.g. 2024 Luxury Sedan"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">URL Slug</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingCar((prev) =>
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
                      value={editingCar.slug}
                      onChange={(e) =>
                        setEditingCar((prev) => (prev ? { ...prev, slug: e.target.value } : null))
                      }
                      placeholder="e.g. 2024-luxury-sedan"
                      className="w-full px-3.5 py-2 text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Condition / Category
                    </label>
                    <select
                      value={editingCar.type}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, type: e.target.value as any } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="New">New</option>
                      <option value="Foreign Used">Foreign Used</option>
                      <option value="Ghana Used">Ghana Used</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sale Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCar.price}
                      onChange={(e) =>
                        setEditingCar((prev) => (prev ? { ...prev, price: e.target.value } : null))
                      }
                      placeholder="e.g. GH₵ 540,000"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inventory Status
                    </label>
                    <select
                      value={editingCar.status}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, status: e.target.value as any } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="Available">Available</option>
                      <option value="Sold">Sold</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                    <input
                      type="number"
                      value={editingCar.year}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, year: Number(e.target.value) } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mileage</label>
                    <input
                      type="text"
                      value={editingCar.mileage}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, mileage: e.target.value } : null
                        )
                      }
                      placeholder="e.g. 0 km or 72,000 km"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Transmission</label>
                    <input
                      type="text"
                      value={editingCar.transmission}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, transmission: e.target.value } : null
                        )
                      }
                      placeholder="Automatic or Manual"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Fuel Type</label>
                    <input
                      type="text"
                      value={editingCar.fuel}
                      onChange={(e) =>
                        setEditingCar((prev) => (prev ? { ...prev, fuel: e.target.value } : null))
                      }
                      placeholder="Hybrid, Petrol, Diesel"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <AdminToggle
                    label="Hide car from public website"
                    description="When enabled, this vehicle will not appear in the public car catalog or search results."
                    checked={!!editingCar.hidden}
                    onChange={(checked) =>
                      setEditingCar((prev) => (prev ? { ...prev, hidden: checked } : null))
                    }
                  />
                </div>
              </div>

              {/* Photos & Gallery */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  2. Photo Gallery &amp; Alt Texts
                </h4>
                <ImageGalleryField
                  label="Vehicle Photos (First image is primary thumbnail)"
                  images={editingCar.images || []}
                  onChange={(imgs) =>
                    setEditingCar((prev) =>
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

              {/* Description */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  3. Description &amp; Overview
                </h4>
                <textarea
                  rows={4}
                  value={editingCar.description || ''}
                  onChange={(e) =>
                    setEditingCar((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Provide detailed description of the car, features, mechanical condition..."
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              {/* Specifications */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  4. Technical Specifications &amp; Features
                </h4>
                <SpecsField
                  label="Engine Specifications"
                  specs={editingCar.specs?.engine || []}
                  onChange={(eng) =>
                    setEditingCar((prev) =>
                      prev
                        ? {
                            ...prev,
                            specs: { ...prev.specs, engine: eng },
                          }
                        : null
                    )
                  }
                />
                <SpecsField
                  label="Performance & Drivetrain"
                  specs={editingCar.specs?.performance || []}
                  onChange={(perf) =>
                    setEditingCar((prev) =>
                      prev
                        ? {
                            ...prev,
                            specs: { ...prev.specs, performance: perf },
                          }
                        : null
                    )
                  }
                />
                <StringListField
                  label="Key Features & Equipment"
                  items={editingCar.specs?.features || []}
                  onChange={(feats) =>
                    setEditingCar((prev) =>
                      prev
                        ? {
                            ...prev,
                            specs: { ...prev.specs, features: feats },
                          }
                        : null
                    )
                  }
                  placeholder="Add feature (e.g. Panoramic sunroof, Apple CarPlay)..."
                />
              </div>

              {/* SEO Title & Description */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  5. Search Engine Optimization (SEO)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      value={editingCar.seoTitle || ''}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, seoTitle: e.target.value } : null
                        )
                      }
                      placeholder={`${editingCar.name || 'Car'} for Sale | Santa Towing Ghana`}
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      SEO Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingCar.seoDescription || ''}
                      onChange={(e) =>
                        setEditingCar((prev) =>
                          prev ? { ...prev, seoDescription: e.target.value } : null
                        )
                      }
                      placeholder="Brief summary for Google search results..."
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3 -mb-6 -mx-6 px-6">
                <button
                  type="button"
                  onClick={() => setEditingCar(null)}
                  className="min-h-[42px] px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-6 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-2xs"
                >
                  {isNew ? 'Create Vehicle' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletePending}
        title="Delete Car from Inventory?"
        description={`Are you sure you want to delete "${deletePending?.name}"? This action will remove it from the sales catalog.`}
        confirmLabel="Delete vehicle"
        cancelLabel="Keep vehicle"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  );
}
