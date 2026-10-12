import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  ExternalLink,
  User,
  LogOut,
  Settings,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { logoutSession, getCurrentUser } from '../lib/auth';
import { useContent } from '@/hooks/useContent';

interface AdminTopBarProps {
  onToggleSidebar: () => void;
}

export default function AdminTopBar({ onToggleSidebar }: AdminTopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Current session user or configured fallback
  const currentUser = getCurrentUser();
  const savedDisplayName = useContent('admin.profile.displayName', 'Operations Admin');
  const photoUrl = useContent('admin.profile.photoUrl', '');
  const savedRole = useContent('admin.profile.role', 'Super Admin');
  const savedEmail = useContent('admin.profile.email', 'admin@santatowing.com');

  const displayName = currentUser?.name || savedDisplayName;
  const email = currentUser?.email || savedEmail;
  const role = currentUser?.role === 'staff' ? 'Staff Operations' : savedRole;

  // Compute initials for avatar fallback
  const getInitials = (name: string): string => {
    if (!name || !name.trim()) return 'AD';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleLogout = () => {
    setProfileOpen(false);
    logoutSession();
    navigate('/admin/login', { replace: true });
  };

  // Close profile dropdown on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [profileOpen]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left side: Hamburger toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open navigation sidebar"
          className="lg:hidden min-h-[44px] min-w-[44px] p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Santa Towing Admin
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#015557] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Console
          </span>
        </div>
      </div>

      {/* Right side: Preview site link, Logout & Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Preview site link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
        >
          <span>Preview site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {/* Prominent Direct Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out of admin session"
          title="Log out"
          className="min-h-[44px] px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log out</span>
        </button>

        {/* Profile Menu Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            aria-label="User profile menu"
            className="min-h-[44px] flex items-center gap-2 p-1.5 sm:px-3 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-[#015557] flex items-center justify-center shadow-xs">
              {photoUrl && !avatarError ? (
                <img
                  src={photoUrl}
                  alt={displayName}
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-xs">
                  {getInitials(displayName)}
                </span>
              )}
            </div>
            <div className="hidden md:block text-left max-w-[130px]">
              <span className="block text-xs font-semibold text-slate-900 leading-tight truncate">
                {displayName}
              </span>
              <span className="block text-[10px] text-slate-500 leading-tight truncate">
                {role}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                profileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-[#015557] flex items-center justify-center">
                  {photoUrl && !avatarError ? (
                    <img
                      src={photoUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {getInitials(displayName)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {email}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#015557] shrink-0" />
                    <span className="text-[10px] font-semibold text-slate-600 truncate">
                      {role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/admin/profile"
                  onClick={() => setProfileOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors min-h-[38px]"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  to="/admin/links"
                  onClick={() => setProfileOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors min-h-[38px]"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>General Preferences</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  role="menuitem"
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#d80000] hover:bg-red-50 transition-colors min-h-[38px] text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
