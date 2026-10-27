import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  RotateCcw,
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import AdminField from '../components/AdminField';
import CollapsibleSection from '../components/CollapsibleSection';
import {
  DocumentSettings,
  getStoredSettings,
  saveStoredSettings,
  DEFAULT_SETTINGS,
} from '@/lib/documentStorage';
import { useAdminToast } from '../context/AdminToastContext';

export default function AdminDocSettings() {
  const toast = useAdminToast();
  const [settings, setSettings] = useState<DocumentSettings>(getStoredSettings());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveStoredSettings(settings);
      setIsSaving(false);
      toast.success('Document template settings & company defaults saved successfully!');
    }, 300);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    toast.info('Reverted document template fields back to standard Santa Towing defaults.');
  };

  return (
    <AdminScreenLayout
      title="Document Templates &amp; Billing Settings"
      subtitle="Configure reusable corporate letterhead, payment remittance instructions, default validity periods, and statutory tax rates for invoices and receipts."
      previewTitle="Live Letterhead Preview"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Template Header Preview
            </span>
            <span className="text-[10px] font-bold text-white bg-[#015557] px-2 py-0.5 rounded">
              STANDARD A4
            </span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-[#015557] truncate">{settings.companyName}</h4>
                <p className="text-[10px] text-slate-500 truncate">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-1.5 leading-tight">
              {settings.address} &bull; {settings.phone}
            </p>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1.5">
            <span className="font-bold text-[#015557] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Historical Integrity Guaranteed</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Updating default settings here will populate all <em>future</em> invoices and receipts. Previously issued historical records preserve their exact frozen snapshot.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Company Identification */}
        <AdminCard
          title="Company Business Profile &amp; Letterhead"
          subtitle="Legal corporate entity name and contact details printed on invoice headers."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminField
                label="Registered Business Legal Name"
                value={settings.companyName}
                onChange={(val) => setSettings({ ...settings, companyName: val })}
                required
              />
              <AdminField
                label="Tagline / Fleet Specialty"
                value={settings.tagline}
                onChange={(val) => setSettings({ ...settings, tagline: val })}
              />
              <AdminField
                label="Primary Dispatch Hotline"
                value={settings.phone}
                onChange={(val) => setSettings({ ...settings, phone: val })}
                required
              />
              <AdminField
                label="Secondary / WhatsApp Phone"
                value={settings.phoneSecondary || ''}
                onChange={(val) => setSettings({ ...settings, phoneSecondary: val })}
              />
              <AdminField
                label="Official Dispatch Email"
                value={settings.email}
                onChange={(val) => setSettings({ ...settings, email: val })}
              />
              <AdminField
                label="Website URL"
                value={settings.website}
                onChange={(val) => setSettings({ ...settings, website: val })}
              />
              <div className="sm:col-span-2">
                <AdminField
                  label="Registered Physical Address / Depot Location"
                  value={settings.address}
                  onChange={(val) => setSettings({ ...settings, address: val })}
                  required
                />
              </div>
              <AdminField
                label="Tax Identification Number (TIN)"
                value={settings.taxRegistrationNumber}
                onChange={(val) => setSettings({ ...settings, taxRegistrationNumber: val })}
                required
              />
              <AdminField
                label="Header Logo Image URL"
                value={settings.logoUrl}
                onChange={(val) => setSettings({ ...settings, logoUrl: val })}
                required
              />
            </div>
          </div>
        </AdminCard>

        {/* Invoice & Pricing Defaults */}
        <AdminCard
          title="Invoicing &amp; Tax Defaults"
          subtitle="Initial parameters applied to newly created Pro Forma Invoices."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-800">Currency Symbol</label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-800">Default Validity (Days)</label>
              <input
                type="number"
                min="1"
                max="90"
                value={settings.defaultValidityDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultValidityDays: parseInt(e.target.value) || 14,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-800">Default Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={settings.defaultTaxRate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultTaxRate: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>
          </div>
        </AdminCard>

        {/* Default Payment Instructions & Terms */}
        <CollapsibleSection
          title="Payment Instructions &amp; Bank Remittance"
          description="Default mobile money merchant code and bank account wire instructions."
          defaultOpen={true}
        >
          <div className="space-y-4 pt-2 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800">
                Default Payment Instructions (Pre-filled on invoices)
              </label>
              <textarea
                rows={4}
                value={settings.defaultPaymentInstructions}
                onChange={(e) =>
                  setSettings({ ...settings, defaultPaymentInstructions: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800">
                Default Terms &amp; Conditions
              </label>
              <textarea
                rows={4}
                value={settings.defaultTerms}
                onChange={(e) => setSettings({ ...settings, defaultTerms: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Document Footer Banner Text</label>
              <input
                type="text"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#015557] hover:bg-[#014345] rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Template...' : 'Save Template Settings'}</span>
          </button>
        </div>
      </div>
    </AdminScreenLayout>
  );
}
