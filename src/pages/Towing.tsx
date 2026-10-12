import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Navigation, Clock, ShieldCheck, Tag, FileText, ArrowRight, Truck, Wrench, Car, ChevronDown, Star, Search, X, Check, MessageCircle, Mail } from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { GHANA_REGIONS_DATA, ALL_GHANA_REGIONS } from '@/data/ghanaLocations';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';

const TOWING_FEATURES = [
  { title: 'Average 30-Min Response', icon: Clock },
  { title: 'Nationwide Coverage', icon: MapPin },
  { title: 'Transparent Pricing', icon: Tag },
];

const TOWING_PROCESS = [
  'Contact Us', 'Share Location', 'Dispatch Car', 'Car Recovered', 'Safe Arrival'
];

const TOWING_TYPES = [
  { title: 'Light Car Towing', desc: 'Safe transport for sedans, hatchbacks, and small SUVs.', image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' },
  { title: 'Heavy-Duty Towing', desc: 'Capable of handling trucks, buses, and commercial cars.', image: 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg' },
  { title: 'Accident Recovery', desc: 'Careful extraction and transport from accident scenes.', image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' },
  { title: 'Flatbed Towing', desc: 'Ideal for luxury cars, AWD cars, and severe damage.', image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' },
  { title: 'Winching & Off-Road', desc: 'Specialized equipment to pull cars out of ditches or mud.', image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg' },
  { title: 'Long-Distance Towing', desc: 'Secure transportation across cities and regions.', image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' },
];

const TOWING_FAQS = [
  { q: 'How quickly can you get to me?', a: 'Our average response time is under 30 minutes within city limits. Dispatch times may vary slightly based on traffic and weather conditions.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, mobile money (MoMo), and cash. Payment is only required upon safe delivery of your car.' },
  { q: 'Do you work directly with insurance companies?', a: 'Yes, we provide full insurance-friendly documentation and can often bill your provider directly depending on your policy.' },
  { q: 'What should I do while waiting for the tow truck?', a: 'Turn on your hazard lights, move to a safe location away from traffic if possible, and stay inside your locked car if you are on a busy highway.' },
  { q: 'Is there a limit to how far you can tow my car?', a: 'No, we offer both local and long-distance towing services. Contact us for a custom quote on long-distance transport.' },
];

export default function Towing() {
  const hotline = useContent('global.links.phone', '0244753849');
  const hotlineTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Form field state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [carMakeModel, setCarMakeModel] = useState<string>('');
  const [issue, setIssue] = useState<string>('');

  // Dependent location state
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [regionSearch, setRegionSearch] = useState<string>('');
  const [isRegionOpen, setIsRegionOpen] = useState<boolean>(false);

  const [selectedArea, setSelectedArea] = useState<string>('');
  const [areaSearch, setAreaSearch] = useState<string>('');
  const [isAreaOpen, setIsAreaOpen] = useState<boolean>(false);

  const regionRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const ISSUE_LABELS: Record<string, string> = {
    breakdown: 'Car Breakdown',
    accident: 'Accident Recovery',
    'flat-tire': 'Flat Tire',
    fuel: 'Out of Fuel',
    lockout: 'Car Lockout',
    other: 'Other Roadside Issue'
  };

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setIsRegionOpen(false);
      }
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setIsAreaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered regions
  const filteredRegions = useMemo(() => {
    const q = regionSearch.trim().toLowerCase();
    if (!q) return ALL_GHANA_REGIONS;
    return ALL_GHANA_REGIONS.filter(r => r.toLowerCase().includes(q));
  }, [regionSearch]);

  // Available areas for selected region
  const availableAreas = useMemo(() => {
    if (!selectedRegion) return [];
    const regionObj = GHANA_REGIONS_DATA.find(r => r.region.toLowerCase() === selectedRegion.toLowerCase());
    return regionObj ? regionObj.areas : [];
  }, [selectedRegion]);

  // Filtered areas
  const filteredAreas = useMemo(() => {
    const q = areaSearch.trim().toLowerCase();
    if (!q) return availableAreas;
    return availableAreas.filter(a => a.toLowerCase().includes(q));
  }, [availableAreas, areaSearch]);

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    setRegionSearch(region);
    setIsRegionOpen(false);
    // Reset area
    setSelectedArea('');
    setAreaSearch('');
    // Automatically open area dropdown for fast flow
    setTimeout(() => {
      setIsAreaOpen(true);
    }, 100);
  };

  const handleClearRegion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRegion('');
    setRegionSearch('');
    setSelectedArea('');
    setAreaSearch('');
    setIsRegionOpen(false);
    setIsAreaOpen(false);
  };

  const handleSelectArea = (area: string) => {
    setSelectedArea(area);
    setAreaSearch(area);
    setIsAreaOpen(false);
  };

  const handleClearArea = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedArea('');
    setAreaSearch('');
    setIsAreaOpen(false);
  };

  const generateWhatsAppMessage = () => {
    const issueText = ISSUE_LABELS[issue] || issue || 'Emergency Towing Required';
    return `🚨 *EMERGENCY TOWING REQUEST - SANTA TOWING*

👤 *Name:* ${name || 'Not provided'}
📞 *Phone Number:* ${phone || 'Not provided'}
📍 *Region:* ${selectedRegion || 'Not specified'}
📌 *Area / Town:* ${selectedArea || 'Not specified'}
🚗 *Car Make & Model:* ${carMakeModel || 'Not provided'}
⚠️ *Issue / Situation:* ${issueText}

_Please dispatch an emergency tow truck to my location as soon as possible._`;
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    const form = (e.currentTarget as HTMLElement).closest('form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!selectedRegion) {
      setIsRegionOpen(true);
      return;
    }
    if (!selectedArea) {
      setIsAreaOpen(true);
      return;
    }
    const text = generateWhatsAppMessage();
    const url = `${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegion || !selectedArea) {
      if (!selectedRegion) setIsRegionOpen(true);
      else if (!selectedArea) setIsAreaOpen(true);
      return;
    }
    handleWhatsAppSubmit(e as any);
  };

  return (
    <main className="pt-24 lg:pt-[104px]">
      <SEO title="24/7 Emergency Towing & Car Recovery in Ghana | Santa Towing" description="Fast, reliable 24/7 emergency towing and car recovery services across Ghana. Fully equipped tow trucks ready to assist you safely and securely." canonical="/towing" />
      
      {/* 1. Emergency Hero Banner & 2. Instant Request Form */}
      <section className="relative bg-primary overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Towing Services' }]} variant="light" className="mb-6" />
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                <EditableText
                  storageKey="towing.hero.heading"
                  defaultContent="Stranded? Help Is On The Way."
                  label="Towing Hero Heading"
                />
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-white/70 max-w-lg"
              >
                <EditableText
                  as="p"
                  multiline={true}
                  storageKey="towing.hero.subheading"
                  defaultContent="Fast dispatch, GPS-tracked recovery cars, and professional operators ready around the clock."
                  label="Towing Hero Subheading"
                />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[1px] p-6 sm:p-8 shadow-2xl relative"
            >
              <h3 className="text-2xl font-bold text-dark mb-2">Request a Tow Now</h3>
              
              {formState === 'success' ? (
                <div className="bg-accent/10 border border-accent/20 rounded-[1px] p-6 text-center my-6">
                  <ShieldCheck className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="font-bold text-xl text-dark mb-2">Dispatch Initiated</h4>
                  <p className="text-dark/70 text-sm">We've received your request. A tow truck is being assigned to your location. For immediate assistance, please call <a href={hotlineTel || `tel:${hotline}`} className="font-bold text-accent hover:underline">{hotline}</a>.</p>
                </div>
              ) : (
                <>
                  <p className="text-dark/70 text-sm mb-6">Fill out the form below for immediate dispatch.</p>
                  
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        required 
                        type="text" 
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white border border-dark/20 rounded-lg px-4 py-3 text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent w-full" 
                      />
                      <input 
                        required 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-white border border-dark/20 rounded-lg px-4 py-3 text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent w-full" 
                      />
                    </div>
                    
                    {/* Two-Step Dependent Location Dropdown (Region & Area) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 1. Region Dropdown */}
                      <div className="relative" ref={regionRef}>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            placeholder="Select Region in Ghana..."
                            value={regionSearch}
                            onFocus={() => setIsRegionOpen(true)}
                            onChange={(e) => {
                              setRegionSearch(e.target.value);
                              setIsRegionOpen(true);
                              if (selectedRegion && e.target.value !== selectedRegion) {
                                setSelectedRegion('');
                                setSelectedArea('');
                                setAreaSearch('');
                              }
                            }}
                            className="bg-white border border-dark/20 rounded-lg px-4 py-3 text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent w-full pr-16 text-sm placeholder:text-dark/50"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-dark/40">
                            {regionSearch && (
                              <button
                                type="button"
                                onClick={handleClearRegion}
                                className="p-1 hover:text-dark rounded-full transition-colors"
                                title="Clear Region"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setIsRegionOpen(prev => !prev)}
                              className="p-1 hover:text-dark transition-colors"
                            >
                              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isRegionOpen && "rotate-180")} />
                            </button>
                          </div>
                        </div>

                        {/* Region Suggestions Dropdown Menu */}
                        <AnimatePresence>
                          {isRegionOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-dark/15 rounded-lg shadow-2xl max-h-56 overflow-y-auto z-50 divide-y divide-dark/5"
                            >
                              {filteredRegions.length > 0 ? (
                                filteredRegions.map((region) => {
                                  const isSelected = selectedRegion === region;
                                  return (
                                    <button
                                      key={region}
                                      type="button"
                                      onClick={() => handleSelectRegion(region)}
                                      className={cn(
                                        "w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-accent/10 hover:text-accent transition-colors",
                                        isSelected ? "bg-accent/15 text-accent font-semibold" : "text-dark"
                                      )}
                                    >
                                      <span className="flex items-center gap-2">
                                        <MapPin className={cn("w-3.5 h-3.5", isSelected ? "text-accent" : "text-dark/40")} />
                                        {region}
                                      </span>
                                      {isSelected && <Check className="w-4 h-4 text-accent" />}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="p-3 text-xs text-dark/50 text-center">
                                  No matching regions found
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 2. Dependent Area Dropdown */}
                      <div className="relative" ref={areaRef}>
                        <div className="relative">
                          <input
                            required
                            disabled={!selectedRegion}
                            type="text"
                            placeholder={selectedRegion ? `Select Area / Town...` : "Select Region first..."}
                            value={areaSearch}
                            onFocus={() => {
                              if (selectedRegion) setIsAreaOpen(true);
                            }}
                            onChange={(e) => {
                              if (!selectedRegion) return;
                              setAreaSearch(e.target.value);
                              setIsAreaOpen(true);
                              if (selectedArea && e.target.value !== selectedArea) {
                                setSelectedArea('');
                              }
                            }}
                            className={cn(
                              "bg-white border rounded-lg px-4 py-3 text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent w-full pr-16 text-sm placeholder:text-dark/50 transition-colors",
                              !selectedRegion ? "bg-slate-100/70 border-dark/10 cursor-not-allowed opacity-60" : "border-dark/20"
                            )}
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-dark/40">
                            {areaSearch && selectedRegion && (
                              <button
                                type="button"
                                onClick={handleClearArea}
                                className="p-1 hover:text-dark rounded-full transition-colors"
                                title="Clear Area"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={!selectedRegion}
                              onClick={() => {
                                if (selectedRegion) setIsAreaOpen(prev => !prev);
                              }}
                              className={cn("p-1 transition-colors", selectedRegion ? "hover:text-dark" : "opacity-40 cursor-not-allowed")}
                            >
                              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isAreaOpen && "rotate-180")} />
                            </button>
                          </div>
                        </div>

                        {/* Area Suggestions Dropdown Menu */}
                        <AnimatePresence>
                          {isAreaOpen && selectedRegion && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-dark/15 rounded-lg shadow-2xl max-h-56 overflow-y-auto z-50 divide-y divide-dark/5"
                            >
                              {filteredAreas.length > 0 ? (
                                filteredAreas.map((area) => {
                                  const isSelected = selectedArea === area;
                                  return (
                                    <button
                                      key={area}
                                      type="button"
                                      onClick={() => handleSelectArea(area)}
                                      className={cn(
                                        "w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-accent/10 hover:text-accent transition-colors",
                                        isSelected ? "bg-accent/15 text-accent font-semibold" : "text-dark"
                                      )}
                                    >
                                      <span className="flex items-center gap-2">
                                        <Navigation className={cn("w-3.5 h-3.5", isSelected ? "text-accent" : "text-dark/40")} />
                                        {area}
                                      </span>
                                      {isSelected && <Check className="w-4 h-4 text-accent" />}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="p-3 text-xs text-dark/50 text-center">
                                  No matching areas found in {selectedRegion}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        required 
                        type="text" 
                        placeholder="Car Make & Model" 
                        value={carMakeModel}
                        onChange={(e) => setCarMakeModel(e.target.value)}
                        className="bg-white border border-dark/20 rounded-lg px-4 py-3 text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent w-full" 
                      />
                      <select 
                        required 
                        value={issue} 
                        onChange={(e) => setIssue(e.target.value)}
                        className="bg-white border border-dark/20 rounded-lg px-4 py-3 text-dark/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent w-full appearance-none"
                      >
                        <option value="" disabled>Select Issue...</option>
                        <option value="breakdown">Breakdown</option>
                        <option value="accident">Accident</option>
                        <option value="flat-tire">Flat Tire</option>
                        <option value="fuel">Out of Fuel</option>
                        <option value="lockout">Lockout</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    {/* Action Buttons Stack */}
                    <div className="flex flex-col gap-3 pt-2">
                      {/* 1. WhatsApp Button (Top) */}
                      <button 
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 sm:py-4 transition-all shadow-lg shadow-primary/20 flex items-center justify-center rounded-full text-base group"
                      >
                        <span>Request an Emergency Towing (WhatsApp)</span>
                      </button>

                      {/* 2. Direct Call Button (Directly beneath) */}
                      <a 
                        href={hotlineTel}
                        className="w-full bg-primary hover:bg-black text-white font-bold py-3.5 sm:py-4 transition-all shadow-lg shadow-primary/20 flex items-center justify-center rounded-full text-base border border-white/10 group"
                      >
                        <span>Call 24/7 Emergency Dispatch</span>
                      </a>
                    </div>
                  </form>
                </>
              )}
            </motion.div>

          </div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 3. Why Choose Our Towing Service */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose Santa Towing Towing</h2>
            <p className="text-dark/70">Reliable, professional, and fast response when you need it most.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TOWING_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[1px] p-6 shadow-sm border border-dark/10 flex flex-col items-center text-center hover:shadow-xl hover:border-accent/30 transition-all group"
                >
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                    <Icon className="w-7 h-7 text-white group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="font-bold text-dark">{feature.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">How It Works</h2>
            <p className="text-dark/70 text-lg">A seamless process to get you safe and moving again.</p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {TOWING_PROCESS.map((step, idx) => (
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

      {/* 5. Types of Towing & Recovery Offered */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Recovery Solutions</h2>
            <p className="text-white/80">We have the right equipment for any car and any situation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOWING_TYPES.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 overflow-hidden transition-colors group flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={type.image} alt={type.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80" />
                </div>
                <div className="p-6 relative -mt-12">
                  <h3 className="text-xl font-bold mb-2 text-white">{type.title}</h3>
                  <p className="text-white/80 text-sm">{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Coverage Area & 7. Pricing Transparency */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Wherever You Are, We'll Find You.</h2>
              <p className="text-dark/70 mb-8 text-lg">
                Operating across major cities and highways, our decentralized fleet ensures that a recovery car is always stationed near you. We serve Accra, Kumasi, Takoradi, Tema, and all major connecting routes.
              </p>
              
              <hr className="border-dark/20 my-8" />
              
              <h3 className="text-2xl font-bold text-dark mb-4">Transparent, Upfront Pricing</h3>
              <p className="text-dark/70 text-lg">
                No hidden fees, no surprises. Our pricing is quote-based on distance and car type. We provide a clear estimate before dispatching a driver so you know exactly what to expect.
              </p>
            </div>
            
            <div className="bg-white rounded-[1px] overflow-hidden aspect-square relative shadow-xl border-8 border-white">
              <img 
                src="https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg" 
                alt="Nationwide Towing & Recovery Fleet" 
                className="w-full h-full object-cover" 
              />
            </div>

          </div>
        </div>
      </section>



      {/* 9. Related Services */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Need More Than Just a Tow?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Auto Repairs', desc: 'Direct drop-off to our certified repair shop.', icon: Wrench, link: '/services' },
              { title: 'Car Rental', desc: 'Need a replacement car immediately?', icon: Car, link: '/rental' },
              { title: 'Car Recovery', desc: 'Specialized extraction for off-road incidents.', icon: Truck, link: '/services' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link to={service.link} key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-accent hover:border-accent transition-all group flex items-start gap-4 rounded-full">
                  <div className="w-12 h-12 bg-secondary text-white rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-secondary transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 flex items-center gap-2">
                      {service.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-sm text-white/80 group-hover:text-white">{service.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FAQs (Towing Specific) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Towing & Recovery FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {TOWING_FAQS.map((faq, idx) => (
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

      {/* 11. Emergency CTA Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Don't Wait - Request Emergency Towing Now</h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Our dispatchers are standing by 24/7 to send help immediately.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={hotlineTel} className="w-full sm:w-auto bg-primary hover:bg-black text-white px-4 sm:px-8 py-5 font-bold transition-all shadow-xl flex items-center justify-center gap-3 text-lg rounded-full">
              <Phone className="w-6 h-6" /> Call {hotline}
            </a>
            <a 
              href={`${whatsapp}?text=Hello%20Santa%20Towing%2C%20I%20need%20emergency%20towing%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-4 sm:px-8 py-5 font-bold transition-all shadow-xl flex items-center justify-center gap-3 text-lg rounded-full"
            >
              <MessageCircle className="w-6 h-6" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
