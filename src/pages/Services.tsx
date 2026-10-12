import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { motion } from 'motion/react';
import { Truck, Shield, Car, Wrench, Settings, Battery, ArrowRight, Clock, ShieldCheck, Tag, MapPin, Zap, Phone, MessageCircle } from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { Link } from 'react-router-dom';
import { FAQ } from '@/components/sections/BottomSections';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

const CORE_SERVICES = [
  { 
    id: 1, 
    title: 'Emergency Towing', 
    desc: 'Rapid response towing available 24/7. We safely transport your car to any destination or our secure facility.', 
    icon: Truck, 
    image: 'https://i.ibb.co/3998gkTG/Image-16-Accessories.jpg' 
  },
  { 
    id: 2, 
    title: 'Haulage & Heavy Transport', 
    desc: 'Professional haulage of heavy construction machinery, forklifts, generators, shipping containers, and oversized freight across Ghana.', 
    icon: Truck, 
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 3, 
    title: 'Car Recovery', 
    desc: 'Expert off-road and accident recovery using specialized equipment to handle any complex situation.', 
    icon: Shield, 
    image: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg' 
  },
  { 
    id: 4, 
    title: 'Car Rental', 
    desc: 'Premium and affordable rental cars for daily, weekly, or monthly use, tailored to your needs.', 
    icon: Car, 
    image: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png' 
  },
  { 
    id: 5, 
    title: 'Car Sales', 
    desc: 'Quality inspected new and pre-owned cars. Find your next car with our trusted sales team.', 
    icon: Car, 
    image: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg' 
  },
  { 
    id: 6, 
    title: 'Auto Repairs', 
    desc: 'Comprehensive mechanical repairs, computer diagnostics, and regular maintenance by certified mechanics.', 
    icon: Wrench, 
    image: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg' 
  },
  { 
    id: 7, 
    title: 'Auto Body Works & Spraying', 
    desc: 'Precision dent removal, collision restoration, and factory-finish oven spray painting.', 
    icon: Wrench, 
    image: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg' 
  },
  { 
    id: 8, 
    title: 'Genuine Auto Parts', 
    desc: 'Genuine OEM replacement parts and quality automotive accessories.', 
    icon: Battery, 
    image: 'https://i.ibb.co/3998gkTG/Image-16-Accessories.jpg' 
  },
  { 
    id: 9, 
    title: 'Fleet Services', 
    desc: 'Dedicated commercial fleet maintenance, tracking, and priority repair solutions for businesses.', 
    icon: Settings, 
    image: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg' 
  },
];

const STAND_OUT_FEATURES = [
  { title: '24/7 Availability', icon: Clock },
  { title: 'Certified Technicians', icon: ShieldCheck },
  { title: 'Transparent Pricing', icon: Tag },
  { title: 'Genuine Parts', icon: Settings },
  { title: 'Nationwide Coverage', icon: MapPin },
  { title: 'Fast Turnaround', icon: Zap },
];

const PROCESS_STEPS = [
  'Contact Us', 'Assessment', 'Service Delivery', 'Quality Check', 'Follow-Up'
];

export default function Services() {
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <main className="pt-24 lg:pt-[104px]">
      <SEO title="Comprehensive Auto Services | Towing & Repairs | Santa Towing" description="Explore our full range of automotive services including 24/7 emergency towing, mechanical repairs, body works, car rentals, and fleet management." canonical="/services" />
      
      {/* 1. Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg)' }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Complete Automotive Solutions <span className="text-accent">Under One Roof</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto"
          >
            From roadside emergencies to car sales, repairs, and rentals - we've got every stage of your journey covered.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href={phoneTel} className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <Phone className="w-5 h-5" /> Call: {phone}
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center gap-2 rounded-full">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </motion.div>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 2. Services Intro */}
      <section className="py-12 md:py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6 leading-relaxed">
            We offer a comprehensive suite of automotive services designed to provide you with peace of mind. Whether you're stranded on the highway or looking for your next dream car, our certified experts deliver reliable, one-stop convenience for all your car needs.
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-[1px]" />
        </div>
      </section>

      {/* 3. Core Services Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Our Services' }]} variant="light" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_SERVICES.map((service, idx) => {
              const servicePath = service.title === 'Emergency Towing' ? '/towing' 
                : service.title === 'Haulage & Heavy Transport' ? '/haulage'
                : service.title === 'Car Recovery' ? '/towing'
                : service.title === 'Car Rental' ? '/rental'
                : service.title === 'Car Sales' ? '/sales' 
                : service.title === 'Auto Repairs' ? '/repairs' 
                : (service.title === 'Auto Body Works & Spraying' || service.title === 'Body Works & Spray Painting') ? '/body-works' 
                : service.title === 'Genuine Auto Parts' ? '/parts' 
                : service.title === 'Fleet Services' ? '/fleet' 
                : '/services';
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-[1px] overflow-hidden shadow-sm hover:shadow-2xl border border-dark/10 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-white">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6 sm:p-8 flex-1 flex flex-col relative z-10 bg-white">
                    <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                    <p className="text-dark/70 mb-6 flex-1 text-sm line-clamp-3">{service.desc}</p>
                    
                    <div className="mt-auto pt-4 border-t border-dark/10 space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <a href={phoneTel} className="flex-1 bg-accent hover:bg-accent/90 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1 min-h-[40px] rounded-full">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[40px] rounded-full">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      </div>
                      <Link to={servicePath} className="inline-flex items-center gap-2 text-xs font-bold text-dark hover:text-accent transition-colors group/link">
                        <span>Learn More</span> 
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Our Services Stand Out */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Our Services Stand Out</h2>
            <p className="text-white/80 text-lg">Excellence and reliability in every interaction.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {STAND_OUT_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[1px] p-6 text-center shadow-sm hover:shadow-md transition-all group"
                >
                  <Icon className="w-10 h-10 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary">{feature.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Process Overview */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">Our Service Process</h2>
            <p className="text-dark/70 text-lg">A simple, transparent approach to getting you back on track.</p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 bg-white rounded-xl border-4 border-white shadow-xl flex items-center justify-center text-xl font-bold text-dark group-hover:bg-accent group-hover:text-white transition-colors relative z-10">
                    {idx + 1}
                  </div>
                  <h4 className="mt-4 font-bold text-dark">{step}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Service Spotlight */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[1px] overflow-hidden flex flex-col md:flex-row relative">
            <div className="md:w-1/2 p-6 sm:p-8 md:p-16 flex flex-col justify-center relative z-10 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Rapid Emergency Towing</h2>
              <p className="text-white/70 mb-8 text-lg">Stranded on the side of the road? Our emergency towing fleet is on standby 24/7. Fast response times and professional handling guaranteed.</p>
              <button className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-lg self-start rounded-full">
                Request a Tow Now
              </button>
            </div>
            <div className="md:w-1/2 aspect-video md:aspect-auto relative">
              <img 
                src="https://i.ibb.co/j9GzSqt8/Image-9-Car-Battery-Maintenance.jpg" 
                alt="Emergency Towing" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent md:w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs Preview */}
      <FAQ />

      {/* 9. Call-to-Action Banner */}
      <section className="py-16 md:py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.5) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Not Sure Which Service You Need?</h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Our expert team is ready to guide you. Contact us today and we'll help you find the right solution for your car.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center rounded-full">
              Contact Us
            </Link>
            <a href={phoneTel} className="bg-white hover:bg-dark/5 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-xl flex items-center justify-center rounded-full">
              Call: {phone}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
