import React, { useState, useEffect, useMemo } from 'react';
import {
  Receipt as ReceiptIcon,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  AlertCircle,
  FileText,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import DocumentPreviewModal from '../components/documents/DocumentPreviewModal';
import {
  Receipt,
  ReceiptStatus,
  PaymentMethod,
  ProFormaInvoice,
  Customer,
  getStoredReceipts,
  saveReceipt,
  deleteReceipt,
  getStoredInvoices,
  getStoredCustomers,
  generateDocNumber,
  exportReceiptsToCsv,
} from '@/lib/documentStorage';
import { useAdminToast } from '../context/AdminToastContext';

const STATUS_TABS: ('All' | ReceiptStatus)[] = ['All', 'Issued', 'Corrected', 'Cancelled'];

const PAYMENT_METHODS: PaymentMethod[] = [
  'Mobile Money (MoMo)',
  'Bank Transfer',
  'Cash',
  'Cheque',
  'Credit/Debit Card',
  'Other',
];

export default function AdminReceipts() {
  const toast = useAdminToast();

  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [invoices, setInvoices] = useState<ProFormaInvoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Filters & Search
  const [selectedStatus, setSelectedStatus] = useState<'All' | ReceiptStatus>('All');
  const [selectedMethod, setSelectedMethod] = useState<'All' | PaymentMethod>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [previewItem, setPreviewItem] = useState<Receipt | null>(null);
  const [deletePendingItem, setDeletePendingItem] = useState<Receipt | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingReceiptId, setEditingReceiptId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    receiptNumber: string;
    receiptDate: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    invoiceId: string;
    invoiceNumber: string;
    invoiceTotal: number;
    amountReceived: number;
    paymentMethod: PaymentMethod;
    paymentReference: string;
    remainingBalance: number;
    notes: string;
    status: ReceiptStatus;
  }>({
    receiptNumber: '',
    receiptDate: '',
    customerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    invoiceId: '',
    invoiceNumber: '',
    invoiceTotal: 0,
    amountReceived: 0,
    paymentMethod: 'Mobile Money (MoMo)',
    paymentReference: '',
    remainingBalance: 0,
    notes: '',
    status: 'Issued',
  });

  const loadData = () => {
    setReceipts(getStoredReceipts());
    setInvoices(getStoredInvoices());
    setCustomers(getStoredCustomers());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Receipts
  const filteredReceipts = useMemo(() => {
    return receipts.filter((rec) => {
      const matchesStatus = selectedStatus === 'All' || rec.status === selectedStatus;
      const matchesMethod = selectedMethod === 'All' || rec.paymentMethod === selectedMethod;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rec.receiptNumber.toLowerCase().includes(q) ||
        rec.customerName.toLowerCase().includes(q) ||
        rec.customerPhone.includes(q) ||
        rec.paymentReference.toLowerCase().includes(q) ||
        (rec.invoiceNumber && rec.invoiceNumber.toLowerCase().includes(q));

      return matchesStatus && matchesMethod && matchesSearch;
    });
  }, [receipts, selectedStatus, selectedMethod, searchQuery]);

  // Open Form for New Receipt
  const handleOpenCreate = () => {
    const today = new Date().toISOString().split('T')[0];
    setEditingReceiptId(null);
    setFormData({
      receiptNumber: generateDocNumber('REC'),
      receiptDate: today,
      customerId: '',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      invoiceId: '',
      invoiceNumber: '',
      invoiceTotal: 0,
      amountReceived: 0,
      paymentMethod: 'Mobile Money (MoMo)',
      paymentReference: '',
      remainingBalance: 0,
      notes: 'Roadside assistance & recovery payment settlement.',
      status: 'Issued',
    });
    setIsEditorOpen(true);
  };

  // Open Form for Edit Receipt
  const handleOpenEdit = (rec: Receipt) => {
    setEditingReceiptId(rec.id);
    setFormData({
      receiptNumber: rec.receiptNumber,
      receiptDate: rec.receiptDate,
      customerId: rec.customerId || '',
      customerName: rec.customerName,
      customerPhone: rec.customerPhone,
      customerEmail: rec.customerEmail || '',
      customerAddress: rec.customerAddress || '',
      invoiceId: rec.invoiceId || '',
      invoiceNumber: rec.invoiceNumber || '',
      invoiceTotal: rec.invoiceTotal || 0,
      amountReceived: rec.amountReceived,
      paymentMethod: rec.paymentMethod,
      paymentReference: rec.paymentReference || '',
      remainingBalance: rec.remainingBalance !== undefined ? rec.remainingBalance : 0,
      notes: rec.notes || '',
      status: rec.status,
    });
    setIsEditorOpen(true);
  };

  // When Linked Invoice is Selected
  const handleInvoiceSelect = (invId: string) => {
    if (!invId) {
      setFormData((prev) => ({
        ...prev,
        invoiceId: '',
        invoiceNumber: '',
        invoiceTotal: 0,
      }));
      return;
    }

    const inv = invoices.find((i) => i.id === invId);
    if (inv) {
      const suggestAmount = inv.balanceDue > 0 ? inv.balanceDue : inv.grandTotal;
      const newRemaining = Math.max(0, inv.balanceDue - suggestAmount);

      setFormData((prev) => ({
        ...prev,
        invoiceId: inv.id,
        invoiceNumber: inv.docNumber,
        invoiceTotal: inv.grandTotal,
        amountReceived: suggestAmount,
        remainingBalance: newRemaining,
        customerId: inv.customerId || prev.customerId,
        customerName: inv.customerName,
        customerPhone: inv.customerPhone,
        customerEmail: inv.customerEmail || prev.customerEmail,
        customerAddress: inv.customerAddress || prev.customerAddress,
        notes: `Settlement for ${inv.docNumber}: ${inv.items.map((i) => i.description).join(', ')}`,
      }));
    }
  };

  // Amount Received changes recalculate remaining balance
  const handleAmountChange = (amount: number) => {
    setFormData((prev) => {
      let rem = 0;
      if (prev.invoiceId) {
        const inv = invoices.find((i) => i.id === prev.invoiceId);
        if (inv) {
          // If editing this receipt, discount previous amount
          rem = Math.max(0, inv.grandTotal - amount);
        }
      }
      return {
        ...prev,
        amountReceived: amount,
        remainingBalance: rem,
      };
    });
  };

  // Save Receipt
  const handleSaveReceipt = () => {
    if (!formData.customerName.trim()) {
      toast.error('Customer name is required.');
      return;
    }
    if (!formData.amountReceived || formData.amountReceived <= 0) {
      toast.error('Amount received must be greater than zero.');
      return;
    }

    const receiptToSave: Receipt = {
      id: editingReceiptId || `rec-${Date.now()}`,
      receiptNumber: formData.receiptNumber,
      receiptDate: formData.receiptDate,
      customerId: formData.customerId || undefined,
      customerName: formData.customerName.trim(),
      customerPhone: formData.customerPhone.trim(),
      customerEmail: formData.customerEmail.trim() || undefined,
      customerAddress: formData.customerAddress.trim() || undefined,
      invoiceId: formData.invoiceId || undefined,
      invoiceNumber: formData.invoiceNumber || undefined,
      amountReceived: formData.amountReceived,
      paymentMethod: formData.paymentMethod,
      paymentReference: formData.paymentReference.trim(),
      invoiceTotal: formData.invoiceTotal || undefined,
      remainingBalance: formData.remainingBalance,
      notes: formData.notes.trim() || undefined,
      status: formData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveReceipt(receiptToSave);
    toast.success(
      editingReceiptId
        ? `Updated receipt ${receiptToSave.receiptNumber}.`
        : `Issued official receipt ${receiptToSave.receiptNumber} for GH₵ ${receiptToSave.amountReceived.toFixed(2)}.`
    );
    setIsEditorOpen(false);
    loadData();
  };

  // Delete Receipt
  const handleConfirmDelete = () => {
    if (!deletePendingItem) return;
    deleteReceipt(deletePendingItem.id);
    toast.success(`Deleted receipt ${deletePendingItem.receiptNumber}.`);
    setDeletePendingItem(null);
    loadData();
  };

  return (
    <AdminScreenLayout
      title="Receipt Management"
      subtitle="Record customer payments, track mobile money transactions, link invoices, calculate remaining balances, and issue official receipts."
      previewTitle="Collections Snapshot"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Payment Metrics
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              {receipts.length} Receipts
            </span>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-slate-500 text-[11px]">Total Cash &amp; MoMo Collected</span>
            <h3 className="text-2xl font-black text-[#015557] font-mono tracking-tight">
              GH₵{' '}
              {receipts
                .reduce((sum, r) => sum + (r.status !== 'Cancelled' ? r.amountReceived : 0), 0)
                .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-semibold text-slate-700 block">Payment Methods:</span>
            <div className="space-y-1.5 text-[11px]">
              {PAYMENT_METHODS.slice(0, 4).map((m) => {
                const count = receipts.filter((r) => r.paymentMethod === m).length;
                return (
                  <div key={m} className="flex justify-between items-center text-slate-600">
                    <span>{m}</span>
                    <span className="font-mono font-bold text-slate-800">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Control Bar: Search, Method Filter & Create Button */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by receipt number, customer name, transaction ref, or invoice #..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportReceiptsToCsv}
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
                <span>Issue New Receipt</span>
              </button>
            </div>
          </div>

          {/* Status & Method Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {STATUS_TABS.map((st) => {
                const count =
                  st === 'All' ? receipts.length : receipts.filter((r) => r.status === st).length;
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

            {/* Method filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Method:</span>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
              >
                <option value="All">All Methods</option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Receipts Table */}
        {filteredReceipts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <ReceiptIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No payment receipts found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Issue a new receipt or clear your search filter.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors"
            >
              Issue New Receipt
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600">
                    <th className="py-3 px-4 font-semibold">Receipt #</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Customer</th>
                    <th className="py-3 px-4 font-semibold">Linked Invoice</th>
                    <th className="py-3 px-4 font-semibold">Payment Details</th>
                    <th className="py-3 px-4 font-semibold text-right">Amount Received</th>
                    <th className="py-3 px-4 font-semibold text-center">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReceipts.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {rec.receiptNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono">{rec.receiptDate}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{rec.customerName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{rec.customerPhone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {rec.invoiceNumber ? (
                          <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-100">
                            {rec.invoiceNumber}
                          </span>
                        ) : (
                          <span className="text-slate-400">Direct Payment</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{rec.paymentMethod}</div>
                        {rec.paymentReference && (
                          <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                            Ref: {rec.paymentReference}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 text-sm">
                        GH₵ {rec.amountReceived.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            rec.status === 'Issued'
                              ? 'bg-emerald-50 text-[#015557] border border-emerald-200'
                              : rec.status === 'Corrected'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(rec)}
                            className="p-1.5 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Preview / Print A4"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(rec)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Receipt"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletePendingItem(rec)}
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

      {/* CREATE / EDIT RECEIPT MODAL */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative max-w-2xl w-full max-h-[94vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-16 px-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#015557] flex items-center justify-center text-white">
                  <ReceiptIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">
                    {editingReceiptId ? `Edit Receipt: ${formData.receiptNumber}` : 'Issue Official Receipt'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Payment verification and outstanding balance settlement
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

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-800">
              {/* Linked Invoice Selector */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <span className="font-bold text-[#015557] uppercase tracking-wider text-[11px] block">
                  Link to Pro Forma Invoice (Recommended)
                </span>
                <select
                  value={formData.invoiceId}
                  onChange={(e) => handleInvoiceSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-[#015557]"
                >
                  <option value="">No Linked Invoice (Direct Standalone Receipt)</option>
                  {invoices
                    .filter((inv) => inv.status !== 'Cancelled')
                    .map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.docNumber} - {inv.customerName} (Total: GH₵ {inv.grandTotal.toFixed(2)}, Due: GH₵ {inv.balanceDue.toFixed(2)})
                      </option>
                    ))}
                </select>
                {formData.invoiceId && (
                  <p className="text-[11px] text-[#015557]">
                    Selected invoice balance will be automatically adjusted upon saving.
                  </p>
                )}
              </div>

              {/* Document Meta */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Receipt Number</label>
                  <input
                    type="text"
                    value={formData.receiptNumber}
                    onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Receipt Date</label>
                  <input
                    type="date"
                    value={formData.receiptDate}
                    onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Customer Information
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Customer Name <span className="text-[#d80000]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Phone Number <span className="text-[#d80000]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="e.g. 0244123456"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      placeholder="e.g. kwame@goldentransport.com.gh"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  Payment Settlement Coordinates
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">
                      Amount Received (GH₵) <span className="text-[#d80000]">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      value={formData.amountReceived}
                      onChange={(e) => handleAmountChange(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono font-bold text-base text-[#015557] focus:ring-2 focus:ring-[#015557]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium"
                    >
                      {PAYMENT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700">
                      Payment Reference / Transaction ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MoMo Transaction ID: 9948271048 or Ecobank Slip #"
                      value={formData.paymentReference}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentReference: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-slate-900"
                    />
                  </div>
                  {formData.invoiceId && (
                    <div className="col-span-2 p-2.5 bg-white border border-slate-200 rounded-lg flex justify-between font-mono">
                      <span className="text-slate-600">Calculated Remaining Balance:</span>
                      <span className="font-bold text-slate-900">
                        GH₵ {Number(formData.remainingBalance).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Memo Notes & Status */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Receipt Notes / Memo</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Roadside vehicle recovery completed"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Receipt Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as ReceiptStatus })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium"
                  >
                    <option value="Issued">Issued</option>
                    <option value="Corrected">Corrected</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-mono">
                Amount: <strong>GH₵ {Number(formData.amountReceived).toFixed(2)}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveReceipt}
                  className="px-5 py-2 bg-[#015557] hover:bg-[#014345] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <ReceiptIcon className="w-4 h-4" />
                  <span>{editingReceiptId ? 'Update Receipt' : 'Issue Official Receipt'}</span>
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
          type="receipt"
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={!!deletePendingItem}
        title={`Delete Receipt ${deletePendingItem?.receiptNumber}?`}
        description={`Are you sure you want to delete receipt ${deletePendingItem?.receiptNumber} for ${deletePendingItem?.customerName}? This will permanently remove this transaction record and restore any linked invoice balances.`}
        confirmLabel="Delete Receipt"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePendingItem(null)}
      />
    </AdminScreenLayout>
  );
}
