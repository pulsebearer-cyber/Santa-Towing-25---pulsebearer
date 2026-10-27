import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building,
  FileText,
  Receipt as ReceiptIcon,
  Clock,
  ArrowRight,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  Customer,
  ProFormaInvoice,
  Receipt,
  getStoredCustomers,
  saveCustomer,
  deleteCustomer,
  getStoredInvoices,
  getStoredReceipts,
  exportCustomersToCsv,
} from '@/lib/documentStorage';
import { useAdminToast } from '../context/AdminToastContext';

export default function AdminCustomers() {
  const toast = useAdminToast();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<ProFormaInvoice[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected customer for full profile drawer
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Edit / Create modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  // Delete guard
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const loadData = () => {
    setCustomers(getStoredCustomers());
    setInvoices(getStoredInvoices());
    setReceipts(getStoredReceipts());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return customers.filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        c.phone.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.address && c.address.toLowerCase().includes(q))
      );
    });
  }, [customers, searchQuery]);

  // Compute metrics per customer
  const getCustomerStats = (customer: Customer) => {
    const custInvoices = invoices.filter(
      (inv) => inv.customerId === customer.id || inv.customerPhone === customer.phone
    );
    const custReceipts = receipts.filter(
      (r) => r.customerId === customer.id || r.customerPhone === customer.phone
    );

    const totalInvoiced = custInvoices.reduce(
      (sum, i) => sum + (i.status !== 'Cancelled' ? i.grandTotal : 0),
      0
    );
    const totalPaid = custReceipts.reduce(
      (sum, r) => sum + (r.status !== 'Cancelled' ? r.amountReceived : 0),
      0
    );
    const outstanding = Math.max(0, totalInvoiced - totalPaid);

    return {
      invoicesCount: custInvoices.length,
      receiptsCount: custReceipts.length,
      totalInvoiced,
      totalPaid,
      outstanding,
      invoices: custInvoices,
      receipts: custReceipts,
    };
  };

  // Open Create
  const handleOpenCreate = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    });
    setIsEditorOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      company: customer.company || '',
      phone: customer.phone,
      email: customer.email || '',
      address: customer.address || '',
      notes: customer.notes || '',
    });
    setIsEditorOpen(true);
  };

  // Save Customer
  const handleSaveCustomer = () => {
    if (!formData.name.trim()) {
      toast.error('Customer name is required.');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required.');
      return;
    }

    saveCustomer(
      {
        name: formData.name.trim(),
        company: formData.company.trim() || undefined,
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        address: formData.address.trim() || undefined,
        notes: formData.notes.trim() || undefined,
      },
      editingCustomer ? editingCustomer.id : undefined
    );

    toast.success(
      editingCustomer
        ? `Updated profile for "${formData.name.trim()}".`
        : `Created customer profile "${formData.name.trim()}".`
    );
    setIsEditorOpen(false);
    loadData();
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingCustomer) return;
    const res = deleteCustomer(deletingCustomer.id);
    if (res.success) {
      toast.success(`Removed customer profile "${deletingCustomer.name}".`);
      setDeletingCustomer(null);
      if (selectedCustomer?.id === deletingCustomer.id) {
        setSelectedCustomer(null);
      }
      loadData();
    } else {
      toast.error(res.message || 'Cannot delete customer.');
    }
  };

  return (
    <AdminScreenLayout
      title="Customer Directory"
      subtitle="Maintain customer contacts, manage commercial haulage clients, view billing histories, and track accounts receivable."
      previewTitle="Client Directory Snapshot"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Directory Overview
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              {customers.length} Accounts
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <span className="font-semibold text-slate-700 block">Seamless Billing Reuse:</span>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Customer profiles auto-populate billing addresses, phone numbers, and company names when creating new pro forma invoices and official receipts.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, corporate company, phone, or address..."
              className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportCustomersToCsv}
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
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        {/* Customer Directory Grid */}
        {filteredCustomers.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No customers found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add a new customer profile or adjust your search filter.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors"
            >
              Add New Customer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCustomers.map((cust) => {
              const stats = getCustomerStats(cust);

              return (
                <div
                  key={cust.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs p-5 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {cust.name}
                        </h3>
                        {cust.company && (
                          <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{cust.company}</span>
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(cust)}
                        className="p-1.5 text-slate-400 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View Billing History"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Coordinates */}
                    <div className="space-y-1 text-xs text-slate-600 pt-1">
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#015557] shrink-0" />
                        <span className="font-mono">{cust.phone}</span>
                      </p>
                      {cust.email && (
                        <p className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-[#015557] shrink-0" />
                          <span className="truncate">{cust.email}</span>
                        </p>
                      )}
                      {cust.address && (
                        <p className="flex items-start gap-2 text-[11px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#015557] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{cust.address}</span>
                        </p>
                      )}
                    </div>

                    {/* Billing Stats Bar */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-sans font-semibold">
                          Total Invoiced
                        </span>
                        <span className="font-bold text-slate-800">
                          GH₵ {stats.totalInvoiced.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-sans font-semibold">
                          Balance Due
                        </span>
                        <span
                          className={`font-bold ${
                            stats.outstanding > 0 ? 'text-[#d80000]' : 'text-emerald-700'
                          }`}
                        >
                          GH₵ {stats.outstanding.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(cust)}
                      className="font-semibold text-[#015557] hover:text-[#014345] flex items-center gap-1 transition-colors"
                    >
                      <span>{stats.invoicesCount} Invoices &bull; {stats.receiptsCount} Receipts</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(cust)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100 transition-colors"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingCustomer(cust)}
                        className="p-1.5 text-slate-400 hover:text-[#d80000] rounded hover:bg-red-50 transition-colors"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CUSTOMER BILLING HISTORY DRAWER / MODAL */}
      {selectedCustomer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base font-bold tracking-tight">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-400">
                  {selectedCustomer.company ? `${selectedCustomer.company} • ` : ''}
                  {selectedCustomer.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800">
              {/* Linked Invoices */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#015557]" />
                  <span>Linked Pro Forma Invoices</span>
                </h4>

                {getCustomerStats(selectedCustomer).invoices.length === 0 ? (
                  <p className="text-slate-400 italic py-2">No invoices issued to this customer yet.</p>
                ) : (
                  <div className="space-y-2">
                    {getCustomerStats(selectedCustomer).invoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-mono"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{inv.docNumber}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{inv.issueDate} &bull; {inv.items.length} service items</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">GH₵ {inv.grandTotal.toFixed(2)}</div>
                          <div className="text-[10px] text-slate-500 font-sans">
                            Status: <span className="font-semibold text-[#015557]">{inv.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Linked Receipts */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <ReceiptIcon className="w-4 h-4 text-[#015557]" />
                  <span>Payment Receipts Received</span>
                </h4>

                {getCustomerStats(selectedCustomer).receipts.length === 0 ? (
                  <p className="text-slate-400 italic py-2">No receipts recorded for this customer yet.</p>
                ) : (
                  <div className="space-y-2">
                    {getCustomerStats(selectedCustomer).receipts.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between font-mono"
                      >
                        <div>
                          <div className="font-bold text-[#015557]">{rec.receiptNumber}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{rec.receiptDate} &bull; {rec.paymentMethod}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-800">GH₵ {rec.amountReceived.toFixed(2)}</div>
                          <div className="text-[10px] text-slate-500 font-sans">Ref: {rec.paymentReference || 'N/A'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT CUSTOMER MODAL */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingCustomer ? 'Edit Customer Profile' : 'Add New Customer Profile'}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Full Name <span className="text-[#d80000]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#015557]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Company (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Golden Transport Logistics Ltd"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Phone Number <span className="text-[#d80000]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0244123456"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. kwame@goldentransport.com.gh"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Physical Address / Location</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Heavy Industrial Area, Plot 44, Tema"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Customer Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Prefers MoMo payments, fleet logistics coordinator"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomer}
                className="px-5 py-2 text-xs font-bold text-white bg-[#015557] hover:bg-[#014345] rounded-lg shadow-sm"
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={!!deletingCustomer}
        title={`Delete Customer "${deletingCustomer?.name}"?`}
        description={`Are you sure you want to remove ${deletingCustomer?.name} from the customer directory? If this customer has active invoices or receipts, deletion will be blocked to protect financial records.`}
        confirmLabel="Delete Customer"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingCustomer(null)}
      />
    </AdminScreenLayout>
  );
}
