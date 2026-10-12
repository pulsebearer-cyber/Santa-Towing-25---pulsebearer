import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Info,
  X,
  UserCheck,
  Briefcase,
} from 'lucide-react';
import {
  authenticate,
  isAuthenticated,
  DEMO_ADMIN,
  DEMO_STAFF,
  AUTH_NOTICE,
  resetToDefaultAccounts,
} from '../lib/auth';
import { useContent } from '@/hooks/useContent';
import SEO from '@/components/seo/SEO';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const logoUrl = useContent('global.logo.url', 'https://i.ibb.co/KgkfFKV/Santa-Logo.png');
  const brandName = useContent('global.brand.name', 'Santa Towing & Garage Services Ltd.');

  // Form input states automatically prefilled with Demo Administrator credentials
  const [email, setEmail] = useState<string>(DEMO_ADMIN.email);
  const [password, setPassword] = useState<string>(DEMO_ADMIN.password);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Submission & feedback states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');

  // Target path user was trying to access, preserving search query parameters and anchor hash
  const fromLocation = (location.state as any)?.from;
  const fromPath = fromLocation
    ? `${fromLocation.pathname || '/admin'}${fromLocation.search || ''}${fromLocation.hash || ''}`
    : '/admin';

  useEffect(() => {
    // If already logged in, redirect immediately to target admin route
    if (isAuthenticated()) {
      navigate(fromPath, { replace: true });
    }
  }, [navigate, fromPath]);

  // One-click switcher helpers for demo convenience
  const handleFillDemoAdmin = () => {
    setEmail(DEMO_ADMIN.email);
    setPassword(DEMO_ADMIN.password);
    setErrorMsg('');
  };

  const handleFillDemoStaff = () => {
    setEmail(DEMO_STAFF.email);
    setPassword(DEMO_STAFF.password);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await authenticate(email, password);

      if (result.success && result.user) {
        setSuccessMsg(`Welcome, ${result.user.name}! Redirecting to console...`);
        setTimeout(() => {
          navigate(fromPath, { replace: true });
        }, 300);
      } else {
        setErrorMsg(result.error || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred during authentication. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotPasswordSubmitted(true);
  };

  const handleResetDemoState = () => {
    resetToDefaultAccounts();
    setEmail(DEMO_ADMIN.email);
    setPassword(DEMO_ADMIN.password);
    setErrorMsg('');
    setShowForgotPasswordModal(false);
    setForgotPasswordSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 antialiased">
      <SEO
        title="Admin Portal Login | Santa Towing"
        description="Secure administrator email and password authentication portal for Santa Towing Ghana."
        noindex={true}
      />

      {/* Background ambient decorative glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#015557]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#d80000]/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Lockup */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block transition-transform hover:scale-105 mb-3">
            <div className="bg-white p-2.5 rounded-xl shadow-lg inline-block border border-slate-700">
              <img
                src={logoUrl}
                alt={brandName}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Admin Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {brandName}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#015557] flex items-center justify-center shrink-0 shadow-xs border border-emerald-100">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                Sign In to Console
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your administrative credentials to continue
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Switcher */}
          <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#015557]" />
                Demo Credentials
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Prefilled
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className={`text-left p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                  email === DEMO_ADMIN.email
                    ? 'border-[#015557] bg-emerald-50/80 text-[#015557] font-semibold ring-1 ring-[#015557]'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1 font-bold text-[11px]">
                  <UserCheck className="w-3 h-3 text-[#015557]" />
                  <span>Admin</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Full access</div>
              </button>

              <button
                type="button"
                onClick={handleFillDemoStaff}
                className={`text-left p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                  email === DEMO_STAFF.email
                    ? 'border-[#015557] bg-emerald-50/80 text-[#015557] font-semibold ring-1 ring-[#015557]'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1 font-bold text-[11px]">
                  <Briefcase className="w-3 h-3 text-[#015557]" />
                  <span>Staff</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Restricted</div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#d80000] flex items-start gap-2.5 animate-in fade-in"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span className="font-medium leading-relaxed">{successMsg}</span>
              </div>
            )}

            {/* Email Address Input */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isSubmitting}
                  className="w-full min-h-[46px] pl-10 pr-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:border-[#015557] transition-all disabled:opacity-50"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-xs text-[#015557] hover:underline font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={isSubmitting}
                  className="w-full min-h-[46px] pl-10 pr-11 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557] focus-visible:border-[#015557] transition-all disabled:opacity-50"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Architecture Transparency Notice */}
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-[#015557]">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#015557] shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold block text-slate-900 mb-0.5">
                    Security &amp; Session Guard
                  </span>
                  <p className="text-slate-600">
                    {AUTH_NOTICE}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[46px] px-4 py-2.5 bg-[#015557] hover:bg-[#014345] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#015557]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return link */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link
              to="/"
              className="hover:text-slate-900 transition-colors flex items-center gap-1 font-medium min-h-[38px]"
            >
              ← Back to public site
            </Link>

            <span className="text-[11px] text-slate-400">
              Session duration: 8 hours
            </span>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Santa Towing Administrative Portal &middot; 24/7 Operations Ghana
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Password Recovery
                  </h3>
                  <p className="text-xs text-slate-500">
                    Authentication provider guidance
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setForgotPasswordSubmitted(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!forgotPasswordSubmitted ? (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <p className="font-semibold mb-1">Architecture Notice:</p>
                  <p>
                    This application currently runs on a client-side architecture without an external cloud backend (e.g. Firebase Auth or Supabase) connected for SMTP email delivery.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                  >
                    Enter Registered Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="demo.admin@example.com"
                    required
                    className="w-full min-h-[44px] px-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015557]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 min-h-[42px] px-4 py-2 bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Request Password Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDemoState}
                    className="min-h-[42px] px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Restore Demo Credentials
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <p className="font-bold mb-1">Reset Instructions Simulated</p>
                    <p>
                      In a production deployment with a cloud auth provider configured, a reset token would be dispatched to <strong>{forgotEmail}</strong>.
                    </p>
                    <p className="mt-1">
                      For this environment, your active credentials are the demonstration accounts:
                    </p>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                      <li><strong>Admin:</strong> demo.admin@example.com / DemoAdmin@2026!</li>
                      <li><strong>Staff:</strong> demo.staff@example.com / DemoStaff@2026!</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleResetDemoState();
                  }}
                  className="w-full min-h-[42px] px-4 py-2 bg-[#015557] hover:bg-[#014345] text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Use Demo Credentials &amp; Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
