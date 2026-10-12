import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';
import { useInventoryCars, useInventoryRentals, useInventoryParts } from '@/hooks/useInventory';
import { useEditMode } from '@/context/EditModeContext';
import { isAuthenticated } from '@/admin/lib/auth';
import { BLOG_POSTS } from '@/data/blogData';
import {
  MAIN_PAGES,
  SERVICES,
  SERVICE_AREAS,
  LEGAL_POLICIES,
  ADMIN_PAGES,
  ADMIN_SECTIONS,
  SitemapCategory,
  SitemapLink,
} from '../data/sitemapData';
import { 
  Map, 
  Home, 
  Wrench, 
  Car, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight, 
  FolderTree, 
  Lock, 
  Search, 
  Shield, 
  X, 
  LayoutDashboard, 
  ArrowRight,
  Package,
  FileText,
  Image as ImageIcon,
  Palette,
  Link2,
  User,
  Sparkles,
  ShieldAlert,
  KeyRound,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Wrench,
  Car,
  BookOpen,
  ShieldCheck,
  Map,
  Lock,
  Shield,
  LayoutDashboard,
  Package,
  FileText,
  Image: ImageIcon,
  Palette,
  Link2,
  User,
  Sparkles,
  ShieldAlert,
  KeyRound,
};

export default function Sitemap() {
  const seoTitle = useContent('seo.sitemap.title', 'Website Sitemap | Santa Towing Ghana');
  const seoDesc = useContent(
    'seo.sitemap.description',
    'Comprehensive website directory of Santa Towing Ghana. Access all pages across our structured categories.'
  );

  const { isOwner } = useEditMode();
  const [isAuthSession, setIsAuthSession] = useState(() => isAuthenticated());
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize auth state for owner detection
  React.useEffect(() => {
    const checkAuth = () => setIsAuthSession(isAuthenticated());
    window.addEventListener('santa_admin_auth_changed', checkAuth);
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('santa_admin_auth_changed', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const isLoggedInOwner = isOwner || isAuthSession;

  // Reactive dynamic inventory & blog datasets
  const { cars } = useInventoryCars(true);
  const { rentals } = useInventoryRentals(true);
  const { parts } = useInventoryParts(true);
  const blogPosts = useContent<any[]>('blog.posts', BLOG_POSTS);

  // Assemble all categorized links based on App.tsx routes as source of truth
  const allCategories = useMemo<SitemapCategory[]>(() => {
    // 1. Main pages
    const mainCategory: SitemapCategory = {
      title: 'Main Pages',
      iconName: 'Home',
      links: MAIN_PAGES,
    };

    // 2. Services
    const servicesCategory: SitemapCategory = {
      title: 'Services',
      iconName: 'Wrench',
      links: SERVICES,
    };

    // 3. Inventory (cars, rentals, parts)
    const inventoryLinks: SitemapLink[] = [
      { label: 'Car Sales (Overview)', path: '/sales' },
      ...cars.map((car) => ({
        label: `${car.name}${car.price ? ` — ${car.price}` : ''}`,
        path: `/sales/${car.id}`,
      })),
      { label: 'Car Rentals (Overview)', path: '/rental' },
      ...rentals.map((rental) => ({
        label: `${rental.name}${rental.type ? ` (${rental.type})` : ''}`,
        path: `/rental/${rental.id}`,
      })),
      { label: 'Auto Parts Store (Overview)', path: '/parts' },
      ...parts.map((part) => ({
        label: `${part.name}${part.category ? ` [${part.category}]` : ''}`,
        path: `/parts/${part.id}`,
      })),
    ];
    const inventoryCategory: SitemapCategory = {
      title: 'Inventory (Cars, Rentals, Parts)',
      iconName: 'Car',
      links: inventoryLinks,
    };

    // 4. Blog
    const blogLinks: SitemapLink[] = [
      { label: 'Blog & Automotive Hub', path: '/blog' },
      ...(Array.isArray(blogPosts) ? blogPosts : BLOG_POSTS).map((post: any) => ({
        label: post.title || `Article #${post.id}`,
        path: `/blog/${post.id}`,
      })),
    ];
    const blogCategory: SitemapCategory = {
      title: 'Blog',
      iconName: 'BookOpen',
      links: blogLinks,
    };

    // 5. Service Areas
    const serviceAreasCategory: SitemapCategory = {
      title: 'Service Areas',
      iconName: 'Map',
      links: SERVICE_AREAS,
    };

    // 6. Policies
    const policiesCategory: SitemapCategory = {
      title: 'Policies',
      iconName: 'ShieldCheck',
      links: LEGAL_POLICIES,
    };

    // 7. Admin (Dashboard pages, nested consoles & settings) - comprehensive admin registry
    const adminCategory: SitemapCategory = {
      title: 'Admin Dashboard & Settings',
      iconName: 'Lock',
      links: ADMIN_PAGES,
    };

    const categories: SitemapCategory[] = [
      mainCategory,
      servicesCategory,
      inventoryCategory,
      blogCategory,
      serviceAreasCategory,
      policiesCategory,
      adminCategory,
    ];

    return categories;
  }, [cars, rentals, parts, blogPosts]);

  // Filter links if search query is active, and assign continuous numbering
  const numberedData = useMemo(() => {
    let counter = 1;
    const q = searchQuery.toLowerCase().trim();

    return allCategories
      .map((category) => {
        const filteredLinks = q
          ? category.links.filter(
              (link) =>
                link.label.toLowerCase().includes(q) ||
                link.path.toLowerCase().includes(q)
            )
          : category.links;

        return {
          ...category,
          links: filteredLinks.map((link) => ({
            ...link,
            number: counter++,
          })),
        };
      })
      .filter((cat) => cat.links.length > 0);
  }, [allCategories, searchQuery]);

  const totalLinksCount = useMemo(() => {
    return allCategories.reduce((acc, cat) => acc + cat.links.length, 0);
  }, [allCategories]);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <SEO 
        title={seoTitle} 
        description={seoDesc} 
        canonical="/sitemap" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Website Sitemap' }]} />
        </div>

        {/* Hero Header Section */}
        <div className="bg-white rounded-[1px] p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 shadow-md shadow-accent/20">
                  <FolderTree className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Website Sitemap
                  </h1>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {totalLinksCount} Total Verified Routes
                    {isLoggedInOwner ? ' · (All 9 Owner Consoles Unlocked)' : ' · (Admin Dashboard Protected)'}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-2">
                A complete architectural directory of Santa Towing. Navigate directly to any core service, inventory item, legal policy, coverage route, or administrative dashboard.
              </p>
            </div>

            {/* Quick Action Dashboard Button & Status */}
            <div className="flex flex-col gap-2.5 shrink-0 self-start md:self-auto">
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#015557] hover:bg-[#014345] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-300" />
                <span>Go to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {isLoggedInOwner ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Owner Session Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Login required for admin tools
                </span>
              )}
            </div>
          </div>

          {/* Quick Realtime Filter Search Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter pages by keyword or route (e.g. dashboard, rental, kumasi, policy)..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-slate-500 mt-2">
                Showing matching results for <span className="font-semibold text-slate-800">"{searchQuery}"</span> across all categories.
              </p>
            )}
          </div>
        </div>

        {/* Categories Listing */}
        <div className="space-y-8">
          {numberedData.map((category, index) => {
            const IconComponent = ICON_MAP[category.iconName] || Map;
            const isAdminGroup = category.title === 'Admin' || category.title.includes('Admin');

            // Check if the first link acts as a structural parent for the group
            const firstLink = category.links[0];
            const hasParentChild = firstLink && (
              firstLink.label.includes('Overview') || 
              firstLink.label.includes('Directory')
            );

            const parentLink = hasParentChild ? firstLink : null;
            const childLinks = hasParentChild ? category.links.slice(1) : category.links;

            return (
              <section
                key={category.title + index}
                id={isAdminGroup ? 'admin-section' : undefined}
                className={`bg-white rounded-[1px] border shadow-sm overflow-hidden ${
                  isAdminGroup
                    ? isLoggedInOwner
                      ? 'border-emerald-300 ring-1 ring-emerald-200/60'
                      : 'border-slate-300 ring-1 ring-slate-200/60'
                    : 'border-slate-200/90'
                }`}
              >
                <div className={`p-5 sm:p-7 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isAdminGroup
                    ? isLoggedInOwner
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-slate-100/90 border-slate-200'
                    : 'bg-slate-50/70 border-slate-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm ${
                      isAdminGroup
                        ? isLoggedInOwner
                          ? 'bg-[#015557]'
                          : 'bg-slate-800'
                        : 'bg-slate-900'
                    }`}>
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        isAdminGroup
                          ? isLoggedInOwner
                            ? 'text-emerald-300'
                            : 'text-amber-400'
                          : 'text-accent'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <span>{category.title}</span>
                        {isAdminGroup && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isLoggedInOwner
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}>
                            {isLoggedInOwner ? 'Active Admin Session' : 'Protected Authentication'}
                          </span>
                        )}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {category.links.length} {category.links.length === 1 ? 'Page' : 'Pages'}
                        {isAdminGroup && ' · All Routes Protected by Authentication'}
                      </p>
                    </div>
                  </div>

                  {isAdminGroup && (
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Link
                        to="/admin"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#015557] text-white hover:bg-[#014345] transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Open Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/login"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Admin Login</span>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-8">
                  {isAdminGroup && !searchQuery ? (
                    <div className="space-y-8">
                      {/* Security Notice Banner */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#015557]/10 text-[#015557] flex items-center justify-center shrink-0 mt-0.5">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                              Administrative Access &amp; Session Guard
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5">
                              All dashboard pages, nested settings, and management tools below require authenticated administrator credentials.
                              {isLoggedInOwner ? (
                                <span className="font-semibold text-emerald-700"> Your administrative session is currently active.</span>
                              ) : (
                                <span> The demo portal login form is prefilled with <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">demo.admin@example.com</code> for review.</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/admin/login"
                          className="shrink-0 text-xs font-bold text-[#015557] bg-white border border-slate-300 hover:border-[#015557] px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                        >
                          <span>{isLoggedInOwner ? 'Switch Account' : 'Admin Login Portal'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Logical Admin Sections */}
                      {ADMIN_SECTIONS.map((sec) => {
                        const SecIcon = ICON_MAP[sec.iconName] || LayoutDashboard;
                        const secLinks = category.links.filter((l) =>
                          sec.links.some((sl) => sl.path === l.path)
                        );
                        if (secLinks.length === 0) return null;

                        return (
                          <div key={sec.sectionTitle} className="space-y-3">
                            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
                              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#015557] flex items-center justify-center shrink-0 border border-emerald-100">
                                <SecIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                                    {sec.sectionTitle}
                                  </h3>
                                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {secLinks.length} {secLinks.length === 1 ? 'route' : 'routes'}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">
                                  {sec.sectionDescription}
                                </p>
                              </div>
                            </div>

                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                              {secLinks.map((link) => (
                                <li key={link.path}>
                                  <Link
                                    to={link.path}
                                    className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#015557] hover:shadow-xs transition-all h-full"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-xs font-mono font-bold text-slate-400">
                                          #{link.number}
                                        </span>
                                        {link.badge && (
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                                            {link.badge}
                                          </span>
                                        )}
                                      </div>
                                      <span className="font-bold text-sm block text-slate-900 group-hover:text-[#015557] transition-colors leading-snug">
                                        {link.label}
                                      </span>
                                      {link.description && (
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                          {link.description}
                                        </p>
                                      )}
                                    </div>

                                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                                      <span className="truncate group-hover:text-[#015557] transition-colors">
                                        {link.path}
                                      </span>
                                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#015557] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ) : hasParentChild && parentLink ? (
                    <div>
                      <Link
                        to={parentLink.path}
                        className="group inline-flex items-center gap-2 font-bold text-lg text-slate-900 hover:text-accent transition-colors"
                      >
                        <span className="text-slate-500 mr-1">{parentLink.number}.</span> {parentLink.label}
                        <ChevronRight className="w-5 h-5 text-accent opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      </Link>
                      
                      <div className="mt-4 ml-4 sm:ml-8 pl-4 border-l-2 border-slate-100">
                        <ul className={`grid grid-cols-1 ${
                          childLinks.length > 10 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
                        } gap-4`}>
                          {childLinks.map((link) => (
                            <li key={link.path}>
                              <Link
                                to={link.path}
                                className="group flex items-start gap-2 py-2 text-sm font-medium text-slate-600 hover:text-accent transition-colors"
                              >
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-accent mt-0.5 shrink-0" />
                                <div>
                                  <span className="block leading-snug">
                                    <span className="text-slate-400 font-bold mr-1">{link.number}.</span>
                                    {link.label}
                                  </span>
                                  <span className="text-xs text-slate-400 block mt-0.5 font-mono group-hover:text-accent/70 transition-colors break-all">
                                    {link.path}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <ul className={`grid grid-cols-1 ${
                      category.links.length > 10 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
                    } gap-4`}>
                      {category.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={`group flex items-start gap-2 p-4 rounded-[1px] border transition-all h-full ${
                              isAdminGroup
                                ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-400 hover:bg-amber-50'
                                : 'bg-slate-50 border-slate-100 hover:border-accent/40 hover:bg-slate-50/90'
                            }`}
                          >
                            <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                              isAdminGroup ? 'text-amber-500 group-hover:text-amber-700' : 'text-slate-300 group-hover:text-accent'
                            }`} />
                            <div>
                              <span className={`font-bold block transition-colors leading-snug ${
                                isAdminGroup
                                  ? 'text-amber-950 group-hover:text-[#015557]'
                                  : 'text-slate-800 group-hover:text-accent'
                              }`}>
                                <span className="text-slate-400 mr-1">{link.number}.</span> {link.label}
                              </span>
                              <span className="text-xs text-slate-400 block mt-1 font-mono group-hover:text-slate-500 transition-colors break-all">
                                {link.path}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
