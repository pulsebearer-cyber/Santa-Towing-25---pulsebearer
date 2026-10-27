import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Package,
  Palette,
  Sparkles,
  Link2,
  User,
  ExternalLink,
  Edit3,
  X,
  ShieldCheck,
  Receipt,
  Users,
  SlidersHorizontal,
  Settings,
  Database,
} from 'lucide-react';
import { getCurrentUser } from '../lib/auth';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const isStaffUser = currentUser?.role === 'staff';

  const navGroups: NavGroup[] = [
    {
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      label: 'DOCUMENTS & FINANCE',
      items: [
        { name: 'Pro Forma Invoices', href: '/admin/invoices', icon: FileText, badge: 'PFI' },
        { name: 'Official Receipts', href: '/admin/receipts', icon: Receipt, badge: 'REC' },
        { name: 'Customer Directory', href: '/admin/customers', icon: Users },
        { name: 'Document Templates', href: '/admin/doc-settings', icon: Settings },
      ],
    },
    {
      label: 'STUDIO & MEDIA',
      items: [
        { name: 'Image Studio', href: '/admin/image-studio', icon: SlidersHorizontal, badge: 'Studio' },
        { name: 'Site Images', href: '/admin/images', icon: ImageIcon },
        { name: 'Inventory', href: '/admin/inventory', icon: Package, badge: 'Live' },
      ],
    },
    {
      label: 'CONTENT & THEME',
      items: [
        { name: 'Pages & Text', href: '/admin/pages-text', icon: FileText },
        { name: 'Colors', href: '/admin/colors', icon: Palette },
        { name: 'Logo', href: '/admin/logo', icon: Sparkles },
      ],
    },
    {
      label: 'SYSTEM & SETTINGS',
      items: [
        { name: 'Data Backup & Export', href: '/admin/backup', icon: Database },
        { name: 'Links', href: '/admin/links', icon: Link2 },
        { name: 'Profile', href: '/admin/profile', icon: User },
      ],
    },
  ];

  const handleEditSite = () => {
    onClose();
    // Navigate to public site with edit=true parameter
    navigate('/?edit=true');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between shrink-0">
        <NavLink
          to="/admin"
          onClick={onClose}
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-[#015557] flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 tracking-tight block">
              Santa Towing
            </span>
            <span className="text-[11px] font-medium tracking-wider block -mt-0.5">
              {isStaffUser ? (
                <span className="text-amber-600 font-semibold uppercase">Staff Portal</span>
              ) : (
                <span className="text-slate-400 uppercase">Admin Console</span>
              )}
            </span>
          </div>
        </NavLink>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="lg:hidden p-2 text-slate-400 hover:text-slate-700 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6" aria-label="Admin Navigation">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.label && (
              <h3 className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
                {group.label}
              </h3>
            )}
            <ul className="space-y-1" role="list">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/admin'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between min-h-[44px] px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] ${
                        isActive
                          ? 'bg-[#015557] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <item.icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-white' : 'text-slate-400'
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Edit Site Button Section */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0">
        <button
          type="button"
          onClick={handleEditSite}
          className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#015557] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit site in Edit Mode</span>
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-2 leading-tight">
          Visual editing on live pages
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: Permanent fixed column */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Off-Canvas */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-200 ease-in-out shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Admin Navigation Menu"
      >
        {sidebarContent}
      </div>
    </>
  );
}
