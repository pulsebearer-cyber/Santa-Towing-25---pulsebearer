import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { RENTAL_CATEGORIES } from '@/data/mockData';
import { Settings, Fuel, Calendar, MapPin, Users, ArrowRight, Tag, ShieldCheck, Phone, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { useInventoryCars } from '@/hooks/useInventory';
import EditableText from '@/components/editable/EditableText';

export function FeaturedCars() {
  const [activeTab, setActiveTab] = useState('New');
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const tabs = ['New', 'Foreign Used', 'Ghana Used'];

  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const heading = useContent('home.featuredCars.heading', 'Featured Cars for Sale');
  const description = useContent('home.featuredCars.description', 'Explore our vetted inventory of premium brand-new and certified pre-owned cars with complete mechanical inspection reports.');
  const viewAllBtn = useContent('home.featuredCars.viewAllBtn', 'View Full Car Inventory');
  
  const { cars } = useInventoryCars();
  const filteredCars = cars.filter(v => v.type === activeTab).slice(0, 8);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-[1.15]">
              <EditableText
                storageKey="home.featuredCars.heading"
                defaultContent={heading}
                label="Featured Cars Heading"
              />
            </h2>
            <div className="text-white/75 text-base sm:text-lg leading-relaxed">
              <EditableText
                as="p"
                multiline={true}
                storageKey="home.featuredCars.description"
                defaultContent={description}
                label="Featured Cars Description"
              />
            </div>
          </div>
          
          {/* Tab Filter Pills */}
          <div className="flex bg-white/10 p-1.5 rounded-[1px] backdrop-blur-md self-start md:self-end border border-white/15 overflow-x-auto no-scrollbar max-w-full">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 whitespace-nowrap",
                  activeTab === tab 
                    ? "bg-accent text-white shadow-md shadow-accent/30" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCars.map(car => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={car.id}
                className="bg-white text-dark rounded-[1px] overflow-hidden border border-gray-200 hover:border-accent/50 transition-all duration-300 group flex flex-col hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Image & Ribbon Badges */}
                <div className="aspect-[4/3] relative overflow-hidden bg-black/40">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Ribbon Status Badge */}
                  <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>For Sale</span>
                  </div>
                  {/* Year Badge */}
                  <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur-md px-2.5 py-1 rounded-[1px] text-xs font-bold text-white border border-white/20">
                    {car.year}
                  </div>
                </div>
                
                {/* Car Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-1.5 group-hover:text-accent transition-colors">
                    {car.name}
                  </h3>
                  <div className="text-2xl font-extrabold text-dark mb-5 tracking-tight">
                    {car.price}
                  </div>
                  
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 flex-1 text-xs text-dark/80 border-t border-b border-gray-100 py-3.5">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-accent" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-accent" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{car.mileage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      <span>Inspected</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link to={`/sales/${car.id}`} className="w-full text-center bg-white hover:bg-dark/5 text-dark border border-dark/20 py-3 font-bold transition-colors text-sm rounded-full">
                      View Details
                    </Link>
                    <div className="flex gap-2">
                      <a href={phoneTel} className="flex-1 text-center bg-primary hover:bg-black text-white py-3 font-bold transition-colors text-sm shadow-md rounded-full flex items-center justify-center gap-1">
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
        
        {/* Bottom Link */}
        <div className="mt-12 text-center">
          <Link 
            to="/sales" 
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-8 py-3.5 font-bold transition-all border border-white/20 hover:border-white/40 group rounded-full"
          >
            <span>{viewAllBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
      {/* Sales Quick View Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[1px] w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative aspect-video">
                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-accent text-white px-3 py-1 rounded-md text-sm font-bold uppercase shadow-md">
                  {selectedCar.price}
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold text-dark mb-2">{selectedCar.name}</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <Calendar className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Year</div>
                    <div className="text-sm font-bold text-dark">{selectedCar.year}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <MapPin className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Mileage</div>
                    <div className="text-sm font-bold text-dark">{selectedCar.mileage}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <Fuel className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Fuel</div>
                    <div className="text-sm font-bold text-dark">{selectedCar.fuel}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <Settings className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Transmission</div>
                    <div className="text-sm font-bold text-dark">{selectedCar.transmission}</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 flex gap-4">
                  <a 
                    href={phoneTel} 
                    className="flex-1 bg-accent hover:bg-accent/90 text-white py-3.5 font-bold transition-all text-sm text-center flex items-center justify-center shadow-md rounded-full gap-2"
                  >
                    <Phone className="w-5 h-5" /> Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
</section>);}

export function RentalFleet() {
  const [selectedRental, setSelectedRental] = useState<any>(null);
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const heading = useContent('home.rentalFleet.heading', 'Premium Car Rental Fleet');
  const description = useContent('home.rentalFleet.description', 'Clean, fully insured cars available for daily, weekly, or corporate monthly rentals with airport pickup options.');

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4 tracking-tight">
            <EditableText
              storageKey="home.rentalFleet.heading"
              defaultContent={heading}
              label="Rental Fleet Heading"
            />
          </h2>
          <div className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <EditableText
              as="p"
              multiline={true}
              storageKey="home.rentalFleet.description"
              defaultContent={description}
              label="Rental Fleet Description"
            />
          </div>
        </div>

        {/* Rental Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RENTAL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.08, duration: 0.45 }}
              className="bg-white rounded-[1px] overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 hover:border-accent/30 transition-all duration-300 group flex flex-col hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                  Rental
                </div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-extrabold text-white tracking-wide">
                  {category.name}
                </h3>
              </div>
              
              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Pricing Breakdown */}
                <div className="flex justify-between items-end mb-6 pb-5 border-b border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Daily Rate</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-dark">{category.daily}</span>
                      <span className="text-gray-500 font-medium text-sm">/day</span>
                    </div>
                  </div>
                  <div className="text-right text-xs font-semibold text-slate-600 space-y-0.5">
                    <div>Weekly: <span className="text-dark font-bold">{category.weekly}</span></div>
                    <div>Monthly: <span className="text-dark font-bold">{category.monthly}</span></div>
                  </div>
                </div>
                
                {/* Specs Row */}
                <div className="grid grid-cols-3 gap-2 mb-6 py-2 bg-slate-50 rounded-[1px] p-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-dark">{category.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-gray-200">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-dark">{category.trans}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-dark">{category.fuel}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Link to={`/rental/${category.id}`} className="w-full text-center bg-white hover:bg-dark/5 text-dark border border-dark/20 py-3 font-bold transition-colors text-sm rounded-full">
                    View Details
                  </Link>
                  <div className="flex gap-2">
                    <a href={phoneTel} className="flex-1 text-center bg-primary hover:bg-black text-white py-3 font-bold transition-colors text-sm shadow-md rounded-full flex items-center justify-center gap-1">
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
        </div>

      </div>
      {/* Rental Quick View Modal */}
      <AnimatePresence>
        {selectedRental && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRental(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[1px] w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedRental(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative aspect-video">
                <img src={selectedRental.image} alt={selectedRental.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-md text-sm font-bold uppercase shadow-md">
                  {selectedRental.name} Category
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <h3 className="text-2xl font-bold text-dark mb-4">{selectedRental.name} Rental</h3>
                
                <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">Daily Rate</div>
                    <div className="text-2xl font-bold text-accent">{selectedRental.daily}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">Weekly Rate</div>
                    <div className="text-xl font-bold text-dark">{selectedRental.weekly}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-semibold uppercase">Monthly Rate</div>
                    <div className="text-xl font-bold text-dark">{selectedRental.monthly}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Seats</div>
                    <div className="text-sm font-bold text-dark">{selectedRental.seats}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <Fuel className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Fuel</div>
                    <div className="text-sm font-bold text-dark">{selectedRental.fuel}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-[1px] text-center">
                    <Settings className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-gray-500 font-semibold">Transmission</div>
                    <div className="text-sm font-bold text-dark">{selectedRental.trans}</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={phoneTel} 
                    className="flex-1 bg-accent hover:bg-accent/90 text-white py-3.5 font-bold transition-all text-sm text-center flex items-center justify-center shadow-md rounded-full gap-2"
                  >
                    <Phone className="w-5 h-5" /> Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
</section>);}
