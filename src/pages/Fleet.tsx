import React, { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, Clock, 
  Settings, Truck, MapPin, BarChart3, Building2, 
  Users, HardHat, CarTaxiFront, ChevronDown
} from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

const FLEET_SERVICES = [
  { id: 1, title: 'Fleet Maintenance & Repairs', desc: 'Scheduled servicing, preventative maintenance, and priority mechanical repairs for all fleet sizes.', icon: Settings },
  { id: 2, title: 'Priority Emergency Towing', desc: '24/7 VIP roadside assistance and priority towing across our nationwide network.', icon: Truck },
  { id: 3, title: 'Fleet Rental Solutions', desc: 'Flexible short-term and long-term corporate rentals to keep your business moving.', icon: CarTaxiFront },
  { id: 4, title: 'Fleet Auto Parts Supply', desc: 'Wholesale pricing and priority allocation on OEM and premium aftermarket parts.', icon: Settings },
  { id: 5, title: 'Dedicated Account Management', desc: 'A single point of contact for all your fleet needs, ensuring seamless operations.', icon: Users },
  { id: 6, title: 'Car Tracking & Reporting', desc: 'Detailed maintenance logs, spend analytics, and fleet health monitoring.', icon: BarChart3 },
];

const WHY_CHOOSE_US_FLEET = [
  { title: 'Priority Response Times', icon: Clock },
  { title: 'Dedicated Account Manager', icon: Users },
  { title: 'Volume Discounts', icon: BarChart3 },
  { title: 'Flexible Billing/Invoicing', icon: Settings },
  { title: 'Nationwide Coverage', icon: MapPin },
  { title: 'Detailed Reporting & Analytics', icon: BarChart3 },
];

const INDUSTRIES = [
  { title: 'Logistics & Delivery', icon: Truck, image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' },
  { title: 'Corporate Fleets', icon: Building2, image: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg' },
  { title: 'Rental Agencies', icon: CarTaxiFront, image: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png' },
  { title: 'Government & NGOs', icon: ShieldCheck, image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg' },
  { title: 'Construction & Haulage', icon: HardHat, image: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg' },
  { title: 'Ride-Hailing Operators', icon: MapPin, image: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg' },
];

const STEPS = [
  { step: '01', title: 'Initial Consultation', desc: 'We assess your fleet size, operational requirements, and current challenges.' },
  { step: '02', title: 'Custom Service Plan', desc: 'We design a tailored maintenance, towing, and support package for your business.' },
  { step: '03', title: 'Onboarding', desc: 'Your drivers and managers are onboarded to our priority support systems.' },
  { step: '04', title: 'Ongoing Support', desc: 'Access 24/7 VIP assistance, priority workshop slots, and seamless rentals.' },
  { step: '05', title: 'Regular Reporting & Review', desc: 'Monthly or quarterly reviews of fleet spend, maintenance history, and optimization.' },
];

const FAQS = [
  { q: 'What is the minimum fleet size required?', a: 'Our fleet partnerships typically start at 5 cars, but we can customize solutions for smaller, high-usage fleets.' },
  { q: 'What are the contract terms?', a: 'We offer flexible 12, 24, and 36-month service level agreements, as well as pay-as-you-go options with corporate discounts.' },
  { q: 'How does billing work?', a: 'We provide consolidated monthly invoices with 30-day payment terms for approved corporate accounts, complete with detailed breakdown by car.' },
  { q: 'What are your response time guarantees?', a: 'Fleet partners receive VIP priority. We guarantee a 30-minute response time for towing within major city limits.' },
  { q: 'What areas do you cover?', a: 'We offer nationwide coverage through our owned facilities and a vetted network of partner workshops across the country.' },
];

export default function Fleet() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const seoTitle = useContent('seo.fleet.title', 'Corporate Fleet Management & Services | Santa Towing');
  const seoDesc = useContent('seo.fleet.description', 'Specialized fleet maintenance and repair programs designed to keep corporate and commercial cars running efficiently with minimal downtime.');
  const badge = useContent('fleet.badge', 'B2B Partnerships');
  const title = useContent('fleet.title', 'Reliable Fleet Solutions for Your Business');
  const description = useContent('fleet.description', 'Comprehensive maintenance, towing, rental, and management services designed for businesses that depend on their cars to drive revenue.');
  const heroImage = useContent('global.images.luxuryMercedes', 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg');

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white">
      <SEO title={seoTitle} description={seoDesc} canonical="/fleet" />
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />
          <img 
            src={heroImage} 
            alt="Corporate Fleet" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Our Fleet' }]} variant="light" />
          </div>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-accent font-bold text-sm tracking-wider uppercase mb-6"
            >
              <Building2 className="w-4 h-4" /> {badge}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/70 mb-10 max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-lg shadow-accent/20 rounded-full">
                Request a Fleet Consultation
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 sm:px-8 py-4 font-bold transition-all rounded-full">
                Download Fleet Brochure
              </button>
            </motion.div>
          </div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 2. Fleet Services Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Comprehensive Fleet Services</h2>
            <p className="text-dark/70">Everything your business needs to keep your cars on the road and operations running smoothly.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLEET_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[1px] p-6 sm:p-8 border border-dark/10 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-white transition-colors">
                    <Icon className="w-7 h-7 text-white group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                  <p className="text-dark/70 leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Why Businesses Choose Us */}
      <section className="py-12 md:py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Businesses Choose Us</h2>
            <p className="text-dark/70">We provide the reliability, transparency, and priority support corporate clients demand.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
            {WHY_CHOOSE_US_FLEET.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white/5 border border-white/10 rounded-[1px] backdrop-blur-sm">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Industries We Serve */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-12 text-center">Industries We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="relative rounded-[1px] overflow-hidden group h-64">
                  <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-2xl font-bold text-white">{ind.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. How Fleet Partnership Works */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">How Our Partnership Works</h2>
            <p className="text-dark/70">A streamlined process to get your fleet under our professional care.</p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2" />
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {STEPS.map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[1px] border border-dark/10 shadow-xl shadow-charcoal/5 relative">
                  <div className="w-12 h-12 bg-accent text-white font-bold rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-charcoal/20">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-dark/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Fleet Management Dashboard Preview */}
      <section className="py-12 md:py-20 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="w-full lg:w-1/2 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Visibility with Our Client Portal</h2>
              <p className="text-white/70 mb-8 text-lg">
                Manage your entire fleet from one centralized dashboard. Track repairs in real-time, view invoice history, and approve quotes instantly.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time repair status updates',
                  'Centralized billing and invoice management',
                  'One-click quote approvals',
                  'Detailed maintenance history per car'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1px] p-4 shadow-2xl">
                <div className="bg-white rounded-[1px] overflow-hidden aspect-video shadow-inner flex items-center justify-center relative">
                  <img 
                    src="https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg" 
                    alt="Dashboard Preview" 
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                     <div className="bg-white/90 backdrop-blur-sm p-4 rounded-[1px] shadow-lg w-full max-w-sm">
                       <div className="flex justify-between items-center mb-4">
                         <span className="font-bold text-dark">Fleet Health</span>
                         <span className="text-accent font-bold text-sm bg-primary/5 px-2 py-1">98% Good</span>
                       </div>
                       <div className="w-full bg-white rounded-[1px] h-2">
                         <div className="bg-primary/50 h-2 rounded-[1px]" style={{ width: '98%' }}></div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 8. FAQs */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Fleet Services FAQs</h2>
            <p className="text-dark/70">Common questions about our B2B fleet partnerships.</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-dark/20 rounded-[1px] overflow-hidden shadow-sm bg-white">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white transition-colors rounded-full"
                >
                  <span className="font-bold text-dark pr-4">{faq.q}</span>
                  <ChevronDown className={cn("w-5 h-5 text-primary transition-transform shrink-0", openFaq === idx && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 text-dark/70 border-t border-dark/10 leading-relaxed">
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

      {/* 9. Call-to-Action Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build a Fleet Plan for Your Business</h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Contact our dedicated corporate sales team today to discuss your fleet requirements and receive a customized proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg rounded-full">
              Request a Consultation
            </button>
            <button className="bg-white hover:bg-dark/5 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg rounded-full">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
