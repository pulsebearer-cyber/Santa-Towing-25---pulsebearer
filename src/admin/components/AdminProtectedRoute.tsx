import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet, Link } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../lib/auth';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: 'admin' | 'staff';
}

export default function AdminProtectedRoute({
  children,
  requiredRole,
}: AdminProtectedRouteProps) {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthed(isAuthenticated());
    };

    window.addEventListener('santa_admin_auth_changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    // Also check on mount / navigation
    setAuthed(isAuthenticated());

    return () => {
      window.removeEventListener('santa_admin_auth_changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [location.pathname]);

  if (!authed) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Administrator Access Required
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Your current account role does not have authorization to view this section. Full administrator credentials are required.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#015557] text-white text-sm font-semibold rounded-xl hover:bg-[#014345] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
}
