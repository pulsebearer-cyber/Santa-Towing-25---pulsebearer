import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronRight, Star, Heart, Share2, ShieldCheck, 
  Settings, Truck, Wrench, ChevronDown, CheckCircle2, 
  Minus, Plus, ShoppingCart, Info, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';
import { useInventoryParts } from '@/hooks/useInventory';


const PARTS = [
  { id: 1, name: 'Premium Heavy Duty Battery 70Ah' },
  { id: 2, name: 'Synthetic Motor Oil 5W-30 (5L)' },
  { id: 3, name: 'Ceramic Brake Pads (Front)' },
  { id: 4, name: 'All-Season Tire 205/55R16' },
  { id: 5, name: 'Engine Air Filter' },
  { id: 6, name: 'LED Headlight Bulbs H7 (Pair)' },
];

export const ALL_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Heavy Duty Battery 70Ah',
    brand: 'Bosch',
    category: 'Car Batteries',
    price: 'GH₵ 850',
    rating: 5.0,
    reviews: 124,
    inStock: true,
    sku: 'BSH-70AH-HD',
    images: [
      'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg',
      'https://i.ibb.co/23wLXy6t/Image-12-Tyre-Maintenance.jpg',
      'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg'
    ],
    specs: [
      { label: 'Voltage', value: '12V' },
      { label: 'Capacity', value: '70Ah' },
      { label: 'CCA', value: '760A' },
      { label: 'Terminal Type', value: 'Standard Post' },
      { label: 'Dimensions', value: '278 x 175 x 190 mm' },
      { label: 'Weight', value: '18.5 kg' },
    ],
    compatibility: 'Fits most modern sedans and mid-sized SUVs. Specifically designed for cars with start-stop technology and high electrical demands.',
    warranty: '24-Month Nationwide Replacement Warranty.',
    installation: 'Professional installation recommended. Memory saver tool required during replacement to prevent loss of car settings.'
  },
  {
    id: 2,
    name: 'Synthetic Motor Oil 5W-30 (5L)',
    brand: 'Castrol',
    category: 'Engine Oil & Fluids',
    price: 'GH₵ 420',
    rating: 4.8,
    reviews: 98,
    inStock: true,
    sku: 'CST-5W30-5L',
    images: [
      'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg',
      'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg'
    ],
    specs: [
      { label: 'Viscosity Grade', value: 'SAE 5W-30' },
      { label: 'Volume', value: '5 Litres' },
      { label: 'Oil Type', value: '100% Full Synthetic' },
      { label: 'API Standards', value: 'API SP / ILSAC GF-6A' },
      { label: 'Engine Compatibility', value: 'Petrol & Light Diesel Engines' },
      { label: 'Drain Interval', value: 'Up to 10,000 km' }
    ],
    compatibility: 'Formulated for high thermal stability in tropical climates. Suitable for modern Japanese, European, and American passenger cars.',
    warranty: '100% Genuine OEM Sealed Bottle Guarantee.',
    installation: 'Always replace the oil filter during an engine oil service for optimal engine longevity.'
  },
  {
    id: 3,
    name: 'Ceramic Brake Pads (Front)',
    brand: 'Brembo',
    category: 'Brake Pads & Discs',
    price: 'GH₵ 650',
    rating: 4.9,
    reviews: 86,
    inStock: true,
    sku: 'BRM-CER-FR',
    images: [
      'https://i.ibb.co/JRyRmbjF/Image-11-Brake-Parts-and-Disk-Maintenance.jpg',
      'https://i.ibb.co/35NfN5Lx/Image-14-Suspension-Parts-maintenance.jpg'
    ],
    specs: [
      { label: 'Material', value: 'Premium Low-Dust Ceramic' },
      { label: 'Axle Placement', value: 'Front Axle (Left & Right)' },
      { label: 'Operating Temp', value: 'Up to 650°C Fade Resistance' },
      { label: 'Shim Type', value: 'Multi-layer Noise Dampening Shim' },
      { label: 'Wear Indicator', value: 'Acoustic Clip Included' },
      { label: 'Certification', value: 'ECE R90 Certified' }
    ],
    compatibility: 'Engineered for smooth stopping power, zero brake squeal, and ultra-low brake dust generation.',
    warranty: '12-Month or 20,000 km Performance Warranty.',
    installation: 'Ensure brake rotors are resurfaced or checked for runout prior to pad installation.'
  },
  {
    id: 4,
    name: 'All-Season Tire 205/55R16',
    brand: 'Michelin',
    category: 'Tires',
    price: 'GH₵ 1,200',
    rating: 5.0,
    reviews: 142,
    inStock: true,
    sku: 'MCH-205-55-16',
    images: [
      'https://i.ibb.co/23wLXy6t/Image-12-Tyre-Maintenance.jpg',
      'https://i.ibb.co/35NfN5Lx/Image-14-Suspension-Parts-maintenance.jpg'
    ],
    specs: [
      { label: 'Size', value: '205/55R16' },
      { label: 'Load Index', value: '91 (615 kg max load)' },
      { label: 'Speed Rating', value: 'V (240 km/h max)' },
      { label: 'Treadwear', value: 'UTQG 500 A A' },
      { label: 'Season', value: 'All-Season Highway Performance' },
      { label: 'Country of Origin', value: 'France / Germany' }
    ],
    compatibility: 'Direct OEM fitment for Toyota Corolla, Honda Civic, Hyundai Elantra, VW Golf, and similar passenger sedans.',
    warranty: '5-Year Manufacturer Tread Life Warranty.',
    installation: 'Computerized wheel balancing and new valve stems provided upon fitting at our garage.'
  },
  {
    id: 5,
    name: 'Engine Air Filter',
    brand: 'K&N',
    category: 'Filters',
    price: 'GH₵ 350',
    rating: 4.7,
    reviews: 64,
    inStock: true,
    sku: 'KN-AIR-FLTR',
    images: [
      'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg',
      'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg'
    ],
    specs: [
      { label: 'Filter Media', value: 'Multi-layer Cotton Gauze' },
      { label: 'Filtration Efficiency', value: '99% Dust & Particulate Capture' },
      { label: 'Washable / Reusable', value: 'Yes (Wash & Re-oil)' },
      { label: 'Airflow Increase', value: 'Up to 50% Over Paper Filters' },
      { label: 'Frame Material', value: 'Heat-Resistant Urethane' }
    ],
    compatibility: 'Drops directly into OEM factory air boxes without modifications.',
    warranty: '1,000,000 Mile Limited Warranty.',
    installation: 'Simple 5-minute toolless DIY installation.'
  },
  {
    id: 6,
    name: 'LED Headlight Bulbs H7 (Pair)',
    brand: 'Philips',
    category: 'Lighting',
    price: 'GH₵ 550',
    rating: 4.6,
    reviews: 53,
    inStock: true,
    sku: 'PHL-LED-H7',
    images: [
      'https://i.ibb.co/WpyLYZQk/Image-15-Car-Lightening-maintenance.jpg',
      'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg'
    ],
    specs: [
      { label: 'Bulb Base', value: 'H7 Standard Socket' },
      { label: 'Color Temperature', value: '6000K Crisp Cool White' },
      { label: 'Luminous Output', value: '8,000 Lumens / Set' },
      { label: 'Operating Voltage', value: '12V - 24V DC' },
      { label: 'Cooling Method', value: 'High-Speed Fanless Heat Pipe' },
      { label: 'Lifespan', value: '30,000+ Hours' }
    ],
    compatibility: 'Plug-and-play replacement for factory halogen H7 low beam or high beam sockets with CANBus error-free drivers.',
    warranty: '2-Year Replacement Warranty.',
    installation: 'Ensure beam pattern is properly leveled to avoid blinding oncoming traffic.'
  }
];

const PRODUCT_FAQS = [
  { q: 'What is your return policy for parts?', a: 'Unused parts in their original, undamaged packaging can be returned or exchanged within 14 days of purchase with a valid receipt.' },
  { q: 'How does the warranty claim process work?', a: 'If a part fails within the warranty period, bring it to any of our branches along with your receipt. We will test the part and replace it if the failure is due to a manufacturer defect.' },
  { q: 'What are the delivery timelines?', a: 'Standard delivery takes 1-2 business days within the city. Same-day delivery is available for orders placed before 12 PM.' },
];

export default function PartDetails() {
  const { id } = useParams();
  const { allParts, getPartByIdOrSlug } = useInventoryParts(true);

  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');

  const PRODUCT = getPartByIdOrSlug(id) || ALL_PRODUCTS.find(p => String(p.id) === String(id)) || allParts[0] || ALL_PRODUCTS[0];
  const RELATED_PRODUCTS = allParts.filter(p => p.id !== PRODUCT.id).slice(0, 4);

  const productItem = PRODUCT as any;
  const productImages: string[] = (productItem.images && productItem.images.length > 0)
    ? productItem.images.map((img: any) => typeof img === 'string' ? img : img.url)
    : [productItem.image || 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg'];

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const currentDisplayImage = productImages[activeImage] || productImages[0] || productItem.image;

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white pb-24">
      <SEO 
        title={productItem.seoTitle || `${PRODUCT.name} | Genuine Auto Parts Ghana | Santa Towing`}
        description={productItem.seoDescription || `Buy genuine ${PRODUCT.name} (${PRODUCT.brand}). Price: ${PRODUCT.price}. Available in stock at Santa Towing.`}
        canonical={`/parts/${PRODUCT.id}`}
      />
      
      {/* 1. Breadcrumb Navigation */}
      <div className="bg-white border-b border-dark/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-dark/70 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <Link to="/parts" className="hover:text-accent transition-colors">Auto Parts</Link>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <Link to={`/parts?category=${PRODUCT.category}`} className="hover:text-accent transition-colors">{PRODUCT.category}</Link>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <span className="text-dark font-medium truncate">{PRODUCT.name}</span>
          </div>
          <div className="mt-4">
            <Link to="/parts" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-dark transition-colors">
              &larr; Back to Auto Parts
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Content Area (Left) */}
          <div className="w-full lg:w-2/3">
            
            {/* 2. Product Gallery */}
            <div className="bg-white rounded-[1px] p-4 border border-dark/10 shadow-sm mb-12">
              <div className="aspect-[4/3] md:aspect-video rounded-[1px] overflow-hidden bg-white mb-4 relative group cursor-zoom-in">
                <img 
                  src={currentDisplayImage} 
                  alt={PRODUCT.name} 
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 origin-center" 
                />
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                {productImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Product Specifications (Tabs) */}
            <div className="bg-white rounded-[1px] border border-dark/10 shadow-sm mb-12 overflow-hidden">
              <div className="flex overflow-x-auto no-scrollbar border-b border-dark/10 bg-white/50">
                {[
                  { id: 'specs', label: 'Specifications' },
                  { id: 'compat', label: 'Compatibility' },
                  { id: 'warranty', label: 'Warranty' },
                  { id: 'install', label: 'Installation Notes' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-6 md:px-4 sm:px-8 py-4 font-bold text-sm md:text-base whitespace-nowrap transition-colors border-b-2",
                      activeTab === tab.id 
                        ? "text-primary border-primary bg-white" 
                        : "text-dark/70 border-transparent hover:text-dark hover:bg-white"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6 sm:p-8">
                {activeTab === 'specs' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 gap-4">
                    {PRODUCT.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between py-3 border-b border-dark/10 last:border-0">
                        <span className="text-dark/70">{spec.label}</span>
                        <span className="font-bold text-dark">{spec.value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {activeTab === 'compat' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-dark/70 leading-relaxed">{PRODUCT.compatibility}</p>
                  </motion.div>
                )}
                {activeTab === 'warranty' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
                    <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-dark mb-2">Coverage Details</h4>
                      <p className="text-dark/70 leading-relaxed">{PRODUCT.warranty}</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'install' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
                    <Wrench className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-dark mb-2">Important Instructions</h4>
                      <p className="text-dark/70 leading-relaxed">{PRODUCT.installation}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* 5. Installation & Fitting Services */}
            <div className="bg-primary rounded-[1px] p-6 sm:p-8 md:p-12 text-white mb-12 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Need Professional Installation?</h3>
                  <p className="text-white/70">Get this part fitted by our certified mechanics at our workshop.</p>
                </div>
                <button className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-bold px-4 sm:px-8 py-4 transition-all whitespace-nowrap shadow-lg rounded-full">
                  Call for Installation
                </button>
              </div>
            </div>

            {/* 7. Customer Reviews */}
            <div className="mb-12">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent text-accent" />)}
                    </div>
                    <span className="font-bold text-dark">{PRODUCT.rating} out of 5</span>
                    <span className="text-dark/70">({PRODUCT.reviews} reviews)</span>
                  </div>
                </div>
                <button className="text-accent font-bold hover:text-accent transition-colors hidden md:block rounded-full">
                  Write a Review
                </button>
              </div>
              
              <div className="space-y-6">
                {[
                  { name: 'Kwame P.', rating: 5, date: '2 weeks ago', text: 'Perfect fit for my car. Holds charge beautifully and starting is instantaneous now.' },
                  { name: 'Sarah O.', rating: 4, date: '1 month ago', text: 'Good quality battery. The delivery was fast and the price was competitive.' }
                ].map((review, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[1px] border border-dark/10 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-dark/70">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-dark text-sm">{review.name}</h4>
                          <span className="text-xs text-dark/70">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex">
                        {[1,2,3,4,5].map(star => <Star key={star} className={cn("w-4 h-4", star <= review.rating ? "fill-accent text-accent" : "text-white/70")} />)}
                      </div>
                    </div>
                    <p className="text-dark/70 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. FAQs */}
            <div className="mb-12 lg:mb-0">
              <h3 className="text-2xl font-bold text-dark mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {PRODUCT_FAQS.map((faq, idx) => (
                  <div key={idx} className="border border-dark/20 rounded-[1px] overflow-hidden shadow-sm bg-white">
                    <button 
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white transition-colors rounded-full"
                    >
                      <span className="font-bold text-dark pr-4">{faq.q}</span>
                      <ChevronDown className={cn("w-5 h-5 text-primary transition-transform shrink-0", openFaqIdx === idx && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {openFaqIdx === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-5 text-dark/70 border-t border-dark/10">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>


            {/* Previous / Next Part Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 mt-12 border-t border-dark/10">
              {(() => {
                const currentIndex = PARTS.findIndex(p => p.id === PRODUCT.id);
                const prevPart = currentIndex > 0 ? PARTS[currentIndex - 1] : null;
                const nextPart = currentIndex < PARTS.length - 1 ? PARTS[currentIndex + 1] : null;
                
                return (
                  <>
                    <div className="w-full sm:w-1/2 flex justify-start">
                      {prevPart && (
                        <Link to={`/parts/${prevPart.id}`} className="group flex items-center gap-3 hover:bg-slate-50 p-3 rounded-[1px] transition-colors max-w-full">
                          <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5 rotate-180" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-xs text-dark/50 font-bold uppercase tracking-wider mb-0.5">Previous Part</div>
                            <div className="text-sm font-bold text-dark group-hover:text-accent truncate">{prevPart.name}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                    <div className="w-full sm:w-1/2 flex justify-end">
                      {nextPart && (
                        <Link to={`/parts/${nextPart.id}`} className="group flex items-center gap-3 hover:bg-slate-50 p-3 rounded-[1px] transition-colors max-w-full text-right">
                          <div className="overflow-hidden">
                            <div className="text-xs text-dark/50 font-bold uppercase tracking-wider mb-0.5">Next Part</div>
                            <div className="text-sm font-bold text-dark group-hover:text-accent truncate">{nextPart.name}</div>
                          </div>
                          <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>

          {/* 3. Product Summary Panel (Right / Sticky) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-[1px] p-6 sm:p-8 border border-dark/10 shadow-xl lg:sticky lg:top-32">
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-accent tracking-wider uppercase">{PRODUCT.brand}</span>
                <div className="flex gap-2 text-dark/70">
                  <button className="hover:text-accent transition-colors rounded-full"><Heart className="w-5 h-5" /></button>
                  <button className="hover:text-accent transition-colors rounded-full"><Share2 className="w-5 h-5" /></button>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-dark mb-2 leading-tight">{PRODUCT.name}</h1>
              
              <div className="flex items-center gap-2 mb-6 text-sm">
                <div className="flex">
                  {[1,2,3,4,5].map(star => <Star key={star} className={cn("w-4 h-4", star <= Math.floor(PRODUCT.rating) ? "fill-accent text-accent" : "text-white/70")} />)}
                </div>
                <span className="text-dark/70">({PRODUCT.reviews} reviews)</span>
                <span className="mx-2 text-white/70">|</span>
                <span className="text-dark/70">SKU: {PRODUCT.sku}</span>
              </div>

              <div className="text-3xl font-black text-dark mb-4">{PRODUCT.price}</div>
              
              <div className="flex items-center gap-2 mb-8">
                {PRODUCT.inStock ? (
                  <div className="flex items-center gap-1 text-accent font-bold text-sm bg-primary/5 px-3 py-1">
                    <CheckCircle2 className="w-4 h-4" /> In Stock & Ready to Ship
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-accent font-bold text-sm bg-accent/5 px-3 py-1">
                    <Info className="w-4 h-4" /> Out of Stock
                  </div>
                )}
              </div>

              {/* Car Compatibility Selector */}
              <div className="bg-white p-4 rounded-[1px] mb-6">
                <p className="text-sm font-bold text-dark mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" /> Check Compatibility
                </p>
                <div className="space-y-2">
                  <select className="w-full bg-white border border-dark/20 rounded-md px-3 py-2 text-sm text-dark/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none">
                    <option>Select Make</option>
                  </select>
                  <select className="w-full bg-white border border-dark/20 rounded-md px-3 py-2 text-sm text-dark/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none" disabled>
                    <option>Select Model</option>
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6 border-b border-dark/10 pb-6">
                <span className="font-bold text-dark text-sm">Quantity:</span>
                <div className="flex items-center bg-white rounded-[1px] border border-dark/20">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:text-accent transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold text-dark">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-2 hover:text-accent transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 transition-all shadow-md flex items-center justify-center gap-2 rounded-full">
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button className="w-full bg-primary hover:bg-black text-white font-bold py-4 transition-all shadow-md rounded-full">
                  Get a Quote
                </button>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 text-sm text-dark/70">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                  <span>Genuine Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-primary shrink-0" />
                  <span>14-Day Easy Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary shrink-0" />
                  <span>Fast Delivery / Free Pickup</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 6. Related Products */}
      <section className="py-10 md:py-16 bg-white border-t border-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8">Frequently Bought Together</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {RELATED_PRODUCTS.map((product) => (
              <Link to={`/parts/${product.id}`} key={product.id} className="bg-white rounded-[1px] p-4 border border-dark/10 hover:shadow-xl transition-all group flex flex-col">
                <div className="aspect-[4/3] rounded-[1px] overflow-hidden mb-4 bg-white relative">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-dark text-sm mb-1 leading-tight line-clamp-2">{product.name}</h3>
                <p className="text-xs text-dark/70 mb-3">{product.brand}</p>
                <div className="text-accent font-bold mt-auto">{product.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call-to-Action Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need This Part Installed?</h2>
          <p className="text-lg text-white/90 mb-8">
            Call us with our expert mechanics for a professional fitting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={phoneTel || `tel:${phoneRaw}`} className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl rounded-full">
              Call for Installation: {phoneRaw}
            </a>
            <Link to="/contact" className="bg-white hover:bg-dark/5 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-xl rounded-full">
              Contact Workshop
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
