import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PARTS_CATEGORIES } from '@/data/mockData';
import { Settings, ArrowRight, ShieldCheck, Phone, Cpu, Disc, Wrench, Battery, Zap, CheckCircle2, Clock, Truck, Shield, MapPin } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';

export function AutoParts() {
  const heading = useContent('home.autoParts.heading', 'Genuine Auto Parts & Accessories');
  const description = useContent('home.autoParts.description', 'We stock thousands of high-quality OEM and verified aftermarket parts, batteries, and accessories to keep your car running at peak performance.');
  const browseBtn = useContent('home.autoParts.browseBtn', 'Browse Full Catalog');

  const getCategoryIcon = (idx: number) => {
    const icons = [Wrench, Battery, Disc, Cpu, Zap, Settings, ShieldCheck, CheckCircle2];
    const IconComponent = icons[idx % icons.length];
    return <IconComponent className="w-7 h-7 text-white group-hover:text-secondary group-active:text-secondary transition-colors" />;
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50/70 relative border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4 tracking-tight leading-[1.15]">
              <EditableText
                storageKey="home.autoParts.heading"
                defaultContent={heading}
                label="Auto Parts Heading"
              />
            </h2>
            <div className="text-slate-600 text-base sm:text-lg leading-relaxed">
              <EditableText
                as="p"
                multiline={true}
                storageKey="home.autoParts.description"
                defaultContent={description}
                label="Auto Parts Description"
              />
            </div>
          </div>
          <Link 
            to="/parts" 
            className="bg-primary hover:bg-secondary text-white px-7 py-3.5 font-bold transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-md hover:-translate-y-0.5 rounded-full"
          >
            <EditableText
              storageKey="home.autoParts.browseBtn"
              defaultContent={browseBtn}
              label="Browse Button"
            />
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PARTS_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="relative"
            >
              <Link 
                to="/parts"
                className="bg-white border border-gray-200/80 hover:border-accent/40 hover:shadow-xl rounded-[1px] p-6 text-center transition-all duration-300 group flex flex-col items-center h-full hover:-translate-y-1.5"
              >
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-active:bg-white group-hover:shadow-md transition-all duration-300">
                  {getCategoryIcon(idx)}
                </div>
                <h3 className="font-bold text-dark text-base group-hover:text-accent transition-colors mb-1">
                  {cat}
                </h3>
                <span className="text-xs text-gray-500 font-medium">OEM &amp; Aftermarket</span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const heading = useContent('home.whyChooseUs.heading', 'Why Choose Santa Towing & Garage?');
  const description = useContent('home.whyChooseUs.description', "We don't just fix cars; we build lasting relationships based on trust, swift emergency response, quality workmanship, and transparent pricing.");
  const bannerHeading = useContent('home.whyChooseUs.bannerHeading', 'Need Immediate Roadside Assistance or Repairs?');
  const bannerSubtext = useContent('home.whyChooseUs.bannerSubtext', 'Our 24/7 emergency dispatch and expert mechanical teams are standing by right now.');

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-dark text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-[1.15]">
            <EditableText
              storageKey="home.whyChooseUs.heading"
              defaultContent={heading}
              label="Why Choose Us Heading"
            />
          </h2>
          <div className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <EditableText
              as="p"
              multiline={true}
              storageKey="home.whyChooseUs.description"
              defaultContent={description}
              label="Why Choose Us Description"
            />
          </div>
        </div>

        {/* 4-Column Feature Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:mb-16">
          {[
            { title: '24/7 Emergency Support', icon: Clock, desc: 'Always on-call dispatch team ready for day and night roadside recoveries.' },
            { title: 'Rapid Response Time', icon: Truck, desc: 'Average arrival time within 20-30 minutes across Greater Accra and highways.' },
            { title: 'Certified Technicians', icon: Shield, desc: 'ASE-certified mechanics and master auto-electricians with years of field mastery.' },
            { title: 'Transparent Pricing', icon: Settings, desc: 'Clear, upfront quotes with zero hidden charges or unexpected surprise fees.' },
            { title: '100% Genuine OEM Parts', icon: Wrench, desc: 'Direct factory imports backed by manufacturer warranties for maximum durability.' },
            { title: 'State-of-the-Art Equipment', icon: Settings, desc: 'Modern hydraulic flatbeds, specialized wheel lifts, and computer diagnostic rigs.' },
            { title: 'Nationwide Network', icon: MapPin, desc: 'Comprehensive coverage across Accra, Tema, Kumasi, Takoradi, and regional corridors.' },
            { title: 'Guaranteed Satisfaction', icon: CheckCircle2, desc: 'Thousands of satisfied private motorists, fleet managers, and corporate partners.' },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.45 }}
                className="bg-white border border-white/10 p-7 rounded-[1px] hover:border-accent/40 hover:bg-white transition-all duration-300 group flex flex-col hover:-translate-y-1.5"
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-white group-active:bg-white group-hover:shadow-lg transition-all duration-300">
                  <Icon className="w-7 h-7 text-white group-hover:text-secondary group-active:text-secondary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed flex-1">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Banner Bar */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 sm:p-8 md:p-10 rounded-[1px] border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              <EditableText
                storageKey="home.whyChooseUs.bannerHeading"
                defaultContent={bannerHeading}
                label="Emergency Banner Heading"
              />
            </h3>
            <div className="text-white/85 text-sm sm:text-base">
              <EditableText
                as="p"
                multiline={true}
                storageKey="home.whyChooseUs.bannerSubtext"
                defaultContent={bannerSubtext}
                label="Emergency Banner Subtext"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a 
              href={phoneTel} 
              className="bg-accent hover:bg-accent/90 text-white px-7 py-3.5 font-bold transition-all shadow-lg shadow-accent/30 hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base rounded-full"
            >
              <Phone className="w-4 h-4" />
              <span>
                Call Now:{' '}
                <EditableText
                  storageKey="global.links.phone"
                  defaultContent={phone}
                  label="Hotline Phone"
                />
              </span>
            </a>
            <Link 
              to="/towing" 
              className="bg-white/15 hover:bg-white/25 text-white px-7 py-3.5 font-bold transition-all border border-white/20 hover:-translate-y-0.5 text-sm sm:text-base rounded-full"
            >
              <EditableText
                storageKey="home.whyChooseUs.requestOnlineBtn"
                defaultContent="Request Tow Online"
                label="Online Request Button Label"
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
