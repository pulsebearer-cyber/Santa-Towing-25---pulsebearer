import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Car,
  KeyRound,
  Wrench,
  Image as ImageIcon,
  HelpCircle,
  Briefcase,
  ExternalLink,
  RotateCcw,
  Save,
  CheckCircle2,
  Sparkles,
  Package,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminToast } from '../context/AdminToastContext';
import { useContent, useContentManager } from '@/context/ContentContext';
import {
  DEFAULT_CARS,
  DEFAULT_RENTALS,
  DEFAULT_PARTS,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
  DEFAULT_CAREERS,
  InventoryCar,
  InventoryRental,
  InventoryPart,
  InventoryGalleryItem,
  InventoryFaq,
  InventoryCareer,
} from '@/data/inventoryDefaults';
import CarManager from './inventory/CarManager';
import RentalManager from './inventory/RentalManager';
import PartManager from './inventory/PartManager';
import GalleryManager from './inventory/GalleryManager';
import FaqManager from './inventory/FaqManager';
import CareerManager from './inventory/CareerManager';

type TabKey = 'cars' | 'rentals' | 'parts' | 'gallery' | 'faqs' | 'careers';

interface TabDef {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  publicUrl: string;
  publicLabel: string;
  description: string;
}

const TABS: TabDef[] = [
  {
    key: 'cars',
    label: 'Cars for Sale',
    icon: Car,
    publicUrl: '/sales',
    publicLabel: 'Public Car Sales',
    description: 'Manage new, foreign-used, and inspected Ghana-used vehicles for sale.',
  },
  {
    key: 'rentals',
    label: 'Rentals',
    icon: KeyRound,
    publicUrl: '/rental',
    publicLabel: 'Public Car Rentals',
    description: 'Manage daily, weekly, and monthly vehicle hire fleet options.',
  },
  {
    key: 'parts',
    label: 'Parts',
    icon: Wrench,
    publicUrl: '/parts',
    publicLabel: 'Public Auto Parts',
    description: 'Manage genuine OEM and replacement batteries, tires, and spares.',
  },
  {
    key: 'gallery',
    label: 'Gallery',
    icon: ImageIcon,
    publicUrl: '/gallery',
    publicLabel: 'Public Photo Gallery',
    description: 'Showcase photos of towing rescues, workshops, and facilities.',
  },
  {
    key: 'faqs',
    label: 'FAQs',
    icon: HelpCircle,
    publicUrl: '/faqs',
    publicLabel: 'Public FAQs Page',
    description: 'Manage questions and answers across all automotive service lines.',
  },
  {
    key: 'careers',
    label: 'Careers',
    icon: Briefcase,
    publicUrl: '/careers',
    publicLabel: 'Public Careers Page',
    description: 'Post and manage open jobs, technician roles, and driver vacancies.',
  },
];

export default function AdminInventory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useAdminToast();
  const { setMultiple, reset } = useContentManager();

  // Active Tab from query param or default to 'cars'
  const activeTabParam = (searchParams.get('tab') as TabKey) || 'cars';
  const activeTab: TabKey = TABS.some((t) => t.key === activeTabParam) ? activeTabParam : 'cars';

  const setActiveTab = (tab: TabKey) => {
    setSearchParams({ tab });
  };

  // Base data from ContentContext
  const storedCars = useContent<InventoryCar[]>('inventory.cars', DEFAULT_CARS);
  const storedRentals = useContent<InventoryRental[]>('inventory.rentals', DEFAULT_RENTALS);
  const storedParts = useContent<InventoryPart[]>('inventory.parts', DEFAULT_PARTS);
  const storedGallery = useContent<InventoryGalleryItem[]>('inventory.gallery', DEFAULT_GALLERY);
  const storedFaqs = useContent<InventoryFaq[]>('inventory.faqs', DEFAULT_FAQS);
  const storedCareers = useContent<InventoryCareer[]>('inventory.careers', DEFAULT_CAREERS);

  // Local working state
  const [workingCars, setWorkingCars] = useState<InventoryCar[]>(() => storedCars || DEFAULT_CARS);
  const [workingRentals, setWorkingRentals] = useState<InventoryRental[]>(() => storedRentals || DEFAULT_RENTALS);
  const [workingParts, setWorkingParts] = useState<InventoryPart[]>(() => storedParts || DEFAULT_PARTS);
  const [workingGallery, setWorkingGallery] = useState<InventoryGalleryItem[]>(() => storedGallery || DEFAULT_GALLERY);
  const [workingFaqs, setWorkingFaqs] = useState<InventoryFaq[]>(() => storedFaqs || DEFAULT_FAQS);
  const [workingCareers, setWorkingCareers] = useState<InventoryCareer[]>(() => storedCareers || DEFAULT_CAREERS);

  const [isSaving, setIsSaving] = useState(false);
  const [resetDefaultsDialogOpen, setResetDefaultsDialogOpen] = useState(false);

  // Sync working state when stored values change externally
  useEffect(() => {
    setWorkingCars(storedCars || DEFAULT_CARS);
  }, [storedCars]);

  useEffect(() => {
    setWorkingRentals(storedRentals || DEFAULT_RENTALS);
  }, [storedRentals]);

  useEffect(() => {
    setWorkingParts(storedParts || DEFAULT_PARTS);
  }, [storedParts]);

  useEffect(() => {
    setWorkingGallery(storedGallery || DEFAULT_GALLERY);
  }, [storedGallery]);

  useEffect(() => {
    setWorkingFaqs(storedFaqs || DEFAULT_FAQS);
  }, [storedFaqs]);

  useEffect(() => {
    setWorkingCareers(storedCareers || DEFAULT_CAREERS);
  }, [storedCareers]);

  // Check for unsaved changes by JSON comparison
  const hasUnsavedCars = useMemo(() => JSON.stringify(workingCars) !== JSON.stringify(storedCars || DEFAULT_CARS), [workingCars, storedCars]);
  const hasUnsavedRentals = useMemo(() => JSON.stringify(workingRentals) !== JSON.stringify(storedRentals || DEFAULT_RENTALS), [workingRentals, storedRentals]);
  const hasUnsavedParts = useMemo(() => JSON.stringify(workingParts) !== JSON.stringify(storedParts || DEFAULT_PARTS), [workingParts, storedParts]);
  const hasUnsavedGallery = useMemo(() => JSON.stringify(workingGallery) !== JSON.stringify(storedGallery || DEFAULT_GALLERY), [workingGallery, storedGallery]);
  const hasUnsavedFaqs = useMemo(() => JSON.stringify(workingFaqs) !== JSON.stringify(storedFaqs || DEFAULT_FAQS), [workingFaqs, storedFaqs]);
  const hasUnsavedCareers = useMemo(() => JSON.stringify(workingCareers) !== JSON.stringify(storedCareers || DEFAULT_CAREERS), [workingCareers, storedCareers]);

  const hasUnsavedChanges =
    hasUnsavedCars ||
    hasUnsavedRentals ||
    hasUnsavedParts ||
    hasUnsavedGallery ||
    hasUnsavedFaqs ||
    hasUnsavedCareers;

  // Counts for each tab
  const counts: Record<TabKey, number> = {
    cars: workingCars.length,
    rentals: workingRentals.length,
    parts: workingParts.length,
    gallery: workingGallery.length,
    faqs: workingFaqs.length,
    careers: workingCareers.length,
  };

  const currentTabDef = TABS.find((t) => t.key === activeTab)!;

  // Handle Save
  const handleSaveAll = () => {
    setIsSaving(true);
    const updates: Record<string, any> = {};

    if (hasUnsavedCars) updates['inventory.cars'] = workingCars;
    if (hasUnsavedRentals) updates['inventory.rentals'] = workingRentals;
    if (hasUnsavedParts) updates['inventory.parts'] = workingParts;
    if (hasUnsavedGallery) updates['inventory.gallery'] = workingGallery;
    if (hasUnsavedFaqs) updates['inventory.faqs'] = workingFaqs;
    if (hasUnsavedCareers) updates['inventory.careers'] = workingCareers;

    const ok = setMultiple(updates);
    setIsSaving(false);

    if (ok) {
      toast.show('Inventory changes saved and published to live website!', 'success');
    } else {
      toast.show('Failed to save changes. Please check browser storage.', 'error');
    }
  };

  // Revert unsaved edits back to currently stored
  const handleResetToSaved = () => {
    setWorkingCars(storedCars || DEFAULT_CARS);
    setWorkingRentals(storedRentals || DEFAULT_RENTALS);
    setWorkingParts(storedParts || DEFAULT_PARTS);
    setWorkingGallery(storedGallery || DEFAULT_GALLERY);
    setWorkingFaqs(storedFaqs || DEFAULT_FAQS);
    setWorkingCareers(storedCareers || DEFAULT_CAREERS);
    toast.show('Discarded unsaved inventory changes.', 'info');
  };

  // Reset active tab completely back to factory defaults
  const handleResetCurrentTabToDefaults = () => {
    setResetDefaultsDialogOpen(false);
    const key = `inventory.${activeTab}`;
    reset(key);

    if (activeTab === 'cars') setWorkingCars(DEFAULT_CARS);
    if (activeTab === 'rentals') setWorkingRentals(DEFAULT_RENTALS);
    if (activeTab === 'parts') setWorkingParts(DEFAULT_PARTS);
    if (activeTab === 'gallery') setWorkingGallery(DEFAULT_GALLERY);
    if (activeTab === 'faqs') setWorkingFaqs(DEFAULT_FAQS);
    if (activeTab === 'careers') setWorkingCareers(DEFAULT_CAREERS);

    toast.show(`Reset ${currentTabDef.label} back to initial defaults.`, 'success');
  };

  // Sidebar Preview Widget
  const previewWidget = (
    <div className="space-y-6">
      {/* Overview Card */}
      <AdminCard title="Inventory Summary">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            All inventory edits are synchronized live with the public site without changing any URLs.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isCurrent = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'border-[#015557] bg-emerald-50/60 ring-1 ring-[#015557]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <TabIcon className={`w-4 h-4 ${isCurrent ? 'text-[#015557]' : 'text-slate-400'}`} />
                    <span className="font-bold font-mono text-[11px] text-slate-700">
                      {counts[tab.key]}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-800 block truncate">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-600">
              <span>Active Tab:</span>
              <span className="font-bold text-slate-900">{currentTabDef.label}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Total Items:</span>
              <span className="font-bold text-slate-900">{counts[activeTab]}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Status:</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live on Website
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <a
              href={currentTabDef.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[40px] px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#015557] font-semibold flex items-center justify-center gap-2 transition-colors text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open {currentTabDef.publicLabel}</span>
            </a>
          </div>
        </div>
      </AdminCard>

      {/* Defaults Recovery Card */}
      <AdminCard title="Factory Defaults">
        <div className="space-y-3 text-xs text-slate-600">
          <p className="leading-relaxed">
            Need to restore the initial stock data for {currentTabDef.label}?
          </p>
          <button
            type="button"
            onClick={() => setResetDefaultsDialogOpen(true)}
            className="w-full min-h-[40px] px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
            <span>Restore {currentTabDef.label} Defaults</span>
          </button>
        </div>
      </AdminCard>
    </div>
  );

  return (
    <AdminScreenLayout
      title="Inventory & Catalog Manager"
      subtitle="Manage your cars for sale, rental fleet, auto parts, project gallery, FAQs, and job vacancies."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSaveAll}
      onReset={handleResetToSaved}
      isSaving={isSaving}
      saveLabel="Publish all changes"
      resetLabel="Discard edits"
      preview={previewWidget}
      previewTitle="Catalog Overview"
    >
      <div className="space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              const count = counts[tab.key];

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#015557] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Description Card */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#015557] flex items-center gap-2">
              <span>{currentTabDef.label}</span>
              <span className="text-xs font-normal text-slate-600">— {currentTabDef.description}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Reorder items using the arrows, toggle public visibility, or click to edit images, specs, and SEO details.
            </p>
          </div>
          <a
            href={currentTabDef.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#015557] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>Preview live page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Active Manager View */}
        {activeTab === 'cars' && (
          <CarManager cars={workingCars} onChange={setWorkingCars} />
        )}

        {activeTab === 'rentals' && (
          <RentalManager rentals={workingRentals} onChange={setWorkingRentals} />
        )}

        {activeTab === 'parts' && (
          <PartManager parts={workingParts} onChange={setWorkingParts} />
        )}

        {activeTab === 'gallery' && (
          <GalleryManager galleryItems={workingGallery} onChange={setWorkingGallery} />
        )}

        {activeTab === 'faqs' && (
          <FaqManager faqs={workingFaqs} onChange={setWorkingFaqs} />
        )}

        {activeTab === 'careers' && (
          <CareerManager careers={workingCareers} onChange={setWorkingCareers} />
        )}
      </div>

      {/* Factory Defaults Reset Confirmation */}
      <ConfirmDialog
        isOpen={resetDefaultsDialogOpen}
        title={`Restore ${currentTabDef.label} Defaults?`}
        description={`Are you sure you want to revert all ${currentTabDef.label} back to the initial website defaults? Any custom added items, reordering, and edits in this section will be replaced with default items.`}
        confirmLabel="Restore defaults"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleResetCurrentTabToDefaults}
        onCancel={() => setResetDefaultsDialogOpen(false)}
      />
    </AdminScreenLayout>
  );
}
