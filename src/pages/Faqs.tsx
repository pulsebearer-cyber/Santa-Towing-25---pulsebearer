import SEO from '@/components/seo/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';
import { useInventoryFaqs } from '@/hooks/useInventory';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, ChevronDown, Phone, MessageCircle, 
  HelpCircle, Wrench, Truck, CarTaxiFront, Car, Settings, CreditCard, Users
} from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'All', label: 'All FAQs', icon: HelpCircle },
  { id: 'Towing', label: 'Emergency Towing', icon: Truck },
  { id: 'Rentals', label: 'Car Rentals', icon: CarTaxiFront },
  { id: 'Repairs', label: 'Auto Repairs', icon: Wrench },
  { id: 'Sales', label: 'Car Sales', icon: Car },
  { id: 'Parts', label: 'Auto Parts', icon: Settings },
  { id: 'Fleet', label: 'Fleet Services', icon: Users },
  { id: 'Payments', label: 'Payments & Billing', icon: CreditCard },
];

const FAQ_DATA = [
  // Towing
  { category: 'Towing', q: 'What is your average response time for emergency towing?', a: 'Within the Greater Accra and Ashanti regions, we guarantee a response time of 30-45 minutes. For areas outside major city limits, response times may vary depending on distance and traffic conditions.' },
  { category: 'Towing', q: 'What areas do your towing services cover?', a: 'We offer nationwide coverage through our owned fleet and vetted partner network, but our primary rapid-response zones are Accra, Tema, and Kumasi.' },
  { category: 'Towing', q: 'How much does a standard tow cost?', a: 'Towing costs depend on the distance and the type of car. Our base rate starts at GH₵ 250 within city limits. We provide upfront pricing before dispatching a truck.' },
  { category: 'Towing', q: 'Do you work with insurance companies?', a: 'Yes, we are approved by most major insurance providers in Ghana. If you have roadside assistance coverage, we can often bill your insurance directly.' },
  { category: 'Towing', q: 'Can you tow lowered or modified cars?', a: 'Absolutely. We operate flatbed tow trucks equipped with low-angle ramps specifically designed to safely transport modified, sports, or lowered cars.' },

  // Rentals
  { category: 'Rentals', q: 'What are the eligibility requirements to rent a car?', a: 'You must be at least 21 years old (25 for luxury or SUV classes), possess a valid Ghanaian driver’s license or an International Driving Permit, and provide a valid credit card or mobile money account in your name.' },
  { category: 'Rentals', q: 'Is a security deposit required?', a: 'Yes, a refundable security deposit is required for all rentals. The amount varies based on the car category and is refunded within 3-5 business days after the car is returned in good condition.' },
  { category: 'Rentals', q: 'What is your cancellation policy?', a: 'Cancellations made 48 hours prior to the pickup time are fully refunded. Cancellations within 48 hours may incur a one-day rental charge.' },
  { category: 'Rentals', q: 'Can I rent a car with a driver?', a: 'Yes, we offer chauffeur services for an additional daily fee. All our drivers are professionally trained, vetted, and familiar with local routes.' },
  { category: 'Rentals', q: 'Are there mileage limits on rentals?', a: 'Most standard rentals come with unlimited mileage. However, long-term rentals (over 30 days) or specific commercial cars may have a generous daily mileage cap.' },

  // Repairs
  { category: 'Repairs', q: 'How long does a standard service take?', a: 'A routine maintenance service (oil change, filter replacement, fluid top-up, and multipoint inspection) typically takes 1 to 2 hours if you have an appointment.' },
  { category: 'Repairs', q: 'Do you offer a warranty on repairs?', a: 'Yes, all our mechanical repairs and labor come with a minimum 6-month or 10,000 km warranty. Parts warranties depend on the manufacturer but typically range from 1 to 2 years.' },
  { category: 'Repairs', q: 'Do you use genuine OEM parts?', a: 'We offer the choice between genuine OEM (Original Equipment Manufacturer) parts and high-quality, certified aftermarket alternatives to suit your budget.' },
  { category: 'Repairs', q: 'Can I get a loaner car while my car is being repaired?', a: 'Loaner cars are available subject to availability and the nature of the repair. Priority is given to our Fleet Partners and customers undergoing major overhauls.' },
  { category: 'Repairs', q: 'Do you provide diagnostic reports?', a: 'Yes, every computerized diagnostic scan comes with a detailed, easy-to-understand printed or digital report outlining the fault codes and recommended solutions.' },

  // Sales
  { category: 'Sales', q: 'Do you offer car financing?', a: 'Yes, we partner with leading local banks and financial institutions to offer flexible auto loan options with competitive interest rates and terms up to 60 months.' },
  { category: 'Sales', q: 'Are your used cars inspected before sale?', a: 'Absolutely. Every pre-owned car undergoes a rigorous 150-point mechanical, electrical, and structural inspection before being listed for sale.' },
  { category: 'Sales', q: 'Can I trade in my current car?', a: 'Yes, we accept trade-ins. You can bring your car in for a free appraisal, and the value can be applied toward the purchase of a new or pre-owned car.' },
  { category: 'Sales', q: 'Do you import cars on request?', a: 'Yes, if we don’t have what you’re looking for in stock, we can source and import specific makes and models from North America, Europe, or Asia on your behalf.' },
  { category: 'Sales', q: 'What kind of warranty comes with purchased cars?', a: 'Brand new cars come with the full manufacturer warranty. Certified Pre-Owned cars come with our comprehensive 12-month/20,000 km warranty.' },

  // Parts
  { category: 'Parts', q: 'How do I know if a part is compatible with my car?', a: 'You can provide us with your car’s Chassis Number (VIN), and our parts specialists will ensure 100% compatibility before you make a purchase.' },
  { category: 'Parts', q: 'What is your return policy for parts?', a: 'Unused, uninstalled parts in their original, undamaged packaging can be returned within 14 days of purchase with a valid receipt. Electrical components are generally non-returnable.' },
  { category: 'Parts', q: 'Do you deliver auto parts?', a: 'Yes, we offer same-day delivery within major cities for orders placed before 12 PM, and standard 1-2 day shipping nationwide.' },
  { category: 'Parts', q: 'Do you stock parts for European cars?', a: 'Yes, we specialize in parts for major European, Asian, and American brands. If a specialized part is out of stock, we can express-order it for you.' },
  { category: 'Parts', q: 'Can I buy a part and have you install it?', a: 'Certainly. You can purchase parts from our shop and schedule an installation with our workshop at a discounted labor rate.' },

  // Payments
  { category: 'Payments', q: 'What payment methods do you accept?', a: 'We accept Cash, major Credit/Debit Cards (Visa, Mastercard), Mobile Money (MTN, Telecel, AT), and direct bank transfers for corporate accounts.' },
  { category: 'Payments', q: 'Do you offer installment payment plans for repairs?', a: 'For major, unexpected repairs, we offer flexible payment plans through third-party financial partners (subject to approval).' },
  { category: 'Payments', q: 'How do refunds work?', a: 'Approved refunds are processed back to the original payment method. Mobile money and card refunds typically reflect within 3-5 business days.' },
  { category: 'Payments', q: 'Can you provide VAT invoices for my business?', a: 'Yes, we are a fully registered entity and provide VAT-compliant invoices and receipts for all transactions.' },
  { category: 'Payments', q: 'When is payment due for services?', a: 'For repairs, a diagnostic fee is due upfront, and the final bill is settled upon collection of the car. For towing and parts, payment is required at the time of service or purchase.' },
  
  // Fleet
  { category: 'Fleet', q: 'What is the minimum number of cars for a fleet account?', a: 'Our corporate fleet accounts typically start at 5 cars, but we can offer tailored solutions for smaller, high-utilization businesses like delivery startups.' },
  { category: 'Fleet', q: 'Do fleet accounts get discounted rates?', a: 'Yes, fleet partners enjoy volume-based discounts on labor, parts, rentals, and towing services.' },
  { category: 'Fleet', q: 'How is fleet billing handled?', a: 'Approved fleet partners receive consolidated monthly invoicing with 30-day net payment terms, along with detailed breakdowns per car.' },
  { category: 'Fleet', q: 'Do you provide fleet maintenance reporting?', a: 'Yes, we provide detailed monthly or quarterly reports on your fleet’s health, maintenance history, and overall spend to help you optimize operations.' }
];

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const seoTitle = useContent('seo.faqs.title', 'Frequently Asked Questions | Santa Towing');
  const seoDesc = useContent('seo.faqs.description', 'Find answers to common questions about our emergency towing, auto repair, car rental, and car sales services.');
  const faqsDesc = useContent('faqs.description', 'Find quick answers about our towing, rental, repair, sales, and parts services.');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const { faqs: inventoryFaqs } = useInventoryFaqs();
  const allFaqs = inventoryFaqs;

  const filteredFaqs = useMemo(() => {
    return (allFaqs || FAQ_DATA).filter(faq => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = (faq.q || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (faq.a || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, allFaqs]);

  // Group by category if "All" is selected and there's no search query
  const shouldGroup = activeCategory === 'All' && searchQuery === '';

  const groupedFaqs = useMemo(() => {
    if (!shouldGroup) return {};
    const groups: Record<string, typeof FAQ_DATA> = {};
    filteredFaqs.forEach(faq => {
      if (!groups[faq.category]) groups[faq.category] = [];
      groups[faq.category].push(faq);
    });
    return groups;
  }, [filteredFaqs, shouldGroup]);

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white">
      <SEO title={seoTitle} description={seoDesc} canonical="/faqs" />
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Frequently Asked <span className="text-accent">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
          >
            {faqsDesc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-2 rounded-[1px] flex items-center shadow-2xl max-w-2xl mx-auto border border-dark/10"
          >
            <div className="pl-4 pr-2 text-dark/70">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              placeholder="Search for questions..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenFaqId(null); // Reset open accordion on search
              }}
              className="flex-1 py-3 px-2 text-dark focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="pr-4 text-dark/70 hover:text-accent transition-colors"
              >
                Clear
              </button>
            )}
          </motion.div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 2. Category Tabs/Filter */}
      <section className="bg-white border-b border-dark/20 sticky top-[72px] lg:top-[104px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'FAQs' }]} variant="light" />
          </div>
          <div className="flex overflow-x-auto no-scrollbar py-4 gap-2 md:gap-4">
            {CATEGORIES.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenFaqId(null);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all",
                    activeCategory === category.id 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-dark/70 hover:bg-white"
                  )}
                >
                  <Icon className={cn("w-4 h-4", activeCategory === category.id ? "text-primary" : "text-dark/70")} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FAQ Accordion Sections */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 md:py-20 bg-white rounded-[1px] border border-dark/10 shadow-sm">
              <HelpCircle className="w-16 h-16 text-white/70 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-dark mb-2">No results found</h3>
              <p className="text-dark/70">We couldn't find any questions matching "{searchQuery}".</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 text-accent font-bold hover:text-accent transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : shouldGroup ? (
            // Grouped View (when "All" is selected and no search)
            <div className="space-y-16">
              {Object.entries(groupedFaqs).map(([category, faqs], groupIdx) => {
                const categoryInfo = CATEGORIES.find(c => c.id === category);
                const CategoryIcon = categoryInfo?.icon || HelpCircle;
                
                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <CategoryIcon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-dark">{categoryInfo?.label || category}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {(faqs as typeof FAQ_DATA).map((faq, idx) => {
                        const isOpen = openFaqId === faq.q;
                        
                        return (
                          <div key={idx} className="border border-dark/20 rounded-[1px] overflow-hidden shadow-sm bg-white hover:border-accent/30 transition-colors">
                            <button 
                              onClick={() => setOpenFaqId(isOpen ? null : faq.q)}
                              className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-dark/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent rounded-full"
                              aria-expanded={isOpen}
                            >
                              <span className={cn("font-bold pr-4 transition-colors", isOpen ? "text-primary" : "text-dark")}>{faq.q}</span>
                              <ChevronDown className={cn("w-5 h-5 transition-transform shrink-0", isOpen ? "text-primary rotate-180" : "text-dark/70")} />
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-white"
                                >
                                  <div className="px-6 py-5 text-dark/80 border-t border-dark/10 leading-relaxed text-sm md:text-base">
                                    {faq.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Flat List View (when filtered by category or searched)
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqId === faq.q;
                
                return (
                  <div key={idx} className="border border-dark/20 rounded-[1px] overflow-hidden shadow-sm bg-white hover:border-accent/30 transition-colors">
                    <button 
                      onClick={() => setOpenFaqId(isOpen ? null : faq.q)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-dark/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent rounded-full"
                      aria-expanded={isOpen}
                    >
                      <span className={cn("font-bold pr-4 transition-colors", isOpen ? "text-primary" : "text-dark")}>{faq.q}</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform shrink-0", isOpen ? "text-primary rotate-180" : "text-dark/70")} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white"
                        >
                          <div className="px-6 py-5 text-dark/80 border-t border-dark/10 leading-relaxed text-sm md:text-base">
                            <div className="mb-3">
                              <span className="inline-block bg-primary text-white text-xs font-bold tracking-wider uppercase px-2 py-1">
                                {faq.category}
                              </span>
                            </div>
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. Still Have Questions? */}
      <section className="py-12 md:py-20 bg-white border-t border-dark/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white rounded-[1px] flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Still Have Questions?</h2>
          <p className="text-dark/70 mb-8 max-w-2xl mx-auto text-lg">
            If you couldn't find the answer you were looking for, our customer support team is ready to help you out.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <Phone className="w-5 h-5" /> Contact Support
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* 5. Call-to-Action Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Experience premium automotive services with Maccom Systems today. Call for service or reach out to our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg inline-block rounded-full">
              Book a Service
            </Link>
            <Link to="/contact" className="bg-white hover:bg-dark/5 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg rounded-full">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
