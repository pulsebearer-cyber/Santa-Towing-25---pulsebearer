import React, { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  HelpCircle,
  X,
} from 'lucide-react';
import { InventoryFaq, generateSlug } from '@/data/inventoryDefaults';
import ConfirmDialog from '../../components/ConfirmDialog';
import AdminToggle from '../../components/AdminToggle';

interface FaqManagerProps {
  faqs: InventoryFaq[];
  onChange: (faqs: InventoryFaq[]) => void;
}

const FAQ_CATEGORIES = [
  'Towing',
  'Rentals',
  'Repairs',
  'Sales',
  'Parts',
  'Fleet',
  'Payments',
];

export default function FaqManager({ faqs, onChange }: FaqManagerProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingFaq, setEditingFaq] = useState<InventoryFaq | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletePending, setDeletePending] = useState<InventoryFaq | null>(null);

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    const nextId =
      faqs.reduce((max, f) => (typeof f.id === 'number' && f.id > max ? f.id : max), 0) + 1;
    const newFaq: InventoryFaq = {
      id: nextId,
      slug: '',
      category: 'Towing',
      q: '',
      a: '',
      status: 'Published',
      hidden: false,
      seoTitle: '',
      seoDescription: ''
    };
    setEditingFaq(newFaq);
    setIsNew(true);
  };

  const handleOpenEdit = (faq: InventoryFaq) => {
    setEditingFaq(JSON.parse(JSON.stringify(faq)));
    setIsNew(false);
  };

  const handleToggleHide = (faqId: string | number) => {
    onChange(faqs.map((f) => (f.id === faqId ? { ...f, hidden: !f.hidden } : f)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= faqs.length) return;
    const copy = [...faqs];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleConfirmDelete = () => {
    if (!deletePending) return;
    onChange(faqs.filter((f) => f.id !== deletePending.id));
    setDeletePending(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    let finalFaq = { ...editingFaq };
    if (!finalFaq.slug) {
      finalFaq.slug = generateSlug(finalFaq.q.substring(0, 40));
    }

    if (isNew) {
      onChange([finalFaq, ...faqs]);
    } else {
      onChange(faqs.map((f) => (f.id === finalFaq.id ? finalFaq : f)));
    }
    setEditingFaq(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs by question, answer, category..."
              className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#015557] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All FAQ Categories</option>
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQ List */}
      {filteredFaqs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-2xs">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No questions found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {search ? 'Try adjusting your search query.' : 'Click "Add FAQ" to create your first question & answer.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredFaqs.length - 1;

            return (
              <div
                key={faq.id}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  faq.hidden
                    ? 'bg-slate-50/80 border-slate-200 opacity-65'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Left: Question & Answer Preview */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#015557] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    Q
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {faq.category}
                      </span>
                      {faq.hidden && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{faq.a}</p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  <a
                    href="/faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public FAQ page"
                    className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#015557] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleHide(faq.id)}
                    title={faq.hidden ? 'Unhide item on public website' : 'Hide from public website'}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      faq.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {faq.hidden ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{faq.hidden ? 'Hidden' : 'Visible'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMove(index, 'up')}
                    title="Move up"
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMove(index, 'down')}
                    title="Move down"
                    className="p-2 text-slate-400 hover:text-slate-800 disabled:opacity-20 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(faq)}
                    title="Edit FAQ"
                    className="p-2 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletePending(faq)}
                    title="Delete FAQ"
                    className="p-2 text-slate-400 hover:text-[#d80000] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingFaq && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#015557]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isNew ? 'Add FAQ Item' : 'Edit FAQ Item'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  FAQ Category *
                </label>
                <select
                  value={editingFaq.category}
                  onChange={(e) =>
                    setEditingFaq((prev) => (prev ? { ...prev, category: e.target.value } : null))
                  }
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                >
                  {FAQ_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question (Title) *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.q}
                  onChange={(e) =>
                    setEditingFaq((prev) => (prev ? { ...prev, q: e.target.value } : null))
                  }
                  placeholder="e.g. How fast can you respond to a towing emergency?"
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.a}
                  onChange={(e) =>
                    setEditingFaq((prev) => (prev ? { ...prev, a: e.target.value } : null))
                  }
                  placeholder="Comprehensive, clear answer provided to customers..."
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              <div className="pt-2">
                <AdminToggle
                  label="Hide FAQ from public page"
                  description="When enabled, this question and answer will not be rendered on the FAQs page."
                  checked={!!editingFaq.hidden}
                  onChange={(checked) =>
                    setEditingFaq((prev) => (prev ? { ...prev, hidden: checked } : null))
                  }
                />
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  SEO &amp; Search Hints
                </h4>
                <input
                  type="text"
                  value={editingFaq.seoTitle || ''}
                  onChange={(e) =>
                    setEditingFaq((prev) => (prev ? { ...prev, seoTitle: e.target.value } : null))
                  }
                  placeholder="SEO Title (optional)"
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                />
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3 -mb-6 -mx-6 px-6">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="min-h-[42px] px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-6 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-2xs"
                >
                  {isNew ? 'Create FAQ' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletePending}
        title="Delete FAQ?"
        description={`Are you sure you want to delete "${deletePending?.q}"?`}
        confirmLabel="Delete question"
        cancelLabel="Keep question"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  );
}
