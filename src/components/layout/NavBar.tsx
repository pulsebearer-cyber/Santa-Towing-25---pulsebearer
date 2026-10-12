import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '@/hooks/useContent';
import EditableImage from '@/components/editable/EditableImage';
import EditableText from '@/components/editable/EditableText';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTowingOpen, setMobileTowingOpen] = useState(false);
  const [mobileGarageOpen, setMobileGarageOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const location = useLocation();

  const logoUrl = useContent('global.logo.url', 'https://i.ibb.co/KgkfFKV/Santa-Logo.png');
  const logoAlt = useContent('global.logo.alt', 'Santa Towing & Garage Services Ltd. Logo');
  const brandName = useContent('global.brand.shortName', 'Santa Towing');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const phone = useContent('global.links.phone', '0244753849');
  const callNowText = useContent('global.nav.callNow', `Call Now: ${phone}`);

  const navHome = useContent('global.nav.home', 'Home');
  const navTowingDropdown = useContent('global.nav.towingDropdown', 'Towing Services');
  const navEmergencyTowing = useContent('global.nav.emergencyTowing', 'Emergency Towing');
  const navServiceAreas = useContent('global.nav.serviceAreas', 'Service Areas Directory');
  const navHaulage = useContent('global.nav.haulage', 'Haulage Services');
  const navCarSales = useContent('global.nav.carSales', 'Car Sales');
  const navCarRentals = useContent('global.nav.carRentals', 'Car Rentals');
  const navGarageDropdown = useContent('global.nav.garageDropdown', 'Garage Services');
  const navRepairs = useContent('global.nav.repairs', 'Auto Repairs & Diagnostics');
  const navBodyWorks = useContent('global.nav.bodyWorks', 'Auto Body Works & Spraying');
  const navParts = useContent('global.nav.parts', 'Genuine Auto Parts');
  const navFleet = useContent('global.nav.fleet', 'Corporate Fleet Services');
  const navAllServices = useContent('global.nav.allServices', 'All Services Overview');
  const navCompanyDropdown = useContent('global.nav.companyDropdown', 'Company');
  const navGallery = useContent('global.nav.gallery', 'Gallery');
  const navBlog = useContent('global.nav.blog', 'Blog & Advice');
  const navFaqs = useContent('global.nav.faqs', 'FAQs');
  const navSitemap = useContent('global.nav.sitemap', 'Website Sitemap');
  const navContact = useContent('global.nav.contact', 'Contact');
  const navSearch = useContent('global.nav.search', 'Search');
  const customMenuLinks = useContent<Array<{ id: string; label: string; path: string; visible: boolean }> | null>(
    'global.nav.menuLinks',
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileTowingOpen(false);
    setMobileGarageOpen(false);
    setMobileCompanyOpen(false);
  }, [location.pathname]);

  const towingLinks = [
    { title: navEmergencyTowing, path: '/towing' },
    { title: navServiceAreas, path: '/service-areas' }
  ];

  const garageLinks = [
    { title: navRepairs, path: '/repairs' },
    { title: navBodyWorks, path: '/body-works' },
    { title: navParts, path: '/parts' },
    { title: navFleet, path: '/fleet' },
    { title: navAllServices, path: '/services' }
  ];

  const companyLinks = [
    { title: navGallery, path: '/gallery' },
    { title: navBlog, path: '/blog' },
    { title: navFaqs, path: '/faqs' },
    { title: navSitemap, path: '/sitemap' }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled || location.pathname !== '/' 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5 text-dark translate-y-0" 
          : "bg-secondary/90 backdrop-blur-md text-white py-4 translate-y-0 lg:translate-y-9 border-b border-white/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <EditableImage
            storageKey="global.logo.url"
            altStorageKey="global.logo.alt"
            defaultUrl={logoUrl}
            defaultAlt={logoAlt}
            className="h-10 md:h-11 w-auto object-contain bg-white p-1 rounded-[1px] shadow-sm"
            label="Primary Logo"
          />
        </Link>

        {/* Desktop Nav (Large Screens) */}
        {customMenuLinks && Array.isArray(customMenuLinks) && customMenuLinks.length > 0 ? (
          <nav className="hidden xl:flex items-center gap-5 font-medium text-sm">
            {customMenuLinks
              .filter((it: any) => it.visible !== false)
              .map((it: any) => (
                <Link
                  key={it.id || it.path}
                  to={it.path}
                  className="hover:text-accent transition-colors py-2 whitespace-nowrap"
                >
                  {it.label}
                </Link>
              ))}
          </nav>
        ) : (
          <nav className="hidden xl:flex items-center gap-6 font-medium text-sm">
            <Link to="/" className="hover:text-accent transition-colors">{navHome}</Link>
            
            {/* Towing Dropdown */}
            <div className="relative group cursor-pointer">
              <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
                {navTowingDropdown} <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
                {towingLinks.map(s => (
                  <Link 
                    key={s.path} 
                    to={s.path} 
                    className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/haulage" className="hover:text-accent transition-colors font-semibold flex items-center gap-1">
              {navHaulage}
            </Link>

            <Link to="/sales" className="hover:text-accent transition-colors font-medium">
              {navCarSales}
            </Link>

            <Link to="/rental" className="hover:text-accent transition-colors font-medium">
              {navCarRentals}
            </Link>

            {/* Garage Services Dropdown */}
            <div className="relative group cursor-pointer">
              <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
                {navGarageDropdown} <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
                {garageLinks.map(s => (
                  <Link 
                    key={s.path} 
                    to={s.path} 
                    className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group cursor-pointer">
              <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
                {navCompanyDropdown} <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
                {companyLinks.map(s => (
                  <Link 
                    key={s.path} 
                    to={s.path} 
                    className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/contact" className="hover:text-accent transition-colors">{navContact}</Link>
          </nav>
        )}

        {/* Medium Nav (Tablet/Laptop) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-4 font-medium text-sm">
          <Link to="/" className="hover:text-accent transition-colors">{navHome}</Link>
          
          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
              Towing <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
              {towingLinks.map(s => (
                <Link 
                  key={s.path} 
                  to={s.path} 
                  className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/haulage" className="hover:text-accent transition-colors font-semibold">{navHaulage}</Link>
          <Link to="/sales" className="hover:text-accent transition-colors">{navCarSales}</Link>
          <Link to="/rental" className="hover:text-accent transition-colors">{navCarRentals}</Link>

          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
              Garage <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
              {garageLinks.map(s => (
                <Link 
                  key={s.path} 
                  to={s.path} 
                  className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <span className="flex items-center gap-1 hover:text-accent transition-colors py-2">
              {navCompanyDropdown} <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white text-dark rounded-[1px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden border border-gray-100 p-1.5 z-50">
              {companyLinks.map(s => (
                <Link 
                  key={s.path} 
                  to={s.path} 
                  className="block px-3.5 py-2.5 hover:bg-slate-50 hover:text-accent transition-colors text-sm font-medium rounded-full"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          
          <Link to="/contact" className="hover:text-accent transition-colors">{navContact}</Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            to="/search" 
            className="hidden sm:flex items-center justify-center p-2.5 rounded-full hover:bg-white/10 transition-colors text-inherit"
            aria-label={navSearch}
          >
            <SearchIcon className="w-5 h-5" />
          </Link>
          <a 
            href={phoneTel} 
            className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 font-semibold text-sm transition-all shadow-md shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 rounded-full"
          >
            <Phone className="w-4 h-4" />
            <EditableText
              storageKey="global.nav.callNow"
              defaultContent={callNowText}
              label="Call Button"
            />
          </a>
          <button 
            className="lg:hidden p-2 text-inherit rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white text-dark shadow-2xl absolute top-full left-0 right-0 border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 font-medium divide-y divide-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full">{navHome}</Link>
              <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 flex items-center gap-2 rounded-full">
                <SearchIcon className="w-4 h-4" />
                <span>{navSearch}</span>
              </Link>

              {/* Custom Menu Links or Default Accordions */}
              {customMenuLinks && Array.isArray(customMenuLinks) && customMenuLinks.length > 0 ? (
                customMenuLinks
                  .filter((it: any) => it.visible !== false)
                  .map((it: any) => (
                    <Link
                      key={it.id || it.path}
                      to={it.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full font-medium"
                    >
                      {it.label}
                    </Link>
                  ))
              ) : (
                <>
                  {/* Towing Services Accordion */}
                  <div className="flex flex-col shrink-0">
                    <button 
                      onClick={() => setMobileTowingOpen(!mobileTowingOpen)}
                      className="flex justify-between items-center py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors w-full text-left rounded-full"
                    >
                      <span>{navTowingDropdown}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileTowingOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileTowingOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col bg-slate-50 rounded-[1px] my-1 py-1"
                        >
                          {towingLinks.map(s => (
                            <Link 
                              key={s.path}
                              to={s.path} 
                              onClick={() => setMobileMenuOpen(false)} 
                              className="py-2.5 px-6 hover:text-accent text-sm font-medium"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Haulage Services Direct Mobile Link */}
                  <Link 
                    to="/haulage" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 flex items-center justify-between font-bold text-accent rounded-full"
                  >
                    <span>{navHaulage}</span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 font-bold uppercase">Heavy Transport</span>
                  </Link>

                  {/* Car Sales Direct Mobile Link */}
                  <Link 
                    to="/sales" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full"
                  >
                    {navCarSales}
                  </Link>

                  {/* Car Rentals Direct Mobile Link */}
                  <Link 
                    to="/rental" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full"
                  >
                    {navCarRentals}
                  </Link>

                  {/* Garage Services Accordion */}
                  <div className="flex flex-col shrink-0">
                    <button 
                      onClick={() => setMobileGarageOpen(!mobileGarageOpen)}
                      className="flex justify-between items-center py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors w-full text-left rounded-full"
                    >
                      <span>{navGarageDropdown}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileGarageOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileGarageOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col bg-slate-50 rounded-[1px] my-1 py-1"
                        >
                          {garageLinks.map(s => (
                            <Link 
                              key={s.path}
                              to={s.path} 
                              onClick={() => setMobileMenuOpen(false)} 
                              className="py-2.5 px-6 hover:text-accent text-sm font-medium"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company Accordion */}
                  <div className="flex flex-col shrink-0">
                    <button 
                      onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                      className="flex justify-between items-center py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors w-full text-left rounded-full"
                    >
                      <span>{navCompanyDropdown}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileCompanyOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileCompanyOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col bg-slate-50 rounded-[1px] my-1 py-1"
                        >
                          {companyLinks.map(s => (
                            <Link 
                              key={s.path}
                              to={s.path} 
                              onClick={() => setMobileMenuOpen(false)} 
                              className="py-2.5 px-6 hover:text-accent text-sm font-medium"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 hover:text-accent hover:bg-slate-50 transition-colors shrink-0 rounded-full">{navContact}</Link>
                </>
              )}
              
              <div className="pt-4 pb-2 px-2 shrink-0">
                <a 
                  href={phoneTel} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3.5 font-semibold transition-all text-center flex items-center justify-center gap-2 shadow-md rounded-full"
                >
                  <Phone className="w-4 h-4" />
                  <span>{callNowText}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
