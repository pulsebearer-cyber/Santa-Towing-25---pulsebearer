// Santa Towing Document & Financial Records Management Storage
// Deterministic browser local storage with validation, auto-calculations, and seed data.

export interface Customer {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'Draft' | 'Issued' | 'Accepted' | 'Cancelled';

export interface ProFormaInvoice {
  id: string;
  docNumber: string; // e.g. PFI-202610-0001
  issueDate: string; // YYYY-MM-DD
  validUntil: string; // YYYY-MM-DD
  customerId?: string;
  customerName: string;
  customerCompany?: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxRate: number; // e.g. 15 for 15% VAT
  taxAmount: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  paymentInstructions: string;
  termsAndConditions: string;
  notes?: string;
  status: InvoiceStatus;
  createdAt: string;
  updatedAt: string;
}

export type ReceiptStatus = 'Issued' | 'Corrected' | 'Cancelled';

export type PaymentMethod =
  | 'Cash'
  | 'Bank Transfer'
  | 'Mobile Money (MoMo)'
  | 'Cheque'
  | 'Credit/Debit Card'
  | 'Other';

export interface Receipt {
  id: string;
  receiptNumber: string; // e.g. REC-202610-0001
  receiptDate: string; // YYYY-MM-DD
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  amountReceived: number;
  paymentMethod: PaymentMethod;
  paymentReference: string; // MoMo transaction ID, slip number, cheque number
  invoiceTotal?: number;
  remainingBalance?: number;
  notes?: string;
  status: ReceiptStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentSettings {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  phoneSecondary?: string;
  email: string;
  website: string;
  taxRegistrationNumber: string;
  logoUrl: string;
  primaryColor: string;
  currency: string;
  defaultValidityDays: number;
  defaultTaxRate: number;
  defaultPaymentInstructions: string;
  defaultTerms: string;
  defaultNotes: string;
  footerText: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: 'create' | 'edit' | 'delete' | 'status_change' | 'duplicate' | 'export' | 'import';
  entityType: 'invoice' | 'receipt' | 'customer' | 'image' | 'settings';
  entityId: string;
  entityTitle: string;
  user: string;
  details: string;
}

const STORAGE_KEYS = {
  INVOICES: 'santa_doc_invoices_v1',
  RECEIPTS: 'santa_doc_receipts_v1',
  CUSTOMERS: 'santa_doc_customers_v1',
  SETTINGS: 'santa_doc_settings_v1',
  LOGS: 'santa_doc_activity_logs_v1',
};

export const DEFAULT_SETTINGS: DocumentSettings = {
  companyName: 'Santa Towing & Garage Services Ltd.',
  tagline: '24/7 Rapid Emergency Towing, Inter-City Haulage & Auto Garage',
  address: 'Spintex Road, Near Coca-Cola Roundabout, P.O. Box SK 450, Accra, Ghana',
  phone: '0244753849',
  phoneSecondary: '0501234567',
  email: 'dispatch@santatowing.com',
  website: 'www.santatowing.com',
  taxRegistrationNumber: 'TIN: P0028475910',
  logoUrl: 'https://i.ibb.co/KgkfFKV/Santa-Logo.png',
  primaryColor: '#015557',
  currency: 'GH₵',
  defaultValidityDays: 14,
  defaultTaxRate: 15, // Standard Ghana VAT + NHIL/GETFund rate
  defaultPaymentInstructions:
    '1. MTN Mobile Money (Merchant ID): 0244753849 (Santa Towing & Garage Services)\n2. Ecobank Ghana: Account No: 1441002384920, Spintex Branch\n3. Cash payments accepted with verified stamped receipt.',
  defaultTerms:
    '1. This Pro Forma Invoice is valid for 14 calendar days from the date of issue.\n2. Roadside dispatch commences upon confirmed payment or purchase order acceptance.\n3. Fuel surcharges or statutory toll fees outside Greater Accra are included where itemized.\n4. Santa Towing warrants vehicle handling with comprehensive recovery insurance.',
  defaultNotes:
    'Thank you for trusting Santa Towing & Garage Services. For urgent dispatch updates, contact our 24/7 hotline at 0244753849.',
  footerText: 'Santa Towing & Garage Services Ltd. • Licensed Automobile Towing & Recovery Fleet • Accra, Ghana',
};

// Initial Seed Data for immediate testing and demonstration
const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Kwame Mensah',
    company: 'Golden Transport Logistics Ltd',
    phone: '0244123456',
    email: 'kwame@goldentransport.com.gh',
    address: 'Plot 44, Heavy Industrial Area, Tema, Ghana',
    notes: 'Regular logistics fleet partner. Prefers MoMo payments.',
    createdAt: '2026-10-15T08:30:00.000Z',
    updatedAt: '2026-10-15T08:30:00.000Z',
  },
  {
    id: 'cust-2',
    name: 'Akosua Boakye',
    company: 'Apex Consult Ltd',
    phone: '0208987654',
    email: 'akosua.b@apexconsult.com',
    address: 'Airport Residential Area, Accra, Ghana',
    notes: 'Toyota Prado recovery customer.',
    createdAt: '2026-10-18T11:15:00.000Z',
    updatedAt: '2026-10-18T11:15:00.000Z',
  },
  {
    id: 'cust-3',
    name: 'Emmanuel Osei',
    company: 'Prime Haulage & Mining Supplies',
    phone: '0553456789',
    email: 'e.osei@primemining.gh',
    address: 'Tarkwa Highway Depot, Western Region, Ghana',
    notes: 'Excavator and flatbed low-bed equipment transport.',
    createdAt: '2026-10-20T14:40:00.000Z',
    updatedAt: '2026-10-20T14:40:00.000Z',
  },
];

const SEED_INVOICES: ProFormaInvoice[] = [
  {
    id: 'inv-1',
    docNumber: 'PFI-202610-0001',
    issueDate: '2026-10-22',
    validUntil: '2026-11-05',
    customerId: 'cust-1',
    customerName: 'Kwame Mensah',
    customerCompany: 'Golden Transport Logistics Ltd',
    customerPhone: '0244123456',
    customerEmail: 'kwame@goldentransport.com.gh',
    customerAddress: 'Plot 44, Heavy Industrial Area, Tema, Ghana',
    items: [
      {
        id: 'item-1',
        description: 'Heavy Duty 30-Ton Low-Bed Haulage (Tema Port to Spintex Depot)',
        quantity: 1,
        unitPrice: 4500,
        total: 4500,
      },
      {
        id: 'item-2',
        description: 'Accident Scene Winching & Crane Lifting Assistance',
        quantity: 1,
        unitPrice: 1200,
        total: 1200,
      },
    ],
    subtotal: 5700,
    discountType: 'percentage',
    discountValue: 5,
    discountAmount: 285,
    taxRate: 15,
    taxAmount: 812.25,
    grandTotal: 6227.25,
    amountPaid: 6227.25,
    balanceDue: 0,
    paymentInstructions: DEFAULT_SETTINGS.defaultPaymentInstructions,
    termsAndConditions: DEFAULT_SETTINGS.defaultTerms,
    notes: 'Equipment secured and transported with hydraulic locking rig.',
    status: 'Accepted',
    createdAt: '2026-10-22T09:00:00.000Z',
    updatedAt: '2026-10-23T15:30:00.000Z',
  },
  {
    id: 'inv-2',
    docNumber: 'PFI-202610-0002',
    issueDate: '2026-10-24',
    validUntil: '2026-11-07',
    customerId: 'cust-2',
    customerName: 'Akosua Boakye',
    customerCompany: 'Apex Consult Ltd',
    customerPhone: '0208987654',
    customerEmail: 'akosua.b@apexconsult.com',
    customerAddress: 'Airport Residential Area, Accra, Ghana',
    items: [
      {
        id: 'item-3',
        description: 'Flatbed Emergency Towing (Airport Residential to Spintex Garage)',
        quantity: 1,
        unitPrice: 850,
        total: 850,
      },
      {
        id: 'item-4',
        description: 'Complete Vehicle Diagnostic Scan & Alternator Inspection',
        quantity: 1,
        unitPrice: 350,
        total: 350,
      },
    ],
    subtotal: 1200,
    discountType: 'fixed',
    discountValue: 0,
    discountAmount: 0,
    taxRate: 15,
    taxAmount: 180,
    grandTotal: 1380,
    amountPaid: 700,
    balanceDue: 680,
    paymentInstructions: DEFAULT_SETTINGS.defaultPaymentInstructions,
    termsAndConditions: DEFAULT_SETTINGS.defaultTerms,
    notes: 'Partial payment received. Balance due upon garage repair completion.',
    status: 'Issued',
    createdAt: '2026-10-24T10:15:00.000Z',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
  {
    id: 'inv-3',
    docNumber: 'PFI-202610-0003',
    issueDate: '2026-10-26',
    validUntil: '2026-11-09',
    customerId: 'cust-3',
    customerName: 'Emmanuel Osei',
    customerCompany: 'Prime Haulage & Mining Supplies',
    customerPhone: '0553456789',
    customerEmail: 'e.osei@primemining.gh',
    customerAddress: 'Tarkwa Highway Depot, Western Region, Ghana',
    items: [
      {
        id: 'item-5',
        description: 'Inter-City Long Distance Towing & Haulage (Accra to Kumasi Suame)',
        quantity: 1,
        unitPrice: 6800,
        total: 6800,
      },
      {
        id: 'item-6',
        description: 'Highway Security Escort & Toll Permitting',
        quantity: 1,
        unitPrice: 950,
        total: 950,
      },
    ],
    subtotal: 7750,
    discountType: 'percentage',
    discountValue: 10,
    discountAmount: 775,
    taxRate: 15,
    taxAmount: 1046.25,
    grandTotal: 8021.25,
    amountPaid: 0,
    balanceDue: 8021.25,
    paymentInstructions: DEFAULT_SETTINGS.defaultPaymentInstructions,
    termsAndConditions: DEFAULT_SETTINGS.defaultTerms,
    notes: 'Draft awaiting final equipment serial confirmation from client.',
    status: 'Draft',
    createdAt: '2026-10-26T16:00:00.000Z',
    updatedAt: '2026-10-26T16:00:00.000Z',
  },
];

const SEED_RECEIPTS: Receipt[] = [
  {
    id: 'rec-1',
    receiptNumber: 'REC-202610-0001',
    receiptDate: '2026-10-23',
    customerId: 'cust-1',
    customerName: 'Kwame Mensah',
    customerPhone: '0244123456',
    customerEmail: 'kwame@goldentransport.com.gh',
    customerAddress: 'Plot 44, Heavy Industrial Area, Tema, Ghana',
    invoiceId: 'inv-1',
    invoiceNumber: 'PFI-202610-0001',
    amountReceived: 6227.25,
    paymentMethod: 'Bank Transfer',
    paymentReference: 'ECO-TX-994827104',
    invoiceTotal: 6227.25,
    remainingBalance: 0,
    notes: 'Full payment cleared via Ecobank corporate transfer.',
    status: 'Issued',
    createdAt: '2026-10-23T15:30:00.000Z',
    updatedAt: '2026-10-23T15:30:00.000Z',
  },
  {
    id: 'rec-2',
    receiptNumber: 'REC-202610-0002',
    receiptDate: '2026-10-25',
    customerId: 'cust-2',
    customerName: 'Akosua Boakye',
    customerPhone: '0208987654',
    customerEmail: 'akosua.b@apexconsult.com',
    customerAddress: 'Airport Residential Area, Accra, Ghana',
    invoiceId: 'inv-2',
    invoiceNumber: 'PFI-202610-0002',
    amountReceived: 700,
    paymentMethod: 'Mobile Money (MoMo)',
    paymentReference: 'MM-ID-8839201948',
    invoiceTotal: 1380,
    remainingBalance: 680,
    notes: 'Initial 50% deposit received via MTN Mobile Money.',
    status: 'Issued',
    createdAt: '2026-10-25T12:00:00.000Z',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
];

const SEED_LOGS: ActivityLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-26T16:00:00.000Z',
    action: 'create',
    entityType: 'invoice',
    entityId: 'inv-3',
    entityTitle: 'PFI-202610-0003',
    user: 'Operations Manager',
    details: 'Created draft pro forma invoice for Emmanuel Osei (GH₵ 8,021.25)',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-25T12:00:00.000Z',
    action: 'create',
    entityType: 'receipt',
    entityId: 'rec-2',
    entityTitle: 'REC-202610-0002',
    user: 'Accounts Officer',
    details: 'Recorded MoMo deposit of GH₵ 700.00 for PFI-202610-0002',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-23T15:30:00.000Z',
    action: 'create',
    entityType: 'receipt',
    entityId: 'rec-1',
    entityTitle: 'REC-202610-0001',
    user: 'Accounts Officer',
    details: 'Received full settlement of GH₵ 6,227.25 for PFI-202610-0001',
  },
];

// Calculation helper
export function calculateInvoiceTotals(
  items: InvoiceItem[],
  discountType: 'percentage' | 'fixed',
  discountValue: number,
  taxRate: number
) {
  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unitPrice) || 0), 0);

  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = (subtotal * Math.max(0, Math.min(100, Number(discountValue) || 0))) / 100;
  } else {
    discountAmount = Math.max(0, Math.min(subtotal, Number(discountValue) || 0));
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * Math.max(0, Number(taxRate) || 0)) / 100;
  const grandTotal = Math.round((taxableAmount + taxAmount) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    grandTotal,
  };
}

// Storage Access Functions
export function getStoredSettings(): DocumentSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: DocumentSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  addActivityLog('edit', 'settings', 'settings', 'Document Settings', 'Updated company profile, billing terms, and branding');
}

export function getStoredCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(SEED_CUSTOMERS));
      return SEED_CUSTOMERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_CUSTOMERS;
  }
}

export function saveCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string): Customer {
  const customers = getStoredCustomers();
  const now = new Date().toISOString();

  if (existingId) {
    const idx = customers.findIndex((c) => c.id === existingId);
    if (idx !== -1) {
      const updated: Customer = {
        ...customers[idx],
        ...customerData,
        updatedAt: now,
      };
      customers[idx] = updated;
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
      addActivityLog('edit', 'customer', updated.id, updated.name, `Updated customer profile (${updated.phone})`);
      return updated;
    }
  }

  const newCustomer: Customer = {
    ...customerData,
    id: `cust-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  customers.unshift(newCustomer);
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  addActivityLog('create', 'customer', newCustomer.id, newCustomer.name, `Added new customer (${newCustomer.phone})`);
  return newCustomer;
}

export function deleteCustomer(id: string): { success: boolean; message?: string } {
  const invoices = getStoredInvoices();
  const hasLinkedInvoice = invoices.some((inv) => inv.customerId === id);
  if (hasLinkedInvoice) {
    return {
      success: false,
      message: 'Cannot delete customer because active pro forma invoices or receipts are linked to this profile.',
    };
  }

  const customers = getStoredCustomers();
  const target = customers.find((c) => c.id === id);
  const filtered = customers.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(filtered));
  if (target) {
    addActivityLog('delete', 'customer', id, target.name, `Removed customer profile`);
  }
  return { success: true };
}

export function getStoredInvoices(): ProFormaInvoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVOICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(SEED_INVOICES));
      return SEED_INVOICES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_INVOICES;
  }
}

export function generateDocNumber(prefix: 'PFI' | 'REC'): string {
  const d = new Date();
  const yearMonth = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;
  const prefixFull = `${prefix}-${yearMonth}-`;

  if (prefix === 'PFI') {
    const invoices = getStoredInvoices();
    const matching = invoices.filter((i) => i.docNumber.startsWith(prefixFull));
    const nextNum = matching.length + 1;
    return `${prefixFull}${String(nextNum).padStart(4, '0')}`;
  } else {
    const receipts = getStoredReceipts();
    const matching = receipts.filter((r) => r.receiptNumber.startsWith(prefixFull));
    const nextNum = matching.length + 1;
    return `${prefixFull}${String(nextNum).padStart(4, '0')}`;
  }
}

export function saveInvoice(invoice: ProFormaInvoice): ProFormaInvoice {
  const invoices = getStoredInvoices();
  const now = new Date().toISOString();
  const idx = invoices.findIndex((i) => i.id === invoice.id);

  if (idx !== -1) {
    invoices[idx] = { ...invoice, updatedAt: now };
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    addActivityLog('edit', 'invoice', invoice.id, invoice.docNumber, `Updated invoice for ${invoice.customerName} (Total: GH₵ ${invoice.grandTotal.toFixed(2)})`);
    return invoices[idx];
  } else {
    const newInvoice = { ...invoice, createdAt: now, updatedAt: now };
    invoices.unshift(newInvoice);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    addActivityLog('create', 'invoice', invoice.id, invoice.docNumber, `Generated Pro Forma Invoice for ${invoice.customerName} (Total: GH₵ ${invoice.grandTotal.toFixed(2)})`);
    return newInvoice;
  }
}

export function deleteInvoice(id: string): { success: boolean; message?: string } {
  const receipts = getStoredReceipts();
  const hasLinkedReceipt = receipts.some((r) => r.invoiceId === id);
  if (hasLinkedReceipt) {
    return {
      success: false,
      message: 'Cannot delete invoice because official receipts are linked to it. Please cancel or reassign the receipts first.',
    };
  }

  const invoices = getStoredInvoices();
  const target = invoices.find((i) => i.id === id);
  const filtered = invoices.filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(filtered));
  if (target) {
    addActivityLog('delete', 'invoice', id, target.docNumber, `Deleted invoice for ${target.customerName}`);
  }
  return { success: true };
}

export function duplicateInvoice(id: string): ProFormaInvoice | null {
  const invoices = getStoredInvoices();
  const original = invoices.find((i) => i.id === id);
  if (!original) return null;

  const newDocNumber = generateDocNumber('PFI');
  const now = new Date();
  const issueDate = now.toISOString().split('T')[0];
  const validUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const duplicated: ProFormaInvoice = {
    ...original,
    id: `inv-${Date.now()}`,
    docNumber: newDocNumber,
    issueDate,
    validUntil,
    amountPaid: 0,
    balanceDue: original.grandTotal,
    status: 'Draft',
    items: original.items.map((it) => ({ ...it, id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` })),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  invoices.unshift(duplicated);
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  addActivityLog('duplicate', 'invoice', duplicated.id, duplicated.docNumber, `Duplicated from ${original.docNumber}`);
  return duplicated;
}

export function updateInvoiceStatus(id: string, status: InvoiceStatus): void {
  const invoices = getStoredInvoices();
  const idx = invoices.findIndex((i) => i.id === id);
  if (idx !== -1) {
    const prevStatus = invoices[idx].status;
    invoices[idx].status = status;
    invoices[idx].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    addActivityLog('status_change', 'invoice', id, invoices[idx].docNumber, `Status changed from ${prevStatus} to ${status}`);
  }
}

export function getStoredReceipts(): Receipt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(SEED_RECEIPTS));
      return SEED_RECEIPTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_RECEIPTS;
  }
}

export function recalculateInvoicePayments(invoiceId?: string): void {
  if (!invoiceId) return;
  const invoices = getStoredInvoices();
  const receipts = getStoredReceipts();
  const invIdx = invoices.findIndex((i) => i.id === invoiceId);
  if (invIdx === -1) return;

  const validReceipts = receipts.filter(
    (r) => r.invoiceId === invoiceId && r.status !== 'Cancelled'
  );
  const totalPaid = validReceipts.reduce((sum, r) => sum + Number(r.amountReceived || 0), 0);
  const balanceDue = Math.max(0, invoices[invIdx].grandTotal - totalPaid);

  invoices[invIdx].amountPaid = Math.round(totalPaid * 100) / 100;
  invoices[invIdx].balanceDue = Math.round(balanceDue * 100) / 100;
  if (balanceDue === 0 && invoices[invIdx].status === 'Issued') {
    invoices[invIdx].status = 'Accepted';
  }
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
}

export function saveReceipt(receipt: Receipt): Receipt {
  const receipts = getStoredReceipts();
  const now = new Date().toISOString();
  const idx = receipts.findIndex((r) => r.id === receipt.id);

  if (idx !== -1) {
    receipts[idx] = { ...receipt, updatedAt: now };
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
    recalculateInvoicePayments(receipt.invoiceId);
    addActivityLog('edit', 'receipt', receipt.id, receipt.receiptNumber, `Updated receipt for ${receipt.customerName} (GH₵ ${receipt.amountReceived.toFixed(2)})`);
    return receipts[idx];
  } else {
    const newReceipt = { ...receipt, createdAt: now, updatedAt: now };
    receipts.unshift(newReceipt);
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
    recalculateInvoicePayments(receipt.invoiceId);
    addActivityLog('create', 'receipt', receipt.id, receipt.receiptNumber, `Issued Official Receipt for ${receipt.customerName} (GH₵ ${receipt.amountReceived.toFixed(2)})`);
    return newReceipt;
  }
}

export function deleteReceipt(id: string): { success: boolean } {
  const receipts = getStoredReceipts();
  const target = receipts.find((r) => r.id === id);
  const filtered = receipts.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(filtered));
  if (target) {
    recalculateInvoicePayments(target.invoiceId);
    addActivityLog('delete', 'receipt', id, target.receiptNumber, `Deleted receipt for ${target.customerName}`);
  }
  return { success: true };
}

export function getStoredActivityLogs(): ActivityLogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(SEED_LOGS));
      return SEED_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_LOGS;
  }
}

export function addActivityLog(
  action: ActivityLogItem['action'],
  entityType: ActivityLogItem['entityType'],
  entityId: string,
  entityTitle: string,
  details: string
): void {
  try {
    const logs = getStoredActivityLogs();
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      action,
      entityType,
      entityId,
      entityTitle,
      user: 'Admin Manager',
      details,
    };
    logs.unshift(newLog);
    // Keep max 200 logs
    const trimmed = logs.slice(0, 200);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to append activity log', err);
  }
}

// Financial Statistics Summary
export function getFinancialOverviewStats() {
  const invoices = getStoredInvoices();
  const receipts = getStoredReceipts();

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.status !== 'Cancelled' ? inv.grandTotal : 0), 0);
  const totalPaid = receipts.reduce((sum, rec) => sum + (rec.status !== 'Cancelled' ? rec.amountReceived : 0), 0);
  const outstandingBalance = Math.max(0, totalInvoiced - totalPaid);

  const statusCounts = {
    Draft: invoices.filter((i) => i.status === 'Draft').length,
    Issued: invoices.filter((i) => i.status === 'Issued').length,
    Accepted: invoices.filter((i) => i.status === 'Accepted').length,
    Cancelled: invoices.filter((i) => i.status === 'Cancelled').length,
  };

  const receiptsCount = receipts.filter((r) => r.status === 'Issued').length;

  return {
    totalInvoices: invoices.length,
    totalInvoiced,
    totalPaid,
    outstandingBalance,
    statusCounts,
    receiptsCount,
  };
}

// CSV Export Utilities
function escapeCsvCell(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export function exportInvoicesToCsv(): void {
  const invoices = getStoredInvoices();
  const headers = [
    'Document Number',
    'Issue Date',
    'Valid Until',
    'Customer Name',
    'Customer Company',
    'Customer Phone',
    'Customer Email',
    'Customer Address',
    'Items Summary',
    'Subtotal (GHS)',
    'Discount (GHS)',
    'Tax (GHS)',
    'Grand Total (GHS)',
    'Amount Paid (GHS)',
    'Balance Due (GHS)',
    'Status',
  ];

  const rows = invoices.map((inv) => [
    escapeCsvCell(inv.docNumber),
    escapeCsvCell(inv.issueDate),
    escapeCsvCell(inv.validUntil),
    escapeCsvCell(inv.customerName),
    escapeCsvCell(inv.customerCompany || ''),
    escapeCsvCell(inv.customerPhone),
    escapeCsvCell(inv.customerEmail || ''),
    escapeCsvCell(inv.customerAddress || ''),
    escapeCsvCell(inv.items.map((it) => `${it.quantity}x ${it.description}`).join('; ')),
    escapeCsvCell(inv.subtotal.toFixed(2)),
    escapeCsvCell(inv.discountAmount.toFixed(2)),
    escapeCsvCell(inv.taxAmount.toFixed(2)),
    escapeCsvCell(inv.grandTotal.toFixed(2)),
    escapeCsvCell(inv.amountPaid.toFixed(2)),
    escapeCsvCell(inv.balanceDue.toFixed(2)),
    escapeCsvCell(inv.status),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  downloadBlob(csvContent, `santa-invoices-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
  addActivityLog('export', 'invoice', 'csv', 'Invoices CSV Export', `Exported ${invoices.length} invoices to CSV`);
}

export function exportReceiptsToCsv(): void {
  const receipts = getStoredReceipts();
  const headers = [
    'Receipt Number',
    'Receipt Date',
    'Customer Name',
    'Customer Phone',
    'Customer Email',
    'Linked Invoice',
    'Amount Received (GHS)',
    'Payment Method',
    'Payment Reference',
    'Remaining Balance (GHS)',
    'Notes',
    'Status',
  ];

  const rows = receipts.map((rec) => [
    escapeCsvCell(rec.receiptNumber),
    escapeCsvCell(rec.receiptDate),
    escapeCsvCell(rec.customerName),
    escapeCsvCell(rec.customerPhone),
    escapeCsvCell(rec.customerEmail || ''),
    escapeCsvCell(rec.invoiceNumber || 'N/A'),
    escapeCsvCell(rec.amountReceived.toFixed(2)),
    escapeCsvCell(rec.paymentMethod),
    escapeCsvCell(rec.paymentReference),
    escapeCsvCell(rec.remainingBalance !== undefined ? rec.remainingBalance.toFixed(2) : '0.00'),
    escapeCsvCell(rec.notes || ''),
    escapeCsvCell(rec.status),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  downloadBlob(csvContent, `santa-receipts-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
  addActivityLog('export', 'receipt', 'csv', 'Receipts CSV Export', `Exported ${receipts.length} receipts to CSV`);
}

export function exportCustomersToCsv(): void {
  const customers = getStoredCustomers();
  const headers = ['Customer ID', 'Name', 'Company', 'Phone', 'Email', 'Address', 'Notes', 'Created At'];

  const rows = customers.map((c) => [
    escapeCsvCell(c.id),
    escapeCsvCell(c.name),
    escapeCsvCell(c.company || ''),
    escapeCsvCell(c.phone),
    escapeCsvCell(c.email || ''),
    escapeCsvCell(c.address || ''),
    escapeCsvCell(c.notes || ''),
    escapeCsvCell(c.createdAt),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  downloadBlob(csvContent, `santa-customers-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
  addActivityLog('export', 'customer', 'csv', 'Customers CSV Export', `Exported ${customers.length} customers to CSV`);
}

// Full Backup & Restore
export interface FullDocumentBackup {
  version: string;
  exportedAt: string;
  source: string;
  settings: DocumentSettings;
  customers: Customer[];
  invoices: ProFormaInvoice[];
  receipts: Receipt[];
  activityLogs: ActivityLogItem[];
}

export function createFullBackupJson(): string {
  const backup: FullDocumentBackup = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    source: 'Santa Towing Administrative Management Suite',
    settings: getStoredSettings(),
    customers: getStoredCustomers(),
    invoices: getStoredInvoices(),
    receipts: getStoredReceipts(),
    activityLogs: getStoredActivityLogs(),
  };
  return JSON.stringify(backup, null, 2);
}

export function downloadFullBackup(): void {
  const json = createFullBackupJson();
  const filename = `santa-towing-records-backup-${new Date().toISOString().split('T')[0]}.json`;
  downloadBlob(json, filename, 'application/json;charset=utf-8;');
  addActivityLog('export', 'settings', 'backup', 'System Backup', 'Downloaded full system JSON backup');
}

export function restoreFullBackup(jsonContent: string): { success: boolean; message: string; recordCounts?: { invoices: number; receipts: number; customers: number } } {
  try {
    const data = JSON.parse(jsonContent) as FullDocumentBackup;
    if (!data.invoices || !data.receipts || !data.customers) {
      return { success: false, message: 'Invalid backup file structure: missing required document arrays.' };
    }

    if (!Array.isArray(data.invoices) || !Array.isArray(data.receipts) || !Array.isArray(data.customers)) {
      return { success: false, message: 'Invalid backup format: document entities must be arrays.' };
    }

    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(data.invoices));
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(data.receipts));
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(data.customers));
    if (data.settings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }
    if (data.activityLogs && Array.isArray(data.activityLogs)) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(data.activityLogs));
    }

    addActivityLog('import', 'settings', 'restore', 'System Restore', `Restored ${data.invoices.length} invoices, ${data.receipts.length} receipts, and ${data.customers.length} customers.`);

    return {
      success: true,
      message: 'System records restored successfully from backup file.',
      recordCounts: {
        invoices: data.invoices.length,
        receipts: data.receipts.length,
        customers: data.customers.length,
      },
    };
  } catch (err: any) {
    return { success: false, message: `Failed to parse backup JSON: ${err?.message || 'Syntax error'}` };
  }
}

function downloadBlob(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
}
