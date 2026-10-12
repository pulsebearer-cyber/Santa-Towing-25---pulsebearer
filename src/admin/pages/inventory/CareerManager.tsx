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
  Briefcase,
  X,
  MapPin,
} from 'lucide-react';
import { InventoryCareer, generateSlug } from '@/data/inventoryDefaults';
import StringListField from './StringListField';
import ImageGalleryField from './ImageGalleryField';
import ConfirmDialog from '../../components/ConfirmDialog';
import AdminToggle from '../../components/AdminToggle';

interface CareerManagerProps {
  careers: InventoryCareer[];
  onChange: (careers: InventoryCareer[]) => void;
}

const DEPARTMENTS = [
  'Auto Repair',
  'Towing & Recovery',
  'Body Works',
  'Sales',
  'Customer Support',
  'Administration',
];

export default function CareerManager({ careers, onChange }: CareerManagerProps) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingCareer, setEditingCareer] = useState<InventoryCareer | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletePending, setDeletePending] = useState<InventoryCareer | null>(null);

  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || c.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleOpenAdd = () => {
    const nextId =
      careers.reduce((max, c) => (typeof c.id === 'number' && c.id > max ? c.id : max), 0) + 1;
    const newCareer: InventoryCareer = {
      id: nextId,
      slug: '',
      title: '',
      department: 'Auto Repair',
      location: 'Accra Main Workshop',
      type: 'Full-time',
      description: '',
      responsibilities: [
        'Perform daily assigned tasks according to safety and quality protocols.',
        'Collaborate with team leads and communicate effectively.'
      ],
      requirements: [
        'Relevant industry experience or vocational technical diploma.',
        'Punctual, dedicated, and safety-conscious work mindset.'
      ],
      benefits: [
        'Competitive compensation and performance bonuses',
        'Comprehensive health insurance'
      ],
      status: 'Open',
      hidden: false,
      images: [],
      seoTitle: '',
      seoDescription: ''
    };
    setEditingCareer(newCareer);
    setIsNew(true);
  };

  const handleOpenEdit = (career: InventoryCareer) => {
    setEditingCareer(JSON.parse(JSON.stringify(career)));
    setIsNew(false);
  };

  const handleToggleHide = (careerId: string | number) => {
    onChange(careers.map((c) => (c.id === careerId ? { ...c, hidden: !c.hidden } : c)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= careers.length) return;
    const copy = [...careers];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    onChange(copy);
  };

  const handleConfirmDelete = () => {
    if (!deletePending) return;
    onChange(careers.filter((c) => c.id !== deletePending.id));
    setDeletePending(null);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;

    let finalCareer = { ...editingCareer };
    if (!finalCareer.slug) {
      finalCareer.slug = generateSlug(finalCareer.title);
    }

    if (isNew) {
      onChange([finalCareer, ...careers]);
    } else {
      onChange(careers.map((c) => (c.id === finalCareer.id ? finalCareer : c)));
    }
    setEditingCareer(null);
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
              placeholder="Search jobs by title, department, location..."
              className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-800 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#015557] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              aria-label="Filter by department"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by job status"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015557]"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Plus className="w-4 h-4" />
          <span>Post Job</span>
        </button>
      </div>

      {/* Careers List */}
      {filteredCareers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-2xs">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No job openings found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {search ? 'Try adjusting your search query.' : 'Click "Post Job" to create a career vacancy.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCareers.map((career, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredCareers.length - 1;

            return (
              <div
                key={career.id}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                  career.hidden
                    ? 'bg-slate-50/80 border-slate-200 opacity-65'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Left: Role Details */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#015557] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Briefcase className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{career.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {career.department}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          career.status === 'Open'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : career.status === 'Closed'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {career.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {career.location}
                      </span>
                      <span>•</span>
                      <span>{career.type}</span>
                      <span>•</span>
                      <span>{career.responsibilities?.length || 0} Responsibilities</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">{career.description}</p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 self-end md:self-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end">
                  <a
                    href="/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View public careers page"
                    className="min-h-[38px] px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#015557] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleHide(career.id)}
                    title={career.hidden ? 'Unhide item on public website' : 'Hide from public website'}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      career.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {career.hidden ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{career.hidden ? 'Hidden' : 'Visible'}</span>
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
                    onClick={() => handleOpenEdit(career)}
                    title="Edit job vacancy"
                    className="p-2 text-slate-500 hover:text-[#015557] hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletePending(career)}
                    title="Delete vacancy"
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
      {editingCareer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#015557]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isNew ? 'Post New Career Opportunity' : `Edit: ${editingCareer.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCareer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  1. Role Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCareer.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingCareer((prev) =>
                          prev
                            ? {
                                ...prev,
                                title: val,
                                slug: isNew ? generateSlug(val) : prev.slug,
                              }
                            : null
                        );
                      }}
                      placeholder="e.g. Senior Master Technician"
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700">URL Slug</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingCareer((prev) =>
                            prev ? { ...prev, slug: generateSlug(prev.title) } : null
                          )
                        }
                        className="text-[11px] text-[#015557] hover:underline"
                      >
                        Generate from title
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editingCareer.slug}
                      onChange={(e) =>
                        setEditingCareer((prev) =>
                          prev ? { ...prev, slug: e.target.value } : null
                        )
                      }
                      placeholder="e.g. senior-master-technician"
                      className="w-full px-3.5 py-2 text-xs font-mono text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department
                    </label>
                    <select
                      value={editingCareer.department}
                      onChange={(e) =>
                        setEditingCareer((prev) =>
                          prev ? { ...prev, department: e.target.value } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={editingCareer.type}
                      onChange={(e) =>
                        setEditingCareer((prev) =>
                          prev ? { ...prev, type: e.target.value } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Position Status
                    </label>
                    <select
                      value={editingCareer.status}
                      onChange={(e) =>
                        setEditingCareer((prev) =>
                          prev ? { ...prev, status: e.target.value as any } : null
                        )
                      }
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCareer.location}
                    onChange={(e) =>
                      setEditingCareer((prev) =>
                        prev ? { ...prev, location: e.target.value } : null
                      )
                    }
                    placeholder="e.g. Accra Main Workshop, Spintex Road or Kumasi"
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role Summary / Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingCareer.description}
                    onChange={(e) =>
                      setEditingCareer((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                    placeholder="Briefly describe the role, team context, and purpose..."
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>

                <div className="pt-2">
                  <AdminToggle
                    label="Hide vacancy from public careers page"
                    description="When enabled, candidates will not see this listing."
                    checked={!!editingCareer.hidden}
                    onChange={(checked) =>
                      setEditingCareer((prev) =>
                        prev ? { ...prev, hidden: checked } : null
                      )
                    }
                  />
                </div>
              </div>

              {/* Responsibilities, Requirements & Benefits */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  2. Responsibilities, Requirements &amp; Benefits
                </h4>
                <StringListField
                  label="Core Responsibilities"
                  items={editingCareer.responsibilities || []}
                  onChange={(resp) =>
                    setEditingCareer((prev) =>
                      prev ? { ...prev, responsibilities: resp } : null
                    )
                  }
                  placeholder="Add responsibility..."
                />

                <StringListField
                  label="Requirements & Qualifications"
                  items={editingCareer.requirements || []}
                  onChange={(reqs) =>
                    setEditingCareer((prev) =>
                      prev ? { ...prev, requirements: reqs } : null
                    )
                  }
                  placeholder="Add qualification or experience..."
                />

                <StringListField
                  label="Benefits & Perks"
                  items={editingCareer.benefits || []}
                  onChange={(bens) =>
                    setEditingCareer((prev) =>
                      prev ? { ...prev, benefits: bens } : null
                    )
                  }
                  placeholder="Add benefit (e.g. Health insurance, Tool allowance)..."
                />
              </div>

              {/* Photos & SEO */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#015557]">
                  3. Workplace Photos &amp; SEO
                </h4>
                <ImageGalleryField
                  label="Workplace & Facility Photos"
                  images={editingCareer.images || []}
                  onChange={(imgs) =>
                    setEditingCareer((prev) =>
                      prev ? { ...prev, images: imgs } : null
                    )
                  }
                />

                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    value={editingCareer.seoTitle || ''}
                    onChange={(e) =>
                      setEditingCareer((prev) =>
                        prev ? { ...prev, seoTitle: e.target.value } : null
                      )
                    }
                    placeholder={`${editingCareer.title || 'Job'} Opening | Santa Towing Careers`}
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                  <textarea
                    rows={2}
                    value={editingCareer.seoDescription || ''}
                    onChange={(e) =>
                      setEditingCareer((prev) =>
                        prev ? { ...prev, seoDescription: e.target.value } : null
                      )
                    }
                    placeholder="SEO description for search engines..."
                    className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3 -mb-6 -mx-6 px-6">
                <button
                  type="button"
                  onClick={() => setEditingCareer(null)}
                  className="min-h-[42px] px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[42px] px-6 py-2 text-xs font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-2xs"
                >
                  {isNew ? 'Post Vacancy' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletePending}
        title="Delete Job Vacancy?"
        description={`Are you sure you want to delete the vacancy for "${deletePending?.title}"?`}
        confirmLabel="Delete vacancy"
        cancelLabel="Keep vacancy"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePending(null)}
      />
    </div>
  );
}
