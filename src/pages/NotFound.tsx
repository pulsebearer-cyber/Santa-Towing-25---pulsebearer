import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPinOff, ArrowLeft, Home, Phone, Search } from 'lucide-react';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function NotFound() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const seoTitle = useContent('seo.notFound.title', 'Page Not Found - 404 | Santa Towing');
  const seoDesc = useContent('seo.notFound.description', 'The page you are looking for could not be found.');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-[80vh] flex flex-col items-center justify-center">
      <SEO title={seoTitle} description={seoDesc} noindex />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        
        {/* Subtle Icon */}
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <MapPinOff className="w-10 h-10 text-primary" />
        </div>
        
        {/* 404 Number */}
        <h1 className="text-7xl md:text-9xl font-black text-dark tracking-tighter mb-4">
          404
        </h1>
        
        {/* Headings and Description */}
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-dark/70 mb-8 max-w-lg mx-auto">
          Sorry, the page you are looking for does not exist, has been moved, or may no longer be available.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Search our website..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-dark/10 focus:border-primary py-3 pl-12 pr-4 text-dark font-medium outline-none transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
          <button type="submit" className="hidden rounded-full">Search</button>
        </form>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto bg-white border border-dark/20 hover:border-dark text-dark px-4 sm:px-8 py-4 font-bold flex items-center justify-center gap-3 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link 
            to="/" 
            className="w-full sm:w-auto bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold flex items-center justify-center gap-3 transition-colors rounded-full"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <Link 
            to="/contact" 
            className="w-full sm:w-auto bg-white border border-dark/20 hover:border-dark text-dark px-4 sm:px-8 py-4 font-bold flex items-center justify-center gap-3 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}
