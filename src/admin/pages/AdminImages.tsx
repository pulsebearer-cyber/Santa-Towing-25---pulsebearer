import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Image as ImageIcon,
  Search,
  Filter,
  RefreshCw,
  RotateCcw,
  Check,
  AlertCircle,
  ExternalLink,
  Layers,
  Database,
  Eye,
  CheckCircle2,
  HardDrive,
  Sparkles,
  Sliders,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import UnifiedImageModal from '../components/UnifiedImageModal';
import { useAdminToast } from '../context/AdminToastContext';
import { useContentManager } from '@/context/ContentContext';
import { SITE_IMAGES, SiteImageDefinition } from '@/data/siteImagesData';
import { getStorageStats } from '@/lib/contentStorage';
import { formatFileSize } from '../lib/imageCompressor';

const PAGE_TABS = [
  'All',
  'Home',
  'Towing',
  'Haulage',
  'Rental',
  'Repairs',
  'Parts',
  'Blog',
  'Contact',
  'Careers',
  'Global',
] as const;

export default function AdminImages() {
  const toast = useAdminToast();
  const { get, saveMultiple, resetContent } = useContentManager();

  // Storage usage stats
  const [stats, setStats] = useState(getStorageStats());
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter tab
  const tabParam = searchParams.get('tab');
  const matchedTab = PAGE_TABS.find(
    (t) => t.toLowerCase() === (tabParam || '').toLowerCase()
  );
  const [activeTab, setActiveTabState] = useState<string>(matchedTab || 'All');

  useEffect(() => {
    const param = searchParams.get('tab');
    if (param) {
      const matched = PAGE_TABS.find(
        (t) => t.toLowerCase() === param.toLowerCase()
      );
      if (matched) {
        setActiveTabState(matched);
      }
    }
  }, [searchParams]);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    setSearchParams({ tab });
  };
  const [searchQuery, setSearchQuery] = useState('');

  // Working state for all image URLs and Alt texts
  const [imageMap, setImageMap] = useState<Record<string, { url: string; alt: string }>>(() => {
    const initial: Record<string, { url: string; alt: string }> = {};
    SITE_IMAGES.forEach((img) => {
      const savedUrl = get<string>(img.storageKey, img.defaultUrl);
      const savedAlt = get<string>(img.altStorageKey, img.defaultAlt);
      initial[img.id] = { url: savedUrl, alt: savedAlt };
    });
    return initial;
  });

  // Modal editor target
  const [activeModalItem, setActiveModalItem] = useState<SiteImageDefinition | null>(null);

  // Large preview target
  const [enlargedImage, setEnlargedImage] = useState<{ url: string; alt: string; name: string } | null>(null);

  // Reset confirmation state
  const [resetPendingItem, setResetPendingItem] = useState<SiteImageDefinition | null>(null);
  const [resetAllConfirmOpen, setResetAllConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    return SITE_IMAGES.some((img) => {
      const savedUrl = get<string>(img.storageKey, img.defaultUrl);
      const savedAlt = get<string>(img.altStorageKey, img.defaultAlt);
      const current = imageMap[img.id];
      if (!current) return false;
      return current.url !== savedUrl || current.alt !== savedAlt;
    });
  }, [imageMap, get]);

  // Warn before browser unload if edits exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Filtered images list
  const filteredImages = useMemo(() => {
    return SITE_IMAGES.filter((img) => {
      const matchesTab = activeTab === 'All' || img.page === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const current = imageMap[img.id] || { url: img.defaultUrl, alt: img.defaultAlt };
      const matchesSearch =
        !q ||
        img.name.toLowerCase().includes(q) ||
        img.page.toLowerCase().includes(q) ||
        img.usedIn.toLowerCase().includes(q) ||
        current.alt.toLowerCase().includes(q) ||
        current.url.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, imageMap]);

  // Save changes to content storage
  const handleSave = () => {
    // Validate that all alt texts are non-empty
    for (const img of SITE_IMAGES) {
      const entry = imageMap[img.id];
      if (entry && !entry.alt.trim()) {
        toast.error(`"${img.name}" requires Alt Text before saving.`);
        return;
      }
    }

    setIsSaving(true);
    setTimeout(() => {
      const entriesToSave: Record<string, string> = {};
      SITE_IMAGES.forEach((img) => {
        const entry = imageMap[img.id];
        if (entry) {
          entriesToSave[img.storageKey] = entry.url;
          entriesToSave[img.altStorageKey] = entry.alt;
        }
      });

      const success = saveMultiple(entriesToSave);
      setIsSaving(false);
      setStats(getStorageStats());

      if (success) {
        toast.success('All website images and alt tags updated live!');
      } else {
        toast.error('Failed to write changes to local storage.');
      }
    }, 300);
  };

  // Discard all unsaved changes
  const handleDiscardChanges = () => {
    const reverted: Record<string, { url: string; alt: string }> = {};
    SITE_IMAGES.forEach((img) => {
      const savedUrl = get<string>(img.storageKey, img.defaultUrl);
      const savedAlt = get<string>(img.altStorageKey, img.defaultAlt);
      reverted[img.id] = { url: savedUrl, alt: savedAlt };
    });
    setImageMap(reverted);
    toast.info('Discarded unsaved image edits.');
  };

  // Reset a single image back to original default
  const handleConfirmSingleReset = () => {
    if (!resetPendingItem) return;
    const img = resetPendingItem;
    setImageMap((prev) => ({
      ...prev,
      [img.id]: { url: img.defaultUrl, alt: img.defaultAlt },
    }));

    resetContent(img.storageKey);
    resetContent(img.altStorageKey);
    toast.info(`Restored "${img.name}" to factory default photo.`);
    setResetPendingItem(null);
    setStats(getStorageStats());
  };

  // Reset all to default
  const handleConfirmResetAll = () => {
    const defaults: Record<string, { url: string; alt: string }> = {};
    SITE_IMAGES.forEach((img) => {
      defaults[img.id] = { url: img.defaultUrl, alt: img.defaultAlt };
      resetContent(img.storageKey);
      resetContent(img.altStorageKey);
    });
    setImageMap(defaults);
    setResetAllConfirmOpen(false);
    toast.success('Restored all site photography and alt texts to factory originals.');
    setStats(getStorageStats());
  };

  // Callback from UnifiedImageModal when image is replaced
  const handleModalApply = (newUrl: string, newAlt: string) => {
    if (!activeModalItem) return;
    setImageMap((prev) => ({
      ...prev,
      [activeModalItem.id]: { url: newUrl, alt: newAlt },
    }));
    toast.success(`Updated photo for "${activeModalItem.name}". Remember to click "Save changes".`);
    setActiveModalItem(null);
  };

  // Quick inline alt text edit
  const handleAltChange = (id: string, newAlt: string) => {
    setImageMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], alt: newAlt },
    }));
  };

  return (
    <AdminScreenLayout
      title="Media & Images Dashboard"
      subtitle="Manage photography for towing fleets, rental vehicles, garage repairs, and homepage banners with upload compression and mandatory alt text."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSave}
      onReset={handleDiscardChanges}
      isSaving={isSaving}
      saveLabel="Save image changes"
      resetLabel="Discard changes"
      previewTitle="Selected Asset Simulator"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Asset Details &amp; Storage
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              {filteredImages.length} images shown
            </span>
          </div>

          {/* Storage usage meter */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                Browser Media Storage
              </span>
              <span className="font-mono font-bold text-slate-800">
                {stats.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  stats.percentage > 70 ? 'bg-amber-500' : 'bg-[#015557]'
                }`}
                style={{ width: `${Math.max(4, stats.percentage)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Uploaded photos are automatically compressed on your device for rapid loading.
            </p>
          </div>

          {/* Sample Active Preview */}
          {filteredImages.length > 0 && (
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Highlighted: {filteredImages[0].name}
              </span>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 relative">
                <img
                  src={imageMap[filteredImages[0].id]?.url || filteredImages[0].defaultUrl}
                  alt={imageMap[filteredImages[0].id]?.alt || filteredImages[0].defaultAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  {filteredImages[0].usedIn}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                  <strong>Alt:</strong> &ldquo;{imageMap[filteredImages[0].id]?.alt || filteredImages[0].defaultAlt}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Controls: Search, Tabs & Reset All */}
        <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images by name, vehicle, page, or alt text..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/admin/image-studio"
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-2xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Image Studio &amp; Crop</span>
              </Link>

              <button
                type="button"
                onClick={() => setResetAllConfirmOpen(true)}
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset all images</span>
              </button>
            </div>
          </div>

          {/* Grouped Page Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar" role="tablist">
            {PAGE_TABS.map((tab) => {
              const count =
                tab === 'All'
                  ? SITE_IMAGES.length
                  : SITE_IMAGES.filter((i) => i.page === tab).length;

              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#015557] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{tab}</span>
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
        </div>

        {/* Grid of Images */}
        {filteredImages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No images match your search</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for &ldquo;towing&rdquo;, &ldquo;corolla&rdquo;, &ldquo;battery&rdquo;, or switch page filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredImages.map((img) => {
              const current = imageMap[img.id] || { url: img.defaultUrl, alt: img.defaultAlt };
              const isDefault =
                current.url === img.defaultUrl && current.alt === img.defaultAlt;
              const hasMissingAlt = !current.alt.trim();

              return (
                <div
                  key={img.id}
                  className={`bg-white rounded-2xl border shadow-xs transition-all overflow-hidden flex flex-col justify-between ${
                    hasMissingAlt ? 'border-[#d80000] ring-1 ring-[#d80000]' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#015557] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                          {img.page}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[140px]">
                          {img.section}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 truncate max-w-[260px]">
                        {img.name}
                      </h3>
                    </div>

                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => setResetPendingItem(img)}
                        aria-label={`Reset ${img.name} to original`}
                        title="Reset to factory default"
                        className="p-1.5 text-slate-400 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Card Image Display */}
                  <div className="p-5 space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                      <img
                        src={current.url}
                        alt={current.alt || img.name}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-102"
                        loading="lazy"
                      />

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                        <button
                          type="button"
                          onClick={() => setActiveModalItem(img)}
                          className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Replace</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEnlargedImage({
                              url: current.url,
                              alt: current.alt,
                              name: img.name,
                            })
                          }
                          className="min-h-[40px] px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Zoom</span>
                        </button>
                      </div>

                      {/* Aspect ratio badge */}
                      <span className="absolute bottom-2 right-2 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {img.aspectRatio} &middot; {img.recommendedSize}
                      </span>
                    </div>

                    {/* WHERE IT IS USED (Required user feature) */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                        <Layers className="w-3 h-3 text-[#015557]" />
                        <span>Where this image is used:</span>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {img.usedIn}
                      </p>
                    </div>

                    {/* REQUIRED ALT TEXT FIELD */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <label
                          htmlFor={`alt-${img.id}`}
                          className="font-bold text-slate-800 flex items-center gap-1"
                        >
                          <span>Alt Text</span>
                          <span className="text-[#d80000]">* (Required)</span>
                        </label>
                        <span
                          className={`font-mono text-[10px] ${
                            current.alt.length > 120
                              ? 'text-amber-600 font-semibold'
                              : 'text-slate-400'
                          }`}
                        >
                          {current.alt.length} chars
                        </span>
                      </div>

                      <input
                        id={`alt-${img.id}`}
                        type="text"
                        value={current.alt}
                        onChange={(e) => handleAltChange(img.id, e.target.value)}
                        placeholder="Required description for screen readers and SEO..."
                        className={`w-full min-h-[40px] px-3.5 py-1.5 text-xs text-slate-900 bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] ${
                          hasMissingAlt
                            ? 'border-[#d80000] bg-red-50/20'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      />

                      {hasMissingAlt && (
                        <p className="text-[11px] font-semibold text-[#d80000] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Alt text cannot be empty. Needed for road user accessibility.</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(img)}
                      className="min-h-[40px] px-3.5 py-1.5 text-xs font-semibold text-[#015557] bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Replace photo</span>
                    </button>

                    <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
                      {isDefault ? 'Factory default' : 'Custom photo active'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Unified Image Modal for Replacing Photos */}
      {activeModalItem && (
        <UnifiedImageModal
          isOpen={!!activeModalItem}
          onClose={() => setActiveModalItem(null)}
          title={`Replace: ${activeModalItem.name}`}
          currentUrl={imageMap[activeModalItem.id]?.url || activeModalItem.defaultUrl}
          currentAlt={imageMap[activeModalItem.id]?.alt || activeModalItem.defaultAlt}
          onApply={handleModalApply}
          usedInHint={activeModalItem.usedIn}
          requireAlt={true}
        />
      )}

      {/* Large Image Zoom Modal */}
      {enlargedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs"
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">{enlargedImage.name}</span>
              <button
                type="button"
                onClick={() => setEnlargedImage(null)}
                className="text-slate-400 hover:text-slate-800 p-1 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                &times;
              </button>
            </div>
            <div className="p-3 flex items-center justify-center max-h-[72vh] overflow-auto">
              <img
                src={enlargedImage.url}
                alt={enlargedImage.alt}
                className="max-w-full max-h-[68vh] object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 text-center">
              Alt: &ldquo;{enlargedImage.alt}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Confirm Single Reset Dialog */}
      <ConfirmDialog
        isOpen={!!resetPendingItem}
        title={`Reset "${resetPendingItem?.name}"?`}
        description="This will restore the original Santa Towing photography asset and default alt text for this specific image."
        confirmLabel="Reset to original"
        cancelLabel="Keep custom"
        isDestructive={false}
        onConfirm={handleConfirmSingleReset}
        onCancel={() => setResetPendingItem(null)}
      />

      {/* Confirm Reset All Dialog */}
      <ConfirmDialog
        isOpen={resetAllConfirmOpen}
        title="Reset All Site Images to Defaults?"
        description="Are you sure you want to revert all images and alt texts across every page back to their initial factory defaults? Any custom uploaded or replaced photos will be removed."
        confirmLabel="Reset All to Originals"
        cancelLabel="Cancel"
        isDestructive={false}
        onConfirm={handleConfirmResetAll}
        onCancel={() => setResetAllConfirmOpen(false)}
      />
    </AdminScreenLayout>
  );
}
