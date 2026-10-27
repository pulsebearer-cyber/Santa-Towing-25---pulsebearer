import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Phone,
  Palette,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldAlert,
  BellRing,
  RotateCcw,
  CheckCircle2,
  Car,
  Wrench,
  Truck,
  Check,
  Receipt,
  Sliders,
  Users,
  Database,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import CollapsibleSection from '../components/CollapsibleSection';
import AdminField from '../components/AdminField';
import AdminToggle from '../components/AdminToggle';
import AdminColorPicker from '../components/AdminColorPicker';
import AdminImagePicker from '../components/AdminImagePicker';
import ReorderableList from '../components/ReorderableList';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import { useAdminToast } from '../context/AdminToastContext';
import { useContent, useContentManager } from '@/context/ContentContext';
import { ReorderableItem, RecentlyEditedItem } from '../types';
import { getFinancialOverviewStats } from '@/lib/documentStorage';

export default function AdminDashboardHome() {
  const navigate = useNavigate();
  const toast = useAdminToast();
  const { set } = useContentManager();

  // Initial values from ContentContext
  const initialPhone = useContent('global.links.phone', '0244753849');
  const initialBrandName = useContent('global.brand.name', 'Santa Towing & Garage Services Ltd.');
  const initialLogo = useContent('global.logo.url', 'https://i.ibb.co/KgkfFKV/Santa-Logo.png');
  const initialPrimaryColor = useContent('theme.primary', '#015557');
  const initialAccentColor = useContent('theme.accent', '#d80000');

  // Working state for form
  const [phone, setPhone] = useState(initialPhone);
  const [brandName, setBrandName] = useState(initialBrandName);
  const [logoUrl, setLogoUrl] = useState(initialLogo);
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [accentColor, setAccentColor] = useState(initialAccentColor);
  const [emergencyBannerActive, setEmergencyBannerActive] = useState(true);
  const [onlineBookingEnabled, setOnlineBookingEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [financeStats, setFinanceStats] = useState(getFinancialOverviewStats());

  useEffect(() => {
    setFinanceStats(getFinancialOverviewStats());
  }, []);

  // Priority services reorderable list
  const [priorityServices, setPriorityServices] = useState<ReorderableItem[]>([
    { id: '1', title: '24/7 Heavy Duty Towing', subtitle: 'Accra, Kumasi & Inter-city highways', badge: 'Popular' },
    { id: '2', title: 'Haulage & Heavy Equipment Moving', subtitle: 'Excavator, forklift & industrial transport', badge: 'Haulage' },
    { id: '3', title: 'Roadside Battery Jumpstart & Fuel', subtitle: 'Response time under 25 minutes' },
    { id: '4', title: 'Accident Recovery & Winching', subtitle: 'Specialized hydraulic recovery crane' },
  ]);

  // Recently edited items
  const [recentlyEdited, setRecentlyEdited] = useState<RecentlyEditedItem[]>([
    {
      id: 'rec-1',
      title: 'Emergency Contact Hotline',
      section: 'Settings / Links',
      timestamp: '15 mins ago',
      user: 'Operations Admin',
      summary: 'Updated 24/7 primary telephone number to 0244753849',
    },
    {
      id: 'rec-2',
      title: 'Primary Brand Theme Color',
      section: 'Appearance / Colors',
      timestamp: '2 hours ago',
      user: 'Design Lead',
      summary: 'Applied primary brand teal #015557 across buttons and navigation',
    },
    {
      id: 'rec-3',
      title: 'Homepage Hero Showcase',
      section: 'Content / Pages & Text',
      timestamp: 'Yesterday',
      user: 'Operations Admin',
      summary: 'Updated hero slide photo and emergency response guarantee copy',
    },
    {
      id: 'rec-4',
      title: 'Official Company Logo',
      section: 'Appearance / Logo',
      timestamp: '3 days ago',
      user: 'Super Admin',
      summary: 'Replaced SVG logo asset with high-resolution brand badge',
    },
  ]);

  // Track if any change has been made
  const hasUnsavedChanges =
    phone !== initialPhone ||
    brandName !== initialBrandName ||
    logoUrl !== initialLogo ||
    primaryColor !== initialPrimaryColor ||
    accentColor !== initialAccentColor;

  // Save handler
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      set('global.links.phone', phone);
      set('global.links.phoneDisplay', phone);
      set('global.brand.name', brandName);
      set('global.logo.url', logoUrl);
      set('theme.primary', primaryColor);
      set('theme.accent', accentColor);

      setIsSaving(false);
      toast.success('All site configuration changes saved and published live.');

      // Prepend to recently edited
      setRecentlyEdited((prev) => [
        {
          id: `rec-${Date.now()}`,
          title: 'Site Configuration Update',
          section: 'Dashboard',
          timestamp: 'Just now',
          user: 'Admin Manager',
          summary: `Updated phone (${phone}) & branding elements`,
        },
        ...prev.slice(0, 4),
      ]);
    }, 450);
  };

  // Reset handler
  const handleReset = () => {
    setPhone(initialPhone);
    setBrandName(initialBrandName);
    setLogoUrl(initialLogo);
    setPrimaryColor(initialPrimaryColor);
    setAccentColor(initialAccentColor);
    toast.info('Form reverted back to currently saved site settings.');
  };

  // Quick Action Cards configuration
  const quickActions = [
    {
      id: 'qa-invoices',
      title: 'Pro Forma Invoices',
      description: 'Create, compute tax & discounts, duplicate, and print A4 invoices',
      icon: FileText,
      onClick: () => {
        navigate('/admin/invoices');
      },
    },
    {
      id: 'qa-receipts',
      title: 'Official Receipts',
      description: 'Record MoMo & bank settlements and update outstanding customer balances',
      icon: Receipt,
      onClick: () => {
        navigate('/admin/receipts');
      },
    },
    {
      id: 'qa-image-studio',
      title: 'Image Studio & Editor',
      description: 'Deterministic 5 aspect ratios crop, dimension scaling, and text/logo watermarking',
      icon: Sliders,
      onClick: () => {
        navigate('/admin/image-studio');
      },
    },
    {
      id: 'qa-customers',
      title: 'Customer Directory',
      description: 'Manage client accounts, contact coordinates, and linked billing records',
      icon: Users,
      onClick: () => {
        navigate('/admin/customers');
      },
    },
    {
      id: 'qa-home',
      title: 'Edit homepage text',
      description: 'Modify hero banner headlines, emergency badge & service cards',
      icon: FileText,
      onClick: () => {
        navigate('/admin/pages-text');
      },
    },
    {
      id: 'qa-backup',
      title: 'Backup & CSV Export',
      description: 'Export spreadsheets or download complete encrypted JSON database archive',
      icon: Database,
      onClick: () => {
        navigate('/admin/backup');
      },
    },
  ];

  // Rollback dialog state for recently edited
  const [rollbackItem, setRollbackItem] = useState<RecentlyEditedItem | null>(null);

  const handleConfirmRollback = () => {
    if (!rollbackItem) return;
    toast.success(`Rolled back changes for "${rollbackItem.title}" to default.`);
    setRollbackItem(null);
  };

  return (
    <AdminScreenLayout
      title="Dashboard"
      subtitle="Overview of Santa Towing administration, quick-action tasks, and live site components."
      hasUnsavedChanges={hasUnsavedChanges}
      onSave={handleSave}
      onReset={handleReset}
      isSaving={isSaving}
      saveLabel="Save all changes"
      resetLabel="Reset changes"
      previewTitle="Live Website Preview"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          {/* Simulated Public Site Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <img
                src={logoUrl}
                alt="Logo Preview"
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-bold text-xs text-slate-900 truncate max-w-[140px]">
                {brandName}
              </span>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: primaryColor }}
            >
              24/7 OPEN
            </span>
          </div>

          {/* Emergency Alert Banner Preview */}
          {emergencyBannerActive && (
            <div
              className="p-3 rounded-lg text-white flex items-center justify-between gap-2 shadow-xs"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-wide uppercase opacity-90">
                  24/7 Emergency Dispatch
                </p>
                <p className="text-sm font-bold tracking-tight truncate">
                  {phone || '0244753849'}
                </p>
              </div>
              <span
                className="px-2.5 py-1 text-[10px] font-bold rounded uppercase shrink-0 text-white"
                style={{ backgroundColor: accentColor }}
              >
                Call Now
              </span>
            </div>
          )}

          {/* Service Cards Snapshot */}
          <div className="space-y-2 pt-1">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Priority Services Preview
            </p>
            <div className="space-y-1.5">
              {priorityServices.slice(0, 3).map((svc, i) => (
                <div
                  key={svc.id}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] text-white shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-medium text-slate-800 truncate max-w-[170px]">
                      {svc.title}
                    </span>
                  </div>
                  {svc.badge && (
                    <span className="text-[9px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {svc.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Color Palettes preview strip */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Primary Brand Color</span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full border border-slate-300"
                style={{ backgroundColor: primaryColor }}
              />
              <span className="font-mono text-[10px] text-slate-700 uppercase">
                {primaryColor}
              </span>
            </div>
          </div>
        </div>
      }
    >
      {/* 0. Financial & Document Overview KPIs */}
      <section aria-labelledby="finance-overview-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="finance-overview-heading" className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Billing &amp; Revenue Overview</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#015557] border border-emerald-200 uppercase">
              Financial Suite
            </span>
          </h2>
          <button
            type="button"
            onClick={() => navigate('/admin/invoices')}
            className="text-xs font-semibold text-[#015557] hover:underline flex items-center gap-1"
          >
            <span>Manage Invoices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Invoiced Value
            </span>
            <h3 className="text-xl font-black text-slate-900 font-mono tracking-tight">
              GH₵ {financeStats.totalInvoiced.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[10px] text-slate-400 block">
              Across {financeStats.totalInvoices} Pro Forma Invoices
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
              Payments Collected
            </span>
            <h3 className="text-xl font-black text-[#015557] font-mono tracking-tight">
              GH₵ {financeStats.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[10px] text-slate-400 block">
              {financeStats.receiptsCount} Verified Receipts
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-red-700 uppercase tracking-wider block">
              Outstanding Balance
            </span>
            <h3 className="text-xl font-black text-[#d80000] font-mono tracking-tight">
              GH₵ {financeStats.outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[10px] text-slate-400 block">
              Pending client settlement
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
              Active Documents
            </span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-black text-slate-900 font-mono tracking-tight">
                {financeStats.statusCounts.Issued}
              </h3>
              <span className="text-xs text-slate-500">Issued</span>
              <span className="text-slate-300">&bull;</span>
              <span className="font-bold text-emerald-700 font-mono">
                {financeStats.statusCounts.Accepted}
              </span>
              <span className="text-xs text-slate-500">Accepted</span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              {financeStats.statusCounts.Draft} Drafts awaiting dispatch
            </span>
          </div>
        </div>
      </section>

      {/* 1. Quick-Action Cards Section */}
      <section aria-labelledby="quick-actions-heading" className="space-y-3">
        <h2 id="quick-actions-heading" className="text-sm font-semibold text-slate-900 tracking-tight">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <AdminCard
                key={qa.id}
                interactive
                onClick={qa.onClick}
                className="group border-slate-200 hover:border-slate-300"
                bodyClassName="p-4 sm:p-5 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#015557] group-hover:bg-[#015557] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-[#015557] transition-colors">
                      {qa.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#015557] transition-all" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {qa.description}
                  </p>
                </div>
              </AdminCard>
            );
          })}
        </div>
      </section>

      {/* 2. Recently Edited List Section */}
      <section aria-labelledby="recently-edited-heading">
        <AdminCard
          title="Recently Edited"
          subtitle="Audit log of the most recent content and configuration updates."
          action={
            <span className="text-xs text-slate-500">
              {recentlyEdited.length} recent events
            </span>
          }
        >
          <ul className="divide-y divide-slate-100" role="list">
            {recentlyEdited.map((item) => (
              <li
                key={item.id}
                className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 first:pt-0 last:pb-0"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.section}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>{item.user}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setRollbackItem(item)}
                    className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-400" />
                    <span>Rollback</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </AdminCard>
      </section>

      {/* 3. Shared Design System Reusable Component Showcases */}
      <section aria-labelledby="design-system-heading" className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 id="design-system-heading" className="text-sm font-semibold text-slate-900">
            Shared Admin Design System Components
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test and configure the unified reusable components used across all admin screens.
          </p>
        </div>

        {/* Component 1 & 3: AdminCard & AdminField */}
        <AdminCard
          title="General Site Information"
          subtitle="Essential company identification and contact details"
        >
          <div className="space-y-4">
            <AdminField
              label="Company Legal Name"
              value={brandName}
              onChange={setBrandName}
              required
              helpText="This is the full registered legal name shown in page footers and formal contracts."
              placeholder="Santa Towing & Garage Services Ltd."
            />

            <AdminField
              id="company-phone-field"
              label="Emergency Dispatch Phone"
              value={phone}
              onChange={setPhone}
              type="tel"
              required
              helpText="Primary 24/7 dispatch hotline dialled by customers in roadside emergencies."
              placeholder="0244753849"
            />
          </div>
        </AdminCard>

        {/* Component 4: AdminToggle */}
        <AdminCard
          title="Feature Switches & Service Visibility"
          subtitle="Enable or disable customer-facing features on the live website"
        >
          <div className="divide-y divide-slate-100">
            <AdminToggle
              label="Emergency Call Banner"
              description="Displays the high-visibility emergency dispatch phone bar across the top of every public page."
              checked={emergencyBannerActive}
              onChange={setEmergencyBannerActive}
            />

            <AdminToggle
              label="Online Towing Request Booking"
              description="Enables instant dispatch form submissions and quote calculators for road users."
              checked={onlineBookingEnabled}
              onChange={setOnlineBookingEnabled}
            />
          </div>
        </AdminCard>

        {/* Component 2 & 5: CollapsibleSection & AdminColorPicker */}
        <CollapsibleSection
          title="Brand Colors & Theme Styling"
          description="Customize the primary brand teal (#015557) and destructive red accents"
          defaultOpen={true}
        >
          <div className="space-y-5 pt-2">
            <AdminColorPicker
              label="Primary Brand Color"
              value={primaryColor}
              onChange={setPrimaryColor}
              helpText="Main brand color used for navigation, primary action buttons, and active tabs."
            />

            <AdminColorPicker
              label="Accent / Alert Color"
              value={accentColor}
              onChange={setAccentColor}
              helpText="Used exclusively for high-priority emergency alerts and callout highlights."
            />
          </div>
        </CollapsibleSection>

        {/* Component 6: AdminImagePicker */}
        <CollapsibleSection
          title="Brand Assets & Logo Manager"
          description="Upload and preview the official Santa Towing wordmark and icons"
          defaultOpen={false}
        >
          <div className="pt-2">
            <AdminImagePicker
              label="Company Header Logo"
              value={logoUrl}
              onChange={setLogoUrl}
              aspectRatio="auto"
              helpText="Recommended dimensions: 300x80px PNG with transparent background."
              presetImages={[
                { label: 'Original Santa Logo', url: 'https://i.ibb.co/KgkfFKV/Santa-Logo.png' },
                { label: 'Towing Fleet', url: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' },
                { label: 'Heavy Duty Recovery', url: 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg' },
                { label: 'Kia Sportage', url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png' },
              ]}
            />
          </div>
        </CollapsibleSection>

        {/* Component 7 & 8: ReorderableList & ConfirmDialog */}
        <AdminCard
          title="Priority Roadside Services"
          subtitle="Drag or use arrow buttons to organize high-priority services on the homepage"
        >
          <ReorderableList
            items={priorityServices}
            onChange={setPriorityServices}
            onAddItem={() => {
              const newId = String(Date.now());
              setPriorityServices((prev) => [
                ...prev,
                { id: newId, title: 'New Emergency Service', subtitle: 'Describe service availability' },
              ]);
              toast.info('Added new service item to the list');
            }}
            addLabel="Add roadside service"
          />
        </AdminCard>

        {/* Component 9: Toast Notifications Tester */}
        <AdminCard
          title="Toast Notifications Test Suite"
          subtitle="Verify user feedback alerts with auto-dismiss and accessible screen reader support"
        >
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toast.success('Changes saved successfully to live database!')}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
            >
              Trigger Success Toast
            </button>
            <button
              type="button"
              onClick={() => toast.error('Failed to validate contact phone format. Must be 10 digits.')}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-white bg-[#d80000] hover:bg-red-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              Trigger Error Toast
            </button>
            <button
              type="button"
              onClick={() =>
                toast.info('Item moved to draft queue', {
                  action: {
                    label: 'Undo Action',
                    onClick: () => toast.success('Action undone successfully!'),
                  },
                })
              }
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Trigger Info with Undo
            </button>
          </div>
        </AdminCard>

        {/* Component 10: EmptyState Demonstration */}
        <AdminCard
          title="Empty State Component"
          subtitle="Standard container for zero-data views, search misses, or clean states"
        >
          <EmptyState
            title="No Archived Requests Pending"
            description="All incoming towing requests and customer inquiries have been processed by the dispatch team."
            actionLabel="Create Dispatch Ticket"
            onAction={() => toast.info('Opened New Dispatch Ticket modal')}
            secondaryActionLabel="Refresh Queue"
            onSecondaryAction={() => toast.success('Ticket queue refreshed')}
          />
        </AdminCard>
      </section>

      {/* Rollback confirmation modal */}
      <ConfirmDialog
        isOpen={!!rollbackItem}
        title="Confirm Setting Rollback"
        description={`Are you sure you want to rollback "${rollbackItem?.title}"? This will revert this specific setting back to its original value.`}
        confirmLabel="Rollback Setting"
        cancelLabel="Cancel"
        isDestructive={false}
        onConfirm={handleConfirmRollback}
        onCancel={() => setRollbackItem(null)}
      />
    </AdminScreenLayout>
  );
}
