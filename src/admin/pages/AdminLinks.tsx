import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Compass,
  Globe,
  Share2,
  Navigation,
  ExternalLink,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit2,
  Check,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import AdminField from '../components/AdminField';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminToast } from '../context/AdminToastContext';
import { useContent } from '@/context/ContentContext';
import { saveMultiple } from '@/lib/contentStorage';

export interface LinkItem {
  id: string;
  label: string;
  path: string;
  visible: boolean;
}

const DEFAULT_MENU_LINKS: LinkItem[] = [
  { id: 'm-1', label: 'Home', path: '/', visible: true },
  { id: 'm-2', label: 'Emergency Towing', path: '/towing', visible: true },
  { id: 'm-3', label: 'Service Areas Directory', path: '/service-areas', visible: true },
  { id: 'm-4', label: 'Haulage Services', path: '/haulage', visible: true },
  { id: 'm-5', label: 'Car Sales', path: '/sales', visible: true },
  { id: 'm-6', label: 'Car Rentals', path: '/rental', visible: true },
  { id: 'm-7', label: 'Auto Repairs & Diagnostics', path: '/repairs', visible: true },
  { id: 'm-8', label: 'Auto Body Works & Spraying', path: '/body-works', visible: true },
  { id: 'm-9', label: 'Genuine Auto Parts', path: '/parts', visible: true },
  { id: 'm-10', label: 'Corporate Fleet Services', path: '/fleet', visible: true },
  { id: 'm-11', label: 'Contact & 24/7 Dispatch', path: '/contact', visible: true },
];

const DEFAULT_QUICK_LINKS: LinkItem[] = [
  { id: 'ql-1', label: 'Home', path: '/', visible: true },
  { id: 'ql-2', label: 'Haulage Services', path: '/haulage', visible: true },
  { id: 'ql-3', label: '24/7 Emergency Towing', path: '/towing', visible: true },
  { id: 'ql-4', label: 'Service Areas Directory', path: '/service-areas', visible: true },
  { id: 'ql-5', label: 'Auto Repair & Maintenance', path: '/repairs', visible: true },
  { id: 'ql-6', label: 'Car Rentals', path: '/rental', visible: true },
  { id: 'ql-7', label: 'Car Sales', path: '/sales', visible: true },
  { id: 'ql-8', label: 'Auto Parts & Batteries', path: '/parts', visible: true },
  { id: 'ql-9', label: 'Blog & Resources', path: '/blog', visible: true },
  { id: 'ql-10', label: 'Contact & Dispatch', path: '/contact', visible: true },
  { id: 'ql-11', label: 'Sitemap', path: '/sitemap', visible: true },
];

const DEFAULT_SERVICE_LINKS: LinkItem[] = [
  { id: 'sl-1', label: 'Haulage & Heavy Transport', path: '/haulage', visible: true },
  { id: 'sl-2', label: 'Tema Harbour Haulage', path: '/haulage', visible: true },
  { id: 'sl-3', label: 'Heavy Machinery Transport', path: '/haulage', visible: true },
  { id: 'sl-4', label: 'Emergency Roadside Towing', path: '/towing', visible: true },
  { id: 'sl-5', label: 'Heavy Duty Recovery', path: '/towing', visible: true },
  { id: 'sl-6', label: 'Fleet Maintenance', path: '/fleet', visible: true },
  { id: 'sl-7', label: 'Engine & Gearbox Repairs', path: '/repairs', visible: true },
  { id: 'sl-8', label: 'Brake & Suspension Service', path: '/repairs', visible: true },
];

// Helper to format clean international/local whatsapp url
function buildWhatsAppUrl(number: string, message: string): string {
  const digitsOnly = number.replace(/\D/g, '');
  // If starts with 0 and 10 digits, convert Ghana 024... to 23324...
  let phoneCode = digitsOnly;
  if (phoneCode.startsWith('0') && phoneCode.length === 10) {
    phoneCode = '233' + phoneCode.substring(1);
  } else if (!phoneCode.startsWith('233') && phoneCode.length === 9) {
    phoneCode = '233' + phoneCode;
  }
  const cleanMsg = encodeURIComponent(message || '');
  return `https://wa.me/${phoneCode}${cleanMsg ? `?text=${cleanMsg}` : ''}`;
}

export default function AdminLinks() {
  const toast = useAdminToast();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  // Saved values from ContentContext
  const savedPhone = useContent('global.links.phone', '0244753849');
  const savedWhatsappNumber = useContent('global.links.whatsappNumber', '0244753849');
  const savedWhatsappMessage = useContent(
    'global.links.whatsappMessage',
    'Hello Santa Towing, I need 24/7 emergency roadside assistance in Ghana.'
  );
  const savedEmail = useContent('global.links.email', 'info@santatowing.com');
  const savedAddress = useContent('global.links.address', '123 Spintex Road, Accra, Ghana');
  const savedHours = useContent('global.links.hours', '24/7 Towing Service');
  const savedCoverage = useContent('global.links.coverage', 'Nationwide Coverage');

  const savedFacebook = useContent('global.social.facebook', 'https://facebook.com/santatowing');
  const savedTwitter = useContent('global.social.twitter', 'https://twitter.com/santatowing');
  const savedInstagram = useContent('global.social.instagram', 'https://instagram.com/santatowing');
  const savedLinkedin = useContent('global.social.linkedin', 'https://linkedin.com/company/santatowing');
  const savedTiktok = useContent('global.social.tiktok', 'https://tiktok.com/@santatowing');
  const savedYoutube = useContent('global.social.youtube', 'https://youtube.com/@santatowing');

  const savedMenuLinks = useContent('global.nav.menuLinks', DEFAULT_MENU_LINKS);
  const savedQuickLinks = useContent('global.footer.quickLinks', DEFAULT_QUICK_LINKS);
  const savedServiceLinks = useContent('global.footer.serviceLinks', DEFAULT_SERVICE_LINKS);

  // Form State
  const [phone, setPhone] = useState(savedPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(savedWhatsappNumber);
  const [whatsappMessage, setWhatsappMessage] = useState(savedWhatsappMessage);
  const [email, setEmail] = useState(savedEmail);
  const [address, setAddress] = useState(savedAddress);
  const [hours, setHours] = useState(savedHours);
  const [coverage, setCoverage] = useState(savedCoverage);

  const [facebook, setFacebook] = useState(savedFacebook);
  const [twitter, setTwitter] = useState(savedTwitter);
  const [instagram, setInstagram] = useState(savedInstagram);
  const [linkedin, setLinkedin] = useState(savedLinkedin);
  const [tiktok, setTiktok] = useState(savedTiktok);
  const [youtube, setYoutube] = useState(savedYoutube);

  const [menuLinks, setMenuLinks] = useState<LinkItem[]>(savedMenuLinks);
  const [quickLinks, setQuickLinks] = useState<LinkItem[]>(savedQuickLinks);
  const [serviceLinks, setServiceLinks] = useState<LinkItem[]>(savedServiceLinks);

  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Item deletion dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    listType: 'menu' | 'quick' | 'service';
    item: LinkItem | null;
  }>({ isOpen: false, listType: 'menu', item: null });

  // Item edit / add modal state
  const [itemModal, setItemModal] = useState<{
    isOpen: boolean;
    listType: 'menu' | 'quick' | 'service';
    isEdit: boolean;
    item: LinkItem;
  }>({
    isOpen: false,
    listType: 'menu',
    isEdit: false,
    item: { id: '', label: '', path: '', visible: true },
  });

  // Track if any change has been made
  const hasUnsavedChanges =
    phone !== savedPhone ||
    whatsappNumber !== savedWhatsappNumber ||
    whatsappMessage !== savedWhatsappMessage ||
    email !== savedEmail ||
    address !== savedAddress ||
    hours !== savedHours ||
    coverage !== savedCoverage ||
    facebook !== savedFacebook ||
    twitter !== savedTwitter ||
    instagram !== savedInstagram ||
    linkedin !== savedLinkedin ||
    tiktok !== savedTiktok ||
    youtube !== savedYoutube ||
    JSON.stringify(menuLinks) !== JSON.stringify(savedMenuLinks) ||
    JSON.stringify(quickLinks) !== JSON.stringify(savedQuickLinks) ||
    JSON.stringify(serviceLinks) !== JSON.stringify(savedServiceLinks);

  // Validation function
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate phone
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      errors.phone = 'Please provide a valid phone number (at least 9-10 digits, e.g. 0244753849).';
    }

    // Validate whatsapp
    const waDigits = whatsappNumber.replace(/\D/g, '');
    if (waDigits.length < 9 || waDigits.length > 15) {
      errors.whatsapp = 'Please provide a valid WhatsApp number (e.g. 0244753849).';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address (e.g. info@santatowing.com).';
    }

    // Validate URLs (if provided)
    const urlRegex = /^https?:\/\/.+/i;
    const validateUrl = (url: string, fieldName: string, label: string) => {
      if (url && url.trim().length > 0 && !urlRegex.test(url.trim())) {
        errors[fieldName] = `${label} must start with http:// or https://`;
      }
    };

    validateUrl(facebook, 'facebook', 'Facebook URL');
    validateUrl(twitter, 'twitter', 'Twitter/X URL');
    validateUrl(instagram, 'instagram', 'Instagram URL');
    validateUrl(linkedin, 'linkedin', 'LinkedIn URL');
    validateUrl(tiktok, 'tiktok', 'TikTok URL');
    validateUrl(youtube, 'youtube', 'YouTube URL');

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Validation failed. Please correct the highlighted errors before saving.');
      return;
    }

    setIsSaving(true);

    // Prepare derived fields so one change updates every place it's used
    const cleanPhone = phone.trim();
    const cleanDigits = cleanPhone.replace(/\D/g, '');
    const cleanPhoneTel = `tel:${cleanDigits}`;
    const generatedWhatsApp = buildWhatsAppUrl(whatsappNumber, whatsappMessage);

    const payload = {
      // Primary links
      'global.links.phone': cleanPhone,
      'global.links.phoneDisplay': cleanPhone,
      'global.links.phoneTel': cleanPhoneTel,
      'global.links.whatsapp': generatedWhatsApp,
      'global.links.whatsappNumber': whatsappNumber.trim(),
      'global.links.whatsappMessage': whatsappMessage.trim(),
      'global.links.whatsappDisplay': `WhatsApp: ${whatsappNumber.trim()}`,
      'global.links.email': email.trim(),
      'global.links.address': address.trim(),
      'global.links.hours': hours.trim(),
      'global.links.coverage': coverage.trim(),
      'global.nav.callNow': `Call Now: ${cleanPhone}`,

      // Socials
      'global.social.facebook': facebook.trim(),
      'global.social.twitter': twitter.trim(),
      'global.social.instagram': instagram.trim(),
      'global.social.linkedin': linkedin.trim(),
      'global.social.tiktok': tiktok.trim(),
      'global.social.youtube': youtube.trim(),

      // Lists
      'global.nav.menuLinks': menuLinks,
      'global.footer.quickLinks': quickLinks,
      'global.footer.serviceLinks': serviceLinks,
    };

    setTimeout(() => {
      const success = saveMultiple(payload);
      setIsSaving(false);

      if (success) {
        toast.success('Saved! Updated contact hotlines, social links, and navigation across the entire website.');
        setValidationErrors({});
      } else {
        toast.error('Failed to save links to storage. Please check browser permissions.');
      }
    }, 250);
  };

  const handleDiscard = () => {
    setPhone(savedPhone);
    setWhatsappNumber(savedWhatsappNumber);
    setWhatsappMessage(savedWhatsappMessage);
    setEmail(savedEmail);
    setAddress(savedAddress);
    setHours(savedHours);
    setCoverage(savedCoverage);
    setFacebook(savedFacebook);
    setTwitter(savedTwitter);
    setInstagram(savedInstagram);
    setLinkedin(savedLinkedin);
    setTiktok(savedTiktok);
    setYoutube(savedYoutube);
    setMenuLinks(savedMenuLinks);
    setQuickLinks(savedQuickLinks);
    setServiceLinks(savedServiceLinks);
    setValidationErrors({});
    toast.info('Discarded unsaved link edits.');
  };

  // Reorder helpers
  const moveItem = (
    listType: 'menu' | 'quick' | 'service',
    index: number,
    direction: 'up' | 'down'
  ) => {
    const list =
      listType === 'menu' ? menuLinks : listType === 'quick' ? quickLinks : serviceLinks;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const updated = [...list];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    if (listType === 'menu') setMenuLinks(updated);
    else if (listType === 'quick') setQuickLinks(updated);
    else setServiceLinks(updated);
  };

  // Toggle visibility helper
  const toggleVisibility = (
    listType: 'menu' | 'quick' | 'service',
    id: string
  ) => {
    const updater = (prev: LinkItem[]) =>
      prev.map((it) => (it.id === id ? { ...it, visible: !it.visible } : it));

    if (listType === 'menu') setMenuLinks(updater);
    else if (listType === 'quick') setQuickLinks(updater);
    else setServiceLinks(updater);
  };

  // Confirm delete item
  const confirmDeleteItem = () => {
    if (!deleteDialog.item) return;
    const id = deleteDialog.item.id;
    const filterFn = (prev: LinkItem[]) => prev.filter((it) => it.id !== id);

    if (deleteDialog.listType === 'menu') setMenuLinks(filterFn);
    else if (deleteDialog.listType === 'quick') setQuickLinks(filterFn);
    else setServiceLinks(filterFn);

    toast.info(`Removed "${deleteDialog.item.label}"`);
    setDeleteDialog({ isOpen: false, listType: 'menu', item: null });
  };

  // Save add/edit item modal
  const handleSaveModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item = itemModal.item;
    if (!item.label.trim() || !item.path.trim()) {
      toast.error('Both Label and Path/URL are required.');
      return;
    }

    const updater = (prev: LinkItem[]) => {
      if (itemModal.isEdit) {
        return prev.map((it) => (it.id === item.id ? item : it));
      } else {
        const newItem: LinkItem = {
          ...item,
          id: `${itemModal.listType}-${Date.now()}`,
        };
        return [...prev, newItem];
      }
    };

    if (itemModal.listType === 'menu') setMenuLinks(updater);
    else if (itemModal.listType === 'quick') setQuickLinks(updater);
    else setServiceLinks(updater);

    toast.info(`${itemModal.isEdit ? 'Updated' : 'Added'} link "${item.label}"`);
    setItemModal({
      isOpen: false,
      listType: 'menu',
      isEdit: false,
      item: { id: '', label: '', path: '', visible: true },
    });
  };

  // Render an editable link list
  const renderLinkTable = (
    list: LinkItem[],
    listType: 'menu' | 'quick' | 'service',
    title: string,
    addLabel: string
  ) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {title} ({list.length})
        </h4>
        <button
          type="button"
          onClick={() =>
            setItemModal({
              isOpen: true,
              listType,
              isEdit: false,
              item: { id: '', label: '', path: '/', visible: true },
            })
          }
          className="min-h-[36px] px-3 py-1 text-xs font-semibold text-[#015557] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{addLabel}</span>
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
        <ul className="divide-y divide-slate-100" role="list">
          {list.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === list.length - 1;

            return (
              <li
                key={item.id}
                className={`p-3 flex items-center justify-between gap-3 transition-colors ${
                  item.visible ? 'hover:bg-slate-50' : 'bg-slate-50/70 opacity-60'
                }`}
              >
                {/* Drag / order indicator & Label */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="text-xs font-mono font-semibold text-slate-400 w-5 text-center">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {item.label}
                      </span>
                      {!item.visible && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-1.5 py-0.2 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 truncate block">
                      {item.path}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Reorder Buttons */}
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => moveItem(listType, index, 'up')}
                    aria-label={`Move ${item.label} up`}
                    title="Move up"
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-20"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => moveItem(listType, index, 'down')}
                    aria-label={`Move ${item.label} down`}
                    title="Move down"
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-20"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Show/Hide Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleVisibility(listType, item.id)}
                    aria-label={item.visible ? `Hide ${item.label}` : `Show ${item.label}`}
                    title={item.visible ? 'Hide link' : 'Show link'}
                    className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg transition-colors ${
                      item.visible
                        ? 'text-slate-500 hover:text-[#015557] hover:bg-emerald-50'
                        : 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                    }`}
                  >
                    {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setItemModal({
                        isOpen: true,
                        listType,
                        isEdit: true,
                        item: { ...item },
                      })
                    }
                    aria-label={`Edit ${item.label}`}
                    title="Edit link"
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteDialog({
                        isOpen: true,
                        listType,
                        item,
                      })
                    }
                    aria-label={`Delete ${item.label}`}
                    title="Delete link"
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <AdminScreenLayout
      title="Links &amp; Navigation Dashboard"
      subtitle="Manage telephone dispatch lines, WhatsApp integration, company email, social URLs, and header/footer navigation links."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSave}
      onReset={handleDiscard}
      isSaving={isSaving}
      saveLabel="Save all links"
      resetLabel="Discard changes"
      previewTitle="Live Touchpoint Simulator"
      preview={
        <div className="p-4 sm:p-5 space-y-5">
          {/* Top Bar Preview */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              1. Top Bar Hotline &amp; Socials
            </span>
            <div className="bg-[#192e2e] text-white p-3 rounded-lg text-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold text-[#d80000]">
                  <Phone className="w-3.5 h-3.5 animate-pulse" />
                  <span>{phone || '0244753849'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span>{coverage || 'Nationwide'}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60 border-t border-white/10 pt-1.5">
                <span>WhatsApp: {whatsappNumber || '0244753849'}</span>
                <span>{hours || '24/7 Towing'}</span>
              </div>
            </div>
          </div>

          {/* Floating Action Button Simulator */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              2. Floating Dispatch &amp; WhatsApp Buttons
            </span>
            <div className="p-3 bg-slate-100 rounded-lg flex items-center justify-between">
              <span className="text-xs text-slate-600">Screen Corner Trigger:</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full bg-[#d80000] text-white flex items-center justify-center shadow-md"
                  title="Call Phone"
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div
                  className="w-9 h-9 rounded-full bg-[#015557] text-white flex items-center justify-center shadow-md"
                  title="WhatsApp Direct"
                >
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Action CTA Simulator */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              3. Homepage Hero CTAs
            </span>
            <div className="p-3 bg-[#131514] rounded-lg text-white space-y-2">
              <p className="text-[11px] text-white/60">Primary Customer Actions:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#d80000] text-white text-[11px] font-bold flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  <span>Call {phone || '0244753849'}</span>
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#015557] text-white text-[11px] font-bold flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp Chat</span>
                </span>
              </div>
            </div>
          </div>

          {/* Footer Contact Lockup */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              4. Footer Contact Block
            </span>
            <div className="p-3.5 bg-slate-900 text-white rounded-lg text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-3.5 h-3.5 text-[#d80000]" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-3.5 h-3.5 text-[#015557]" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-3.5 h-3.5 text-[#015557]" />
                <span className="truncate">{address}</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Primary Contact Information */}
        <AdminCard
          id="hotlines"
          title="Core Contact &amp; Dispatch Hotlines"
          subtitle="Updates the 24/7 phone number, WhatsApp link, dispatch email, and company headquarters address."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <AdminField
                  label="Emergency Dispatch Phone (24/7 Hotline)"
                  value={phone}
                  onChange={setPhone}
                  required
                  type="tel"
                  placeholder="0244753849"
                  helpText="Primary phone dialed by road users in emergencies. One change updates Top Bar, Hero, Floating Button, and Footer."
                />
                {validationErrors.phone && (
                  <p className="text-xs text-[#d80000] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <AdminField
                  label="WhatsApp Dispatch Number"
                  value={whatsappNumber}
                  onChange={setWhatsappNumber}
                  required
                  type="tel"
                  placeholder="0244753849"
                  helpText="WhatsApp number for receiving customer location pins and vehicle photos."
                />
                {validationErrors.whatsapp && (
                  <p className="text-xs text-[#d80000] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.whatsapp}</span>
                  </p>
                )}
              </div>
            </div>

            <AdminField
              label="Default WhatsApp Chat Message"
              value={whatsappMessage}
              onChange={setWhatsappMessage}
              type="textarea"
              placeholder="Hello Santa Towing, I need 24/7 emergency roadside assistance in Ghana."
              helpText="Pre-filled text message loaded when customers click WhatsApp chat buttons."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <AdminField
                  label="Customer Support Email"
                  value={email}
                  onChange={setEmail}
                  required
                  type="email"
                  placeholder="info@santatowing.com"
                  helpText="Public email address displayed for quotes and business inquiries."
                />
                {validationErrors.email && (
                  <p className="text-xs text-[#d80000] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.email}</span>
                  </p>
                )}
              </div>

              <AdminField
                label="Physical Address / Workshop Location"
                value={address}
                onChange={setAddress}
                required
                placeholder="123 Spintex Road, Accra, Ghana"
                helpText="Garage and recovery depot address shown in footers."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminField
                label="Operational Hours Notice"
                value={hours}
                onChange={setHours}
                placeholder="24/7 Towing Service"
                helpText="Short badge visible in the top bar."
              />
              <AdminField
                label="Geographic Coverage Text"
                value={coverage}
                onChange={setCoverage}
                placeholder="Nationwide Coverage"
                helpText="Service coverage commitment badge."
              />
            </div>
          </div>
        </AdminCard>

        {/* 2. Social Media URLs */}
        <AdminCard
          id="socials"
          title="Social Channels &amp; Profiles"
          subtitle="Direct links to Santa Towing official profiles across social media networks."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AdminField
                label="Facebook Page URL"
                value={facebook}
                onChange={setFacebook}
                placeholder="https://facebook.com/santatowing"
                type="url"
              />
              {validationErrors.facebook && (
                <p className="text-xs text-[#d80000] font-medium mt-1">
                  {validationErrors.facebook}
                </p>
              )}
            </div>

            <div>
              <AdminField
                label="Twitter / X Profile URL"
                value={twitter}
                onChange={setTwitter}
                placeholder="https://twitter.com/santatowing"
                type="url"
              />
              {validationErrors.twitter && (
                <p className="text-xs text-[#d80000] font-medium mt-1">
                  {validationErrors.twitter}
                </p>
              )}
            </div>

            <div>
              <AdminField
                label="Instagram Profile URL"
                value={instagram}
                onChange={setInstagram}
                placeholder="https://instagram.com/santatowing"
                type="url"
              />
              {validationErrors.instagram && (
                <p className="text-xs text-[#d80000] font-medium mt-1">
                  {validationErrors.instagram}
                </p>
              )}
            </div>

            <div>
              <AdminField
                label="LinkedIn Company URL"
                value={linkedin}
                onChange={setLinkedin}
                placeholder="https://linkedin.com/company/santatowing"
                type="url"
              />
              {validationErrors.linkedin && (
                <p className="text-xs text-[#d80000] font-medium mt-1">
                  {validationErrors.linkedin}
                </p>
              )}
            </div>

            <div>
              <AdminField
                label="TikTok Profile URL"
                value={tiktok}
                onChange={setTiktok}
                placeholder="https://tiktok.com/@santatowing"
                type="url"
              />
              {validationErrors.tiktok && (
                <p className="text-xs text-[#d80000] font-medium mt-1">
                  {validationErrors.tiktok}
                </p>
              )}
            </div>

            <div>
              <AdminField
                label="YouTube Channel URL"
                value={youtube}
                onChange={setYoutube}
                placeholder="https://youtube.com/@santatowing"
                type="url"
              />
              {validationErrors.youtube && (
                <p className="text-xs text-[#d80000] font-medium mt-1">
                  {validationErrors.youtube}
                </p>
              )}
            </div>
          </div>
        </AdminCard>

        {/* 3. Header Menu Links */}
        <AdminCard
          id="header-menu"
          title="Header Navigation Menu"
          subtitle="Control links displayed in the primary navigation header across desktop and mobile menus."
        >
          {renderLinkTable(menuLinks, 'menu', 'Header Menu Links', 'Add Header Link')}
        </AdminCard>

        {/* 4. Footer Quick Links & Services */}
        <AdminCard
          id="quick-links"
          title="Footer Navigation Links"
          subtitle="Manage Quick Links and Service Links rendered in the comprehensive website footer."
        >
          <div className="space-y-6">
            <div id="quick-links-section">
              {renderLinkTable(quickLinks, 'quick', 'Footer Quick Links', 'Add Quick Link')}
            </div>
            <div id="service-links" className="border-t border-slate-200 pt-6">
              {renderLinkTable(serviceLinks, 'service', 'Footer Service Links', 'Add Service Link')}
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Delete Item Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Remove Navigation Link?"
        description={`Are you sure you want to remove "${deleteDialog.item?.label}"? It will no longer appear in the ${deleteDialog.listType === 'menu' ? 'header navigation' : 'footer'}.`}
        confirmLabel="Remove Link"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={confirmDeleteItem}
        onCancel={() => setDeleteDialog({ isOpen: false, listType: 'menu', item: null })}
      />

      {/* Edit / Add Modal */}
      {itemModal.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {itemModal.isEdit ? 'Edit Navigation Link' : 'Add Navigation Link'}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setItemModal((prev) => ({ ...prev, isOpen: false }))
                }
                className="text-slate-400 hover:text-slate-800 p-1 rounded"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Link Label
                </label>
                <input
                  type="text"
                  value={itemModal.item.label}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      item: { ...prev.item, label: e.target.value },
                    }))
                  }
                  placeholder="e.g. 24/7 Towing"
                  required
                  autoFocus
                  className="w-full min-h-[44px] px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Link Destination (Path or URL)
                </label>
                <input
                  type="text"
                  value={itemModal.item.path}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      item: { ...prev.item, path: e.target.value },
                    }))
                  }
                  placeholder="e.g. /towing or https://..."
                  required
                  className="w-full min-h-[44px] px-3.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="modal-item-visible"
                  checked={itemModal.item.visible}
                  onChange={(e) =>
                    setItemModal((prev) => ({
                      ...prev,
                      item: { ...prev.item, visible: e.target.checked },
                    }))
                  }
                  className="w-4 h-4 text-[#015557] rounded border-slate-300 focus:ring-[#015557]"
                />
                <label
                  htmlFor="modal-item-visible"
                  className="text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Visible on public website
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    setItemModal((prev) => ({ ...prev, isOpen: false }))
                  }
                  className="min-h-[40px] px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg shadow-xs"
                >
                  {itemModal.isEdit ? 'Update Link' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminScreenLayout>
  );
}
