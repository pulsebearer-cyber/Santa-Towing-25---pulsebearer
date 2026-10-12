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
  KeyRound,
  X,
} from 'lucide-react';
import { InventoryRental, generateSlug } from '@/data/inventoryDefaults';
import ImageGalleryField from './ImageGalleryField';
import StringListField from './StringListField';
import ConfirmDialog from '../../components/ConfirmDialog';
import AdminToggle from '../../components/AdminToggle';

interface RentalManagerProps {
  rentals: InventoryRental[];
  onChange: (rentals: InventoryRental[]) => void;
}

export default function RentalManager({ rentals, onChange }: RentalManagerProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingRental, setEditingRental] = useState<InventoryRental | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletePending, setDeletePending] = useState<InventoryRental | null>(null);

  const filteredRentals = rentals.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.slug.toLowerCase().includes(search.toLowerCase()) ||
      r.daily.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    const nextId =
      rentals.reduce((max, r) => (typeof r.id === 'number' && r.id > max ? r.id : max), 0) + 1;
    const newRental: InventoryRental = {
      id: nextId,
      slug: '',
      categorySlug: 'sedan',
      name: '',
      type: 'Sedan',
      category: 'Sedan',
      price: 'GH₵ 600 / day',
      daily: 'GH₵ 600',
      weekly: 'GH₵ 3,800',
      monthly: 'GH₵ 14,000',
      seats: 5,
      transmission: 'Automatic',
      trans: 'Automatic',
      fuel: 'Petrol',
      image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
      images: [
        { url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', alt: 'Rental vehicle thumbnail' }
      ],
      status: 'Available',
      hidden: false,
      description: '',
      features: [
        'Comprehensive Fleet Insurance Coverage',
        'Unlimited Mileage in Greater Accra',
        'Optional Uniformed Chauffeur Driver',
        '24/7 Roadside Assistance Included'
      ],
      seoTitle: '',
      seoDescription: ''
    };
    setEditingRental(newRental);
    setIsNew(true);
  };

  const handleOpenEdit = (rental: InventoryRental) => {
    setEditingRental(JSON.parse(JSON.stringify(rental)));
    setIsNew(false);
  };

  const handleToggleHide = (rentalId: string | number) => {
    onChange(rentals.map((r) => (r.id === rentalId ? { ...r, hidden: !r.hidden } : r)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= rentals.length) return;
    const copy = [...rentals];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleConfirmDelete = () => {
    if (!deletePending) return;
    onChange(rentals.filter((r) => r.id !== deletePending.id));
    setDeletePending(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRental) return;

    let finalRental = { ...editingRental };
    if (!finalRental.slug) {
      finalRental.slug = generateSlug(finalRental.name);
    }
    if (!finalRental.categorySlug) {
      finalRental.categorySlug = generateSlug(finalRental.category);
    }
    if (!finalRental.type) {
      finalRental.type = finalRental.category;
    }
    if (!finalRental.trans) {
      finalRental.trans = finalRental.transmission;
    }
    if (finalRental.images && finalRental.images.length > 0) {
      finalRental.image = finalRental.images[0].url;
    }

    if (isNew) {
      onChange([finalRental, ...rentals]);
    } else {
      onChange(rentals.map((r) => (r.id === finalRental.id ? finalRental : r)));
    }
    setEditingRental(null);
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
              placeholder="Search rentals by model name, rate, category..."
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
              <option value="Economy">Economy</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Pickup">Pickup</option>
              <option value="Luxury">Luxury</option>
              <option value="Van">Van</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by rental status"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Rental</span>
        </button>
      </div>

      {/* Rentals List */}
      {filteredRentals.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-2xs">
          <KeyRound className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No rental vehicles found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {search ? 'Try adjusting your search query.' : 'Click "Add Rental" to add a vehicle to the fleet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRentals.map((rental, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredRentals.length - 1;

            return (
              <div
                key={rental.id}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  rental.hidden
                    ? 'bg-slate-50/80 border-slate-200 opacity-65'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-20 h-16 sm:w-24 sm:h-18 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={rental.image || (rental.images && rental.images[0]?.url)}
                      alt={rental.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/120x80?text=Rental';
                      }}
                    />
                    {rental.hidden && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-[10px] font-bold">
                        HIDDEN
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{rental.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {rental.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rental.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : rental.status === 'Rented'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {rental.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="font-bold text-[#015557]">{rental.daily} / day</span>
                      <span>•</span>
                      <span>{rental.weekly} / wk</span>
                      <span>•</span>
                      <span>{rental.seats} Seats</span>
                      <span>•</span>
                      <span>{rental.transmission}</span>
                      <span>•</span>
                      <span>{rental.fuel}</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      Slug: /rental/{rental.id} {rental.slug && `(alias: ${rental.slug})`}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  <a
                    href={`/rental/${rental.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public rental page"
                    className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#015557] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleHide(rental.id)}
                    title={rental.hidden ? 'Unhide item on public website' : 'Hide from public website'}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      rental.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {rental.hidden ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{rental.hidden ? 'Hidden' : 'Visible'}</span>
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
                    onClick={() => handleOpenEdit(rental)}
                    title="Edit rental vehicle"
                    className="p-2 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletePending(rental)}
                    title="Delete rental vehicle"
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
      {editingRental && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#015557]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isNew ? 'Add Rental Vehicle to Fleet' : `Edit: ${editingRental.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingRental(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  1. Vehicle &amp; Category
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rental Vehicle Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingRental.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingRental((prev) =>
                          prev
                            ? {
                                ...prev,
                                name: val,
                                slug: isNew ? generateSlug(val) : prev.slug,
                              }
                            : null
                        );
                      }}
                      placeholder="e.g. Toyota Corolla 2023"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">URL Slug</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingRental((prev) =>
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
                      value={editingRental.slug}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev ? { ...prev, slug: e.target.value } : null
                        )
                      }
                      placeholder="e.g. corolla-sedan"
                      className="w-full px-3.5 py-2 text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category Class
                    </label>
                    <select
                      value={editingRental.category}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev
                            ? {
                                ...prev,
                                category: e.target.value,
                                type: e.target.value,
                                categorySlug: generateSlug(e.target.value),
                              }
                            : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Fleet Status
                    </label>
                    <select
                      value={editingRental.status}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev ? { ...prev, status: e.target.value as any } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Passenger Seats
                    </label>
                    <input
                      type="text"
                      value={editingRental.seats}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev ? { ...prev, seats: e.target.value } : null
                        )
                      }
                      placeholder="e.g. 5 or 12"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                {/* Rental Rates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Daily Rate *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingRental.daily}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev
                            ? {
                                ...prev,
                                daily: e.target.value,
                                price: `${e.target.value} / day`,
                              }
                            : null
                        )
                      }
                      placeholder="e.g. GH₵ 600"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Weekly Rate
                    </label>
                    <input
                      type="text"
                      value={editingRental.weekly}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev ? { ...prev, weekly: e.target.value } : null
                        )
                      }
                      placeholder="e.g. GH₵ 3,800"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Monthly Rate
                    </label>
                    <input
                      type="text"
                      value={editingRental.monthly}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev ? { ...prev, monthly: e.target.value } : null
                        )
                      }
                      placeholder="e.g. GH₵ 14,000"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Transmission
                    </label>
                    <input
                      type="text"
                      value={editingRental.transmission}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev
                            ? {
                                ...prev,
                                transmission: e.target.value,
                                trans: e.target.value,
                              }
                            : null
                        )
                      }
                      placeholder="Automatic or Manual"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Fuel Type
                    </label>
                    <input
                      type="text"
                      value={editingRental.fuel}
                      onChange={(e) =>
                        setEditingRental((prev) =>
                          prev ? { ...prev, fuel: e.target.value } : null
                        )
                      }
                      placeholder="Petrol, Diesel, Hybrid"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <AdminToggle
                    label="Hide rental from public website"
                    description="When enabled, this vehicle will not appear in the rental directory."
                    checked={!!editingRental.hidden}
                    onChange={(checked) =>
                      setEditingRental((prev) =>
                        prev ? { ...prev, hidden: checked } : null
                      )
                    }
                  />
                </div>
              </div>

              {/* Photos & Gallery */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  2. Photos &amp; Alt Texts
                </h4>
                <ImageGalleryField
                  label="Fleet Photos"
                  images={editingRental.images || []}
                  onChange={(imgs) =>
                    setEditingRental((prev) =>
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

              {/* Overview & Features */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  3. Description &amp; Included Features
                </h4>
                <textarea
                  rows={3}
                  value={editingRental.description || ''}
                  onChange={(e) =>
                    setEditingRental((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  placeholder="Describe vehicle condition, chauffeur availability, pickup guidelines..."
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
                <StringListField
                  label="Rental Inclusions & Highlights"
                  items={editingRental.features || []}
                  onChange={(feats) =>
                    setEditingRental((prev) =>
                      prev ? { ...prev, features: feats } : null
                    )
                  }
                  placeholder="e.g. Free Airport Pickup, Full Insurance, Chauffeur option..."
                />
              </div>

              {/* SEO */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  4. SEO &amp; Meta Information
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingRental.seoTitle || ''}
                    onChange={(e) =>
                      setEditingRental((prev) =>
                        prev ? { ...prev, seoTitle: e.target.value } : null
                      )
                    }
                    placeholder={`${editingRental.name || 'Vehicle'} Rental Ghana | Santa Towing`}
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                  <textarea
                    rows={2}
                    value={editingRental.seoDescription || ''}
                    onChange={(e) =>
                      setEditingRental((prev) =>
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
                  onClick={() => setEditingRental(null)}
                  className="min-h-[42px] px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-6 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-2xs"
                >
                  {isNew ? 'Create Rental' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletePending}
        title="Delete Rental Vehicle?"
        description={`Are you sure you want to delete "${deletePending?.name}" from the fleet?`}
        confirmLabel="Delete vehicle"
        cancelLabel="Keep vehicle"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  );
}
