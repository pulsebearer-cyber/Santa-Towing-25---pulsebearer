import React, { useState, useEffect } from 'react';
import {
  Database,
  Download,
  Upload,
  FileSpreadsheet,
  FileText,
  Receipt,
  Users,
  ShieldCheck,
  AlertTriangle,
  Clock,
  HardDrive,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import AdminScreenLayout from '../layout/AdminScreenLayout';
import AdminCard from '../components/AdminCard';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  downloadFullBackup,
  restoreFullBackup,
  getStoredInvoices,
  getStoredReceipts,
  getStoredCustomers,
  getStoredActivityLogs,
  ActivityLogItem,
  exportInvoicesToCsv,
  exportReceiptsToCsv,
  exportCustomersToCsv,
} from '@/lib/documentStorage';
import { useAdminToast } from '../context/AdminToastContext';

export default function AdminBackupExport() {
  const toast = useAdminToast();

  const [invoicesCount, setInvoicesCount] = useState(0);
  const [receiptsCount, setReceiptsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);

  // Restore file state
  const [restoreJsonContent, setRestoreJsonContent] = useState<string | null>(null);
  const [restoreConfirmOpen, setRestoreConfirmOpen] = useState(false);
  const [restoreDetails, setRestoreDetails] = useState<{ invoices: number; receipts: number; customers: number } | null>(null);

  const loadData = () => {
    setInvoicesCount(getStoredInvoices().length);
    setReceiptsCount(getStoredReceipts().length);
    setCustomersCount(getStoredCustomers().length);
    setLogs(getStoredActivityLogs());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Restore file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.invoices || !parsed.receipts || !parsed.customers) {
          toast.error('Invalid backup file: Missing required invoices, receipts, or customers.');
          return;
        }

        setRestoreDetails({
          invoices: parsed.invoices.length || 0,
          receipts: parsed.receipts.length || 0,
          customers: parsed.customers.length || 0,
        });
        setRestoreJsonContent(text);
        setRestoreConfirmOpen(true);
      } catch (err) {
        toast.error('Selected file is not valid JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Confirm Restore
  const handleConfirmRestore = () => {
    if (!restoreJsonContent) return;
    const res = restoreFullBackup(restoreJsonContent);
    if (res.success) {
      toast.success(res.message);
      setRestoreConfirmOpen(false);
      setRestoreJsonContent(null);
      loadData();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <AdminScreenLayout
      title="Data Backup, Export &amp; Audit Log"
      subtitle="Export corporate spreadsheet data (CSV), backup complete financial records (JSON), restore archived databases, and review activity logs."
      previewTitle="Data Integrity"
      preview={
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Total Managed Records
            </span>
            <span className="text-[11px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-600 font-sans">Pro Forma Invoices:</span>
              <span className="font-bold text-slate-900">{invoicesCount}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-600 font-sans">Official Receipts:</span>
              <span className="font-bold text-slate-900">{receiptsCount}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-slate-600 font-sans">Customer Profiles:</span>
              <span className="font-bold text-slate-900">{customersCount}</span>
            </div>
          </div>

          {/* Local Storage Disclosure */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1.5">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Storage Notice:</span>
            </span>
            <p className="text-amber-800 leading-relaxed text-[11px]">
              Records are saved locally in your browser storage. To ensure continuity across different computers, download regular JSON backups.
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Full JSON Backup & Restore Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* JSON Export */}
          <AdminCard
            title="Full System Backup (JSON)"
            subtitle="Download an encrypted JSON file with all invoices, receipts, customer records, and settings."
          >
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Creates an instantaneous complete snapshot of Santa Towing billing and customer records. Keep this file in a safe location or cloud drive for disaster recovery.
              </p>

              <button
                type="button"
                onClick={downloadFullBackup}
                className="w-full py-3 bg-[#015557] hover:bg-[#014345] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete JSON Backup</span>
              </button>
            </div>
          </AdminCard>

          {/* JSON Restore */}
          <AdminCard
            title="Restore from JSON Backup"
            subtitle="Import previously archived JSON backup file with structural verification."
          >
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload a verified Santa Towing JSON backup file. All entries will be validated before restoring into your database.
              </p>

              <label className="w-full py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Select Backup File to Restore</span>
                <input
                  type="file"
                  accept="application/json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </AdminCard>
        </div>

        {/* Spreadsheets (CSV) Exports */}
        <AdminCard
          title="Spreadsheet Exports (CSV)"
          subtitle="Download clean CSV spreadsheets compatible with Microsoft Excel, Google Sheets, or accounting software."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <button
              type="button"
              onClick={exportInvoicesToCsv}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#015557] hover:shadow-xs transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider">Invoices CSV</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Pro Forma Invoices</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Itemized towing services, tax rates, subtotals &amp; payment statuses.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-xs text-[#015557] font-semibold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Export ({invoicesCount} items)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={exportReceiptsToCsv}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#015557] hover:shadow-xs transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider">Receipts CSV</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Official Receipts</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Payment methods, MoMo references, bank slips &amp; settlements.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-xs text-[#015557] font-semibold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Export ({receiptsCount} items)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={exportCustomersToCsv}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#015557] hover:shadow-xs transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-wider">Customers CSV</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Customer Directory</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Corporate contacts, telephone numbers, emails &amp; addresses.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 text-xs text-[#015557] font-semibold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Export ({customersCount} items)</span>
              </div>
            </button>
          </div>
        </AdminCard>

        {/* Activity & Audit Trail History */}
        <AdminCard
          title="System Audit &amp; Activity Log"
          subtitle="Chronological record of document generation, edits, status updates, and data exports."
        >
          {logs.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4">No recent activity recorded.</p>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {logs.slice(0, 15).map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.entityTitle}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({log.entityType})
                      </span>
                    </div>
                    <p className="text-slate-600">{log.details}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>User: {log.user}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      {/* Confirm Restore Dialog */}
      <ConfirmDialog
        isOpen={restoreConfirmOpen}
        title="Confirm Database Restore?"
        description={`This will overwrite current document records with the backup file containing ${restoreDetails?.invoices} Invoices, ${restoreDetails?.receipts} Receipts, and ${restoreDetails?.customers} Customers. Are you sure you wish to proceed?`}
        confirmLabel="Restore Data"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmRestore}
        onCancel={() => {
          setRestoreConfirmOpen(false);
          setRestoreJsonContent(null);
        }}
      />
    </AdminScreenLayout>
  );
}
