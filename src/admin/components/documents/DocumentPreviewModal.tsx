import React, { useRef } from 'react';
import {
  Printer,
  Download,
  X,
  CheckCircle,
  FileText,
  Receipt as ReceiptIcon,
  Phone,
  Mail,
  Globe,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import {
  ProFormaInvoice,
  Receipt,
  DocumentSettings,
  getStoredSettings,
} from '@/lib/documentStorage';

interface DocumentPreviewModalProps {
  document: ProFormaInvoice | Receipt;
  type: 'invoice' | 'receipt';
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentPreviewModal({
  document,
  type,
  isOpen,
  onClose,
}: DocumentPreviewModalProps) {
  const settings = getStoredSettings();
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isInvoice = type === 'invoice';
  const invoice = isInvoice ? (document as ProFormaInvoice) : null;
  const receipt = !isInvoice ? (document as Receipt) : null;

  const docNumber = isInvoice ? invoice!.docNumber : receipt!.receiptNumber;
  const docDate = isInvoice ? invoice!.issueDate : receipt!.receiptDate;
  const customerName = document.customerName;
  const customerPhone = document.customerPhone;
  const customerEmail = document.customerEmail;
  const customerAddress = document.customerAddress;

  // Physical Browser Print
  const handlePrint = () => {
    window.print();
  };

  // High Fidelity Client-Side PDF Download using jsPDF
  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor = [1, 85, 87]; // #015557
    const darkColor = [19, 21, 20];
    const grayColor = [100, 116, 139];
    const lightBg = [248, 250, 252];

    let y = 18;

    // Header Color Accent Bar
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 6, 'F');

    // Company Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(settings.companyName, 14, y);

    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(settings.tagline, 14, y);

    y += 4;
    doc.text(`${settings.address} • Tel: ${settings.phone} / ${settings.phoneSecondary || ''}`, 14, y);
    y += 4;
    doc.text(`Email: ${settings.email} • Web: ${settings.website} • ${settings.taxRegistrationNumber}`, 14, y);

    // Document Title Banner on Right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const docTitle = isInvoice ? 'PRO FORMA INVOICE' : 'OFFICIAL RECEIPT';
    doc.text(docTitle, 196, 20, { align: 'right' });

    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`Doc #: ${docNumber}`, 196, 26, { align: 'right' });
    doc.text(`Date: ${docDate}`, 196, 31, { align: 'right' });
    if (isInvoice && invoice?.validUntil) {
      doc.text(`Valid Until: ${invoice.validUntil}`, 196, 36, { align: 'right' });
    }
    doc.text(`Status: ${document.status.toUpperCase()}`, 196, isInvoice ? 41 : 36, { align: 'right' });

    y += 10;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(14, y, 196, y);
    y += 6;

    // Bill To Customer Section
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.roundedRect(14, y, 182, 22, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('CUSTOMER / BILL TO:', 18, y + 6);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(customerName, 18, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    const contactLine = [customerPhone, customerEmail, customerAddress].filter(Boolean).join(' • ');
    doc.text(contactLine || 'Contact details on file', 18, y + 17);

    y += 28;

    // Itemized Table or Receipt Payment Details
    if (isInvoice && invoice) {
      // Table Header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(14, y, 182, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('Description of Towing & Auto Services', 18, y + 5);
      doc.text('Qty', 135, y + 5, { align: 'center' });
      doc.text('Unit Price (GHS)', 160, y + 5, { align: 'right' });
      doc.text('Total (GHS)', 192, y + 5, { align: 'right' });

      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

      invoice.items.forEach((item, index) => {
        if (index % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(14, y - 1, 182, 7, 'F');
        }
        doc.text(item.description, 18, y + 4);
        doc.text(String(item.quantity), 135, y + 4, { align: 'center' });
        doc.text(item.unitPrice.toFixed(2), 160, y + 4, { align: 'right' });
        doc.text(item.total.toFixed(2), 192, y + 4, { align: 'right' });
        y += 7;
      });

      y += 4;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, y, 196, y);
      y += 5;

      // Totals Box
      const totalsX = 130;
      doc.setFontSize(8.5);
      doc.text('Subtotal:', totalsX, y);
      doc.text(`GH₵ ${invoice.subtotal.toFixed(2)}`, 192, y, { align: 'right' });
      y += 5;

      if (invoice.discountAmount > 0) {
        doc.text(`Discount (${invoice.discountType === 'percentage' ? `${invoice.discountValue}%` : 'Fixed'}):`, totalsX, y);
        doc.text(`- GH₵ ${invoice.discountAmount.toFixed(2)}`, 192, y, { align: 'right' });
        y += 5;
      }

      if (invoice.taxAmount > 0) {
        doc.text(`Taxes (${invoice.taxRate}% VAT/Levies):`, totalsX, y);
        doc.text(`GH₵ ${invoice.taxAmount.toFixed(2)}`, 192, y, { align: 'right' });
        y += 5;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Grand Total:', totalsX, y + 2);
      doc.text(`GH₵ ${invoice.grandTotal.toFixed(2)}`, 192, y + 2, { align: 'right' });
      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text('Amount Paid:', totalsX, y);
      doc.text(`GH₵ ${invoice.amountPaid.toFixed(2)}`, 192, y, { align: 'right' });
      y += 5;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(invoice.balanceDue > 0 ? 216 : 1, invoice.balanceDue > 0 ? 0 : 85, invoice.balanceDue > 0 ? 0 : 87);
      doc.text('Balance Due:', totalsX, y);
      doc.text(`GH₵ ${invoice.balanceDue.toFixed(2)}`, 192, y, { align: 'right' });
      y += 10;
    } else if (receipt) {
      // Receipt Details Box
      doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      doc.roundedRect(14, y, 182, 34, 2, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('PAYMENT RECEIPT CONFIRMATION', 18, y + 8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(1, 85, 87);
      doc.text(`AMOUNT RECEIVED: GH₵ ${receipt.amountReceived.toFixed(2)}`, 18, y + 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(`Payment Method: ${receipt.paymentMethod}`, 18, y + 25);
      doc.text(`Reference / Transaction ID: ${receipt.paymentReference || 'N/A'}`, 18, y + 30);

      if (receipt.invoiceNumber) {
        doc.text(`Linked Pro Forma Invoice: ${receipt.invoiceNumber}`, 110, y + 25);
      }
      if (receipt.remainingBalance !== undefined) {
        doc.setFont('helvetica', 'bold');
        doc.text(`Remaining Balance: GH₵ ${receipt.remainingBalance.toFixed(2)}`, 110, y + 30);
      }

      y += 42;
    }

    // Payment Instructions & Terms
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT INSTRUCTIONS & REMITTANCE:', 14, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    const instructions = isInvoice
      ? invoice?.paymentInstructions || settings.defaultPaymentInstructions
      : settings.defaultPaymentInstructions;
    const splitInstructions = doc.splitTextToSize(instructions, 182);
    doc.text(splitInstructions, 14, y);
    y += splitInstructions.length * 4 + 4;

    if (isInvoice && invoice?.termsAndConditions) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('TERMS & CONDITIONS:', 14, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      const splitTerms = doc.splitTextToSize(invoice.termsAndConditions, 182);
      doc.text(splitTerms, 14, y);
      y += splitTerms.length * 3.5 + 6;
    }

    // Signature Area
    y = Math.max(y, 248);
    doc.setDrawColor(203, 213, 225);
    doc.line(14, y, 70, y);
    doc.line(135, y, 196, y);
    doc.setFontSize(7.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('Customer Acceptance Signature', 14, y + 4);
    doc.text('Santa Towing Authorised Signatory', 135, y + 4);

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(settings.footerText, 105, 290, { align: 'center' });

    doc.save(`${docNumber}.pdf`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[94vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Actions Strip */}
        <div className="h-16 px-6 bg-slate-900 text-white flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#015557] flex items-center justify-center text-white">
              {isInvoice ? <FileText className="w-4 h-4" /> : <ReceiptIcon className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                {isInvoice ? 'Pro Forma Invoice Preview' : 'Official Receipt Preview'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{docNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-4 py-1.5 bg-[#015557] hover:bg-[#014345] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex justify-center">
          {/* Printable A4 Canvas Container */}
          <div
            id="printable-document-root"
            ref={printAreaRef}
            className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-lg rounded-sm p-8 sm:p-12 text-slate-800 flex flex-col justify-between border border-slate-200"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <div>
              {/* Top Accent Strip */}
              <div className="h-2 w-full bg-[#015557] -mt-8 sm:-mt-12 -mx-8 sm:-mx-12 mb-8" />

              {/* Corporate Letterhead Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={settings.logoUrl}
                      alt={settings.companyName}
                      className="h-10 w-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-xl font-black text-[#015557] tracking-tight leading-tight">
                        {settings.companyName}
                      </h1>
                      <p className="text-xs font-medium text-slate-500">{settings.tagline}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 space-y-0.5 pt-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#015557] shrink-0" />
                      <span>{settings.address}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#015557] shrink-0" />
                        <span>{settings.phone} {settings.phoneSecondary && `/ ${settings.phoneSecondary}`}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#015557] shrink-0" />
                        <span>{settings.email}</span>
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {settings.taxRegistrationNumber} &bull; Website: {settings.website}
                    </p>
                  </div>
                </div>

                {/* Right Document Badge */}
                <div className="text-left sm:text-right space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200/80 min-w-[200px]">
                  <span className="text-base font-extrabold text-[#015557] tracking-wider block">
                    {isInvoice ? 'PRO FORMA INVOICE' : 'OFFICIAL RECEIPT'}
                  </span>
                  <div className="font-mono text-xs space-y-0.5 pt-1">
                    <p className="text-slate-900 font-bold">
                      <span className="text-slate-500 font-normal">No:</span> {docNumber}
                    </p>
                    <p className="text-slate-700">
                      <span className="text-slate-500 font-normal">Date:</span> {docDate}
                    </p>
                    {isInvoice && invoice?.validUntil && (
                      <p className="text-slate-700">
                        <span className="text-slate-500 font-normal">Valid Until:</span> {invoice.validUntil}
                      </p>
                    )}
                    <div className="pt-1">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          document.status === 'Accepted' || document.status === 'Issued'
                            ? 'bg-emerald-100 text-[#015557]'
                            : document.status === 'Draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {document.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bill To Customer Information */}
              <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Billed To / Customer Details:
                  </span>
                  <p className="text-sm font-bold text-slate-900">{customerName}</p>
                  {isInvoice && invoice?.customerCompany && (
                    <p className="font-semibold text-slate-700">{invoice.customerCompany}</p>
                  )}
                  {customerAddress && <p className="text-slate-600 mt-0.5">{customerAddress}</p>}
                </div>
                <div className="sm:text-right space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Contact Coordinates:
                  </span>
                  <p className="text-slate-800 font-medium">Tel: {customerPhone}</p>
                  {customerEmail && <p className="text-slate-600">{customerEmail}</p>}
                </div>
              </div>

              {/* Itemized Table for Invoice */}
              {isInvoice && invoice && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#015557] text-white">
                          <th className="py-2.5 px-3 font-semibold rounded-l-lg">Item / Service Description</th>
                          <th className="py-2.5 px-3 font-semibold text-center w-16">Qty</th>
                          <th className="py-2.5 px-3 font-semibold text-right w-28">Unit Price</th>
                          <th className="py-2.5 px-3 font-semibold text-right w-32 rounded-r-lg">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {invoice.items.map((it, idx) => (
                          <tr key={it.id || idx} className={idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                            <td className="py-3 px-3 font-medium text-slate-800 leading-relaxed">
                              {it.description}
                            </td>
                            <td className="py-3 px-3 text-center text-slate-700 font-mono">{it.quantity}</td>
                            <td className="py-3 px-3 text-right text-slate-700 font-mono">
                              GH₵ {Number(it.unitPrice).toFixed(2)}
                            </td>
                            <td className="py-3 px-3 text-right text-slate-900 font-bold font-mono">
                              GH₵ {Number(it.total).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Invoice Totals Breakdown */}
                  <div className="flex justify-end pt-2">
                    <div className="w-full sm:w-72 space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between py-1 text-slate-600">
                        <span>Subtotal:</span>
                        <span>GH₵ {invoice.subtotal.toFixed(2)}</span>
                      </div>
                      {invoice.discountAmount > 0 && (
                        <div className="flex justify-between py-1 text-emerald-700 font-semibold">
                          <span>
                            Discount ({invoice.discountType === 'percentage' ? `${invoice.discountValue}%` : 'Fixed'}):
                          </span>
                          <span>- GH₵ {invoice.discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {invoice.taxAmount > 0 && (
                        <div className="flex justify-between py-1 text-slate-600">
                          <span>Taxes &amp; Levies ({invoice.taxRate}%):</span>
                          <span>GH₵ {invoice.taxAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-t-2 border-[#015557] text-sm font-extrabold text-[#015557]">
                        <span>Grand Total:</span>
                        <span>GH₵ {invoice.grandTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 text-slate-600 border-t border-slate-100">
                        <span>Amount Paid:</span>
                        <span>GH₵ {invoice.amountPaid.toFixed(2)}</span>
                      </div>
                      <div
                        className={`flex justify-between py-1 font-bold ${
                          invoice.balanceDue > 0 ? 'text-[#d80000]' : 'text-emerald-700'
                        }`}
                      >
                        <span>Balance Due:</span>
                        <span>GH₵ {invoice.balanceDue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Receipt Specific Settlement Block */}
              {receipt && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#015557] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-[#015557]" />
                        Official Payment Settlement
                      </span>
                      <span className="text-xs font-bold font-mono text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
                        CONFIRMED
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 font-medium">Total Amount Received:</span>
                      <h2 className="text-3xl font-black text-[#015557] font-mono tracking-tight">
                        GH₵ {receipt.amountReceived.toFixed(2)}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-emerald-200/80 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block">Payment Method:</span>
                        <span className="font-bold text-slate-900">{receipt.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Reference / Slip #:</span>
                        <span className="font-bold text-slate-900">{receipt.paymentReference || 'N/A'}</span>
                      </div>
                      {receipt.invoiceNumber && (
                        <div>
                          <span className="text-slate-500 block">Linked Pro Forma Invoice:</span>
                          <span className="font-bold text-[#015557]">{receipt.invoiceNumber}</span>
                        </div>
                      )}
                      {receipt.remainingBalance !== undefined && (
                        <div>
                          <span className="text-slate-500 block">Remaining Invoice Balance:</span>
                          <span className="font-bold text-slate-900">
                            GH₵ {receipt.remainingBalance.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {receipt.notes && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-slate-700 block mb-1">Receipt Memo / Notes:</span>
                      <p className="text-slate-600 whitespace-pre-line">{receipt.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Remittance Instructions */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-[#015557] block uppercase tracking-wider text-[11px]">
                  Payment Remittance Instructions:
                </span>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                  {isInvoice
                    ? invoice?.paymentInstructions || settings.defaultPaymentInstructions
                    : settings.defaultPaymentInstructions}
                </p>
              </div>

              {/* Terms and conditions */}
              {isInvoice && invoice?.termsAndConditions && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                  <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                    Standard Service Terms:
                  </span>
                  <p className="text-slate-500 whitespace-pre-line leading-relaxed">
                    {invoice.termsAndConditions}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Signature & Footer */}
            <div className="pt-8 border-t border-slate-200 space-y-8 mt-8">
              <div className="grid grid-cols-2 gap-8 text-xs text-slate-500">
                <div>
                  <div className="border-b border-slate-300 h-10 w-44" />
                  <p className="mt-1 font-semibold text-slate-700">Customer Representative</p>
                  <p className="text-[10px]">Received &amp; Accepted</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="border-b border-slate-300 h-10 w-44" />
                  <p className="mt-1 font-semibold text-slate-700">Santa Towing Authorised Signatory</p>
                  <p className="text-[10px]">Managing Dispatcher / Accounts</p>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 font-mono">
                <p>{settings.footerText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
