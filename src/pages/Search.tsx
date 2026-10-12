import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, ArrowRight, FileText, MapPin, Truck, Wrench, Shield, Car } from 'lucide-react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

// Mock Search Index for the Static Site
const SEARCH_INDEX = [
  {
    title: 'Home',
    path: '/',
    type: 'page',
    excerpt: 'Santa Towing offers 24/7 towing, auto repairs, body works, car sales, and car rentals in Ghana.',
    keywords: ['home', 'santa towing', 'auto services', 'ghana', 'accra']
  },
  {
    title: 'Emergency Towing',
    path: '/towing',
    type: 'service',
    excerpt: 'Rapid response 24/7 towing services. We safely transport your car to any destination or our secure facility.',
    keywords: ['towing', 'emergency', 'breakdown', 'recovery', 'flatbed', 'tow truck']
  },
  {
    title: 'Haulage Services',
    path: '/haulage',
    type: 'service',
    excerpt: 'Specialized heavy machinery transport, flatbed haulage, Tema harbour freight transfer, and oversize plant relocation.',
    keywords: ['haulage', 'heavy transport', 'machinery', 'freight', 'cargo', 'tema harbour', 'lowbed', 'excavator']
  },
  {
    title: 'Auto Repairs',
    path: '/repairs',
    type: 'service',
    excerpt: 'Comprehensive mechanical repairs, computer diagnostics, and regular maintenance by certified mechanics.',
    keywords: ['repairs', 'mechanic', 'engine', 'diagnostics', 'maintenance', 'oil change', 'brakes']
  },
  {
    title: 'Body Works & Spray Painting',
    path: '/body-works',
    type: 'service',
    excerpt: 'Professional dent repair, collision restoration, and premium oven-baked spray painting services.',
    keywords: ['body works', 'spray painting', 'dent repair', 'collision', 'paint', 'restoration']
  },
  {
    title: 'Auto Parts',
    path: '/parts',
    type: 'service',
    excerpt: 'Genuine OEM and high-quality aftermarket spare parts for all major car makes and models.',
    keywords: ['parts', 'spares', 'oem', 'accessories', 'batteries', 'tires', 'engine parts']
  },
  {
    title: 'Fleet Services',
    path: '/fleet',
    type: 'service',
    excerpt: 'Specialized maintenance and repair programs designed to keep corporate and commercial fleets running efficiently.',
    keywords: ['fleet', 'commercial', 'corporate', 'maintenance program', 'logistics']
  },
  {
    title: 'Cars for Sale',
    path: '/sales',
    type: 'car',
    excerpt: 'Browse our inventory of quality inspected new and pre-owned cars.',
    keywords: ['sales', 'buy car', 'used cars', 'new cars', 'dealership', 'cars']
  },
  {
    title: 'Rental Fleet',
    path: '/rental',
    type: 'car',
    excerpt: 'Premium and affordable rental cars for daily, weekly, or monthly use.',
    keywords: ['rental', 'hire', 'rent car', 'suv', 'sedan', 'daily rental']
  },
  {
    title: 'Service Areas Directory',
    path: '/service-areas',
    type: 'location',
    excerpt: 'View all areas we serve across Greater Accra and beyond for towing and roadside assistance.',
    keywords: ['locations', 'areas', 'accra', 'tema', 'coverage', 'map']
  },
  {
    title: 'Contact Us',
    path: '/contact',
    type: 'page',
    excerpt: 'Get in touch with Santa Towing for inquiries, quotes, or emergency assistance.',
    keywords: ['contact', 'phone', 'email', 'location', 'address', 'help']
  },
  {
    title: 'Blog & News',
    path: '/blog',
    type: 'page',
    excerpt: 'Read the latest automotive tips, company news, and industry updates from Santa Towing.',
    keywords: ['blog', 'news', 'tips', 'articles', 'guide']
  },
  {
    title: 'Frequently Asked Questions',
    path: '/faqs',
    type: 'policy',
    excerpt: 'Find answers to common questions about our towing, repairs, and rental services.',
    keywords: ['faq', 'questions', 'answers', 'help', 'support']
  },
  {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    type: 'policy',
    excerpt: 'Learn how Santa Towing collects, uses, and protects your personal information.',
    keywords: ['privacy', 'policy', 'data', 'terms', 'security']
  },
  {
    title: 'Terms & Conditions',
    path: '/terms-conditions',
    type: 'policy',
    excerpt: 'Read our general terms and conditions for using Santa Towing.',
    keywords: ['terms', 'conditions', 'legal', 'agreement']
  },
  {
    title: 'Careers',
    path: '/careers',
    type: 'page',
    excerpt: 'Join the Santa Towing team. Explore open positions for mechanics, drivers, and admin staff.',
    keywords: ['careers', 'jobs', 'hiring', 'work', 'employment']
  },
  {
    title: 'Accra Towing Services',
    path: '/service-areas/accra',
    type: 'location',
    excerpt: '24/7 reliable towing and recovery services throughout the Greater Accra region.',
    keywords: ['accra', 'towing in accra', 'east legon', 'spintex', 'osu']
  },
  {
    title: 'Tema Towing Services',
    path: '/service-areas/tema',
    type: 'location',
    excerpt: 'Fast and professional towing services for Tema and surrounding industrial areas.',
    keywords: ['tema', 'towing in tema', 'industrial', 'port', 'motorway']
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'service': return <Wrench className="w-5 h-5 text-accent" />;
    case 'location': return <MapPin className="w-5 h-5 text-accent" />;
    case 'car': return <Car className="w-5 h-5 text-accent" />;
    case 'policy': return <Shield className="w-5 h-5 text-accent" />;
    default: return <FileText className="w-5 h-5 text-accent" />;
  }
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const navigate = useNavigate();
  const seoTitle = useContent('seo.search.title', 'Search Results | Santa Towing');
  const seoDesc = useContent('seo.search.description', 'Search results for Santa Towing.');

  // Update query when URL params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    setInputValue(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    } else {
      setSearchParams({});
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    
    return SEARCH_INDEX.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchExcerpt = item.excerpt.toLowerCase().includes(lowerQuery);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(lowerQuery));
      return matchTitle || matchExcerpt || matchKeywords;
    }).map(item => {
      // Calculate a simple relevance score
      let score = 0;
      if (item.title.toLowerCase().includes(lowerQuery)) score += 3;
      if (item.keywords.some(k => k.toLowerCase().includes(lowerQuery))) score += 2;
      if (item.excerpt.toLowerCase().includes(lowerQuery)) score += 1;
      
      return { ...item, score };
    }).sort((a, b) => b.score - a.score);
  }, [query]);

  // Helper to highlight matching text
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-accent/20 text-dark font-semibold rounded-[1px] px-0.5">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 md:pb-20">
      <SEO title={seoTitle} description={seoDesc} canonical="/search" noindex />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Search Results' }]} className="mb-6" />
        
        <div className="bg-white rounded-[1px] shadow-sm border border-dark/10 p-6 sm:p-8 md:p-10 mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-dark mb-6 tracking-tight">
            Search
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search services, locations, cars..."
                className="w-full bg-slate-50 border-2 border-dark/10 focus:border-primary py-4 pl-14 pr-28 sm:pr-32 text-dark font-medium outline-none transition-all"
                autoFocus
              />
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-dark/40" />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-bold transition-colors rounded-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {query.trim() && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-dark">
                Results for "{query}"
              </h2>
              <span className="text-dark/60 font-medium bg-dark/5 px-3 py-1 rounded-full text-sm">
                {results.length} found
              </span>
            </div>

            {results.length > 0 ? (
              <div className="flex flex-col gap-4">
                {results.map((result, idx) => (
                  <motion.div
                    key={result.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={result.path}
                      className="block bg-white p-6 rounded-[1px] shadow-sm border border-dark/5 hover:border-primary/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-50 p-3 rounded-[1px] shrink-0 group-hover:bg-primary/10 transition-colors">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-accent/80">
                              {result.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {highlightMatch(result.title, query)}
                          </h3>
                          <p className="text-dark/70 text-sm leading-relaxed line-clamp-2">
                            {highlightMatch(result.excerpt, query)}
                          </p>
                        </div>
                        <div className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-slate-50 group-hover:bg-primary text-dark/40 group-hover:text-white transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 sm:p-8 md:p-12 rounded-[1px] text-center border border-dark/10 border-dashed"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-8 h-8 text-dark/30" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-3">No results found</h3>
                <p className="text-dark/60 max-w-md mx-auto mb-8">
                  We couldn't find anything matching "{query}". Try searching with a different keyword or check out our popular sections below.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/towing" className="bg-slate-50 hover:bg-primary/10 hover:text-primary text-dark px-5 py-2.5 font-semibold transition-colors text-sm rounded-full">
                    Towing Services
                  </Link>
                  <Link to="/repairs" className="bg-slate-50 hover:bg-primary/10 hover:text-primary text-dark px-5 py-2.5 font-semibold transition-colors text-sm rounded-full">
                    Auto Repairs
                  </Link>
                  <Link to="/contact" className="bg-slate-50 hover:bg-primary/10 hover:text-primary text-dark px-5 py-2.5 font-semibold transition-colors text-sm rounded-full">
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        )}
        
        {/* Suggestion when no query */}
        {!query.trim() && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/towing" className="flex flex-col items-center justify-center p-6 bg-white rounded-[1px] border border-dark/5 hover:border-primary/50 hover:shadow-md transition-all group text-center gap-3">
              <div className="w-12 h-12 bg-secondary group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-secondary group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <span className="font-bold text-dark group-hover:text-primary transition-colors">Towing</span>
            </Link>
            <Link to="/repairs" className="flex flex-col items-center justify-center p-6 bg-white rounded-[1px] border border-dark/5 hover:border-primary/50 hover:shadow-md transition-all group text-center gap-3">
              <div className="w-12 h-12 bg-secondary group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-secondary group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="font-bold text-dark group-hover:text-accent transition-colors">Repairs</span>
            </Link>
            <Link to="/service-areas" className="flex flex-col items-center justify-center p-6 bg-white rounded-[1px] border border-dark/5 hover:border-primary/50 hover:shadow-md transition-all group text-center gap-3">
              <div className="w-12 h-12 bg-secondary group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-secondary group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="font-bold text-dark group-hover:text-blue-500 transition-colors">Locations</span>
            </Link>
            <Link to="/faqs" className="flex flex-col items-center justify-center p-6 bg-white rounded-[1px] border border-dark/5 hover:border-primary/50 hover:shadow-md transition-all group text-center gap-3">
              <div className="w-12 h-12 bg-secondary group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-secondary group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-bold text-dark group-hover:text-emerald-500 transition-colors">Help & FAQs</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
