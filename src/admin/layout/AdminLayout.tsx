import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import { AdminToastProvider } from '../context/AdminToastContext';
import SEO from '@/components/seo/SEO';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminToastProvider>
      <SEO
        title="Admin Console | Santa Towing"
        description="Administrative management console for Santa Towing operations."
        noindex={true}
      />
      <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-800">
        <div className="flex flex-1 w-full min-h-screen">
          {/* Admin Sidebar */}
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <AdminTopBar
              onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            />

            {/* Screen Content Viewport */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </AdminToastProvider>
  );
}
