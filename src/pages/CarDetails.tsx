import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronRight, Calendar, MapPin, Fuel, Settings, ShieldCheck, FileText, CheckCircle2, 
  Heart, Share2, Phone, MessageCircle, ArrowRight, ChevronDown, Star, Car, Calculator,
  Clock, Award, Shield, Check, Info, AlertCircle, Eye, Sparkles, Send, X, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';
import { CARS } from '@/data/mockData';
import { useInventoryCars } from '@/hooks/useInventory';

const CAR_SPECS_DATA = {
  engine: [
    { label: 'Engine Capacity', value: '2.0L Turbocharged 4-Cylinder' },
    { label: 'Horsepower', value: '255 hp @ 5,800 rpm' },
    { label: 'Torque', value: '295 lb-ft @ 1,600 rpm' },
    { label: 'Displacement', value: '1,991 cc' },
    { label: 'Fuel System', value: 'Direct High-Pressure Injection' },
    { label: 'Compression Ratio', value: '10.5 : 1' }
  ],
  performance: [
    { label: 'Acceleration (0-100 km/h)', value: '6.1 seconds' },
    { label: 'Top Speed', value: '240 km/h (Electronically Limited)' },
    { label: 'Drivetrain', value: 'Rear-Wheel Drive (RWD) / 4MATIC' },
    { label: 'Transmission', value: '9-Speed 9G-TRONIC Automatic' },
    { label: 'Braking System', value: '4-Wheel Anti-lock Disc (ABS)' },
    { label: 'Suspension', value: 'Independent Multi-Link with Agility Control' }
  ],
  dimensions: [
    { label: 'Overall Length', value: '4,935 mm (194.3 in)' },
    { label: 'Width (with mirrors)', value: '2,065 mm (81.3 in)' },
    { label: 'Height', value: '1,460 mm (57.5 in)' },
    { label: 'Wheelbase', value: '2,939 mm (115.7 in)' },
    { label: 'Fuel Tank Capacity', value: '66 Litres' },
    { label: 'Seating Capacity', value: '5 Passengers' }
  ],
  features: [
    'Apple CarPlay & Android Auto Smartphone Integration',
    'Burmester 4D Surround Sound Audio System',
    'Heated & Ventilated Power Front Seats with Memory',
    'Active Blind Spot Assist & Lane Keeping Assist',
    'Active Parking Assist with 360-Degree Surround Camera',
    'Panoramic Sliding Power Sunroof',
    'High-Performance Multibeam LED Headlamps',
    'Keyless-GO with Hands-Free Access',
    'Dual-Zone Automatic Climate Control System',
    '64-Color Ambient Interior Lighting',
    'Wireless Device Charging Pad',
    'MBUX Voice Controlled Navigation System'
  ]
};

const CAR_HISTORY_ITEMS = [
  { label: '150-Point Technical Inspection', value: 'Passed All Mechanical & Electronic Tests', status: 'success' },
  { label: 'Accident & Damage History', value: 'Zero Reported Accidents & No Structural Damage', status: 'success' },
  { label: 'Service & Maintenance Records', value: 'Full Comprehensive Dealer Service History', status: 'success' },
  { label: 'Ownership Verification', value: 'Single Verified Previous Owner', status: 'neutral' },
  { label: 'Title & Documentation Check', value: 'Clean Title • Free of Financial Encumbrances', status: 'success' },
  { label: 'Ghana Customs Duty & Clearance', value: 'Fully Cleared & Validated at Tema Port', status: 'success' },
];

const CAR_FAQS = [
  { 
    q: 'Can I arrange a physical viewing and test drive?', 
    a: 'Yes! Test drives and physical car viewings can be scheduled Monday through Saturday at our Spintex Road showroom in Accra. Simply call our sales team or click "WhatsApp Us" to reserve your preferred viewing time.' 
  },
  { 
    q: 'Do you offer financing or flexible payment plans?', 
    a: 'Yes, we collaborate with leading partner financial institutions in Ghana to provide competitive car financing options. We also offer customized installment arrangements for verified corporate clients and fleet buyers.' 
  },
  { 
    q: 'What warranty is included with this car?', 
    a: 'Every car sold through Santa Towing & Garage Services comes with a standard 3-month or 5,000 km warranty covering major engine and transmission components. Extended 12-month comprehensive warranty packages are also available.' 
  },
  { 
    q: 'Do you deliver cars to other regions in Ghana?', 
    a: 'Yes, we provide nationwide door-to-door car delivery across all 16 regions of Ghana (Kumasi, Takoradi, Tamale, Cape Coast, Ho, Sunyani, etc.) using our secure enclosed or hydraulic flatbed carriers.' 
  },
  { 
    q: 'Can I trade in my existing car?', 
    a: 'Absolutely. We offer a transparent trade-in evaluation program. Bring your current car to our facility for a complimentary 30-minute appraisal, and apply its value directly toward your new car purchase.' 
  }
];

export default function CarDetails() {
  const { id } = useParams();
  const { allCars, getCarByIdOrSlug } = useInventoryCars(true);

  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  // Find car by ID, slug, or fallback to mock data/first car
  const matchedCar = getCarByIdOrSlug(id) || CARS.find(v => String(v.id) === String(id));
  const car = matchedCar || allCars[0] || {
    id: 1,
    name: '2024 Mercedes-Benz E-Class',
    type: 'New',
    price: 'GH₵ 980,000',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    year: 2024,
    mileage: '0 km',
    image: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg'
  };

  const carId = car.id;
  const carItem = car as any;

  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'history' | 'calculator'>('overview');
  const [activeSpecTab, setActiveSpecTab] = useState<'engine' | 'performance' | 'dimensions' | 'features'>('engine');
  
  // Gallery images collection (prioritize car.images if set, then fallback)
  const galleryImages = (carItem.images && carItem.images.length > 0)
    ? carItem.images.map((img: any) => typeof img === 'string' ? img : img.url)
    : [
        car.image || 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
        'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png',
        'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg',
        'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg',
        'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg'
      ];

  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Update active image whenever the route car changes
  useEffect(() => {
    setActiveImage(galleryImages[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [carId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.name} for Sale | Santa Towing`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Previous and Next Car IDs
  const totalCarsCount = allCars.length || 8;
  const currentIdx = allCars.findIndex(v => v.id === car.id);
  const prevCar = currentIdx > 0 ? allCars[currentIdx - 1] : null;
  const nextCar = currentIdx >= 0 && currentIdx < allCars.length - 1 ? allCars[currentIdx + 1] : null;
  const prevId = prevCar ? prevCar.id : null;
  const nextId = nextCar ? nextCar.id : null;

  // Similar cars (filter out current car)
  const similarCars = allCars.filter(v => v.id !== car.id).slice(0, 3);

  return (
    <main className="pt-24 lg:pt-[104px] bg-slate-50 min-h-screen">
      <SEO 
        title={carItem.seoTitle || `${car.name} for Sale | Santa Towing & Garage Ghana`} 
        description={carItem.seoDescription || `Buy ${car.name} in Ghana. Price: ${car.price}. Verified 150-point inspection, clean title, and flexible financing options at Santa Towing.`} 
        canonical={`/sales/${carId}`} 
      />

      {/* Top Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-gray-200/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Car Sales', path: '/sales' },
              { label: car.type || 'Inventory', path: '/sales' },
              { label: car.name }
            ]} 
          />
        </div>
      </div>

      {/* Main Content Container: 2-Column Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Main Car Details & Content (approx 65% width)           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Main Image Showcase & Horizontal Thumbnails */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/80 shadow-sm space-y-4">
              {/* Feature Large Image */}
              <div className="aspect-[16/10] relative rounded-lg overflow-hidden bg-slate-100 group border border-gray-100">
                <img 
                  src={activeImage} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-dark/85 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-accent" />
                    HD Gallery
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-dark/80 backdrop-blur-md text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                  Santa Towing Verified Car
                </div>
              </div>

              {/* Clickable Horizontal Thumbnail Row */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Photo Gallery ({galleryImages.length} Views)
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {galleryImages.map((img, idx) => {
                    const isSelected = activeImage === img;
                    return (
                      <button 
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={cn(
                          "aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 relative group bg-slate-100 focus:outline-none",
                          isSelected 
                            ? "border-accent ring-2 ring-accent/30 shadow-md scale-[1.02]" 
                            : "border-transparent hover:border-slate-300 opacity-75 hover:opacity-100"
                        )}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Core Quick-Spec Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Model Year</div>
                  <div className="font-extrabold text-dark text-sm sm:text-base">{car.year || 2024}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Mileage</div>
                  <div className="font-extrabold text-dark text-sm sm:text-base">{car.mileage || '0 km'}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Fuel className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Fuel System</div>
                  <div className="font-extrabold text-dark text-sm sm:text-base">{car.fuel || 'Hybrid'}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Transmission</div>
                  <div className="font-extrabold text-dark text-sm sm:text-base">{car.transmission || 'Automatic'}</div>
                </div>
              </div>
            </div>

            {/* 4. Interactive Tabs: Overview, Specs, Inspection History & Warranty */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
              {/* Tab Navigation Headers */}
              <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar bg-slate-50/50">
                {[
                  { id: 'overview', label: 'Car Overview', icon: FileText },
                  { id: 'specs', label: 'Technical Specifications', icon: Settings },
                  { id: 'history', label: '150-Pt Inspection & History', icon: ShieldCheck },
                  { id: 'calculator', label: 'Financing Calculator', icon: Calculator }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={cn(
                        "px-5 sm:px-7 py-4 font-bold text-sm sm:text-base transition-all whitespace-nowrap flex items-center gap-2 border-b-2",
                        isActive 
                          ? "text-accent border-accent bg-white shadow-sm" 
                          : "text-slate-600 border-transparent hover:text-dark hover:bg-slate-100/70"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-slate-400")} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Tab Content Panels */}
              <div className="p-6 sm:p-8">
                
                {/* TAB 1: OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-3">Car Overview &amp; Description</h3>
                      <p className="text-slate-600 leading-relaxed text-base">
                        {carItem.description || `This pristine ${car.name} represents the pinnacle of engineering, executive comfort, and refined performance. Meticulously inspected by Santa Towing's certified master automotive technicians, it offers exceptional reliability, advanced safety technologies, and premier driving dynamics tailored for Ghanaian road conditions.`}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="text-lg font-bold text-dark mb-4">Key Features &amp; Equipment</h4>
                      <div className="grid sm:grid-cols-2 gap-3.5">
                        {((carItem.specs?.features && carItem.specs.features.length > 0 ? carItem.specs.features : CAR_SPECS_DATA.features)).map((feature: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-5 sm:p-6 border border-primary/15 flex flex-col sm:flex-row gap-4 items-start">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-dark text-base">Santa Towing Peace of Mind Guarantee</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Every car purchased includes a 3-month mechanical warranty, free engine oil service upon delivery, and 1 full year of 24/7 complimentary roadside assistance across Ghana.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: TECHNICAL SPECIFICATIONS */}
                {activeTab === 'specs' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <h3 className="text-xl font-bold text-dark">Detailed Technical Specifications</h3>
                      
                      {/* Spec Category Selector */}
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {[
                          { id: 'engine', label: 'Engine' },
                          { id: 'performance', label: 'Performance' },
                          { id: 'dimensions', label: 'Dimensions' },
                          { id: 'features', label: 'Features' }
                        ].map(subTab => (
                          <button
                            key={subTab.id}
                            onClick={() => setActiveSpecTab(subTab.id as typeof activeSpecTab)}
                            className={cn(
                              "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                              activeSpecTab === subTab.id 
                                ? "bg-accent text-white shadow-sm" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                          >
                            {subTab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200/70">
                      {activeSpecTab !== 'features' ? (
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                          {((carItem.specs && carItem.specs[activeSpecTab] && carItem.specs[activeSpecTab].length > 0)
                            ? carItem.specs[activeSpecTab]
                            : CAR_SPECS_DATA[activeSpecTab]
                          ).map((spec: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-200/70 last:border-0 sm:last:border-b-0">
                              <span className="text-sm text-slate-600 font-medium">{spec.label}</span>
                              <span className="text-sm font-bold text-dark text-right">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {(carItem.specs?.features && carItem.specs.features.length > 0
                            ? carItem.specs.features
                            : CAR_SPECS_DATA.features
                          ).map((feature: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <Check className="w-4 h-4 text-accent shrink-0" />
                              <span className="text-sm text-slate-700 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: 150-POINT INSPECTION & HISTORY */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-2">150-Point Inspection &amp; Car History</h3>
                      <p className="text-slate-600 text-sm">
                        Full inspection conducted at Santa Towing Diagnostic Center. All systems verified and certified ready for delivery.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {CAR_HISTORY_ITEMS.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-dark text-sm sm:text-base">{item.label}</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full self-start sm:self-auto border border-emerald-200/60">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50 rounded-xl p-5 border border-amber-200/80 flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-amber-900">Customs Clearance &amp; Verification</div>
                        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                          All import duties and regulatory GRA customs documentation have been completely settled. Instant registration and paperwork handover upon purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: FINANCING CALCULATOR */}
                {activeTab === 'calculator' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-dark mb-2">Car Financing Estimate</h3>
                      <p className="text-slate-600 text-sm">
                        Calculate estimated monthly installments based on partner bank lending rates in Ghana.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-500 font-medium mb-1">Car Price</div>
                          <div className="text-lg font-bold text-dark">{car.price}</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-500 font-medium mb-1">Down Payment (30%)</div>
                          <div className="text-lg font-bold text-dark">Estimated 30% Deposit</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-500 font-medium mb-1">Flexible Loan Tenor</div>
                          <div className="text-lg font-bold text-accent">12 to 48 Months</div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-slate-700">
                          <span className="font-bold text-dark">Want a customized finance pre-approval?</span> Our car financing specialist can assist with bank paperwork within 24 hours.
                        </div>
                        <a 
                          href={`${whatsapp}?text=Hello%20Santa%20Towing,%20I%20would%20like%20financing%20information%20for%20the%20car:%20`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-5 py-2.5 bg-primary text-white font-bold text-xs sm:text-sm rounded-full whitespace-nowrap shadow-sm hover:bg-primary/90"
                        >
                          Request Loan Quote
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* 5. Frequently Asked Questions Accordion */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-dark">Buyer Questions &amp; Answers</h3>
              </div>

              <div className="space-y-3">
                {CAR_FAQS.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden transition-colors">
                      <button 
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-bold text-dark text-sm sm:text-base pr-4">{faq.q}</span>
                        <ChevronDown className={cn("w-5 h-5 text-accent transition-transform shrink-0", isOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 bg-slate-50/70 text-slate-600 text-sm leading-relaxed border-t border-gray-100">
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

            {/* 6. Previous / Next Car Navigation */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-1/2">
                {prevId ? (
                  <Link 
                    to={`/sales/${prevId}`} 
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-200"
                  >
                    <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Previous Listing</div>
                      <div className="text-sm font-bold text-dark group-hover:text-accent truncate">View Listing #{prevId}</div>
                    </div>
                  </Link>
                ) : (
                  <div className="text-xs text-slate-400 p-3">First Listing in Catalog</div>
                )}
              </div>

              <div className="w-full sm:w-1/2 flex justify-end">
                {nextId ? (
                  <Link 
                    to={`/sales/${nextId}`} 
                    className="group flex items-center justify-end gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-200 text-right w-full sm:w-auto"
                  >
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Next Listing</div>
                      <div className="text-sm font-bold text-dark group-hover:text-accent truncate">View Listing #{nextId}</div>
                    </div>
                    <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Link>
                ) : (
                  <div className="text-xs text-slate-400 p-3 text-right">End of Catalog</div>
                )}
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Sticky Action Sidebar (approx 35% width)                   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              
              {/* Card 1: Pricing & Primary Call-To-Action */}
              <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-gray-200 p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-red-500 to-primary" />
                
                <div className="mb-4">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark leading-tight">
                      {car.name}
                    </h1>
                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        onClick={() => setIsSaved(!isSaved)}
                        className={cn(
                          "p-2 rounded-full border transition-all duration-200 flex items-center justify-center",
                          isSaved 
                            ? "bg-rose-50 border-rose-200 text-rose-600" 
                            : "bg-slate-50 border-gray-200 text-slate-600 hover:bg-slate-100 hover:text-dark"
                        )}
                        title={isSaved ? "Remove from saved" : "Save car"}
                        aria-label="Save car"
                      >
                        <Heart className={cn("w-4 h-4", isSaved && "fill-rose-600")} />
                      </button>
                      <button 
                        onClick={handleShare}
                        className="p-2 rounded-full bg-slate-50 border border-gray-200 text-slate-600 hover:bg-slate-100 hover:text-dark transition-all duration-200 flex items-center justify-center relative"
                        title="Share listing"
                        aria-label="Share listing"
                      >
                        <Share2 className="w-4 h-4" />
                        {isCopied && (
                          <span className="absolute -bottom-8 right-0 bg-dark text-white text-[11px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-md">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Drive-Away Price
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-accent mt-1 tracking-tight">
                    {car.price}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Includes Port Clearance &amp; Duty</span>
                  </div>
                </div>

                {/* Key Quick Badge Grid */}
                <div className="grid grid-cols-2 gap-2.5 py-4 my-4 border-y border-gray-100 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Condition</span>
                    <span className="font-bold text-dark">{car.type || 'New'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Transmission</span>
                    <span className="font-bold text-dark">{car.transmission || 'Automatic'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Fuel Type</span>
                    <span className="font-bold text-dark">{car.fuel || 'Hybrid'}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Mileage</span>
                    <span className="font-bold text-dark">{car.mileage || '0 km'}</span>
                  </div>
                </div>

                {/* Primary High-Conversion CTA Buttons */}
                <div className="space-y-3">
                  <a 
                    href={phoneTel || `tel:${phoneRaw}`} 
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-4 rounded-full transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 text-sm sm:text-base group"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Call Sales Hotline</span>
                  </a>

                  <a 
                    href={`${whatsapp}?text=Hello%20Santa%20Towing,%20I%20am%20interested%20in%20the%20${encodeURIComponent(car.name)}%20priced%20at%20${encodeURIComponent(car.price)}.%20Is%20it%20still%20available?`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-full transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 text-sm sm:text-base group"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button 
                    onClick={() => setShowInquiryModal(true)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-dark font-bold py-3 px-4 rounded-full transition-all flex justify-center items-center gap-2 text-sm"
                  >
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span>Schedule Viewing / Test Drive</span>
                  </button>
                </div>

                <div className="mt-4 pt-3 text-center">
                  <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-accent" />
                    <span>Official Santa Towing &amp; Garage Services Dealership</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Contact Sales & Dealership Showroom Widget */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6">
                <h3 className="font-bold text-dark text-base mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Showroom &amp; Inspection Center</span>
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Accra Main Facility</div>
                      <p className="text-slate-600 text-xs mt-0.5">Spintex Road, Near Coca-Cola Roundabout, Greater Accra</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark">Viewing Hours</div>
                      <p className="text-slate-600 text-xs mt-0.5">Mon – Sat: 8:00 AM – 6:00 PM</p>
                      <p className="text-accent text-[11px] font-bold">24/7 Phone &amp; Emergency Dispatch</p>
                    </div>
                  </div>
                </div>

                {/* Location Map Preview Link */}
                <a 
                  href="https://maps.google.com/?q=Accra+Spintex+Road" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-4 block aspect-[2/1] rounded-lg overflow-hidden bg-slate-200 relative group border border-gray-200"
                >
                  <div className="absolute inset-0 bg-[url('https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg')] bg-cover bg-center grayscale opacity-60 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark/40 flex flex-col items-center justify-center text-white p-2 text-center group-hover:bg-dark/50 transition-colors">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-lg mb-1 animate-bounce">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">Get Directions on Google Maps</span>
                  </div>
                </a>
              </div>

              {/* Card 3: Buyer Protection Badges */}
              <div className="bg-slate-100/80 rounded-xl p-5 border border-slate-200/80 text-xs text-slate-600 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-dark text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Buyer Protection Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Standard 3-Month Mechanical Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full GRA Customs Port Clearance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Nationwide Flatbed Delivery Available</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION 1: Similar Cars Carousel/Grid (Full Width)             */}
      {/* ========================================================================= */}
      <section className="py-14 lg:py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Inventory Catalog</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">Similar Cars in Stock</h2>
            </div>
            <Link 
              to="/sales" 
              className="text-primary hover:text-accent font-bold text-sm inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Cars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((simCar) => (
              <div 
                key={simCar.id} 
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img 
                    src={simCar.image} 
                    alt={simCar.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-accent text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    {simCar.type || 'Verified'}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-dark text-base sm:text-lg mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                      {simCar.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span>{simCar.fuel || 'Hybrid'}</span>
                      <span>•</span>
                      <span>{simCar.transmission || 'Automatic'}</span>
                      <span>•</span>
                      <span>{simCar.mileage || '0 km'}</span>
                    </div>
                    <div className="text-xl font-extrabold text-accent mb-4">{simCar.price}</div>
                  </div>

                  <Link 
                    to={`/sales/${simCar.id}`} 
                    className="block w-full text-center bg-slate-100 hover:bg-primary hover:text-white text-dark py-2.5 px-4 font-bold transition-all text-sm rounded-full"
                  >
                    View Car Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION 2: Call-To-Action Banner (Full Width)                      */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-accent font-bold uppercase tracking-wider text-xs mb-2 block">Direct Dealership Support</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Interested in This Car or Need a Custom Import?</h2>
          <p className="text-base sm:text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            Contact our automotive sales consultants today to schedule a physical inspection, discuss trade-in options, or request specialized car sourcing from Europe, the US, or Asia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={phoneTel || `tel:${phoneRaw}`} 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3.5 font-bold transition-all shadow-xl rounded-full flex items-center gap-2 text-sm sm:text-base"
            >
              <Phone className="w-5 h-5"/>
              <span>Call Hotline: {phoneRaw}</span>
            </a>
            <a 
              href={whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 font-bold transition-all shadow-xl rounded-full flex items-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5"/>
              <span>WhatsApp Dealership</span>
            </a>
          </div>
        </div>
      </section>

      {/* Schedule Viewing / Quick Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative"
            >
              <button 
                onClick={() => { setShowInquiryModal(false); setInquirySubmitted(false); }}
                className="absolute top-5 right-5 text-slate-400 hover:text-dark p-1 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!inquirySubmitted ? (
                <>
                  <div className="mb-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Book an Appointment</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-dark">Schedule Viewing or Test Drive</h3>
                    <p className="text-xs text-slate-500 mt-1">For: <span className="font-semibold text-dark">{car.name}</span> ({car.price})</p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setInquirySubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-dark mb-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="e.g. Kwame Mensah" 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark mb-1">Phone / WhatsApp Number</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="e.g. 0244 000 000" 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-dark mb-1">Preferred Date</label>
                        <input 
                          required 
                          type="date" 
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-dark mb-1">Preferred Time</label>
                        <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-accent bg-white">
                          <option>Morning (9 AM - 12 PM)</option>
                          <option>Afternoon (12 PM - 3 PM)</option>
                          <option>Late Afternoon (3 PM - 6 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Send className="w-4 h-4" />
                        <span>Confirm Viewing Request</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark">Viewing Request Received!</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you! A Santa Towing car specialist will call you shortly to confirm your viewing schedule.
                  </p>
                  <button 
                    onClick={() => { setShowInquiryModal(false); setInquirySubmitted(false); }}
                    className="bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary/90 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
