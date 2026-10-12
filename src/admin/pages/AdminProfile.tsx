import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Camera,
  Shield,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Download,
  Upload,
  RotateCcw,
  FileJson,
  Eye,
  EyeOff,
  Save,
  Building2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  HelpCircle,
  Info,
  ExternalLink,
  Check,
  RefreshCw,
  X,
  FileCheck,
} from 'lucide-react';
import AdminCard from '../components/AdminCard';
import AdminField from '../components/AdminField';
import AdminImagePicker from '../components/AdminImagePicker';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAdminToast } from '../context/AdminToastContext';
import { useContent, useContentManager } from '@/context/ContentContext';
import {
  getCurrentUser,
  updatePassword,
  AUTH_NOTICE,
  resetToDefaultAccounts,
} from '../lib/auth';
import {
  exportBackupData,
  importBackupData,
  getStorageStats,
  resetAll,
  getContent,
} from '@/lib/contentStorage';

type ActiveTab = 'profile' | 'business' | 'security' | 'backup';

// Quick avatar presets for instant professional admin identity selection
const AVATAR_PRESETS = [
  {
    label: 'Operations Lead',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    label: 'Dispatch Director',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    label: 'Safety Specialist',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    label: 'Fleet Manager',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    label: 'Support Officer',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
  },
];

interface StrengthResult {
  score: number; // 0 - 4
  label: 'Too Short' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
  percentage: number;
  criteria: {
    minLength: boolean;
    hasNumber: boolean;
    hasLetter: boolean;
    hasUpperAndLower: boolean;
    hasSpecial: boolean;
  };
}

function calculateStrength(pwd: string): StrengthResult {
  const trimmed = pwd.trim();
  const criteria = {
    minLength: trimmed.length >= 8,
    hasNumber: /\d/.test(trimmed),
    hasLetter: /[a-zA-Z]/.test(trimmed),
    hasUpperAndLower: /[a-z]/.test(trimmed) && /[A-Z]/.test(trimmed),
    hasSpecial: /[^a-zA-Z0-9]/.test(trimmed),
  };

  if (!trimmed || trimmed.length < 4) {
    return {
      score: 0,
      label: 'Too Short',
      color: 'bg-red-500',
      percentage: trimmed.length > 0 ? 15 : 0,
      criteria,
    };
  }

  let points = 1; // Passed min 4 chars
  if (criteria.minLength) points += 1;
  if (criteria.hasNumber && criteria.hasLetter) points += 1;
  if (criteria.hasUpperAndLower) points += 1;
  if (criteria.hasSpecial) points += 1;

  if (points <= 2) {
    return {
      score: 1,
      label: 'Weak',
      color: 'bg-red-500',
      percentage: 25,
      criteria,
    };
  } else if (points === 3) {
    return {
      score: 2,
      label: 'Medium',
      color: 'bg-amber-500',
      percentage: 55,
      criteria,
    };
  } else if (points === 4) {
    return {
      score: 3,
      label: 'Strong',
      color: 'bg-emerald-600',
      percentage: 80,
      criteria,
    };
  } else {
    return {
      score: 4,
      label: 'Very Strong',
      color: 'bg-emerald-500',
      percentage: 100,
      criteria,
    };
  }
}

export default function AdminProfile() {
  const toast = useAdminToast();
  const { setMultiple, set } = useContentManager();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const validTabs: ActiveTab[] = ['profile', 'business', 'security', 'backup'];
  const tabParam = searchParams.get('tab') as ActiveTab | null;
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    return tabParam && validTabs.includes(tabParam) ? tabParam : 'profile';
  });

  useEffect(() => {
    const currentParam = searchParams.get('tab') as ActiveTab | null;
    if (currentParam && validTabs.includes(currentParam)) {
      setActiveTabState(currentParam);
    }
  }, [searchParams]);

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    setSearchParams({ tab });
  };

  // Stored values from ContentContext
  const initialDisplayName = useContent('admin.profile.displayName', 'Operations Admin');
  const initialPhotoUrl = useContent('admin.profile.photoUrl', '');
  const initialRole = useContent('admin.profile.role', 'Super Admin');
  const initialAdminEmail = useContent('admin.profile.email', 'admin@santatowing.com');

  const initialBrandName = useContent('global.brand.name', 'Santa Towing & Garage Services Ltd.');
  const initialBrandShortName = useContent('global.brand.shortName', 'Santa Towing');
  const initialBrandTagline = useContent(
    'global.brand.tagline',
    '24/7 Emergency Towing, Haulage & Automotive Services in Ghana'
  );
  const initialContactPerson = useContent(
    'global.brand.contactPerson',
    'Kwame Mensah (Lead Operations Director)'
  );
  const initialPhone = useContent('global.links.phone', '0244753849');
  const initialEmail = useContent('global.links.email', 'info@santatowing.com');
  const initialAddress = useContent('global.links.address', '123 Spintex Road, Accra, Ghana');

  // Working state for Admin Profile
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [role, setRole] = useState(initialRole);
  const [adminEmail, setAdminEmail] = useState(initialAdminEmail);

  // Working state for Business Details
  const [brandName, setBrandName] = useState(initialBrandName);
  const [brandShortName, setBrandShortName] = useState(initialBrandShortName);
  const [brandTagline, setBrandTagline] = useState(initialBrandTagline);
  const [contactPerson, setContactPerson] = useState(initialContactPerson);
  const [phone, setPhone] = useState(initialPhone);
  const [businessEmail, setBusinessEmail] = useState(initialEmail);
  const [address, setAddress] = useState(initialAddress);

  // Password Form State
  const currentUser = getCurrentUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Backup & Restore State
  const [isDownloadingBackup, setIsDownloadingBackup] = useState(false);
  const [restoreConfirmOpen, setRestoreConfirmOpen] = useState(false);
  const [factoryResetConfirmOpen, setFactoryResetConfirmOpen] = useState(false);
  const [stagedBackupData, setStagedBackupData] = useState<{
    rawJson: string;
    totalKeys: number;
    fileName: string;
    exportedAt?: string;
    metadata?: Record<string, any>;
  } | null>(null);
  const [restoreMode, setRestoreMode] = useState<'merge' | 'replace'>('merge');

  // Saving states
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingBusiness, setIsSavingBusiness] = useState(false);

  // Storage metrics
  const stats = getStorageStats();
  const currentOverrides = getContent();
  const customOverridesCount = Object.keys(currentOverrides).length;

  // Unsaved changes detectors
  const profileHasChanges =
    displayName !== initialDisplayName ||
    photoUrl !== initialPhotoUrl ||
    role !== initialRole ||
    adminEmail !== initialAdminEmail;

  const businessHasChanges =
    brandName !== initialBrandName ||
    brandShortName !== initialBrandShortName ||
    brandTagline !== initialBrandTagline ||
    contactPerson !== initialContactPerson ||
    phone !== initialPhone ||
    businessEmail !== initialEmail ||
    address !== initialAddress;

  // Real-time strength calculator
  const strength = useMemo(() => calculateStrength(newPassword), [newPassword]);

  // Initials generator
  const getInitials = (name: string): string => {
    if (!name || !name.trim()) return 'AD';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // 1. Save Profile Settings
  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    const updates: Record<string, any> = {
      'admin.profile.displayName': displayName.trim() || 'Operations Admin',
      'admin.profile.photoUrl': photoUrl.trim(),
      'admin.profile.role': role.trim() || 'Super Admin',
      'admin.profile.email': adminEmail.trim() || 'admin@santatowing.com',
    };

    setMultiple(updates);
    setTimeout(() => {
      setIsSavingProfile(false);
      toast.success('Admin profile saved. Header and console identity updated.');
    }, 300);
  };

  const handleResetProfile = () => {
    setDisplayName(initialDisplayName);
    setPhotoUrl(initialPhotoUrl);
    setRole(initialRole);
    setAdminEmail(initialAdminEmail);
    toast.info('Admin profile form reverted.');
  };

  // 2. Save Business Details
  const handleSaveBusiness = () => {
    setIsSavingBusiness(true);
    const updates: Record<string, any> = {
      'global.brand.name': brandName.trim(),
      'global.brand.shortName': brandShortName.trim(),
      'global.brand.tagline': brandTagline.trim(),
      'global.brand.contactPerson': contactPerson.trim(),
      'global.links.phone': phone.trim(),
      'global.links.phoneDisplay': phone.trim(),
      'global.links.phoneTel': `tel:${phone.trim()}`,
      'global.links.email': businessEmail.trim(),
      'global.links.address': address.trim(),
    };

    setMultiple(updates);
    setTimeout(() => {
      setIsSavingBusiness(false);
      toast.success('Business details saved. Navigation, footer, and contact info updated live.');
    }, 300);
  };

  const handleResetBusiness = () => {
    setBrandName(initialBrandName);
    setBrandShortName(initialBrandShortName);
    setBrandTagline(initialBrandTagline);
    setContactPerson(initialContactPerson);
    setPhone(initialPhone);
    setBusinessEmail(initialEmail);
    setAddress(initialAddress);
    toast.info('Business details form reverted.');
  };

  // 3. Handle Passcode Change
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password to authorize this change.');
      return;
    }

    if (!newPassword || newPassword.trim().length < 6) {
      setPasswordError('New password must have at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match. Please verify and retype.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const emailToUpdate = currentUser?.email || adminEmail || 'demo.admin@example.com';
      const result = await updatePassword(emailToUpdate, currentPassword, newPassword);
      if (result.success) {
        toast.success('Password updated successfully! Your new admin access credentials are active.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(result.error || 'Failed to save the new password. Please check your current password.');
      }
    } catch (err) {
      setPasswordError('An unexpected error occurred while updating the password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // 4. Download Backup File
  const handleDownloadBackup = () => {
    setIsDownloadingBackup(true);
    try {
      const jsonBackup = exportBackupData({
        adminDisplayName: displayName,
        businessName: brandName,
        tagline: brandTagline,
        contactPerson,
      });

      const blob = new Blob([jsonBackup], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `santa-towing-backup-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        `Backup downloaded (${customOverridesCount} customized items saved to JSON).`
      );
    } catch (error) {
      toast.error('Failed to generate backup file.');
    } finally {
      setIsDownloadingBackup(false);
    }
  };

  // 5. Staged File Upload for Restore
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.json')) {
      toast.error('Invalid file type. Please select a JSON backup file (.json).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        let targetObj: Record<string, any> = {};
        let meta: Record<string, any> | undefined;
        let exportedAt: string | undefined;

        if (parsed && typeof parsed === 'object') {
          if (parsed.content && typeof parsed.content === 'object' && !Array.isArray(parsed.content)) {
            targetObj = parsed.content;
            meta = parsed.metadata;
            exportedAt = parsed.exportedAt;
          } else {
            targetObj = parsed;
          }
        }

        const keysCount = Object.keys(targetObj).length;
        if (keysCount === 0) {
          toast.error('This JSON backup does not contain any customization keys.');
          return;
        }

        setStagedBackupData({
          rawJson: text,
          totalKeys: keysCount,
          fileName: file.name,
          exportedAt,
          metadata: meta,
        });
        setRestoreConfirmOpen(true);
      } catch (err) {
        toast.error('Could not read file: JSON is corrupted or improperly formatted.');
      }
    };
    reader.readAsText(file);

    // Reset file input value so selecting the same file again works
    e.target.value = '';
  };

  // 6. Confirm and Execute Restore
  const handleConfirmRestore = () => {
    if (!stagedBackupData) return;

    const result = importBackupData(stagedBackupData.rawJson, restoreMode);
    if (result.success) {
      toast.success(
        `Successfully restored ${result.count} customizations from "${stagedBackupData.fileName}"!`
      );
      setRestoreConfirmOpen(false);
      setStagedBackupData(null);
    } else {
      toast.error(result.error || 'Failed to restore backup.');
    }
  };

  // 7. Factory Reset All Custom Content
  const handleConfirmFactoryReset = () => {
    const ok = resetAll();
    if (ok) {
      toast.info('Factory reset complete: All customizations reverted to site-content.json defaults.');
      setFactoryResetConfirmOpen(false);
      // Reload values in current form
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast.error('Failed to clear site storage.');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Page Title & Navigation Tabs */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#015557] border border-emerald-200 flex items-center justify-center shadow-xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Profile & Business Settings
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Manage administrator identity, site-wide business details, passcode credentials, and data backups.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Storage Badge & Download Backup Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBackup}
              disabled={isDownloadingBackup}
              className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#015557] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              title="Download JSON backup of all saved edits"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 border-b border-slate-200 -mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#015557] text-[#015557]'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Admin Profile & Photo</span>
            {profileHasChanges && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Unsaved edits" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('business')}
            className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'business'
                ? 'border-[#015557] text-[#015557]'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Business & Contact Details</span>
            {businessHasChanges && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Unsaved edits" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#015557] text-[#015557]'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Password & Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'backup'
                ? 'border-[#015557] text-[#015557]'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>Backup & Restore</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-mono">
              {customOverridesCount} keys
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form on the Left (7 cols), Contextual Live Preview on the Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Forms & Settings) */}
        <div className="lg:col-span-7 space-y-6">
          {/* TAB 1: ADMIN PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <AdminCard
                title="Administrator Profile & Header Identity"
                subtitle="Your name and photo will appear directly in the top right of the Admin Console header and in session dropdowns."
              >
                <div className="space-y-5">
                  {/* Photo Section with Live Avatar Preview & Image Picker */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Profile Photo
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      {/* Avatar preview circle */}
                      <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-[#015557] flex items-center justify-center">
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={displayName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="text-white font-bold text-2xl">
                            {getInitials(displayName)}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {displayName || 'Operations Admin'}
                          </span>
                          <span className="text-[10px] font-semibold text-[#015557] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            {role || 'Super Admin'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Choose from the quick avatars below, paste an image URL, or upload your personal portrait photo.
                        </p>
                      </div>
                    </div>

                    {/* Quick Avatar Presets */}
                    <div className="mt-3 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Quick Preset Avatars
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {AVATAR_PRESETS.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setPhotoUrl(preset.url)}
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              photoUrl === preset.url
                                ? 'border-[#015557] bg-emerald-50/60 ring-2 ring-[#015557]'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                            />
                            <span className="text-[11px] font-medium text-slate-700 truncate w-full">
                              {preset.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Image Picker */}
                    <div className="mt-4">
                      <AdminImagePicker
                        label="Custom Photo URL / Upload"
                        value={photoUrl}
                        onChange={setPhotoUrl}
                        aspectRatio="1:1"
                        helpText="Paste a web image URL or click 'Choose / Upload' to upload your own picture."
                      />
                    </div>
                  </div>

                  {/* Name, Role & Email */}
                  <AdminField
                    label="Administrator Display Name"
                    value={displayName}
                    onChange={setDisplayName}
                    placeholder="e.g. Operations Admin, Kwame Mensah"
                    helpText="Visible in the top navigation bar and session indicator."
                    required
                  />

                  <AdminField
                    label="Administrative Title / Role"
                    value={role}
                    onChange={setRole}
                    placeholder="e.g. Super Admin, Operations Director, Dispatch Manager"
                    helpText="Shows as a badge next to your name in the console."
                  />

                  <AdminField
                    label="Admin Contact Email"
                    type="email"
                    value={adminEmail}
                    onChange={setAdminEmail}
                    placeholder="admin@santatowing.com"
                    helpText="Used for internal administrative identity and notifications."
                  />

                  {/* Save Profile Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleResetProfile}
                      disabled={!profileHasChanges}
                      className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Discard</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile}
                      className="min-h-[44px] px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingProfile ? 'Saving...' : 'Save Profile Settings'}</span>
                    </button>
                  </div>
                </div>
              </AdminCard>
            </div>
          )}

          {/* TAB 2: BUSINESS DETAILS */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <AdminCard
                title="Business Details & Site-Wide Branding"
                subtitle="These details feed live into the website header, footer, hero banners, and the Contact & Dispatch directory."
              >
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-[#015557] flex items-start gap-2.5">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Changes made here instantly propagate across the public website, including page titles, header navigation, contact links, and footer disclaimers.
                    </p>
                  </div>

                  <AdminField
                    label="Official Business Name (Full Legal Name)"
                    value={brandName}
                    onChange={setBrandName}
                    placeholder="Santa Towing & Garage Services Ltd."
                    helpText="Displayed in the website footer copyright, legal policies, and corporate contracts."
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminField
                      label="Short Brand Name"
                      value={brandShortName}
                      onChange={setBrandShortName}
                      placeholder="Santa Towing"
                      helpText="Used in the navigation bar and mobile viewports."
                      required
                    />

                    <AdminField
                      label="Key Contact Person / Liaison"
                      value={contactPerson}
                      onChange={setContactPerson}
                      placeholder="Kwame Mensah (Lead Operations Director)"
                      helpText="Displayed on the Contact Us page as the designated operations liaison."
                      required
                    />
                  </div>

                  <AdminField
                    label="Company Tagline & Service Promise"
                    type="textarea"
                    rows={2}
                    value={brandTagline}
                    onChange={setBrandTagline}
                    placeholder="24/7 Emergency Towing, Haulage & Automotive Services in Ghana"
                    helpText="Visible on the homepage hero, about section, and footer overview."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AdminField
                      label="Primary Dispatch Hotline"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="0244753849"
                      helpText="Emergency telephone dialed by customers across Ghana."
                      required
                    />

                    <AdminField
                      label="Customer Support Email"
                      type="email"
                      value={businessEmail}
                      onChange={setBusinessEmail}
                      placeholder="info@santatowing.com"
                      helpText="Receives inquiries and quotation requests."
                      required
                    />
                  </div>

                  <AdminField
                    label="Headquarters Physical Address"
                    value={address}
                    onChange={setAddress}
                    placeholder="123 Spintex Road, Accra, Ghana"
                    helpText="Shown on contact pages and service location footers."
                  />

                  {/* Save Business Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleResetBusiness}
                      disabled={!businessHasChanges}
                      className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Discard</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveBusiness}
                      disabled={isSavingBusiness}
                      className="min-h-[44px] px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingBusiness ? 'Saving...' : 'Save Business Details'}</span>
                    </button>
                  </div>
                </div>
              </AdminCard>
            </div>
          )}

          {/* TAB 3: PASSCODE & SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password Card */}
              <AdminCard
                title="Change Administrator Password"
                subtitle="Update the password used to authenticate this administrative console session."
              >
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  {passwordError && (
                    <div
                      role="alert"
                      className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#d80000] flex items-start gap-2.5 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{passwordError}</span>
                    </div>
                  )}

                  {/* Active Account Identity Notice */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-800 block">Updating account for:</span>
                      <span className="font-mono text-slate-600">
                        {currentUser?.email || adminEmail || 'demo.admin@example.com'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#015557] uppercase">
                      {currentUser?.role || 'Super Admin'}
                    </span>
                  </div>

                  {/* Current Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Current Password <span className="text-[#d80000]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your existing password"
                        required
                        className="w-full min-h-[44px] px-3.5 pr-11 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Required to verify your authorization before changing credentials.
                    </p>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      New Password <span className="text-[#d80000]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Choose a strong new password (min. 6 chars)"
                        required
                        className="w-full min-h-[44px] px-3.5 pr-11 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Live Strength Hint Meter */}
                    {newPassword && (
                      <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700">Password Strength</span>
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] text-white ${strength.color}`}>
                            {strength.label}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${strength.color}`}
                            style={{ width: `${strength.percentage}%` }}
                          />
                        </div>

                        {/* Strength Criteria Checklist */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-600">
                          <div className="flex items-center gap-1.5">
                            {strength.criteria.minLength ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                            )}
                            <span className={strength.criteria.minLength ? 'text-emerald-800 font-medium' : ''}>
                              6+ characters
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {strength.criteria.hasNumber ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                            )}
                            <span className={strength.criteria.hasNumber ? 'text-emerald-800 font-medium' : ''}>
                              Includes numbers (0-9)
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {strength.criteria.hasUpperAndLower ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                            )}
                            <span className={strength.criteria.hasUpperAndLower ? 'text-emerald-800 font-medium' : ''}>
                              Upper &amp; lowercase
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {strength.criteria.hasSpecial ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                            )}
                            <span className={strength.criteria.hasSpecial ? 'text-emerald-800 font-medium' : ''}>
                              Special symbol (!@#$)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Confirm New Password <span className="text-[#d80000]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your new password"
                        required
                        className="w-full min-h-[44px] px-3.5 pr-11 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Match confirmation feedback */}
                    {confirmPassword && (
                      <p
                        className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${
                          newPassword === confirmPassword ? 'text-emerald-700' : 'text-[#d80000]'
                        }`}
                      >
                        {newPassword === confirmPassword ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Passwords match perfectly.</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Passwords do not match yet.</span>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#015557] hover:bg-[#014345] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{isUpdatingPassword ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </form>
              </AdminCard>

              {/* Password Architecture Notice */}
              <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 text-amber-950 space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-amber-950 leading-tight">
                      Authentication Architecture &amp; Credentials Notice
                    </h3>
                    <p className="text-xs text-amber-800 mt-1">
                      Salting, cryptographic hashing, and demo accounts overview.
                    </p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-amber-900 space-y-2.5 leading-relaxed">
                  <p>
                    <strong>Cryptographic Hashing:</strong> Credentials are authenticated using salted SHA-256 digests via the Web Crypto API. Passwords are never stored in plain text.
                  </p>
                  <p>
                    <strong>Demo Accounts Available:</strong> In testing or developer environments, use the preconfigured credentials:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-amber-900 space-y-1">
                    <li><strong>Administrator:</strong> <code>demo.admin@example.com</code> / <code>DemoAdmin@2026!</code> (Full access)</li>
                    <li><strong>Staff Operations:</strong> <code>demo.staff@example.com</code> / <code>DemoStaff@2026!</code> (Restricted access)</li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-amber-800 font-medium">
                    Protect your hard work before changing credentials:
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="w-full sm:w-auto min-h-[38px] px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Backup Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              {/* Download Backup */}
              <AdminCard
                title="Download Backup of Saved Edits"
                subtitle="Export all your custom page text, uploaded photos, pricing modifications, and links into a portable JSON file."
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Saved Overrides
                      </span>
                      <span className="text-xl font-bold text-slate-900 mt-1 block">
                        {customOverridesCount}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Estimated Size
                      </span>
                      <span className="text-xl font-bold text-slate-900 mt-1 block">
                        {Math.round(stats.usedBytes / 1024)} KB
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Browser Quota
                      </span>
                      <span className="text-xl font-bold text-[#015557] mt-1 block">
                        {stats.percentage}% used
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Downloading this file allows you to safely archive your website changes, migrate edits to another device or browser, or protect yourself before clearing browser cache.
                  </p>

                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    disabled={isDownloadingBackup}
                    className="min-h-[44px] px-5 py-2.5 bg-[#015557] hover:bg-[#014345] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup File</span>
                  </button>
                </div>
              </AdminCard>

              {/* Restore Backup */}
              <AdminCard
                title="Restore Backup from File"
                subtitle="Import and apply a previously downloaded backup JSON file to restore all website content."
              >
                <div className="space-y-4">
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Drag-and-drop / Click to select zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#015557] rounded-2xl p-6 sm:p-8 text-center transition-colors cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-[#015557] flex items-center justify-center mx-auto mb-3 transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Click to choose backup file or drag JSON here
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Accepts standard <code>.json</code> backup files exported from Santa Towing
                    </p>
                  </div>
                </div>
              </AdminCard>

              {/* Revert to Factory Defaults */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Revert to Factory Defaults
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clear all customized content overrides and restore original factory copy from <code>site-content.json</code>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFactoryResetConfirmOpen(true)}
                  className="min-h-[40px] px-4 py-2 bg-red-50 hover:bg-red-100 text-[#d80000] border border-red-200 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Factory Reset</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Contextual Live Preview Card */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Preview Card Header */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#015557]" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {activeTab === 'profile'
                    ? 'Header & Profile Preview'
                    : activeTab === 'business'
                    ? 'Public Brand & Liaison Preview'
                    : activeTab === 'security'
                    ? 'Security Credential Status'
                    : 'Storage & Backup Overview'}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Sync
              </span>
            </div>

            {/* Contextual Preview Content */}
            <div className="p-5 bg-slate-100/60 min-h-[340px] flex flex-col justify-center">
              {/* Preview 1: Header & Profile badge */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  {/* Mock Admin Header Bar */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Admin Console Header Lockup
                    </span>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-800">Santa Towing Admin</span>

                      {/* Header Avatar Button Preview */}
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-[#015557] flex items-center justify-center text-white font-bold text-xs">
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={displayName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            getInitials(displayName)
                          )}
                        </div>
                        <div className="text-left">
                          <span className="block text-[11px] font-bold text-slate-900 leading-tight">
                            {displayName || 'Operations Admin'}
                          </span>
                          <span className="block text-[9px] text-slate-500 leading-tight">
                            {role || 'Super Admin'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mock Dropdown preview */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Profile Dropdown Preview
                    </span>
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-[#015557] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={displayName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          getInitials(displayName)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {displayName || 'Operations Admin'}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {adminEmail || 'admin@santatowing.com'}
                        </p>
                        <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#015557] bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                          {role || 'Super Admin'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">
                      Clicking your avatar anywhere in the console opens this profile.
                    </p>
                  </div>
                </div>
              )}

              {/* Preview 2: Public Brand & Contact Liaison */}
              {activeTab === 'business' && (
                <div className="space-y-4">
                  {/* Public Brand Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Public Brand Identity
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{brandName}</h4>
                      <p className="text-xs text-[#015557] font-semibold mt-0.5">{brandShortName}</p>
                      <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                        &ldquo;{brandTagline}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-red-600" />
                        <span className="font-semibold text-slate-900">{phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#015557]" />
                        <span>{businessEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Liaison Preview */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 shadow-xs">
                    <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                      Official Contact Person Card (on /contact)
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#015557] text-white flex items-center justify-center font-bold text-sm">
                        {getInitials(contactPerson)}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{contactPerson}</h5>
                        <p className="text-[11px] text-slate-600">
                          {brandShortName} &middot; Dispatch & Client Relations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview 3: Security & Credentials Status */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Security System Status
                  </span>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-[#015557]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Password Auth Active
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Protected by salted SHA-256 Web Crypto
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Encryption Type</span>
                      <span className="font-mono text-slate-900 font-semibold">Salted SHA-256</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Active Account</span>
                      <span className="font-mono text-slate-900 font-semibold truncate max-w-[150px]">
                        {currentUser?.email || 'demo.admin@example.com'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Account Role</span>
                      <span className="font-semibold text-emerald-800 capitalize">
                        {currentUser?.role || 'admin'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Session Duration</span>
                      <span className="font-medium text-slate-900">8 Hours</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    Passwords are cryptographic hashes and never stored in plain text.
                  </p>
                </div>
              )}

              {/* Preview 4: Storage & Backup stats */}
              {activeTab === 'backup' && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Active Storage Telemetry
                  </span>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">Storage Consumption</span>
                      <span className="font-bold text-slate-900">{stats.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          stats.isNearlyFull ? 'bg-red-500' : 'bg-[#015557]'
                        }`}
                        style={{ width: `${Math.max(5, stats.percentage)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {Math.round(stats.usedBytes / 1024)} KB used of typical 5,120 KB browser capacity.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Customized keys:</span>
                      <span className="font-bold text-slate-900">{customOverridesCount}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Backup format:</span>
                      <span className="font-mono text-slate-900 font-semibold">JSON (v1.0 schema)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Your site state is healthy and ready for backup export.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RESTORE CONFIRMATION MODAL */}
      {restoreConfirmOpen && stagedBackupData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setRestoreConfirmOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#015557] flex items-center justify-center shrink-0 border border-emerald-200">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Restore Backup File?
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Review backup details before applying changes
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRestoreConfirmOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Staged file summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">File Name:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {stagedBackupData.fileName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customizations in file:</span>
                  <span className="font-bold text-[#015557]">
                    {stagedBackupData.totalKeys} items
                  </span>
                </div>
                {stagedBackupData.exportedAt && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Backup Created:</span>
                    <span className="text-slate-700">
                      {new Date(stagedBackupData.exportedAt).toLocaleString()}
                    </span>
                  </div>
                )}
                {stagedBackupData.metadata?.businessName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Associated Business:</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                      {stagedBackupData.metadata.businessName}
                    </span>
                  </div>
                )}
              </div>

              {/* Mode Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Restore Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRestoreMode('merge')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      restoreMode === 'merge'
                        ? 'border-[#015557] bg-emerald-50/70 ring-1 ring-[#015557]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-900">
                      Merge (Recommended)
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Combines backup with current customizations.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRestoreMode('replace')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      restoreMode === 'replace'
                        ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="block text-xs font-bold text-slate-900">
                      Full Replace
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Replaces all current edits with this backup file.
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setRestoreConfirmOpen(false)}
                className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="min-h-[44px] px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#015557] hover:bg-[#014345] rounded-lg transition-colors shadow-xs"
              >
                Apply & Restore Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FACTORY RESET CONFIRMATION MODAL */}
      <ConfirmDialog
        isOpen={factoryResetConfirmOpen}
        title="Revert All Content to Factory Defaults?"
        description="This will clear all custom edits, uploaded photos, color palettes, and pricing overrides from this browser. The site will immediately return to original site-content.json defaults. (Your authentication credentials will remain unchanged)."
        confirmLabel="Yes, Factory Reset All Edits"
        cancelLabel="Keep My Edits"
        isDestructive={true}
        onConfirm={handleConfirmFactoryReset}
        onCancel={() => setFactoryResetConfirmOpen(false)}
      />
    </div>
  );
}
