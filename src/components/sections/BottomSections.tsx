import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { FAQS } from '@/data/mockData';
import { BLOG_POSTS } from '@/data/blogData';
import { CheckCircle2, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { useInventoryFaqs } from '@/hooks/useInventory';
import EditableText from '@/components/editable/EditableText';
import EditableImage from '@/components/editable/EditableImage';

export function TowingAppPromo() {
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const mobileScreen = useContent('global.images.mobileScreen', 'https://i.ibb.co/0j2J24PF/Santa-App-Mobile-Screen.png');

  const features = [
    'Live GPS Driver Tracking', 'Instant 1-Tap Tow Requests', 'Emergency SOS Hotline', 
    'Real-Time ETA Updates', 'Transparent Digital Billing', 'Verified Certified Drivers'
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-dark via-secondary to-primary text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-[1.15]">
              <EditableText
                storageKey="home.towingApp.heading"
                defaultContent="Instant Roadside Rescue in the Palm of Your Hand"
                label="App Promo Heading"
              />
            </h2>
            <div className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              <EditableText
                as="p"
                multiline={true}
                storageKey="home.towingApp.subtext"
                defaultContent="Experience the next generation of roadside assistance. Request emergency towing, track your flatbed in real-time, and get back on the road safely."
                label="App Promo Subtext"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-9">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                  <span className="font-semibold text-sm sm:text-base text-white/90">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={phoneTel} 
                className="bg-accent hover:bg-accent/90 text-white px-7 py-3.5 font-bold transition-all shadow-lg shadow-accent/30 hover:-translate-y-0.5 flex items-center gap-2 rounded-full"
              >
                <Phone className="w-4 h-4" />
                <span>
                  Call Hotline:{' '}
                  <EditableText
                    storageKey="global.links.phone"
                    defaultContent={phone}
                    label="Hotline Phone"
                  />
                </span>
              </a>
              <Link 
                to="/towing" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-7 py-3.5 font-bold transition-all border border-white/20 hover:-translate-y-0.5 rounded-full"
              >
                Request Tow Online
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="w-full max-w-[585px]">
              <EditableImage 
                storageKey="global.images.mobileScreen"
                altStorageKey="global.images.mobileScreenAlt"
                defaultUrl={mobileScreen} 
                defaultAlt="Santa App Mobile Screen" 
                className="w-full h-auto object-contain drop-shadow-2xl"
                label="Mobile App Showcase Mockup"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  const heading = useContent('home.blogSection.heading', 'Latest News & Maintenance Insights');
  const viewAllBtn = useContent('home.blogSection.viewAllBtn', 'View All Articles');

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50/70 relative border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-[1.15]">
              <EditableText
                storageKey="home.blogSection.heading"
                defaultContent={heading}
                label="Blog Section Heading"
              />
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="text-primary hover:text-accent font-bold transition-colors inline-flex items-center gap-2 group text-sm sm:text-base"
          >
            <EditableText
              storageKey="home.blogSection.viewAllBtn"
              defaultContent={viewAllBtn}
              label="View All Articles Button"
            />
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              className="group bg-white rounded-[1px] overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 hover:border-accent/30 transition-all duration-300 flex flex-col hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                <div className="absolute top-3.5 left-3.5 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-[1px] text-xs font-bold text-white border border-white/20">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-3 group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-colors pt-4 border-t border-gray-100 group/link"
                >
                  <span>Read Full Article</span> 
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const heading = useContent('home.faqSection.heading', 'Frequently Asked Questions');
  const description = useContent('home.faqSection.description', 'Quick answers regarding our 24/7 towing response times, repair warranties, car rentals, and pricing.');
  const { faqs } = useInventoryFaqs();
  const displayFaqs = (faqs && faqs.length > 0) ? faqs.slice(0, 5) : FAQS;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4 tracking-tight">
            {heading}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {displayFaqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-gray-200/90 rounded-[1px] overflow-hidden shadow-sm transition-colors hover:border-gray-300"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors gap-4 rounded-full"
              >
                <span className="font-bold text-dark text-base sm:text-lg">{faq.q}</span>
                <div className={cn(
                  "w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200",
                  openIdx === idx && "rotate-180 bg-accent text-white"
                )}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
