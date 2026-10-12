import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Truck, 
  Anchor, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Zap, 
  Container, 
  Layers, 
  Wrench, 
  Weight, 
  Calendar, 
  User, 
  Send,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';

// 10 Core Haulage Services
const HAULAGE_SERVICES = [
  {
    id: 'car-haulage',
    title: 'Car Haulage',
    subtitle: 'Cars, SUVs, Commercial Trucks & Buses',
    desc: 'Safe, damage-free transport of single or multi-car consignments. Whether relocating fleets, moving imported dealership cars from Tema Port, or transferring disabled commercial trucks, we provide specialized flatbeds and multi-car haulers with soft-strap tie-downs.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Multi-car carriers & heavy flatbeds',
      'Dealership & corporate fleet transfers',
      'Port-to-showroom safe deliveries',
      'Fully insured nationwide transit'
    ]
  },
  {
    id: 'heavy-machinery',
    title: 'Heavy Machinery Transport',
    subtitle: 'Excavators, Bulldozers, Graders & Loaders',
    desc: 'Specialized lowbed and step-deck transportation engineered for heavy civil and construction plant machinery. Our heavy-haul rigs accommodate high-tonnage track and wheel units with secure anchoring and certified rigging protocols.',
    icon: Weight,
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Excavators, bulldozers & motor graders',
      'Lowbed & multi-axle heavy trailers',
      'Heavy plant & quarry equipment',
      'Site-to-site rapid relocation'
    ]
  },
  {
    id: 'forklift-transport',
    title: 'Forklift Transportation',
    subtitle: 'Industrial & Warehouse Lift Trucks',
    desc: 'Precision hauling of electric, diesel, and counterbalance forklifts, telehandlers, and reach trucks. We utilize low-angle hydraulic ramps and custom chassis blocks to protect mast assemblies and steering axles during loading and transit.',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Warehouse forklifts & telehandlers',
      'Low-incline hydraulic deck loading',
      'Mast & hydraulic cylinder protection',
      'Same-day inter-facility relocation'
    ]
  },
  {
    id: 'generator-industrial',
    title: 'Generator & Industrial Equipment Haulage',
    subtitle: 'Power Plants, Compressors & Heavy Pumps',
    desc: 'Secure transportation for sensitive standby diesel generators, heavy industrial air compressors, high-voltage transformers, and factory processing units across Greater Accra and all 16 regions of Ghana.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      '50kVA – 2000kVA+ soundproof generators',
      'Industrial compressors & heavy chillers',
      'Vibration-damped flatbed securing',
      'Crane offload assistance coordination'
    ]
  },
  {
    id: 'container-haulage',
    title: 'Container Haulage',
    subtitle: '20ft & 40ft Shipping Containers',
    desc: 'Reliable container carrier services linking sea ports, bonded terminals, logistics hubs, and commercial warehouses. Equipped with standard twist-lock chassis trailers for dry vans, high cubes, and open-top containers.',
    icon: Container,
    image: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      '20ft & 40ft standard and high-cube units',
      'Certified ISO twist-lock container chassis',
      'Port clearance gate-out transport',
      'Direct warehouse & site drop-offs'
    ]
  },
  {
    id: 'tema-harbour',
    title: 'Tema Harbour Haulage',
    subtitle: 'Direct Port Clearance & Nationwide Dispatch',
    desc: 'Our flagship port logistics corridor. We handle direct pickup from Tema Harbour berths, MPS Terminal 3, and off-dock holding terminals, hauling imported cars, raw materials, heavy machinery, and containers directly to inland destinations.',
    icon: Anchor,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'MPS Terminal 3 & Golden Jubilee Terminal',
      'Fast gate-out dispatch & transit permits',
      'Direct corridors to Kumasi, Tamale & borders',
      'Real-time GPS cargo transit tracking'
    ]
  },
  {
    id: 'construction-equipment',
    title: 'Construction Equipment Haulage',
    subtitle: 'Building Materials, Mixers, Cranes & Scaffolding',
    desc: 'Dedicated transport support for contractors, engineering firms, and mining concessions. We haul concrete mixers, asphalt rollers, mobile cranes, steel beams, and heavy prefabricated building modules.',
    icon: Wrench,
    image: '/src/assets/images/construction_haulage_1790967998627.jpg',
    capabilities: [
      'Road construction rollers & pavers',
      'Prefabricated steel structures & pipes',
      'Mining concession equipment supply',
      'Scheduled multi-trip construction supply'
    ]
  },
  {
    id: 'oversized-heavy-load',
    title: 'Oversized & Heavy Load Transport',
    subtitle: 'Extra-Wide, High-Tonnage & Indivisible Cargo',
    desc: 'Engineered heavy-lift transportation for out-of-gauge (OOG) and abnormal loads. We manage route surveys, bridge load assessments, escort pilot cars, and statutory highway transit clearance across Ghana.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Multi-axle hydraulic modular trailers',
      'Route survey & obstacle mitigation',
      'Dedicated safety pilot escort cars',
      'High-tonnage indivisible cargo experts'
    ]
  },
  {
    id: 'intercity-haulage',
    title: 'Intercity Haulage',
    subtitle: 'Scheduled Freight Between Major Commercial Cities',
    desc: 'Regular haulage runs connecting Accra, Tema, Kumasi, Takoradi, Cape Coast, Obuasi, Sunyani, Koforidua, and Tamale. High-frequency departures guarantee minimal downtime for your supply chain.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Accra ⇄ Kumasi express route',
      'Tema ⇄ Takoradi coastal trade corridor',
      'Mining belt routes (Tarkwa, Obuasi, Bogoso)',
      'Northern transit corridor to Tamale & Bolga'
    ]
  },
  {
    id: 'long-distance-cargo',
    title: 'Long-Distance Cargo Transport',
    subtitle: 'Secure Commercial, Agricultural & Industrial Freight',
    desc: 'Heavy long-haul cargo movement designed for manufacturing plants, agro-processors, and distributors. Weather-protected trailers and tamper-evident sealing ensure pristine cargo arrival even over thousand-kilometer journeys.',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=800&q=80',
    capabilities: [
      'Enclosed & tarpaulin freight trailers',
      'High-volume palletized goods transport',
      'Tamper-proof seal protocols',
      '24/7 dedicated dispatch manager'
    ]
  }
];

// "What We Haul" items showcase
const WHAT_WE_HAUL = [
  { name: 'Cars, SUVs & Pickups', category: 'Cars', icon: Truck, detail: 'Single cars, dealership fleets, luxury imports' },
  { name: 'Buses & Heavy Trucks', category: 'Commercial', icon: Truck, detail: 'Commercial coaches, dump trucks, prime movers' },
  { name: 'Excavators & Bulldozers', category: 'Heavy Machinery', icon: Weight, detail: 'Track excavators, Cat D6–D9 bulldozers, graders' },
  { name: 'Tractors & Farm Implements', category: 'Agriculture', icon: Layers, detail: 'Agricultural tractors, harvesters, ploughs' },
  { name: 'Industrial Forklifts', category: 'Warehouse', icon: Layers, detail: 'Electric & diesel forklifts, telehandlers' },
  { name: 'Heavy-Duty Generators', category: 'Power Equipment', icon: Zap, detail: '50kVA to 2000kVA soundproof gensets' },
  { name: '20ft & 40ft Containers', category: 'Shipping', icon: Container, detail: 'Port-cleared dry van & high-cube shipping containers' },
  { name: 'Construction Machinery', category: 'Infrastructure', icon: Wrench, detail: 'Rollers, asphalt pavers, mobile cranes, pumps' },
  { name: 'Industrial Plant Machinery', category: 'Manufacturing', icon: ShieldCheck, detail: 'Factory processing units, transformers, steel structures' },
  { name: 'Mining Concession Gear', category: 'Mining', icon: Weight, detail: 'Heavy drill rigs, rock breakers, crushing spares' },
  { name: 'Oversized & Wide Cargo', category: 'Special Project', icon: ShieldCheck, detail: 'Indivisible structures requiring pilot escorts' },
  { name: 'Commercial Bulk Goods', category: 'Freight', icon: Clock, detail: 'Packaged raw materials, industrial cables, machinery spares' }
];

// Tema Harbour Destination Matrix
const TEMA_CORRIDORS = [
  { destination: 'Accra / Tema Metro', distance: '15 – 35 km', eta: '45 – 90 mins', highlight: 'Express daily port shuttles' },
  { destination: 'Kumasi & Ashanti Region', distance: '280 km', eta: '4 – 6 hours', highlight: 'Direct N6 dual-carriage transit' },
  { destination: 'Takoradi & Western Region', distance: '240 km', eta: '4 – 5 hours', highlight: 'Coastal industrial corridor' },
  { destination: 'Cape Coast & Central Region', distance: '175 km', eta: '3 – 4 hours', highlight: 'Smooth intercity dispatch' },
  { destination: 'Tarkwa, Bogoso & Obuasi', distance: '340 km', eta: '6 – 8 hours', highlight: 'Heavy mining machinery route' },
  { destination: 'Sunyani & Bono Region', distance: '400 km', eta: '7 – 9 hours', highlight: 'Commercial agricultural freight' },
  { destination: 'Tamale & Northern Ghana', distance: '640 km', eta: '12 – 16 hours', highlight: 'Cross-country heavy transport' },
  { destination: 'Bolgatanga & Upper East', distance: '790 km', eta: '16 – 20 hours', highlight: 'Northern border transit link' }
];

const HAULAGE_FAQS = [
  {
    q: 'How do I request a quote for heavy machinery or container haulage?',
    a: 'You can submit the online quote request form on this page with your pickup and delivery locations, cargo type, and approximate weight. Alternatively, call our 24/7 haulage hotline at 0244753849 or message us on WhatsApp for an immediate competitive rate.'
  },
  {
    q: 'Can Santa Towing pick up cargo directly inside Tema Harbour (MPS Terminal 3 / Golden Jubilee)?',
    a: 'Yes! Our drivers and prime movers have full statutory port clearance badges and GPHA compliance credentials. We coordinate directly with your clearing agent to schedule dockside loading and rapid gate-out delivery to anywhere in Ghana.'
  },
  {
    q: 'What types of lowbed trailers and trucks do you operate?',
    a: 'Our modern haulage fleet includes multi-axle lowbed trailers, extendable step-deck trailers, flatbeds with ISO twist-locks, multi-car recovery flatbeds, and heavy prime movers equipped with high-capacity winch systems.'
  },
  {
    q: 'Is my cargo insured during transit?',
    a: 'Yes. Santa Towing provides comprehensive in-transit Goods-In-Transit (GIT) insurance coverage on all haulage and heavy freight jobs. Additional project cargo insurance can be arranged for high-value machinery.'
  },
  {
    q: 'Do you offer safety pilot escort cars for oversized or wide loads?',
    a: 'Yes. For loads exceeding standard highway width, height, or weight limits, we conduct prior route surveys and provide dedicated pilot escort cars equipped with warning strobes and coordination radios.'
  }
];

export default function Haulage() {
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    pickupLocation: '',
    deliveryLocation: '',
    cargoType: 'Heavy Machinery Transport',
    cargoDescription: '',
    estimatedWeight: '',
    preferredDate: '',
    additionalInfo: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `*SANTA TOWING - HAULAGE QUOTE REQUEST*
----------------------------------------
*Name:* ${formData.customerName || 'N/A'}
*Phone:* ${formData.phoneNumber || 'N/A'}
*Pickup:* ${formData.pickupLocation || 'N/A'}
*Delivery:* ${formData.deliveryLocation || 'N/A'}
*Cargo Type:* ${formData.cargoType}
*Cargo Description:* ${formData.cargoDescription || 'N/A'}
*Estimated Weight:* ${formData.estimatedWeight || 'Not specified'}
*Preferred Date:* ${formData.preferredDate || 'Earliest available'}
*Additional Info:* ${formData.additionalInfo || 'None'}
----------------------------------------
Please provide a haulage rate estimate.`;
    return `${whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const scrollToQuote = () => {
    const elem = document.getElementById('quote-form-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-24 lg:pt-[104px] bg-slate-50 min-h-screen">
      <SEO 
        title="Haulage Services Ghana | Heavy Machinery, Equipment & Container Transport | Santa Towing"
        description="Reliable haulage services across Ghana. We transport cars, heavy machinery, excavators, forklifts, generators, shipping containers, and oversized cargo from Tema Harbour to Accra, Kumasi, Takoradi, Tamale & nationwide."
        canonical="/haulage"
        keywords={[
          'Haulage services in Ghana',
          'Haulage companies in Ghana',
          'Haulage services in Accra',
          'Haulage services in Tema',
          'Tema Harbour haulage',
          'Tema Harbour to Accra haulage',
          'Tema Harbour to Kumasi haulage',
          'Heavy equipment transport Ghana',
          'Car haulage Ghana',
          'Heavy machinery transport Ghana',
          'Container haulage Ghana',
          'Long distance haulage Ghana',
          'Lowbed transport Ghana'
        ]}
      />

      {/* 1. HERO BANNER */}
      <section className="relative bg-primary overflow-hidden text-white py-10 md:py-16 lg:py-28">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Services', path: '/services' },
              { label: 'Haulage Services' }
            ]} 
            variant="light" 
            className="mb-6"
          />

          <div className="max-w-4xl">
            {/* Main Content */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
              >
                <EditableText
                  storageKey="haulage.hero.heading"
                  defaultContent="Reliable Haulage & Heavy Transport Across Ghana"
                  label="Haulage Hero Heading"
                />
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl"
              >
                <EditableText
                  as="p"
                  multiline={true}
                  storageKey="haulage.hero.description"
                  defaultContent="Santa Towing provides professional, secure, and prompt haulage services for cars, heavy construction machinery, industrial generators, shipping containers, and oversized freight throughout Ghana. From Tema Harbour to inland project sites, we get your valuable cargo moved safely."
                  label="Haulage Hero Description"
                />
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a 
                  href={phoneTel} 
                  className="bg-accent hover:bg-accent/90 text-white px-7 py-4 font-bold transition-all shadow-lg shadow-accent/30 hover:-translate-y-0.5 flex items-center gap-2 text-base rounded-full"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {phone}</span>
                </a>
                <a 
                  href={`${whatsapp}?text=Hello%20Santa%20Towing%2C%20I%20need%20a%20haulage%20quote%20for%20cargo%20transportation.`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary hover:bg-secondary/90 text-white px-7 py-4 font-bold transition-all shadow-lg shadow-secondary/30 hover:-translate-y-0.5 flex items-center gap-2 text-base rounded-full"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>WhatsApp Us</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & CAPABILITIES BAR */}
      <section className="bg-white border-b border-gray-200 py-6 sm:py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-accent mb-1">16 Regions</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Nationwide Route Network</div>
            </div>
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary mb-1">60+ Tons</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Heavy Lowbed Capacity</div>
            </div>
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-accent mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Active Dispatch &amp; Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE HAULAGE SERVICES GRID (10 SERVICES) */}
      <section id="services-grid" className="py-10 md:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight mb-4">
              Comprehensive Haulage Services
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              From commercial cars and construction earthmovers to power generators and shipping containers, our modern fleet and certified operators ensure dependable delivery on every route.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HAULAGE_SERVICES.map((service, idx) => {
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.08, duration: 0.45 }}
                  className="bg-white rounded-[1px] overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 hover:border-accent/40 transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Image banner */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">
                      {service.desc}
                    </p>

                    {/* Capabilities bullets */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                      {service.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
                      <a 
                        href={phoneTel}
                        className="flex-1 bg-accent hover:bg-accent/90 text-white text-center py-2.5 px-3 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 rounded-full"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a 
                        href={`${whatsapp}?text=${encodeURIComponent(`Hello Santa Towing, I need a quote for ${service.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-2.5 px-3 text-xs font-bold transition-all shadow-sm shadow-primary/20 flex items-center justify-center gap-1.5 rounded-full"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. "WHAT WE HAUL" SECTION */}
      <section className="py-10 md:py-16 lg:py-24 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight mb-4">
              What We Haul
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Santa Towing is equipped with multi-axle lowbed trailers, heavy flatbeds, enclosed carriers, and specialized winch trucks to move an extensive spectrum of commercial and industrial assets.
            </p>
          </div>

          {/* Grid of items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_WE_HAUL.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-[1px] bg-slate-50 border border-gray-200/80 hover:border-accent/40 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-accent bg-accent/10 px-2 py-0.5">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-secondary text-white flex items-center justify-center group-hover:bg-white group-hover:text-secondary transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-dark mb-1.5 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-slate-50 p-6 sm:p-8 rounded-[1px] border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-dark">Have Unique or Custom Cargo Requirements?</h4>
              <p className="text-sm text-slate-600">Our engineering and transport logistics team can design custom rigging and load plans for any non-standard consignment.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href={phoneTel}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 rounded-full"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {phone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TEMA HARBOUR PROMINENT SECTION */}
      <section className="py-10 md:py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-secondary text-white relative overflow-hidden">
        {/* Subtle background graphic */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80)' }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center mb-10 md:mb-16">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Tema Harbour to Anywhere in Ghana
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
                Santa Towing provides high-reliability haulage services directly from <strong>Tema Harbour, MPS Terminal 3, and off-dock CFS holding container yards</strong> to Accra, Kumasi, Takoradi, Cape Coast, Obuasi, Sunyani, Tamale, and destinations across all 16 regions of Ghana.
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                Whether you are clearing brand-new dealership SUVs, oversized heavy mining excavators, or 40-foot commercial shipping containers, our Tema-based prime movers ensure swift gate-out, zero demurrage delays, and continuous transit monitoring.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-[1px] text-secondary">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span>Port clearance agent coordination</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-[1px] text-secondary">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span>Immediate dockside loading</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-[1px] text-secondary">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span>Direct delivery to client site</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-[1px] text-secondary">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span>Full Goods-In-Transit protection</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-[1px] border border-white/15 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                  <Anchor className="w-5 h-5" />
                  Direct Port Transit Corridors
                </h3>
                <p className="text-xs text-white/75 mb-6 leading-relaxed">
                  Estimated transit schedules and high-frequency dispatch runs originating from Tema Port:
                </p>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {TEMA_CORRIDORS.map((corridor, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-[1px] border border-white/10 transition-colors flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold block text-white text-sm">{corridor.destination}</span>
                        <span className="text-white/60">{corridor.highlight}</span>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <span className="font-extrabold text-accent block">{corridor.eta}</span>
                        <span className="text-white/50 text-xs">{corridor.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/15">
                  <button 
                    onClick={scrollToQuote}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 font-bold transition-all shadow-md text-sm flex items-center justify-center gap-2 rounded-full"
                  >
                    <span>Request a Tema Haulage Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. QUOTE & BOOKING FORM SECTION */}
      <section id="quote-form-section" className="py-10 md:py-16 lg:py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-[1px] shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-primary text-white p-6 sm:p-8 md:p-10 relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Request a Haulage Quote
              </h2>
              <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl">
                Fill in your transport details below for a fast, competitive rate on cars, heavy machinery, containers, or industrial cargo.
              </p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 md:p-10">
              {formStatus === 'success' ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-dark">Haulage Request Received!</h3>
                    <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
                      Thank you, <strong>{formData.customerName || 'Valued Customer'}</strong>. Our haulage dispatch coordinator is reviewing your request and will call you at <strong>{formData.phoneNumber}</strong> shortly.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href={getWhatsAppMessageUrl()}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-7 py-3.5 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 rounded-full"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp for Immediate Confirmation</span>
                    </a>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 font-bold text-sm transition-all rounded-full"
                    >
                      Submit Another Quote
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-6">
                  
                  {/* Row 1: Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Customer Name <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input 
                          type="text" 
                          name="customerName"
                          required
                          value={formData.customerName}
                          onChange={handleInputChange}
                          placeholder="e.g. Samuel Mensah / Company Ltd."
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Phone Number <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input 
                          type="tel" 
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. 0244753849"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Pickup & Delivery Locations */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Pickup Location <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="w-4 h-4 text-accent" />
                        </div>
                        <input 
                          type="text" 
                          name="pickupLocation"
                          required
                          value={formData.pickupLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Tema Harbour MPS Terminal 3 / Spintex"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Delivery Location <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <input 
                          type="text" 
                          name="deliveryLocation"
                          required
                          value={formData.deliveryLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Kumasi Industrial Area / Takoradi / Tamale"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Type of Cargo & Estimated Weight */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Type of Cargo <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="cargoType"
                          value={formData.cargoType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none cursor-pointer"
                        >
                          <option value="Heavy Machinery Transport">Heavy Machinery (Excavator, Bulldozer, Grader)</option>
                          <option value="Car Haulage">Car Haulage (Cars, SUVs, Commercial Fleet)</option>
                          <option value="Container Haulage">Shipping Container (20ft / 40ft Container)</option>
                          <option value="Forklift Transportation">Forklift &amp; Warehouse Equipment</option>
                          <option value="Generator & Industrial Equipment">Generator / Industrial Power Plant</option>
                          <option value="Tema Harbour Haulage">Tema Harbour Cargo Clearance</option>
                          <option value="Construction Equipment">Construction Equipment &amp; Building Materials</option>
                          <option value="Oversized & Heavy Load">Oversized / Wide / Heavy Project Cargo</option>
                          <option value="Intercity Cargo Freight">Intercity Commercial Freight</option>
                          <option value="Other Cargo">Other Specialized Cargo</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Estimated Weight <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Weight className="w-4 h-4" />
                        </div>
                        <input 
                          type="text" 
                          name="estimatedWeight"
                          value={formData.estimatedWeight}
                          onChange={handleInputChange}
                          placeholder="e.g. 15 Tons / 25,000 kg"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Cargo Description & Preferred Date */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Cargo / Car Description <span className="text-accent">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="cargoDescription"
                        required
                        value={formData.cargoDescription}
                        onChange={handleInputChange}
                        placeholder="e.g. CAT 320 Excavator / 2x Toyota Prado / 500kVA Perkins Gen"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                        Preferred Transport Date <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input 
                          type="date" 
                          name="preferredDate"
                          required
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Additional Information */}
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Additional Information / Special Handling Notes
                    </label>
                    <textarea 
                      name="additionalInfo"
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Mention access constraints, loading crane requirements, offloading site conditions, or customs documentation status..."
                      className="w-full px-4 py-3 bg-slate-50 border border-gray-200 text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Direct WhatsApp / Phone CTAs */}
                  <div className="pt-2 space-y-4">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-accent hover:bg-accent/90 text-white py-4 font-bold transition-all shadow-lg shadow-accent/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base disabled:opacity-70 cursor-pointer rounded-full"
                    >
                      <Send className="w-5 h-5" />
                      <span>{formStatus === 'submitting' ? 'Calculating Rate...' : 'Submit Haulage Quote Request'}</span>
                    </button>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <a 
                        href={phoneTel}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-dark font-bold text-xs sm:text-sm transition-colors rounded-full"
                      >
                        <Phone className="w-4 h-4 text-primary" />
                        <span>Call Hotline: {phone}</span>
                      </a>
                      <a 
                        href={getWhatsAppMessageUrl()}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm transition-colors rounded-full"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Send Quote Request on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 7. WHY CHOOSE SANTA TOWING FOR HAULAGE */}
      <section className="py-10 md:py-16 lg:py-24 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight mb-6">
                Why Industry Leaders Choose Our Haulage Fleet
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                With deep expertise across Ghana's transport corridors and a steadfast commitment to load security, Santa Towing removes the complexity and uncertainty from moving valuable commercial assets.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-[1px] bg-slate-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-base">Comprehensive Transit Insurance</h4>
                    <p className="text-slate-600 text-sm mt-1">Every consignment is fully backed by certified Goods-In-Transit policies for total peace of mind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[1px] bg-slate-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-base">Zero-Delay Port &amp; Site Turnaround</h4>
                    <p className="text-slate-600 text-sm mt-1">Our prompt dispatch ensures zero unnecessary port demurrage fees and prompt delivery to your destination.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[1px] bg-slate-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-base">Certified Rigging &amp; Securing</h4>
                    <p className="text-slate-600 text-sm mt-1">Operators trained in heavy-lift tie-down standards, axle weight balancing, and delicate equipment handling.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right photo & badge */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-[1px] overflow-hidden shadow-2xl border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Santa Towing Heavy Haulage Prime Mover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-0 sm:bottom-6 sm:-left-6 bg-dark text-white p-6 rounded-[1px] shadow-xl border border-white/10 max-w-xs">
                <div className="text-accent font-extrabold text-2xl mb-1">24/7 Dispatch</div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Call our live transport manager for immediate fleet positioning and rate quotes.
                </p>
                <a href={phoneTel} className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-white bg-accent px-3 py-1.5 rounded-full">
                  <Phone className="w-3.5 h-3.5" /> {phone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. HAULAGE FAQS */}
      <section className="py-10 md:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
              Haulage &amp; Heavy Transport FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {HAULAGE_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[1px] border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left font-bold text-dark text-base sm:text-lg flex justify-between items-center gap-4 hover:text-accent transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-slate-400 shrink-0 ${openFaqIdx === idx ? 'rotate-180 text-accent' : ''}`} />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. BOTTOM NATIONWIDE CTA */}
      <section className="py-14 bg-primary text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Need Fast Heavy Haulage Anywhere in Ghana?
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                Our logistics operators and heavy trailers are on standby 24/7 for instant mobilization.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <button 
                onClick={scrollToQuote}
                className="bg-accent hover:bg-accent/90 text-white px-7 py-3.5 font-bold transition-all shadow-md text-sm rounded-full"
              >
                Request Haulage Quote
              </button>
              <a 
                href={phoneTel}
                className="bg-white hover:bg-slate-100 text-dark px-7 py-3.5 font-bold transition-all shadow-md text-sm flex items-center gap-2 rounded-full"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>Call Hotline: {phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
