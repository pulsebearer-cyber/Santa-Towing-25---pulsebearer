import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Search, Car, Settings, Fuel, ShieldCheck, Tag, CheckCircle2, DollarSign, RefreshCcw, ThumbsUp, CreditCard, ChevronDown, Star, ArrowRight, SlidersHorizontal, MapPin } from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';

import { CARS } from '@/data/mockData';
import { useInventoryCars } from '@/hooks/useInventory';

const WHY_BUY_FEATURES = [
  { title: 'Inspected & Verified Cars', icon: ShieldCheck },
  { title: 'Transparent Pricing', icon: Tag },
  { title: 'Financing Options Available', icon: CreditCard },
  { title: 'Trade-In Accepted', icon: RefreshCcw },
  { title: 'After-Sales Support', icon: ThumbsUp },
  { title: 'Warranty Options', icon: CheckCircle2 },
];

const BUYING_PROCESS = [
  'Browse Inventory', 'Contact Sales', 'Car Inspection', 'Financing/Payment', 'Drive Away'
];

const SALES_FAQS = [
  { q: 'How thorough is your car inspection process?', a: 'Every pre-owned car goes through a rigorous 150-point inspection covering engine performance, transmission, electrical systems, brakes, and bodywork before being listed for sale.' },
  { q: 'Do you offer warranties on used cars?', a: 'Yes! All foreign-used cars come with a standard 3-month or 5,000 km warranty. Extended warranties are also available for purchase.' },
  { q: 'What do I need to qualify for financing?', a: 'You will need a valid national ID, proof of income (recent pay slips or bank statements), and proof of address. Our finance partners will assess your application based on credit history.' },
  { q: 'How does the trade-in process work?', a: 'Bring your current car for a free appraisal. We evaluate its condition and market value, then offer you a trade-in value that can be directly applied to your new purchase.' },
  { q: 'Can you deliver the car to my location?', a: 'Yes, we offer nationwide delivery. Delivery within the city is often free, while out-of-town deliveries incur a standard transport fee based on distance.' },
];

export default function Sales() {
  const [activeTab, setActiveTab] = useState('All');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const salesTitle = useContent('sales.title', 'Quality Cars For Sale');
  const salesDesc = useContent('sales.description', 'Explore certified new, foreign-used, and inspected Ghana-used cars with flexible financing and warranty options.');

  const { cars } = useInventoryCars();
  const tabs = ['All', 'New', 'Foreign Used', 'Ghana Used'];
  
  const filteredCars = activeTab === 'All' 
    ? cars 
    : cars.filter(v => v.type === activeTab);

  return (
    <main className="pt-24 lg:pt-[104px]">
      <SEO title="Cars for Sale | New & Pre-Owned Cars | Santa Towing" description="Browse our inventory of quality inspected, reliable new and pre-owned cars. Find your perfect car with trusted automotive experts." canonical="/sales" />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-dark/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Car Sales' }]} />
        </div>
      </div>
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary overflow-hidden pt-12 pb-32 md:pt-20 md:pb-40">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Find Your Next Car With <span className="text-accent">Confidence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto"
          >
            Explore a curated selection of new and quality pre-owned cars, backed by trusted inspection and financing options.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-lg shadow-accent/30 rounded-full">
              View Inventory
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 sm:px-8 py-4 font-bold transition-all border border-white/20 rounded-full">
              Sell Your Car
            </button>
          </motion.div>

          {/* Quick Search Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[1px] p-6 sm:p-8 shadow-2xl max-w-5xl mx-auto relative translate-y-16 md:translate-y-24 text-left"
          >
            <form className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end" onSubmit={e => e.preventDefault()}>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-dark mb-2">Make</label>
                <select className="w-full px-4 py-3 bg-white border border-dark/20 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none text-dark/70">
                  <option value="">Any Make</option>
                  <option value="toyota">Toyota</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="range-rover">Range Rover</option>
                  <option value="hyundai">Hyundai</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-dark mb-2">Model</label>
                <select className="w-full px-4 py-3 bg-white border border-dark/20 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none text-dark/70">
                  <option value="">Any Model</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-dark mb-2">Body Type</label>
                <select className="w-full px-4 py-3 bg-white border border-dark/20 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none text-dark/70">
                  <option value="">Any Body</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-dark mb-2">Max Price</label>
                <select className="w-full px-4 py-3 bg-white border border-dark/20 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none text-dark/70">
                  <option value="">Any Price</option>
                  <option value="100000">Under 100k</option>
                  <option value="300000">Under 300k</option>
                  <option value="500000">Under 500k</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-dark mb-2">Year</label>
                <select className="w-full px-4 py-3 bg-white border border-dark/20 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none text-dark/70">
                  <option value="">Any Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 transition-all shadow-md flex items-center justify-center gap-2 rounded-full">
                  <Search className="w-5 h-5" /> Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* Spacer for overlapping widget */}
      <div className="h-24 md:h-32 bg-white"></div>

      {/* 2 & 3. Inventory Layout (Sidebar + Grid) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex bg-white p-1 rounded-[1px] border border-dark/20 overflow-x-auto no-scrollbar max-w-full shadow-sm">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2.5 rounded-md font-medium transition-all whitespace-nowrap",
                    activeTab === tab 
                      ? "bg-primary text-white shadow-md" 
                      : "text-dark/70 hover:text-dark hover:bg-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <button 
              className="md:hidden w-full flex items-center justify-center gap-2 bg-white border border-dark/20 py-3 font-bold text-dark shadow-sm rounded-full"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="w-5 h-5" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={cn(
              "lg:w-1/4 space-y-6 lg:block",
              isFilterOpen ? "block" : "hidden"
            )}>
              <div className="bg-white rounded-[1px] p-6 shadow-sm border border-dark/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-dark text-lg">Filters</h3>
                  <button className="text-sm text-primary font-semibold hover:underline rounded-full">Reset</button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-dark mb-3">Price Range</label>
                    <input type="range" className="w-full accent-orange" />
                    <div className="flex justify-between text-sm text-dark/70 mt-2">
                      <span>GH₵ 50k</span>
                      <span>GH₵ 2M+</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-dark mb-3">Body Type</label>
                    <div className="space-y-2">
                      {['Sedan', 'SUV', 'Pickup', 'Hatchback', 'Van'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-5 h-5 rounded-xl border border-dark/30 flex items-center justify-center group-hover:border-accent"></div>
                          <span className="text-dark/70 group-hover:text-accent transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-dark mb-3">Transmission</label>
                    <div className="space-y-2">
                      {['Automatic', 'Manual'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-5 h-5 rounded-xl border border-dark/30 flex items-center justify-center group-hover:border-accent"></div>
                          <span className="text-dark/70 group-hover:text-accent transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-dark mb-3">Fuel Type</label>
                    <div className="space-y-2">
                      {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-5 h-5 rounded-xl border border-dark/30 flex items-center justify-center group-hover:border-accent"></div>
                          <span className="text-dark/70 group-hover:text-accent transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-primary text-white font-bold py-3 mt-8 hover:bg-black transition-colors rounded-full">
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* Car Grid */}
            <div className="lg:w-3/4">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredCars.map((car) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={car.id}
                      className="bg-white rounded-[1px] overflow-hidden border border-dark/10 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-white">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-1.5 items-center">
                          <span className="bg-accent text-white px-3 py-1 rounded-[1px] text-xs font-bold shadow-sm">
                            {car.type}
                          </span>
                          {(car as any).status && (car as any).status !== 'Available' && (
                            <span className="bg-dark/85 backdrop-blur-md text-white px-2.5 py-1 rounded-[1px] text-xs font-bold shadow-sm">
                              {(car as any).status}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-dark line-clamp-1">{car.name}</h3>
                        <div className="text-2xl font-bold text-accent mb-4">{car.price}</div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-dark/10 flex-1">
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-dark/70" />
                            <span className="text-sm font-semibold text-dark/70">{car.year}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="w-4 h-4 text-dark/70" />
                            <span className="text-sm font-semibold text-dark/70">{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Fuel className="w-4 h-4 text-dark/70" />
                            <span className="text-sm font-semibold text-dark/70">{car.fuel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-dark/70" />
                            <span className="text-sm font-semibold text-dark/70 truncate">{car.mileage}</span>
                          </div>
                        </div>
                        
                        
                        <div className="flex flex-col gap-2 mt-auto">
                          <Link to={`/sales/${car.id}`} className="w-full text-center bg-white hover:bg-dark/5 text-dark border border-dark/20 py-3 font-bold transition-colors text-sm rounded-full">
                            View Details
                          </Link>
                          <div className="flex gap-2">
                            <a href={phoneTel || `tel:${phoneRaw}`} className="flex-1 text-center bg-primary hover:bg-black text-white py-3 font-bold transition-colors text-sm shadow-md rounded-full flex items-center justify-center gap-1">
                              <Phone className="w-4 h-4"/> Call
                            </a>
                            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-primary hover:bg-primary/90 text-white py-3 font-bold transition-colors text-sm shadow-md rounded-full flex items-center justify-center gap-1">
                              <MessageCircle className="w-4 h-4"/> WhatsApp
                            </a>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="text-center mt-12">
                <button className="bg-white border border-dark/20 text-dark font-bold px-4 sm:px-8 py-3 hover:bg-white transition-colors shadow-sm rounded-full">
                  Load More Cars
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Buy From Us */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Buy From Santa Towing</h2>
            <p className="text-white/80 text-lg">Trust, quality, and peace of mind guaranteed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {WHY_BUY_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-white/10 rounded-[1px] p-6 text-center shadow-sm hover:shadow-md transition-all group text-primary"
                >
                  <Icon className="w-10 h-10 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary">{feature.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Financing & Trade-In */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-[1px] p-6 sm:p-8 md:p-12 flex flex-col justify-center border border-dark/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Flexible Financing</h2>
                <p className="text-dark/70 mb-8 text-lg">
                  We partner with leading banks and financial institutions to offer competitive auto loans. Get pre-approved quickly with flexible payment plans tailored to your budget.
                </p>
                <button className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-md inline-flex items-center gap-2 rounded-full">
                  Apply for Financing <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="bg-primary text-white rounded-[1px] p-6 sm:p-8 md:p-12 flex flex-col justify-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <RefreshCcw className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Trade-In Your Car</h2>
                <p className="text-white/90 mb-8 text-lg">
                  Upgrade your ride effortlessly. Bring in your current car for a fair, transparent valuation and use its value towards your next purchase.
                </p>
                <button className="bg-white hover:bg-dark/5 text-primary px-4 sm:px-8 py-4 font-bold transition-all shadow-md inline-flex items-center gap-2 rounded-full">
                  Get Your Trade-In Value
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How Buying Works */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">How Buying Works</h2>
            <p className="text-dark/70 text-lg">A simple, transparent process from browsing to driving.</p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {BUYING_PROCESS.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 bg-white rounded-xl border-4 border-dark/10 shadow-xl flex items-center justify-center text-xl font-bold text-dark group-hover:border-accent group-hover:text-accent transition-colors relative z-10">
                    {idx + 1}
                  </div>
                  <h4 className="mt-4 font-bold text-dark">{step}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Featured Cars */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Deals</h2>
              <p className="text-white/80 text-lg">Hand-picked selections offering the best value this week.</p>
            </div>
            <button className="hidden md:inline-flex items-center gap-2 text-primary hover:text-white font-bold transition-colors rounded-full">
              View All Offers <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CARS.slice(0, 3).map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[1px] overflow-hidden group hover:border-accent/50 transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-[1px] text-xs font-bold">Featured</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{car.name}</h3>
                  <div className="text-2xl font-bold text-white mb-6">{car.price}</div>
                  <Link to={`/sales/${car.id}`} className="mt-auto block w-full text-center bg-white/10 hover:bg-white/20 text-white py-3 font-bold transition-colors rounded-full">
                    View Offer
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="md:hidden mt-8 w-full inline-flex justify-center items-center gap-2 text-accent font-bold border border-primary py-3 rounded-full">
            View All Offers <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>



      {/* 9. FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Car Sales FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {SALES_FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-dark/20 rounded-[1px] overflow-hidden shadow-sm bg-white"
              >
                <button 
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-dark/5 transition-colors rounded-full"
                >
                  <span className="font-bold text-dark pr-4">{faq.q}</span>
                  <ChevronDown className={cn("w-5 h-5 text-primary transition-transform shrink-0", openIdx === idx && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 text-dark/70">
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

      {/* 10. Call-to-Action Banner */}
      <section className="py-16 md:py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Car?</h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Our sales team is ready to help you drive away in the car of your dreams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl rounded-full">View Inventory</button>
            <a href={phoneTel || `tel:${phoneRaw}`} className="bg-white hover:bg-dark/5 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-xl rounded-full inline-flex items-center gap-2"><Phone className="w-5 h-5"/> Contact Sales Team</a>
          </div>
        </div>
      </section>

    </main>
  );
}
