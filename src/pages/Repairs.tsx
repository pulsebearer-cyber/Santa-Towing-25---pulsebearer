import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Wrench, Settings, Battery, Gauge, Wind, AlertCircle, Droplet, Zap, 
  CheckCircle2, Star, ShieldCheck, Cog, ArrowRight, ChevronDown, Clock, 
  Calendar, Phone, Info
, MessageCircle } from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';

const REPAIR_SERVICES = [
  { icon: ShieldCheck, title: 'Auto Body Works', desc: 'Collision repair, dent removal, and premium oven-baked spray painting to restore your car to factory condition.', href: '/body-works' },
  { icon: Zap, title: 'Car Batteries', desc: 'Battery testing, replacement, and sales of premium battery brands for reliable starting power.', href: '/parts' },

  { icon: Gauge, title: 'Engine Diagnostics & Repair', desc: 'Comprehensive engine analysis and repair using advanced diagnostic equipment.' },
  { icon: AlertCircle, title: 'Brake Services', desc: 'Brake pad replacement, rotor resurfacing, and fluid flushes for optimal safety.' },
  { icon: Settings, title: 'Transmission Repair', desc: 'Expert transmission service, repair, and replacement for smooth shifting.' },
  { icon: Cog, title: 'Suspension & Steering', desc: 'Shocks, struts, tie rods, and alignment services for a comfortable ride.' },
  { icon: Zap, title: 'Electrical Systems', desc: 'Battery testing, alternator replacement, and complex electrical troubleshooting.' },
  { icon: Wind, title: 'Air Conditioning Repair', desc: 'A/C recharge, compressor repair, and leak detection to keep you cool.' },
  { icon: ShieldCheck, title: 'Preventive Maintenance', desc: 'Scheduled maintenance to prevent costly repairs and extend car life.' },
  { icon: Droplet, title: 'Oil Changes', desc: 'Premium synthetic and conventional oil changes with comprehensive filter checks.' },
];

const WHY_CHOOSE_US = [
  { title: 'Certified Technicians', icon: CheckCircle2 },
  { title: 'Genuine & Quality Parts', icon: Settings },
  { title: 'Modern Diagnostic Equipment', icon: Gauge },
  { title: 'Transparent Quotes', icon: Info },
  { title: 'Warranty on Repairs', icon: ShieldCheck },
  { title: 'Fast Turnaround', icon: Clock },
];

const HOW_IT_WORKS = [
  'Contact Us', 'Car Drop-Off', 'Diagnostics', 'Quote Approval', 'Repair Complete', 'Quality Check', 'Ready for Pickup'
];

const REPAIR_FAQS = [
  { q: 'How long will my repair take?', a: 'Turnaround times vary based on the service required. Basic maintenance takes 1-2 hours, while complex repairs may take several days. We will provide an estimated completion time with your quote.' },
  { q: 'Do you offer a warranty on your repairs?', a: 'Yes! We offer a 6-month or 10,000 km warranty on parts and labor for most repairs. Please ask your service advisor for specific warranty details.' },
  { q: 'Can you pick up my car for service?', a: 'Yes, we offer a convenient pickup and drop-off service within a 15km radius of our workshop. A nominal fee may apply for greater distances.' },
  { q: 'Do you use genuine parts?', a: 'We recommend and supply genuine OEM parts for the best performance and longevity. We also offer high-quality aftermarket alternatives upon request to suit different budgets.' },
  { q: 'What payment methods do you accept?', a: 'We accept Mobile Money (MoMo), Visa/Mastercard, bank transfers, and cash.' },
];

export default function Repairs() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const phoneRaw = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const repairsTitle = useContent('repairs.title', 'Expert Auto Repairs You Can Trust');
  const repairsDesc = useContent('repairs.description', 'Certified technicians, modern diagnostic equipment, and honest pricing for every make and model.');

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen">
      <SEO title="Professional Auto Repairs & Diagnostics | Santa Towing" description="Certified mechanics offering comprehensive auto repairs, advanced computer diagnostics, routine maintenance, and engine overhauls." canonical="/repairs" />
      <div className="bg-white border-b border-dark/10 py-4 absolute top-24 lg:top-[104px] left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Auto Repairs' }]} />
        </div>
      </div>
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary overflow-hidden pt-12 pb-32 md:pt-20 md:pb-40">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(https://i.ibb.co/JRyRmbjF/Image-11-Brake-Parts-and-Disk-Maintenance.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            <EditableText
              storageKey="repairs.hero.title"
              defaultContent={repairsTitle}
              label="Repairs Hero Title"
            />
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto"
          >
            <EditableText
              as="p"
              multiline={true}
              storageKey="repairs.hero.desc"
              defaultContent={repairsDesc}
              label="Repairs Hero Description"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href={phoneTel || `tel:${phoneRaw}`} className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <Phone className="w-5 h-5" /> Call
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-white/90 text-primary px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </motion.div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 2. Repair Services Grid */}
      <section className="py-16 md:py-24 bg-white relative -mt-16 rounded-t-[1px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">Our Services</h2>
            <p className="text-dark/70 text-lg">Comprehensive automotive care to keep you safely on the road.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REPAIR_SERVICES.map((service, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-[1px] shadow-sm border border-dark/10 hover:shadow-xl transition-all group flex flex-col"
                >
                  <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                  <p className="text-dark/70 mb-6 flex-1 text-sm">{service.desc}</p>
                  
                    <div className="mt-auto pt-4 border-t border-dark/10 space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <a href={phoneTel || `tel:${phoneRaw}`} className="flex-1 bg-accent hover:bg-accent/90 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1 min-h-[40px] rounded-full">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[40px] rounded-full">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Repair</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Our Repair Shop */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Santa Towing</h2>
            <p className="text-white/80 text-lg">Quality service, honest advice, and transparent pricing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {WHY_CHOOSE_US.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-white/10 rounded-[1px] p-6 text-center shadow-sm hover:shadow-md transition-all group text-primary"
                >
                  <Icon className="w-10 h-10 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-sm md:text-base leading-tight text-primary">{feature.title}</h3>
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
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">How It Works</h2>
            <p className="text-dark/70 text-lg">A hassle-free process designed around your convenience.</p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {HOW_IT_WORKS.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-lg md:text-xl font-bold text-dark group-hover:border-accent group-hover:text-accent transition-colors relative z-10 mb-4">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-dark text-sm md:text-base">{step}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Booking Widget */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[80%] bg-[url('https://i.ibb.co/23wLXy6t/Image-12-Tyre-Maintenance.jpg')] bg-cover bg-center rounded-[1px] hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl bg-primary rounded-[1px] p-6 sm:p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Call for an Appointment</h2>
            <p className="text-white/80 mb-8">Contact us today to schedule your repair or maintenance service.</p>
            
            
            <div className="space-y-4">
              <a href={phoneTel || `tel:${phoneRaw}`} className="w-full bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg flex justify-center items-center gap-2 rounded-full">
                <Phone className="w-5 h-5"/> Call Now
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="w-full bg-white hover:bg-white/90 text-primary px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg flex justify-center items-center gap-2 rounded-full">
                <MessageCircle className="w-5 h-5"/> WhatsApp Us
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Workshop Gallery */}
      <section className="py-16 md:py-24 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Inside Our Workshop</h2>
              <p className="text-white/80">State-of-the-art facilities equipped to handle any repair.</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 px-4 sm:px-6 lg:px-8 snap-x">
          {[
            'https://i.ibb.co/qV5D1J9/Image-13-Filters-maintenance.jpg',
            'https://i.ibb.co/35NfN5Lx/Image-14-Suspension-Parts-maintenance.jpg',
            'https://i.ibb.co/WpyLYZQk/Image-15-Car-Lightening-maintenance.jpg',
            'https://i.ibb.co/3998gkTG/Image-16-Accessories.jpg'
          ].map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-[85vw] sm:w-[300px] md:w-[450px] aspect-[4/3] shrink-0 rounded-[1px] overflow-hidden snap-center"
            >
              <img src={img} alt="Workshop gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>



      {/* 9. FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Repair & Maintenance FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {REPAIR_FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-dark/20 rounded-[1px] overflow-hidden shadow-sm bg-white"
              >
                <button 
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-dark/5 transition-colors rounded-full"
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
                      className="overflow-hidden bg-white"
                    >
                      <div className="px-6 py-5 text-dark/70">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Keep Your Car Running at Its Best</h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Don't ignore the warning signs. Schedule a diagnostic today and prevent costly repairs down the road.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={phoneTel || `tel:${phoneRaw}`} className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <Phone className="w-5 h-5" /> Call for Repair
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-white/90 text-primary px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <MessageCircle className="w-5 h-5" /> WhatsApp for Repair
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
