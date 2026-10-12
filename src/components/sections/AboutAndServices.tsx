import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/mockData';
import { ArrowRight, Shield, Phone, MessageCircle } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';
import EditableImage from '@/components/editable/EditableImage';

export function AboutSection() {
  const welcomeImage = useContent('global.images.welcomeTowing', 'https://i.ibb.co/fYF9HrC2/Welcome-Towing-Image.jpg');
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const heading = useContent('home.about.heading', 'Leading Towing & Premium Automotive Care');
  const p1 = useContent('home.about.p1', 'With over 15 years of industry excellence, Santa Towing & Garage Services is your premier partner for 24/7 emergency towing, heavy car recovery, certified mechanical repairs, and premium car rentals.');

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with floating badge */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[1px] overflow-hidden shadow-2xl shadow-black/10 border border-gray-100">
              <EditableImage 
                storageKey="global.images.welcomeTowing"
                altStorageKey="global.images.welcomeTowingAlt"
                defaultUrl={welcomeImage} 
                defaultAlt="Santa Towing & Garage Workshop" 
                className="w-full h-full object-cover"
                label="About Section Welcome Photo"
              />
            </div>
            {/* Floating 24/7 Emergency Assistance Badge */}
            <div className="absolute bottom-4 right-4 sm:-bottom-8 sm:-right-8 bg-primary text-white p-6 sm:p-7 rounded-[1px] shadow-2xl max-w-xs border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 aspect-square rounded-full bg-accent flex items-center justify-center font-extrabold text-white text-lg shrink-0">
                  24/7
                </div>
                <div>
                  <div className="font-bold text-base leading-tight">Emergency Towing</div>
                  <div className="text-xs text-white/80">Rapid Dispatch Team</div>
                </div>
              </div>
              <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                Nationwide roadside assistance with guaranteed fast arrival.
              </p>
            </div>
          </motion.div>

          {/* Right Column: About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-5 tracking-tight leading-[1.15]">
              <EditableText
                storageKey="home.about.heading"
                defaultContent={heading}
                label="About Heading"
              />
            </h2>
            <div className="text-slate-600 mb-6 text-base sm:text-lg leading-relaxed">
              <EditableText
                as="p"
                multiline={true}
                storageKey="home.about.p1"
                defaultContent={p1}
                label="About Paragraph"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/services" 
                className="bg-primary hover:bg-secondary text-white px-7 py-3.5 font-bold transition-all duration-200 flex items-center gap-2 shadow-md hover:-translate-y-0.5 rounded-full"
              >
                <span>Discover Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href={phoneTel} 
                className="bg-accent hover:bg-accent/90 text-white px-7 py-3.5 font-bold transition-all duration-200 shadow-md shadow-accent/25 hover:-translate-y-0.5 rounded-full"
              >
                Call Hotline:{' '}
                <EditableText
                  storageKey="global.links.phone"
                  defaultContent={phone}
                  label="Hotline Phone"
                />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const heading = useContent('home.servicesSection.heading', 'Complete Towing & Automotive Solutions');
  const description = useContent('home.servicesSection.description', 'From emergency towing to scheduled maintenance, our specialized team delivers reliable, high-standard automotive support across Ghana.');
  const viewAllBtn = useContent('home.servicesSection.viewAllBtn', 'View All Automotive Services');

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50/70 relative border-y border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4 tracking-tight">
            <EditableText
              storageKey="home.servicesSection.heading"
              defaultContent={heading}
              label="Services Section Heading"
            />
          </h2>
          <div className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <EditableText
              as="p"
              multiline={true}
              storageKey="home.servicesSection.description"
              defaultContent={description}
              label="Services Section Description"
            />
          </div>
        </div>

        {/* 3-Column Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const linkHref = service.title === 'Emergency Towing' ? '/towing' 
              : service.title === 'Car Recovery' ? '/towing'
              : service.title === 'Car Rental' ? '/rental' 
              : service.title === 'Car Sales' ? '/sales' 
              : service.title === 'Auto Repairs' ? '/repairs' 
              : service.title === 'Auto Body Works' ? '/body-works' 
              : service.title === 'Spray Painting' ? '/body-works' 
              : service.title === 'Car Batteries' ? '/parts' 
              : service.title === 'Genuine Auto Parts' ? '/parts' 
              : service.title === 'Fleet Services' ? '/fleet' 
              : '/services';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.08, duration: 0.45 }}
                className="group bg-white rounded-[1px] overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 hover:border-accent/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5"
              >
                {/* Card Image */}
                <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                  <EditableImage 
                    storageKey={`home.services.items.${idx}.image`}
                    defaultUrl={service.image} 
                    defaultAlt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    label={`${service.title} Photo`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col relative">
                  
                  <h3 className="text-xl font-bold text-dark mb-2.5 mt-1 group-hover:text-accent transition-colors">
                    <EditableText
                      storageKey={`home.services.items.${idx}.title`}
                      defaultContent={service.title}
                      label={`Service ${idx + 1} Title`}
                    />
                  </h3>
                  <div className="text-slate-600 text-sm sm:text-base mb-6 flex-1 leading-relaxed">
                    <EditableText
                      as="p"
                      multiline={true}
                      storageKey={`home.services.items.${idx}.desc`}
                      defaultContent={service.desc}
                      label={`Service ${idx + 1} Description`}
                    />
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <a href={phoneTel} className="flex-1 bg-accent hover:bg-accent/90 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1 min-h-[40px] rounded-full">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call for Repair</span>
                      </a>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[40px] rounded-full">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp for Repair</span>
                      </a>
                    </div>

                    <Link 
                      to={linkHref} 
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-accent transition-colors group/link"
                    >
                      <span>Service Details</span> 
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link 
            to="/services" 
            className="bg-accent hover:bg-accent/90 text-white px-4 sm:px-8 md:px-10 py-4 font-bold transition-all shadow-md shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 inline-flex items-center gap-2 rounded-full"
          >
            <EditableText
              storageKey="home.servicesSection.viewAllBtn"
              defaultContent={viewAllBtn}
              label="View All Services Button"
            />
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export function TowingServicesHomeSection() {
  const towingImage = useContent('global.images.heavyRecovery', 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg');

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6 tracking-tight">
              Rapid Response Towing Services
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Whether you are stranded on the highway with a flat tire, require heavy-duty accident recovery, or need safe transport for a luxury car, our specialized towing fleet is available 24/7 across Ghana. We guarantee fast response times, professional handling, and transparent pricing to get you back on track safely.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/towing" 
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-md hover:-translate-y-0.5 rounded-full"
              >
                <span>Explore Towing Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/service-areas" 
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-dark/20 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-sm hover:-translate-y-0.5 rounded-full"
              >
                <span>View Service Areas</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[1px] overflow-hidden shadow-2xl border border-gray-100">
              <EditableImage 
                storageKey="global.images.heavyRecovery"
                altStorageKey="global.images.heavyRecoveryAlt"
                defaultUrl={towingImage} 
                defaultAlt="Professional Towing Services" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                label="Rapid Towing Section Photo"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-[1px] shadow-xl border border-white/20 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black">24/7</div>
                  <div className="text-sm font-medium text-white/90">Emergency Response</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
