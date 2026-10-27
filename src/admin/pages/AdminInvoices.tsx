import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Copy,
  Trash2,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  FileSpreadsheet,
  AlertCircle,
  ChevronDown,
  User,
  Receipt as ReceiptIcon,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import DocumentPreviewModal from '../components/documents/DocumentPreviewModal';
import {
  ProFormaInvoice,
  InvoiceItem,
  InvoiceStatus,
  Customer,
  getStoredInvoices,
  saveInvoice,
  deleteInvoice,
  duplicateInvoice,
  updateInvoiceStatus,
  getStoredCustomers,
  saveCustomer,
  generateDocNumber,
  calculateInvoiceTotals,
  getStoredSettings,
  exportInvoicesToCsv,
} from '@/lib/documentStorage';
import { useAdminToast } from '../context/AdminToastContext';

const STATUS_TABS: ('All' | InvoiceStatus)[] = ['All', 'Draft', 'Issued', 'Accepted', 'Cancelled'];

const SERVICE_PRESETS = [
  { desc: 'Flatbed Emergency Towing (Accra Metropolitan)', price: 750 },
  { desc: 'Heavy Duty 30-Ton Low-Bed Haulage (Tema to Spintex)', price: 4500 },
  { desc: 'Inter-City Highway Towing (Accra to Kumasi Suame)', price: 6800 },
  { desc: 'Accident Scene Hydraulic Recovery & Winching', price: 1500 },
  { desc: 'Roadside Battery Jumpstart & Rapid Mobile Diagnostics', price: 350 },
  { desc: 'Forklift & Construction Machinery Transport', price: 3200 },
  { desc: 'Commercial Fleet Maintenance Inspection (Per Vehicle)', price: 500 },
];

export default function AdminInvoices() {
  const toast = useAdminToast();
  const settings = getStoredSettings();

  const [invoices, setInvoices] = useState<ProFormaInvoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Search & Filter
  const [selectedStatus, setSelectedStatus] = useState<'All' | InvoiceStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [previewItem, setPreviewItem] = useState<ProFormaInvoice | null>(null);
  const [deletePendingItem, setDeletePendingItem] = useState<ProFormaInvoice | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    docNumber: string;
    issueDate: string;
    validUntil: string;
    customerId: string;
    customerName: string;
    customerCompany: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    items: InvoiceItem[];
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    taxRate: number;
    paymentInstructions: string;
    termsAndConditions: string;
    notes: string;
    status: InvoiceStatus;
    saveAsNewCustomer: boolean;
  }>({
    docNumber: '',
    issueDate: '',
    validUntil: '',
    customerId: '',
    customerName: '',
    customerCompany: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    items: [],
    discountType: 'percentage',
    discountValue: 0,
    taxRate: settings.defaultTaxRate,
    paymentInstructions: settings.defaultPaymentInstructions,
    termsAndConditions: settings.defaultTerms,
    notes: settings.defaultNotes,
    status: 'Draft',
    saveAsNewCustomer: false,
  });

  const loadData = () => {
    setInvoices(getStoredInvoices());
    setCustomers(getStoredCustomers());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesStatus = selectedStatus === 'All' || inv.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inv.docNumber.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        (inv.customerCompany && inv.customerCompany.toLowerCase().includes(q)) ||
        inv.customerPhone.includes(q) ||
        inv.items.some((it) => it.description.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [invoices, selectedStatus, searchQuery]);

  // Open Form for Create
  const handleOpenCreate = () => {
    const today = new Date().toISOString().split('T')[0];
    const validity = new Date(Date.now() + (settings.defaultValidityDays || 14) * 86400000)
      .toISOString()
      .split('T')[0];

    setEditingInvoiceId(null);
    setFormData({
      docNumber: generateDocNumber('PFI'),
      issueDate: today,
      validUntil: validity,
      customerId: '',
      customerName: '',
      customerCompany: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      items: [
        {
          id: `item-${Date.now()}`,
          description: 'Flatbed Emergency Towing (Accra Metropolitan)',
          quantity: 1,
          unitPrice: 750,
          total: 750,
        },
      ],
      discountType: 'percentage',
      discountValue: 0,
      taxRate: settings.defaultTaxRate,
      paymentInstructions: settings.defaultPaymentInstructions,
      termsAndConditions: settings.defaultTerms,
      notes: settings.defaultNotes,
      status: 'Draft',
      saveAsNewCustomer: false,
    });
    setIsEditorOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (inv: ProFormaInvoice) => {
    setEditingInvoiceId(inv.id);
    setFormData({
      docNumber: inv.docNumber,
      issueDate: inv.issueDate,
      validUntil: inv.validUntil,
      customerId: inv.customerId || '',
      customerName: inv.customerName,
      customerCompany: inv.customerCompany || '',
      customerPhone: inv.customerPhone,
      customerEmail: inv.customerEmail || '',
      customerAddress: inv.customerAddress || '',
      items: inv.items.map((it) => ({ ...it })),
      discountType: inv.discountType,
      discountValue: inv.discountValue,
      taxRate: inv.taxRate,
      paymentInstructions: inv.paymentInstructions || settings.defaultPaymentInstructions,
      termsAndConditions: inv.termsAndConditions || settings.defaultTerms,
      notes: inv.notes || '',
      status: inv.status,
      saveAsNewCustomer: false,
    });
    setIsEditorOpen(true);
  };

  // Select existing customer
  const handleCustomerSelect = (customerId: string) => {
    if (!customerId) {
      setFormData((prev) => ({
        ...prev,
        customerId: '',
      }));
      return;
    }
    const found = customers.find((c) => c.id === customerId);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        customerId: found.id,
        customerName: found.name,
        customerCompany: found.company || '',
        customerPhone: found.phone,
        customerEmail: found.email || '',
        customerAddress: found.address || '',
      }));
    }
  };

  // Line item handlers
  const handleItemChange = (index: number, field: keyof InvoiceItem, val: any) => {
    setFormData((prev) => {
      const items = [...prev.items];
      const item = { ...items[index], [field]: val };
      if (field === 'quantity' || field === 'unitPrice') {
        item.total = Math.round((Number(item.quantity) * Number(item.unitPrice) || 0) * 100) / 100;
      }
      items[index] = item;
      return { ...prev, items };
    });
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          description: '',
          quantity: 1,
          unitPrice: 0,
          total: 0,
        },
      ],
    }));
  };

  const handleRemoveItem = (index: number) => {
    if (formData.items.length <= 1) {
      toast.error('Invoice must contain at least one line item.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Computed Totals for Form
  const formTotals = useMemo(() => {
    return calculateInvoiceTotals(
      formData.items,
      formData.discountType,
      formData.discountValue,
      formData.taxRate
    );
  }, [formData.items, formData.discountType, formData.discountValue, formData.taxRate]);

  // Form Save
  const handleSaveInvoice = () => {
    if (!formData.customerName.trim()) {
      toast.error('Customer name is required.');
      return;
    }
    if (!formData.customerPhone.trim()) {
      toast.error('Customer phone number is required.');
      return;
    }
    if (formData.items.length === 0 || !formData.items[0].description.trim()) {
      toast.error('Please enter a description for at least one service item.');
      return;
    }

    let customerId = formData.customerId;

    // Optional save customer
    if (formData.saveAsNewCustomer && !customerId) {
      const newCust = saveCustomer({
        name: formData.customerName.trim(),
        company: formData.customerCompany.trim() || undefined,
        phone: formData.customerPhone.trim(),
        email: formData.customerEmail.trim() || undefined,
        address: formData.customerAddress.trim() || undefined,
      });
      customerId = newCust.id;
    }

    const invoiceToSave: ProFormaInvoice = {
      id: editingInvoiceId || `inv-${Date.now()}`,
      docNumber: formData.docNumber,
      issueDate: formData.issueDate,
      validUntil: formData.validUntil,
      customerId,
      customerName: formData.customerName.trim(),
      customerCompany: formData.customerCompany.trim() || undefined,
      customerPhone: formData.customerPhone.trim(),
      customerEmail: formData.customerEmail.trim() || undefined,
      customerAddress: formData.customerAddress.trim() || undefined,
      items: formData.items,
      subtotal: formTotals.subtotal,
      discountType: formData.discountType,
      discountValue: formData.discountValue,
      discountAmount: formTotals.discountAmount,
      taxRate: formData.taxRate,
      taxAmount: formTotals.taxAmount,
      grandTotal: formTotals.grandTotal,
      amountPaid: 0,
      balanceDue: formTotals.grandTotal,
      paymentInstructions: formData.paymentInstructions,
      termsAndConditions: formData.termsAndConditions,
      notes: formData.notes,
      status: formData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveInvoice(invoiceToSave);
    toast.success(
      editingInvoiceId
        ? `Updated invoice ${invoiceToSave.docNumber}.`
        : `Created Pro Forma Invoice ${invoiceToSave.docNumber}.`
    );
    setIsEditorOpen(false);
    loadData();
  };

  // Duplicate Invoice
  const handleDuplicate = (id: string) => {
    const dup = duplicateInvoice(id);
    if (dup) {
      toast.success(`Duplicated invoice as ${dup.docNumber} in Draft status.`);
      loadData();
    }
  };

  // Delete Invoice
  const handleConfirmDelete = () => {
    if (!deletePendingItem) return;
    const res = deleteInvoice(deletePendingItem.id);
    if (res.success) {
      toast.success(`Deleted invoice ${deletePendingItem.docNumber}.`);
      setDeletePendingItem(null);
      loadData();
    } else {
      toast.error(res.message || 'Failed to delete invoice.');
    }
  };

  // Quick Status Change
  const handleStatusChange = (id: string, newStatus: InvoiceStatus) => {
    updateInvoiceStatus(id, newStatus);
    toast.info(`Invoice status updated to ${newStatus}.`);
    loadData();
  };

  return (
    <AdminScreenLayout
      title="Pro Forma Invoices"
      subtitle="Issue formal quotes, estimate heavy haulage & towing fees, track payment statuses, and print standard A4 billing documents."
      previewTitle="Financial Snapshot"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Invoice Analytics
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              {invoices.length} Documents
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 block text-[11px]">Total Invoiced</span>
              <span className="text-base font-extrabold text-slate-900 font-mono">
                GH₵{' '}
                {invoices
                  .reduce((sum, i) => sum + (i.status !== 'Cancelled' ? i.grandTotal : 0), 0)
                  .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500 block text-[11px]">Outstanding Due</span>
              <span className="text-base font-extrabold text-[#d80000] font-mono">
                GH₵{' '}
                {invoices
                  .reduce((sum, i) => sum + (i.status !== 'Cancelled' ? i.balanceDue : 0), 0)
                  .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Status Breakdown Pills */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-semibold text-slate-700 block">Status Breakdown:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-emerald-700 font-medium">Accepted</span>
                <span className="font-mono font-bold">
                  {invoices.filter((i) => i.status === 'Accepted').length}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-blue-700 font-medium">Issued</span>
                <span className="font-mono font-bold">
                  {invoices.filter((i) => i.status === 'Issued').length}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-amber-700 font-medium">Draft</span>
                <span className="font-mono font-bold">
                  {invoices.filter((i) => i.status === 'Draft').length}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-red-700 font-medium">Cancelled</span>
                <span className="font-mono font-bold">
                  {invoices.filter((i) => i.status === 'Cancelled').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Control Bar: Search, Status Filters & Create Button */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by invoice number, customer name, phone, or service description..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportInvoicesToCsv}
                className="min-h-[44px] px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="min-h-[44px] px-4 py-2 bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create Pro Forma Invoice</span>
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-slate-100 pt-3 no-scrollbar">
            {STATUS_TABS.map((st) => {
              const count =
                st === 'All' ? invoices.length : invoices.filter((i) => i.status === st).length;
              const isActive = selectedStatus === st;

              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#015557] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{st}</span>
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

        {/* Invoices List / Table */}
        {filteredInvoices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No pro forma invoices found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create a new invoice or adjust your search filter.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors"
            >
              Create New Invoice
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600">
                    <th className="py-3 px-4 font-semibold">Document #</th>
                    <th className="py-3 px-4 font-semibold">Date / Validity</th>
                    <th className="py-3 px-4 font-semibold">Customer</th>
                    <th className="py-3 px-4 font-semibold text-right">Grand Total</th>
                    <th className="py-3 px-4 font-semibold text-right">Balance Due</th>
                    <th className="py-3 px-4 font-semibold text-center">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {inv.docNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono">
                        <div>{inv.issueDate}</div>
                        <div className="text-[10px] text-slate-400">Due: {inv.validUntil}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{inv.customerName}</div>
                        {inv.customerCompany && (
                          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                            {inv.customerCompany}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400">{inv.customerPhone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        GH₵ {inv.grandTotal.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono">
                        <span
                          className={`font-bold ${
                            inv.balanceDue > 0 ? 'text-[#d80000]' : 'text-emerald-700'
                          }`}
                        >
                          GH₵ {inv.balanceDue.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <select
                          value={inv.status}
                          onChange={(e) =>
                            handleStatusChange(inv.id, e.target.value as InvoiceStatus)
                          }
                          className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border cursor-pointer focus:outline-none ${
                            inv.status === 'Accepted'
                              ? 'bg-emerald-50 text-[#015557] border-emerald-200'
                              : inv.status === 'Issued'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : inv.status === 'Draft'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          <option value="Draft">Draft</option>
                          <option value="Issued">Issued</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(inv)}
                            className="p-1.5 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Preview / Print A4"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(inv)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Invoice"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(inv.id)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletePendingItem(inv)}
                            className="p-1.5 text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT INVOICE MODAL */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[94vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="h-16 px-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#015557] flex items-center justify-center text-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">
                    {editingInvoiceId ? `Edit Invoice: ${formData.docNumber}` : 'New Pro Forma Invoice'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Deterministic pricing, discount, and tax computation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800">
              {/* Row 1: Document Meta & Dates */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  1. Document Identification &amp; Schedule
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Document Number <span className="text-[#d80000]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.docNumber}
                      onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-slate-900 font-bold focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Issue Date</label>
                    <input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Validity Deadline</label>
                    <input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Initial Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as InvoiceStatus })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-[#015557]"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Issued">Issued</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Customer Selection / Input */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    2. Customer Details &amp; Contact
                  </span>
                  {customers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">Auto-fill from:</span>
                      <select
                        value={formData.customerId}
                        onChange={(e) => handleCustomerSelect(e.target.value)}
                        className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:ring-2 focus:ring-[#015557]"
                      >
                        <option value="">Select Existing Customer...</option>
                        {customers.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.company ? `(${c.company})` : ''} - {c.phone}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Customer Full Name <span className="text-[#d80000]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kwame Mensah"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Company Name <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Transport Logistics"
                      value={formData.customerCompany}
                      onChange={(e) =>
                        setFormData({ ...formData, customerCompany: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Phone Number <span className="text-[#d80000]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0244123456"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. kwame@goldentransport.com.gh"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700">
                      Physical Location / Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spintex Road, Near Coca-Cola Roundabout, Accra"
                      value={formData.customerAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, customerAddress: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                </div>

                {!formData.customerId && (
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.saveAsNewCustomer}
                      onChange={(e) =>
                        setFormData({ ...formData, saveAsNewCustomer: e.target.checked })
                      }
                      className="rounded accent-[#015557]"
                    />
                    <span className="text-slate-600 font-medium">
                      Save as new customer in customer directory
                    </span>
                  </label>
                )}
              </div>

              {/* Row 3: Dynamic Service Line Items */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    3. Towing &amp; Auto Services Itemized
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        const preset = SERVICE_PRESETS.find((p) => p.desc === e.target.value);
                        if (preset) {
                          setFormData((prev) => ({
                            ...prev,
                            items: [
                              ...prev.items,
                              {
                                id: `item-${Date.now()}`,
                                description: preset.desc,
                                quantity: 1,
                                unitPrice: preset.price,
                                total: preset.price,
                              },
                            ],
                          }));
                          e.target.value = '';
                        }
                      }}
                      className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 text-xs"
                    >
                      <option value="">Insert Standard Santa Service...</option>
                      {SERVICE_PRESETS.map((p) => (
                        <option key={p.desc} value={p.desc}>
                          {p.desc} (GH₵ {p.price})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="px-3 py-1 bg-[#015557] hover:bg-[#014345] text-white rounded font-semibold text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Row</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {formData.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="grid grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-lg border border-slate-200"
                    >
                      <div className="col-span-12 sm:col-span-6 space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">
                          Service Description #{idx + 1}
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          placeholder="e.g. Heavy Duty Winching & Haulage"
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-[#015557]"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">
                          Qty
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(idx, 'quantity', parseInt(e.target.value) || 1)
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 font-mono text-center focus:ring-2 focus:ring-[#015557]"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">
                          Unit Price (GH₵)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-900 font-mono text-right focus:ring-2 focus:ring-[#015557]"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-1 space-y-1 text-right">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block">
                          Total
                        </label>
                        <span className="font-mono font-bold text-slate-900 block py-1.5 text-xs truncate">
                          GH₵ {Number(item.total).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-span-1 sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1.5 text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mathematical Calculations Summary */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-6">
                  {/* Left: Discounts & Taxes inputs */}
                  <div className="space-y-3 flex-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Discount</label>
                        <div className="flex gap-1">
                          <select
                            value={formData.discountType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                discountType: e.target.value as 'percentage' | 'fixed',
                              })
                            }
                            className="px-2 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                          >
                            <option value="percentage">%</option>
                            <option value="fixed">GH₵</option>
                          </select>
                          <input
                            type="number"
                            min="0"
                            value={formData.discountValue}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                discountValue: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Tax Rate (%)</label>
                        <select
                          value={formData.taxRate}
                          onChange={(e) =>
                            setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono bg-white"
                        >
                          <option value="0">0% (Zero Rated / Tax Exempt)</option>
                          <option value="15">15% (Ghana VAT + Statutory Levies)</option>
                          <option value="18.5">18.5% (Comprehensive Tax &amp; COVID Levy)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right: Calculated Totals Column */}
                  <div className="w-full sm:w-64 space-y-1.5 font-mono text-xs border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-6 pt-3 sm:pt-0">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span>GH₵ {formTotals.subtotal.toFixed(2)}</span>
                    </div>
                    {formTotals.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount:</span>
                        <span>- GH₵ {formTotals.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {formTotals.taxAmount > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Tax ({formData.taxRate}%):</span>
                        <span>GH₵ {formTotals.taxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-t-2 border-[#015557] text-sm font-black text-[#015557]">
                      <span>Grand Total:</span>
                      <span>GH₵ {formTotals.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Terms, Remittance & Notes */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  4. Payment Instructions &amp; Service Terms
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Payment Instructions</label>
                    <textarea
                      rows={3}
                      value={formData.paymentInstructions}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentInstructions: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono text-[11px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Terms &amp; Conditions</label>
                    <textarea
                      rows={3}
                      value={formData.termsAndConditions}
                      onChange={(e) =>
                        setFormData({ ...formData, termsAndConditions: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-[11px]"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700">
                      Internal / Client Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Special hydraulic crane assistance requested"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Save Action */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500">
                Calculated Grand Total:{' '}
                <strong className="text-slate-900 font-mono">
                  GH₵ {formTotals.grandTotal.toFixed(2)}
                </strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveInvoice}
                  className="px-5 py-2 bg-[#015557] hover:bg-[#014345] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>{editingInvoiceId ? 'Update Invoice' : 'Create & Save Invoice'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewItem && (
        <DocumentPreviewModal
          document={previewItem}
          type="invoice"
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={!!deletePendingItem}
        title={`Delete Invoice ${deletePendingItem?.docNumber}?`}
        description={`Are you sure you want to delete invoice ${deletePendingItem?.docNumber} for ${deletePendingItem?.customerName}? This will permanently remove this record.`}
        confirmLabel="Delete Invoice"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePendingItem(null)}
      />
    </AdminScreenLayout>
  );
}
