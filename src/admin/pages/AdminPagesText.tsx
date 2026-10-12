import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Link2,
  Phone,
  MessageCircle,
  Tag,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  FolderOpen,
  MapPin,
  ExternalLink,
  Edit2,
  X,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import CollapsibleSection from '../components/CollapsibleSection';
import AdminField from '../components/AdminField';
import AdminToggle from '../components/AdminToggle';
import AdminImagePicker from '../components/AdminImagePicker';
import UnifiedImageModal from '../components/UnifiedImageModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminToast } from '../context/AdminToastContext';
import { useContentManager, getByDotPath } from '@/context/ContentContext';
import defaultSiteContent from '@/data/site-content.json';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blogData';
import { HERO_SLIDES, QUICK_ACTIONS, SERVICES } from '@/data/mockData';

// Prominent service areas routes
const POPULAR_SERVICE_AREAS = [
  { slug: 'accra', label: 'Accra Metropolitan', defaultHeading: '24/7 Emergency Towing in Accra', defaultDescription: 'Prompt flatbed towing and accident recovery across all suburbs in Accra.' },
  { slug: 'tema', label: 'Tema & Industrial Port', defaultHeading: 'Heavy Haulage & Towing in Tema', defaultDescription: 'Port container transport and industrial machine towing in Tema.' },
  { slug: 'kumasi', label: 'Kumasi Ashanti Hub', defaultHeading: '24/7 Towing Services in Kumasi', defaultDescription: 'Rapid breakdown assistance and highway recovery across Kumasi and Kejetia.' },
  { slug: 'accra-to-kumasi', label: 'Accra to Kumasi Highway', defaultHeading: 'Accra to Kumasi Highway Recovery', defaultDescription: 'Inter-city towing corridor covering Suhum, Nkawkaw, Konongo, and Ejisu.' },
  { slug: 'accra-to-takoradi', label: 'Accra to Takoradi Corridor', defaultHeading: 'Accra to Takoradi Coastal Towing', defaultDescription: 'Emergency vehicle transport along Winneba, Mankessim, Cape Coast, and Takoradi.' },
  { slug: 'accra-to-cape-coast', label: 'Accra to Cape Coast', defaultHeading: 'Accra to Cape Coast Towing Service', defaultDescription: 'Dependable highway towing and roadside assistance along the Central coast.' },
  { slug: 'tamale', label: 'Tamale & Northern Region', defaultHeading: 'Towing & Recovery in Tamale', defaultDescription: 'Northern regional commercial haulage and emergency breakdown assistance.' },
  { slug: 'koforidua', label: 'Koforidua Eastern Hub', defaultHeading: 'Koforidua Towing & Auto Support', defaultDescription: 'Flatbed recovery in Koforidua, Aburi, and Akropong mountain passes.' },
  { slug: 'spintex', label: 'Spintex Road Corridor', defaultHeading: 'Rapid Towing on Spintex Road', defaultDescription: 'Under 20-minute local dispatch on Spintex Road and East Legon.' },
];

const DEFAULT_FAQS = [
  { id: '1', category: 'Towing', q: 'What is your average response time for emergency towing?', a: 'Within Greater Accra and Kumasi, we average 20-35 minutes. Other highway corridors depend on real-time traffic and distance.' },
  { id: '2', category: 'Towing', q: 'What areas do your towing services cover?', a: 'We offer 24/7 nationwide coverage across all 16 regions in Ghana with owned flatbeds and heavy winch cranes.' },
  { id: '3', category: 'Towing', q: 'How much does a standard tow cost in Accra?', a: 'Our base local rate starts at GH₵ 250 within city limits. We provide guaranteed upfront pricing before dispatching.' },
  { id: '4', category: 'Rentals', q: 'What are the eligibility requirements to rent a car?', a: 'You must be at least 21 years old, have a valid driver license, and provide a valid ID with mobile money or card deposit.' },
  { id: '5', category: 'Repairs', q: 'Do you offer a warranty on vehicle repairs?', a: 'Yes, all mechanical repairs come with a minimum 6-month or 10,000 km warranty, and up to 2 years on genuine OEM parts.' },
  { id: '6', category: 'Sales', q: 'Are your cars inspected before sale?', a: 'Every vehicle undergoes a comprehensive 150-point mechanical, electrical, and structural inspection before listing.' },
];

export default function AdminPagesText() {
  const toast = useAdminToast();
  const { get, saveMultiple, resetContent } = useContentManager();

  // Pages tabs
  const PAGES = [
    'Home',
    'Towing',
    'Haulage',
    'Rental',
    'Sales',
    'Repairs',
    'Body Works',
    'Parts',
    'Service Areas',
    'Blog',
    'Contact',
    'Careers',
    'FAQs',
    'Policies',
  ] as const;

  type PageType = typeof PAGES[number];
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const matchedPage = PAGES.find(
    (p) => p.toLowerCase() === (pageParam || '').toLowerCase()
  );
  const [activePage, setActivePageState] = useState<PageType>(matchedPage || 'Home');
  const [pendingPageSwitch, setPendingPageSwitch] = useState<PageType | null>(null);

  useEffect(() => {
    const param = searchParams.get('page');
    if (param) {
      const matched = PAGES.find(
        (p) => p.toLowerCase() === param.toLowerCase()
      );
      if (matched) {
        setActivePageState(matched);
      }
    }
  }, [searchParams]);

  const setActivePage = (page: PageType) => {
    setActivePageState(page);
    setSearchParams({ page });
  };

  // Search box across all text
  const [searchText, setSearchText] = useState('');

  // Working state for text values (key => value)
  const [edits, setEdits] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Blog posts list state
  const savedBlogPosts = useMemo(() => {
    return get<any[]>('blog.posts', BLOG_POSTS);
  }, [get]);
  const [blogPosts, setBlogPosts] = useState<any[]>(savedBlogPosts);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [postDeletePending, setPostDeletePending] = useState<any | null>(null);

  // FAQ items list state
  const savedFaqs = useMemo(() => {
    return get<any[]>('inventory.faqs', get<any[]>('faqs.items', DEFAULT_FAQS));
  }, [get]);
  const [faqs, setFaqs] = useState<any[]>(savedFaqs);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [faqDeletePending, setFaqDeletePending] = useState<any | null>(null);

  // Selected Service Area for individual editing
  const [selectedAreaSlug, setSelectedAreaSlug] = useState('accra');

  // Unified image modal for image fields in Pages & Text
  const [activeImagePicker, setActiveImagePicker] = useState<{
    key: string;
    label: string;
    url: string;
    altKey?: string;
    alt?: string;
    usedIn?: string;
  } | null>(null);

  // Single field reset confirmation
  const [singleResetPending, setSingleResetPending] = useState<{ key: string; label: string; defaultVal: any } | null>(null);

  // Helper to read current value (working edits > stored content > default json)
  const getValue = (key: string, fallback: any = ''): any => {
    if (key in edits) {
      return edits[key];
    }
    const fromStorage = get(key, undefined);
    if (fromStorage !== undefined) {
      return fromStorage;
    }
    const fromDefault = getByDotPath(defaultSiteContent, key);
    if (fromDefault !== undefined) {
      return fromDefault;
    }
    return fallback;
  };

  // Helper to get default value from defaultSiteContent
  const getDefaultValue = (key: string, fallback: any = ''): any => {
    const fromDefault = getByDotPath(defaultSiteContent, key);
    return fromDefault !== undefined ? fromDefault : fallback;
  };

  // Set field value into working edits
  const handleFieldChange = (key: string, value: any) => {
    setEdits((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Check if there are unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    if (Object.keys(edits).length > 0) return true;
    if (JSON.stringify(blogPosts) !== JSON.stringify(savedBlogPosts)) return true;
    if (JSON.stringify(faqs) !== JSON.stringify(savedFaqs)) return true;
    return false;
  }, [edits, blogPosts, savedBlogPosts, faqs, savedFaqs]);

  // Warn before browser tab navigation/close if edits exist
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

  // Safe page switcher with unsaved edits confirmation
  const handleSelectPage = (targetPage: PageType) => {
    if (targetPage === activePage) return;
    if (hasUnsavedChanges) {
      setPendingPageSwitch(targetPage);
    } else {
      setActivePage(targetPage);
    }
  };

  // Confirm discard when switching tabs
  const handleConfirmDiscardAndSwitch = () => {
    if (pendingPageSwitch) {
      setEdits({});
      setBlogPosts(savedBlogPosts);
      setFaqs(savedFaqs);
      setActivePage(pendingPageSwitch);
      setPendingPageSwitch(null);
      toast.info('Discarded unsaved edits and switched pages.');
    }
  };

  // Save all edits to storage
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const payload: Record<string, any> = { ...edits };

      // Also persist blog posts and FAQs
      payload['blog.posts'] = blogPosts;
      payload['faqs.items'] = faqs;
      payload['inventory.faqs'] = faqs;

      const success = saveMultiple(payload);
      setIsSaving(false);

      if (success) {
        setEdits({});
        toast.success(`Saved! All changes for ${activePage} and related sections are live.`);
      } else {
        toast.error('Failed to save edits to browser storage.');
      }
    }, 350);
  };

  // Discard all unsaved edits for current session
  const handleDiscardAll = () => {
    setEdits({});
    setBlogPosts(savedBlogPosts);
    setFaqs(savedFaqs);
    toast.info('Discarded all unsaved edits.');
  };

  // Single field reset execution
  const executeFieldReset = () => {
    if (!singleResetPending) return;
    const { key, label, defaultVal } = singleResetPending;
    // Remove from working edits
    setEdits((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    // Remove from storage
    resetContent(key);
    toast.info(`Reset "${label}" back to original text.`);
    setSingleResetPending(null);
  };

  // Search indexing: gather all searchable fields across the entire site
  const searchableEntries = useMemo(() => {
    const list: Array<{
      key: string;
      label: string;
      page: PageType;
      section: string;
      currentValue: string;
    }> = [
      // Home
      { key: 'seo.home.title', label: 'Home SEO Title', page: 'Home', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.home.title')) },
      { key: 'seo.home.description', label: 'Home SEO Description', page: 'Home', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.home.description')) },
      { key: 'home.hero.slides.0.headline', label: 'Hero Slide 1 Headline', page: 'Home', section: 'Hero Carousel & Emergency Banner', currentValue: String(getValue('home.hero.slides.0.headline')) },
      { key: 'home.hero.slides.0.subheadline', label: 'Hero Slide 1 Subheadline', page: 'Home', section: 'Hero Carousel & Emergency Banner', currentValue: String(getValue('home.hero.slides.0.subheadline')) },
      { key: 'home.about.heading', label: 'About Us Heading', page: 'Home', section: 'About & Company Overview', currentValue: String(getValue('home.about.heading')) },
      { key: 'home.about.p1', label: 'About Us Paragraph 1', page: 'Home', section: 'About & Company Overview', currentValue: String(getValue('home.about.p1')) },
      { key: 'home.servicesSection.heading', label: 'Services Showcase Heading', page: 'Home', section: 'Automotive Services Grid', currentValue: String(getValue('home.servicesSection.heading')) },
      { key: 'home.haulage.heading', label: 'Haulage Teaser Heading', page: 'Home', section: 'Heavy Haulage Showcase', currentValue: String(getValue('home.haulage.heading')) },
      { key: 'home.whyChooseUs.heading', label: 'Why Choose Us Heading', page: 'Home', section: 'Why Choose Us Section', currentValue: String(getValue('home.whyChooseUs.heading')) },
      { key: 'home.bottomSections.appHeading', label: 'Mobile App Heading', page: 'Home', section: 'Mobile App & Emergency Bar', currentValue: String(getValue('home.bottomSections.appHeading')) },

      // Towing
      { key: 'seo.towing.title', label: 'Towing SEO Title', page: 'Towing', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.towing.title')) },
      { key: 'seo.towing.description', label: 'Towing SEO Description', page: 'Towing', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.towing.description')) },
      { key: 'towing.title', label: 'Towing Page Title', page: 'Towing', section: 'Header & Emergency Hotline', currentValue: String(getValue('towing.title')) },
      { key: 'towing.description', label: 'Towing Page Description', page: 'Towing', section: 'Header & Emergency Hotline', currentValue: String(getValue('towing.description')) },
      { key: 'towing.averageTime', label: 'Towing Response Guarantee', page: 'Towing', section: 'Arrival Time & Pricing Calculator', currentValue: String(getValue('towing.averageTime')) },

      // Haulage
      { key: 'seo.haulage.title', label: 'Haulage SEO Title', page: 'Haulage', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.haulage.title')) },
      { key: 'haulage.title', label: 'Haulage Header Title', page: 'Haulage', section: 'Heavy Transport Header', currentValue: String(getValue('haulage.title')) },
      { key: 'haulage.description', label: 'Haulage Description', page: 'Haulage', section: 'Heavy Transport Header', currentValue: String(getValue('haulage.description')) },

      // Rental
      { key: 'seo.rental.title', label: 'Rental SEO Title', page: 'Rental', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.rental.title')) },
      { key: 'rental.title', label: 'Rental Header Title', page: 'Rental', section: 'Fleet Rental Header', currentValue: String(getValue('rental.title')) },
      { key: 'rental.description', label: 'Rental Description', page: 'Rental', section: 'Fleet Rental Header', currentValue: String(getValue('rental.description')) },

      // Sales
      { key: 'seo.sales.title', label: 'Sales SEO Title', page: 'Sales', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.sales.title')) },
      { key: 'sales.title', label: 'Sales Header Title', page: 'Sales', section: 'Vehicle Sales Header', currentValue: String(getValue('sales.title')) },
      { key: 'sales.description', label: 'Sales Description', page: 'Sales', section: 'Vehicle Sales Header', currentValue: String(getValue('sales.description')) },

      // Repairs
      { key: 'seo.repairs.title', label: 'Repairs SEO Title', page: 'Repairs', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.repairs.title')) },
      { key: 'repairs.title', label: 'Repairs Header Title', page: 'Repairs', section: 'Garage Repairs Header', currentValue: String(getValue('repairs.title')) },
      { key: 'repairs.description', label: 'Repairs Description', page: 'Repairs', section: 'Garage Repairs Header', currentValue: String(getValue('repairs.description')) },

      // Body Works
      { key: 'seo.bodyWorks.title', label: 'Body Works SEO Title', page: 'Body Works', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.bodyWorks.title')) },
      { key: 'bodyWorks.title', label: 'Body Works Header Title', page: 'Body Works', section: 'Body Shop Header', currentValue: String(getValue('bodyWorks.title')) },
      { key: 'bodyWorks.description', label: 'Body Works Description', page: 'Body Works', section: 'Body Shop Header', currentValue: String(getValue('bodyWorks.description')) },

      // Parts
      { key: 'seo.parts.title', label: 'Parts SEO Title', page: 'Parts', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.parts.title')) },
      { key: 'parts.title', label: 'Parts Header Title', page: 'Parts', section: 'Genuine Parts Header', currentValue: String(getValue('parts.title')) },
      { key: 'parts.description', label: 'Parts Description', page: 'Parts', section: 'Genuine Parts Header', currentValue: String(getValue('parts.description')) },

      // Service Areas
      { key: 'serviceAreas.title', label: 'Service Areas Directory Title', page: 'Service Areas', section: 'Shared Directory & Corridor Template', currentValue: String(getValue('serviceAreas.title')) },
      { key: 'serviceAreas.template.ctaHeading', label: 'Shared Area CTA Heading', page: 'Service Areas', section: 'Shared Directory & Corridor Template', currentValue: String(getValue('serviceAreas.template.ctaHeading')) },

      // Blog
      { key: 'seo.blog.title', label: 'Blog SEO Title', page: 'Blog', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.blog.title')) },
      { key: 'blog.title', label: 'Blog Header Title', page: 'Blog', section: 'Blog Header Banner', currentValue: String(getValue('blog.title')) },
      { key: 'blog.description', label: 'Blog Description', page: 'Blog', section: 'Blog Header Banner', currentValue: String(getValue('blog.description')) },

      // Contact
      { key: 'seo.contact.title', label: 'Contact SEO Title', page: 'Contact', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.contact.title')) },
      { key: 'contact.title', label: 'Contact Header Title', page: 'Contact', section: 'Contact Info & Hours', currentValue: String(getValue('contact.title')) },
      { key: 'contact.address', label: 'Workshop Physical Address', page: 'Contact', section: 'Contact Info & Hours', currentValue: String(getValue('contact.address')) },

      // Careers
      { key: 'seo.careers.title', label: 'Careers SEO Title', page: 'Careers', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.careers.title')) },
      { key: 'careers.title', label: 'Careers Header Title', page: 'Careers', section: 'Careers Recruitment Header', currentValue: String(getValue('careers.title')) },

      // FAQs
      { key: 'seo.faqs.title', label: 'FAQs SEO Title', page: 'FAQs', section: 'Search Engine Optimization (SEO)', currentValue: String(getValue('seo.faqs.title')) },
      { key: 'faqs.title', label: 'FAQs Header Title', page: 'FAQs', section: 'Frequently Asked Questions Header', currentValue: String(getValue('faqs.title')) },

      // Policies
      { key: 'policies.privacy.title', label: 'Privacy Policy Title', page: 'Policies', section: 'Legal & Customer Policies', currentValue: String(getValue('policies.privacy.title')) },
      { key: 'policies.terms.title', label: 'Terms & Conditions Title', page: 'Policies', section: 'Legal & Customer Policies', currentValue: String(getValue('policies.terms.title')) },
      { key: 'policies.towingTerms.title', label: 'Towing Service Terms Title', page: 'Policies', section: 'Legal & Customer Policies', currentValue: String(getValue('policies.towingTerms.title')) },
    ];
    return list;
  }, [edits, get]);

  // Filter search results
  const searchResults = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return [];
    return searchableEntries.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.currentValue.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.page.toLowerCase().includes(q)
    );
  }, [searchText, searchableEntries]);

  // Jump to field from search result
  const handleJumpToSearchMatch = (item: (typeof searchableEntries)[0]) => {
    setActivePage(item.page);
    setSearchText('');
    toast.info(`Jumped to ${item.page} &rarr; ${item.section}`);
  };

  /**
   * Reusable Custom Input Component with:
   * - Character counter
   * - Plain-English label & short help text
   * - "Reset to original" button per field
   */
  const EditableField = ({
    storageKey,
    label,
    helpText,
    type = 'text',
    rows = 3,
    recommendedLimit,
    placeholder,
  }: {
    storageKey: string;
    label: string;
    helpText?: string;
    type?: 'text' | 'textarea';
    rows?: number;
    recommendedLimit?: number;
    placeholder?: string;
  }) => {
    const defaultVal = getDefaultValue(storageKey, '');
    const currentVal = getValue(storageKey, defaultVal);
    const isModified = storageKey in edits;
    const strVal = String(currentVal ?? '');
    const charCount = strVal.length;

    const isOverLimit = recommendedLimit && charCount > recommendedLimit;

    return (
      <div className="space-y-1.5 p-3.5 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-xs font-bold text-slate-800">
            {label}
          </label>

          <div className="flex items-center gap-2">
            {/* Character counter */}
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                isOverLimit
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'text-slate-400 bg-white border border-slate-200'
              }`}
            >
              {charCount}
              {recommendedLimit ? ` / ${recommendedLimit} max` : ' chars'}
            </span>

            {/* Reset to original per field */}
            <button
              type="button"
              onClick={() =>
                setSingleResetPending({
                  key: storageKey,
                  label,
                  defaultVal,
                })
              }
              aria-label={`Reset ${label} to original`}
              title="Reset this field to original text"
              className={`min-h-[32px] px-2 py-0.5 text-[11px] font-semibold rounded flex items-center gap-1 transition-colors ${
                isModified
                  ? 'text-[#015557] bg-emerald-100/80 hover:bg-emerald-200'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isModified ? 'Undo edit' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {type === 'textarea' ? (
          <textarea
            rows={rows}
            value={strVal}
            onChange={(e) => handleFieldChange(storageKey, e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          />
        ) : (
          <input
            type="text"
            value={strVal}
            onChange={(e) => handleFieldChange(storageKey, e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[40px] px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          />
        )}

        {helpText && (
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {helpText}
          </p>
        )}
      </div>
    );
  };

  return (
    <AdminScreenLayout
      title="Pages &amp; Text Dashboard"
      subtitle="Edit headlines, body paragraphs, call-to-action buttons, FAQs, and search engine titles across all public pages."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSave}
      onReset={handleDiscardAll}
      isSaving={isSaving}
      saveLabel="Save all text changes"
      resetLabel="Discard edits"
      previewTitle={`${activePage} Page Simulator`}
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              {activePage} Preview
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              Live Content Preview
            </span>
          </div>

          {/* Quick simulated preview of active page headline & SEO */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Google Search Snippet Preview
            </span>
            <p className="text-xs font-bold text-[#015557] hover:underline cursor-pointer truncate">
              {String(getValue(`seo.${activePage.toLowerCase().replace(/\s+/g, '')}.title`, 'Santa Towing & Garage Services Ltd.'))}
            </p>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              {String(getValue(`seo.${activePage.toLowerCase().replace(/\s+/g, '')}.description`, 'Expert 24/7 emergency towing, flatbed recovery, auto repairs, and car rentals across Ghana.'))}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Page Header
            </span>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              {activePage === 'Home'
                ? String(getValue('home.hero.slides.0.headline', '24/7 Emergency Towing Services'))
                : String(getValue(`${activePage.toLowerCase().replace(/\s+/g, '')}.title`, `${activePage} Services`))}
            </h3>
            <p className="text-xs text-slate-600 line-clamp-3">
              {activePage === 'Home'
                ? String(getValue('home.hero.slides.0.subheadline', 'Fast response, safe car transport, and nationwide roadside assistance.'))
                : String(getValue(`${activePage.toLowerCase().replace(/\s+/g, '')}.description`, 'Professional automotive solutions by Santa Towing.'))}
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Global Text Search Box */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search all text across headlines, buttons, FAQs, and SEO fields..."
              className="w-full min-h-[44px] pl-10 pr-10 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:bg-white"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown / Preview */}
          {searchText.trim() && (
            <div className="space-y-2 pt-2 border-t border-slate-100 max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Found {searchResults.length} matching text fields:</span>
                <span className="text-[11px] text-slate-400">Click to jump directly</span>
              </div>
              {searchResults.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No matching text found.</p>
              ) : (
                <div className="space-y-1.5">
                  {searchResults.map((res) => (
                    <button
                      key={res.key}
                      type="button"
                      onClick={() => handleJumpToSearchMatch(res)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-[#015557] bg-slate-50 hover:bg-emerald-50/50 text-left transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#015557] bg-white px-2 py-0.5 rounded border border-emerald-200">
                            {res.page}
                          </span>
                          <span className="text-xs font-semibold text-slate-800 truncate">
                            {res.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          &ldquo;{res.currentValue}&rdquo;
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Page Selector Tabs */}
          <div className="pt-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Page To Edit:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {PAGES.map((pageName) => {
                const isActive = activePage === pageName;
                return (
                  <button
                    key={pageName}
                    type="button"
                    onClick={() => handleSelectPage(pageName)}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#015557] text-white shadow-xs scale-102'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {pageName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PAGE 1: HOME */}
        {/* ============================================================== */}
        {activePage === 'Home' && (
          <div className="space-y-5">
            {/* SEO Section */}
            <CollapsibleSection title="Search Engine Optimization (SEO)" description="Title tag and meta description shown in Google search results" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.home.title" label="Search Engine Title" helpText="The main title displayed in Google search results and browser tabs." recommendedLimit={60} />
                <EditableField storageKey="seo.home.description" label="Search Engine Description" helpText="Summary snippet displayed under the title in Google search results." type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            {/* Hero Carousel Slides Section */}
            <CollapsibleSection title="Hero Carousel & Emergency Banner" description="5 rotating promotional slides with headlines, call buttons, and photos" defaultOpen={true}>
              <div className="space-y-5 pt-2">
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed">
                  <strong>Tip:</strong> Slides automatically rotate on the homepage. Edit headlines, subheadings, call button labels, or replace photos with required alt text.
                </div>

                {[0, 1, 2, 3, 4].map((slideIndex) => (
                  <div key={slideIndex} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900">
                        Slide {slideIndex + 1}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {slideIndex === 0 ? 'Primary 24/7 Emergency Towing' : slideIndex === 1 ? 'Accident Recovery' : slideIndex === 2 ? 'Flatbed Transport' : slideIndex === 3 ? 'Car Rentals' : 'Auto Repairs'}
                      </span>
                    </div>

                    <EditableField storageKey={`home.hero.slides.${slideIndex}.headline`} label="Headline" helpText="Primary title rendered in bold white text over the hero image." recommendedLimit={60} />
                    <EditableField storageKey={`home.hero.slides.${slideIndex}.subheadline`} label="Subheadline / Paragraph" helpText="Descriptive subtitle explaining the service guarantee." type="textarea" rows={2} recommendedLimit={140} />

                    {/* Image Picker for this slide */}
                    <div className="pt-2">
                      <AdminImagePicker
                        label={`Slide ${slideIndex + 1} Background Image`}
                        value={getValue(`home.hero.slides.${slideIndex}.image`, HERO_SLIDES[slideIndex]?.image || '')}
                        onChange={(newUrl, newAlt) => {
                          handleFieldChange(`home.hero.slides.${slideIndex}.image`, newUrl);
                          if (newAlt) handleFieldChange(`home.hero.slides.${slideIndex}.imageAlt`, newAlt);
                        }}
                        altText={getValue(`home.hero.slides.${slideIndex}.imageAlt`, `Slide ${slideIndex + 1} recovery photo`)}
                        onAltChange={(newAlt) => handleFieldChange(`home.hero.slides.${slideIndex}.imageAlt`, newAlt)}
                        usedInHint={`Used in: Homepage Hero Carousel Slide ${slideIndex + 1}`}
                        requireAlt={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* About Us Section */}
            <CollapsibleSection title="About & Company Overview Section" description="Introductory heading, badge, paragraphs, and buttons on the homepage" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="home.about.badge" label="Top Badge Label" helpText="Small pill label above the main heading (e.g. 'Welcome to Santa Towing')." />
                <EditableField storageKey="home.about.heading" label="Main Heading" helpText="Large authoritative heading for the company introduction." recommendedLimit={70} />
                <EditableField storageKey="home.about.p1" label="Intro Paragraph 1" helpText="First paragraph describing Santa Towing experience and services." type="textarea" rows={3} />
                <EditableField storageKey="home.about.p2" label="Intro Paragraph 2" helpText="Second paragraph focusing on customer trust and affordability." type="textarea" rows={3} />
                <EditableField storageKey="home.about.discoverBtn" label="Primary Button Label" helpText="Button linking visitors to the full services directory." />
                <EditableField storageKey="home.about.callBtn" label="Call Button Label" helpText="Button that dials the 24/7 hotline." />
              </div>
            </CollapsibleSection>

            {/* Services Showcase */}
            <CollapsibleSection title="Automotive Services Showcase" description="Heading and description for the 9-service preview grid" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="home.servicesSection.heading" label="Section Heading" />
                <EditableField storageKey="home.servicesSection.description" label="Section Description" type="textarea" rows={2} />
                <EditableField storageKey="home.servicesSection.viewAllBtn" label="View All Button Label" />
              </div>
            </CollapsibleSection>

            {/* Haulage Teaser */}
            <CollapsibleSection title="Heavy Haulage Showcase" description="Headlines and button labels for the heavy equipment haulage banner" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="home.haulage.badge" label="Badge" />
                <EditableField storageKey="home.haulage.heading" label="Heading" />
                <EditableField storageKey="home.haulage.description" label="Description" type="textarea" rows={3} />
                <EditableField storageKey="home.haulage.ctaCall" label="Call Button Label" />
                <EditableField storageKey="home.haulage.ctaWhatsApp" label="WhatsApp Button Label" />
              </div>
            </CollapsibleSection>

            {/* Why Choose Us */}
            <CollapsibleSection title="Why Choose Us & Emergency Roadside Bar" description="Trust commitments, warranty guarantees, and immediate assistance banner" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="home.whyChooseUs.badge" label="Badge" />
                <EditableField storageKey="home.whyChooseUs.heading" label="Heading" />
                <EditableField storageKey="home.whyChooseUs.description" label="Description" type="textarea" rows={3} />
                <EditableField storageKey="home.whyChooseUs.bannerHeading" label="Emergency Callout Banner Heading" />
                <EditableField storageKey="home.whyChooseUs.bannerSubtext" label="Emergency Callout Banner Subtext" type="textarea" rows={2} />
                <EditableField storageKey="home.whyChooseUs.requestOnlineBtn" label="Online Request Button Label" />
              </div>
            </CollapsibleSection>

            {/* Mobile App & Emergency Bottom Bar */}
            <CollapsibleSection title="Mobile Dispatch App & Bottom Urgency Bar" description="Roadside rescue app promotional text and footer dispatch banner" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="home.bottomSections.appHeading" label="Mobile App Headline" />
                <EditableField storageKey="home.bottomSections.appDescription" label="Mobile App Description" type="textarea" rows={3} />
                <EditableField storageKey="home.bottomSections.ctaBannerHeading" label="Bottom Urgent Dispatch Headline" />
                <EditableField storageKey="home.bottomSections.ctaBannerDescription" label="Bottom Urgent Dispatch Description" type="textarea" rows={2} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 2: TOWING */}
        {/* ============================================================== */}
        {activePage === 'Towing' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.towing.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.towing.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Towing Header & Emergency Hotline" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="towing.badge" label="Header Badge" />
                <EditableField storageKey="towing.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="towing.description" label="Page Description" type="textarea" rows={3} />
                <EditableField storageKey="towing.hotline" label="Direct Towing Hotline" helpText="The telephone number dialed for immediate towing dispatch." />
                <EditableField storageKey="towing.averageTime" label="Average Arrival Time Guarantee" helpText="Response time text displayed prominently (e.g. '15-30 Min Arrival Time')." />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Instant Towing Rate Calculator & Quote" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="towing.calculatorTitle" label="Rate Calculator Title" />
                <EditableField storageKey="towing.quoteHeading" label="Quote Request Heading" />
                <EditableField storageKey="towing.quoteSubheading" label="Quote Request Subheading" type="textarea" rows={2} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 3: HAULAGE */}
        {/* ============================================================== */}
        {activePage === 'Haulage' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.haulage.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.haulage.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Heavy Haulage Header & Callouts" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="haulage.badge" label="Header Badge" />
                <EditableField storageKey="haulage.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="haulage.description" label="Page Description" type="textarea" rows={3} />
                <EditableField storageKey="haulage.callCta" label="Call Button Label" />
                <EditableField storageKey="haulage.whatsappCta" label="WhatsApp Button Label" />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 4: RENTAL */}
        {/* ============================================================== */}
        {activePage === 'Rental' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.rental.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.rental.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Rental Fleet Header & Info" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="rental.badge" label="Header Badge" />
                <EditableField storageKey="rental.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="rental.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 5: SALES */}
        {/* ============================================================== */}
        {activePage === 'Sales' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.sales.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.sales.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Car Sales Header" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="sales.badge" label="Header Badge" />
                <EditableField storageKey="sales.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="sales.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 6: REPAIRS */}
        {/* ============================================================== */}
        {activePage === 'Repairs' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.repairs.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.repairs.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Garage Repairs & Diagnostics Header" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="repairs.badge" label="Header Badge" />
                <EditableField storageKey="repairs.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="repairs.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 7: BODY WORKS */}
        {/* ============================================================== */}
        {activePage === 'Body Works' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.bodyWorks.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.bodyWorks.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Auto Body Works & Spraying Header" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="bodyWorks.badge" label="Header Badge" />
                <EditableField storageKey="bodyWorks.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="bodyWorks.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 8: PARTS */}
        {/* ============================================================== */}
        {activePage === 'Parts' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.parts.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.parts.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Genuine Auto Parts Header" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="parts.badge" label="Header Badge" />
                <EditableField storageKey="parts.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="parts.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 9: SERVICE AREAS (Shared template + Individual areas) */}
        {/* ============================================================== */}
        {activePage === 'Service Areas' && (
          <div className="space-y-5">
            <CollapsibleSection title="Shared Service Area Template" description="Global headings and CTA labels applied across all 100+ town and highway routes" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="serviceAreas.title" label="Main Directory Title" />
                <EditableField storageKey="serviceAreas.description" label="Directory Description" type="textarea" rows={2} />
                <EditableField storageKey="serviceAreas.template.ctaHeading" label="Bottom Emergency CTA Title" helpText="e.g. 'Need Immediate Assistance?'" />
                <EditableField storageKey="serviceAreas.template.ctaSubtext" label="Bottom Emergency CTA Subtitle" helpText="e.g. 'Call or WhatsApp us now to book your tow.'" />
                <EditableField storageKey="serviceAreas.template.callButton" label="Call Now Button Label" />
                <EditableField storageKey="serviceAreas.template.whatsappButton" label="WhatsApp Button Label" />
                <EditableField storageKey="serviceAreas.template.prevAreaLabel" label="Previous Route Button Label" />
                <EditableField storageKey="serviceAreas.template.nextAreaLabel" label="Next Route Button Label" />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Individual Area & Corridor Customizer" description="Customize headlines and local descriptions for specific towns or highway routes" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Select Service Area or Route:
                  </label>
                  <select
                    value={selectedAreaSlug}
                    onChange={(e) => setSelectedAreaSlug(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  >
                    {POPULAR_SERVICE_AREAS.map((area) => (
                      <option key={area.slug} value={area.slug}>
                        {area.label} (/service-areas/{area.slug})
                      </option>
                    ))}
                  </select>
                </div>

                {(() => {
                  const currArea = POPULAR_SERVICE_AREAS.find((a) => a.slug === selectedAreaSlug) || POPULAR_SERVICE_AREAS[0];
                  return (
                    <div className="space-y-4 p-4 bg-white rounded-xl border border-slate-200">
                      <EditableField
                        storageKey={`serviceAreas.pages.${currArea.slug}.heading`}
                        label={`${currArea.label} Heading`}
                        placeholder={currArea.defaultHeading}
                        helpText="Heading shown when a customer visits this specific town/route page."
                      />
                      <EditableField
                        storageKey={`serviceAreas.pages.${currArea.slug}.description`}
                        label={`${currArea.label} Description`}
                        placeholder={currArea.defaultDescription}
                        type="textarea"
                        rows={3}
                        helpText="Detailed local response time and road coverage description."
                      />
                    </div>
                  );
                })()}
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 10: BLOG (with Blog Post Manager) */}
        {/* ============================================================== */}
        {activePage === 'Blog' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.blog.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.blog.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Blog Header Banner" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="blog.badge" label="Header Badge" />
                <EditableField storageKey="blog.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="blog.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>

            {/* BLOG POST MANAGER (Required) */}
            <CollapsibleSection
              title="Blog Post Manager"
              description={`Manage all ${blogPosts.length} published articles, titles, dates, cover photos, and body copy`}
              defaultOpen={true}
              badge={
                <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
                  {blogPosts.length} Articles
                </span>
              }
            >
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Add new articles or edit existing ones. Changes sync live to <code>/blog</code>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = Date.now();
                      const newPost = {
                        id: newId,
                        title: 'New Roadside Safety Guide',
                        excerpt: 'Practical advice for keeping yourself safe on Ghanaian highways.',
                        category: 'Roadside Safety',
                        image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg',
                        author: 'Santa Operations',
                        authorImg: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg',
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        readTime: '5 min read',
                        body: 'Always pull over to the hard shoulder, activate hazard warning flashers, and place your reflective triangle 45 meters behind your vehicle before calling Santa Towing.',
                        tags: ['Safety', 'Towing'],
                      };
                      setBlogPosts([newPost, ...blogPosts]);
                      setEditingPost(newPost);
                      toast.success('Created new blog post draft. Fill in details below.');
                    }}
                    className="min-h-[40px] px-3.5 py-1.5 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Article</span>
                  </button>
                </div>

                {/* List of Blog Posts */}
                <div className="space-y-2.5">
                  {blogPosts.map((post, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === blogPosts.length - 1;

                    return (
                      <div
                        key={post.id}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-14 h-12 object-cover rounded-lg bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold text-[#015557] bg-emerald-50 px-2 py-0.2 rounded">
                                {post.category || 'General'}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {post.date} &middot; {post.readTime || '4 min'}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5 max-w-[340px]">
                              {post.title}
                            </h4>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                          {/* Reorder Buttons */}
                          <button
                            type="button"
                            disabled={isFirst}
                            onClick={() => {
                              const arr = [...blogPosts];
                              const [moved] = arr.splice(idx, 1);
                              arr.splice(idx - 1, 0, moved);
                              setBlogPosts(arr);
                            }}
                            title="Move up"
                            className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={isLast}
                            onClick={() => {
                              const arr = [...blogPosts];
                              const [moved] = arr.splice(idx, 1);
                              arr.splice(idx + 1, 0, moved);
                              setBlogPosts(arr);
                            }}
                            title="Move down"
                            className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingPost(post)}
                            className="min-h-[36px] px-3 py-1.5 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPostDeletePending(post)}
                            className="p-2 text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CollapsibleSection>

            {/* Modal Editor for Blog Post */}
            {editingPost && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
                onClick={() => setEditingPost(null)}
              >
                <div
                  className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 p-6 space-y-4 max-h-[88vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-base font-bold text-slate-900">
                      Edit Article: {editingPost.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="p-1 text-slate-400 hover:text-slate-800 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <label className="font-bold text-slate-800">Article Title</label>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {editingPost.title.length} chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">Category</label>
                        <select
                          value={editingPost.category || 'Roadside Safety'}
                          onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                          className="w-full min-h-[40px] px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                        >
                          {BLOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">Publish Date</label>
                        <input
                          type="text"
                          value={editingPost.date || ''}
                          onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                          placeholder="e.g. Oct 15, 2024"
                          className="w-full min-h-[40px] px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                        />
                      </div>
                    </div>

                    {/* Cover Image with Unified Image Modal */}
                    <div>
                      <AdminImagePicker
                        label="Article Cover Photo"
                        value={editingPost.image}
                        onChange={(newUrl) => setEditingPost({ ...editingPost, image: newUrl })}
                        usedInHint="Used as primary banner on the blog post"
                        requireAlt={false}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <label className="font-bold text-slate-800">Short Summary / Excerpt</label>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {(editingPost.excerpt || '').length} chars
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={editingPost.excerpt || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                        className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <label className="font-bold text-slate-800">Full Article Content</label>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {(editingPost.body || editingPost.excerpt || '').length} chars
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        value={editingPost.body || editingPost.excerpt || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                        className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="min-h-[40px] px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = blogPosts.map((p) =>
                          p.id === editingPost.id ? editingPost : p
                        );
                        setBlogPosts(updated);
                        setEditingPost(null);
                        toast.success('Updated blog post in memory. Click "Save all text changes" to publish live.');
                      }}
                      className="min-h-[40px] px-5 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs"
                    >
                      Apply Post Edits
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 11: CONTACT */}
        {/* ============================================================== */}
        {activePage === 'Contact' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.contact.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.contact.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Contact Information & Operating Hours" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="contact.badge" label="Header Badge" />
                <EditableField storageKey="contact.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="contact.description" label="Page Description" type="textarea" rows={3} />
                <EditableField storageKey="contact.phone" label="Contact Telephone" />
                <EditableField storageKey="contact.address" label="Workshop Address" />
                <EditableField storageKey="contact.hours" label="Operating Hours Statement" helpText="e.g. '24 Hours / 7 Days a Week'" />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 12: CAREERS */}
        {/* ============================================================== */}
        {activePage === 'Careers' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.careers.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.careers.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Careers Recruitment Header" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="careers.badge" label="Header Badge" />
                <EditableField storageKey="careers.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="careers.description" label="Page Description" type="textarea" rows={3} />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 13: FAQS (with FAQ Item Manager) */}
        {/* ============================================================== */}
        {activePage === 'FAQs' && (
          <div className="space-y-5">
            <CollapsibleSection title="Search Engine Optimization (SEO)" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="seo.faqs.title" label="Search Engine Title" recommendedLimit={60} />
                <EditableField storageKey="seo.faqs.description" label="Search Engine Description" type="textarea" rows={3} recommendedLimit={160} />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="FAQs Header & Support Callout" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="faqs.badge" label="Header Badge" />
                <EditableField storageKey="faqs.title" label="Main Page Headline" recommendedLimit={60} />
                <EditableField storageKey="faqs.description" label="Page Description" type="textarea" rows={3} />
                <EditableField storageKey="faqs.stillHaveQuestionsTitle" label="Support Box Headline" />
                <EditableField storageKey="faqs.stillHaveQuestionsText" label="Support Box Subtext" type="textarea" rows={2} />
              </div>
            </CollapsibleSection>

            {/* FAQ ITEM MANAGER (Required) */}
            <CollapsibleSection
              title="FAQ Question & Answer Manager"
              description={`Add, edit, reorder, or delete questions across all categories`}
              defaultOpen={true}
              badge={
                <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
                  {faqs.length} FAQs
                </span>
              }
            >
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Questions are organized by category and update live on <code>/faqs</code>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const newFaq = {
                        id: String(Date.now()),
                        category: 'Towing',
                        q: 'New Frequently Asked Question?',
                        a: 'Clear and helpful answer explaining the procedure or pricing.',
                      };
                      setFaqs([newFaq, ...faqs]);
                      setEditingFaq(newFaq);
                    }}
                    className="min-h-[40px] px-3.5 py-1.5 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New FAQ</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {faqs.map((faq, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === faqs.length - 1;

                    return (
                      <div
                        key={faq.id || idx}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded uppercase">
                            {faq.category || 'General'}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                            {faq.q}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {faq.a}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            disabled={isFirst}
                            onClick={() => {
                              const arr = [...faqs];
                              const [moved] = arr.splice(idx, 1);
                              arr.splice(idx - 1, 0, moved);
                              setFaqs(arr);
                            }}
                            className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={isLast}
                            onClick={() => {
                              const arr = [...faqs];
                              const [moved] = arr.splice(idx, 1);
                              arr.splice(idx + 1, 0, moved);
                              setFaqs(arr);
                            }}
                            className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingFaq(faq)}
                            className="min-h-[36px] px-3 py-1.5 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setFaqDeletePending(faq)}
                            className="p-2 text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CollapsibleSection>

            {/* Modal Editor for FAQ */}
            {editingFaq && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs"
                onClick={() => setEditingFaq(null)}
              >
                <div
                  className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-base font-bold text-slate-900">Edit FAQ</h3>
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="p-1 text-slate-400 hover:text-slate-800 rounded min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Category</label>
                      <select
                        value={editingFaq.category || 'Towing'}
                        onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                        className="w-full min-h-[40px] px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      >
                        {['Towing', 'Rentals', 'Repairs', 'Sales', 'Parts', 'Payments', 'Fleet'].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <label className="font-bold text-slate-800">Question</label>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {editingFaq.q.length} chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingFaq.q}
                        onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <label className="font-bold text-slate-800">Answer</label>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {editingFaq.a.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={editingFaq.a}
                        onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                        className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="min-h-[40px] px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f));
                        setFaqs(updated);
                        setEditingFaq(null);
                        toast.success('Updated FAQ in list. Click "Save all text changes" to publish live.');
                      }}
                      className="min-h-[40px] px-5 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs"
                    >
                      Apply FAQ Edits
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PAGE 14: POLICIES (12 policies) */}
        {/* ============================================================== */}
        {activePage === 'Policies' && (
          <div className="space-y-5">
            <CollapsibleSection title="Common Policy Navigation & Labels" defaultOpen={true}>
              <div className="space-y-4 pt-2">
                <EditableField storageKey="policies.common.backToHome" label="Back Button Label" />
                <EditableField storageKey="policies.common.phoneLabel" label="Phone Hotline Label" />
                <EditableField storageKey="policies.common.whatsappLabel" label="WhatsApp Label" />
                <EditableField storageKey="policies.common.whatsappCta" label="WhatsApp Button Text" />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Legal & Customer Policy Headers" description="Titles and explanatory subheadings across all 12 policy pages" defaultOpen={false}>
              <div className="space-y-4 pt-2">
                {/* 1. Privacy */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">1. Privacy Policy</h4>
                  <EditableField storageKey="policies.privacy.title" label="Title" />
                  <EditableField storageKey="policies.privacy.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 2. Terms & Conditions */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">2. Terms &amp; Conditions</h4>
                  <EditableField storageKey="policies.terms.title" label="Title" />
                  <EditableField storageKey="policies.terms.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 3. Towing Service Terms */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">3. Towing Service Terms</h4>
                  <EditableField storageKey="policies.towingTerms.title" label="Title" />
                  <EditableField storageKey="policies.towingTerms.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 4. Cancellation & Refund */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">4. Cancellation &amp; Refund Policy</h4>
                  <EditableField storageKey="policies.cancellation.title" label="Title" />
                  <EditableField storageKey="policies.cancellation.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 5. Pricing & Payment */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">5. Pricing &amp; Payment Policy</h4>
                  <EditableField storageKey="policies.pricing.title" label="Title" />
                  <EditableField storageKey="policies.pricing.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 6. Car Damage Liability */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">6. Vehicle Damage &amp; Liability Policy</h4>
                  <EditableField storageKey="policies.damageLiability.title" label="Title" />
                  <EditableField storageKey="policies.damageLiability.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 7. Emergency Service */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">7. Emergency Service Policy</h4>
                  <EditableField storageKey="policies.emergencyService.title" label="Title" />
                  <EditableField storageKey="policies.emergencyService.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 8. Service Area Policy */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">8. Service Area &amp; Availability Policy</h4>
                  <EditableField storageKey="policies.serviceAreaPolicy.title" label="Title" />
                  <EditableField storageKey="policies.serviceAreaPolicy.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 9. Disclaimer */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">9. Website Disclaimer</h4>
                  <EditableField storageKey="policies.disclaimer.title" label="Title" />
                  <EditableField storageKey="policies.disclaimer.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 10. Cookie Policy */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">10. Cookie Policy</h4>
                  <EditableField storageKey="policies.cookie.title" label="Title" />
                  <EditableField storageKey="policies.cookie.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 11. Complaints */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">11. Customer Complaints Policy</h4>
                  <EditableField storageKey="policies.complaints.title" label="Title" />
                  <EditableField storageKey="policies.complaints.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>

                {/* 12. Accessibility */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">12. Accessibility Statement</h4>
                  <EditableField storageKey="policies.accessibility.title" label="Title" />
                  <EditableField storageKey="policies.accessibility.subtitle" label="Subtitle" type="textarea" rows={2} />
                </div>
              </div>
            </CollapsibleSection>
          </div>
        )}
      </div>

      {/* Confirmation Dialog when switching pages with unsaved edits */}
      <ConfirmDialog
        isOpen={!!pendingPageSwitch}
        title="Leave with unsaved edits?"
        description={`You have unsaved changes on ${activePage}. If you navigate to ${pendingPageSwitch} now, your unsaved text edits will be discarded.`}
        confirmLabel="Discard &amp; Switch Page"
        cancelLabel="Stay on this page"
        isDestructive={false}
        onConfirm={handleConfirmDiscardAndSwitch}
        onCancel={() => setPendingPageSwitch(null)}
      />

      {/* Confirmation Dialog for single field reset */}
      <ConfirmDialog
        isOpen={!!singleResetPending}
        title={`Reset "${singleResetPending?.label}" to original?`}
        description="This will restore the original default text for this specific field."
        confirmLabel="Reset to original"
        cancelLabel="Keep current text"
        isDestructive={false}
        onConfirm={executeFieldReset}
        onCancel={() => setSingleResetPending(null)}
      />

      {/* Confirmation Dialog for deleting blog post */}
      <ConfirmDialog
        isOpen={!!postDeletePending}
        title="Delete Blog Post?"
        description={`Are you sure you want to remove "${postDeletePending?.title}"? This article will be deleted from your blog list.`}
        confirmLabel="Delete Article"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          if (postDeletePending) {
            setBlogPosts(blogPosts.filter((p) => p.id !== postDeletePending.id));
            toast.info(`Removed article "${postDeletePending.title}".`);
            setPostDeletePending(null);
          }
        }}
        onCancel={() => setPostDeletePending(null)}
      />

      {/* Confirmation Dialog for deleting FAQ */}
      <ConfirmDialog
        isOpen={!!faqDeletePending}
        title="Delete FAQ Item?"
        description={`Are you sure you want to delete "${faqDeletePending?.q}"?`}
        confirmLabel="Delete FAQ"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          if (faqDeletePending) {
            setFaqs(faqs.filter((f) => f.id !== faqDeletePending.id && f.q !== faqDeletePending.q));
            toast.info('Removed FAQ item from list.');
            setFaqDeletePending(null);
          }
        }}
        onCancel={() => setFaqDeletePending(null)}
      />
    </AdminScreenLayout>
  );
}
