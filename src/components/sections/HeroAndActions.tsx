import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES, QUICK_ACTIONS } from '@/data/mockData';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, ArrowRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';
import EditableImage from '@/components/editable/EditableImage';

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = useContent('home.hero.slides', HERO_SLIDES);
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  const totalSlides = slides && slides.length > 0 ? slides.length : HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, currentSlide === 0 ? 8000 : 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, isPaused, totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const activeSlide = (slides && slides[currentSlide]) || HERO_SLIDES[0];

  return (
    <div className="relative min-h-[640px] md:min-h-[700px] lg:h-[88vh] w-full overflow-hidden bg-dark">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <EditableImage
              storageKey={`home.hero.slides.${currentSlide}.image`}
              altStorageKey={`home.hero.slides.${currentSlide}.imageAlt`}
              defaultUrl={activeSlide.image}
              defaultAlt={(activeSlide as any).imageAlt || `Slide ${currentSlide + 1} recovery photo`}
              className="w-full h-full object-cover"
              label={`Slide ${currentSlide + 1} Background Image`}
            />
          </div>
          {/* Dark Corporate Overlay for High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-black/30 pointer-events-none" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-28 md:py-0">
              <div className="max-w-2xl lg:max-w-3xl">
                {/* Main Headline */}
                <motion.h1 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-[1.1]"
                >
                  <EditableText
                    as="span"
                    storageKey={`home.hero.slides.${currentSlide}.headline`}
                    defaultContent={activeSlide.headline}
                    label={`Slide ${currentSlide + 1} Headline`}
                  />
                </motion.h1>

                {/* Subheadline / Body Text */}
                <motion.div 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  className="text-base sm:text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl font-normal"
                >
                  <EditableText
                    as="p"
                    multiline={true}
                    storageKey={`home.hero.slides.${currentSlide}.subheadline`}
                    defaultContent={activeSlide.subheadline}
                    label={`Slide ${currentSlide + 1} Subheadline`}
                  />
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
                >
                  {activeSlide.buttons && activeSlide.buttons.map((btn: any, idx: number) => {
                    const isInternal = btn.href && btn.href.startsWith('/');
                    const isWhatsApp = btn.href && (btn.href.startsWith('https://wa.me') || btn.label.toLowerCase().includes('whatsapp'));
                    const isPhone = btn.href && (btn.href.startsWith('tel:') || btn.label.includes('0244753849') || btn.label.includes('Call'));
                    
                    const resolvedHref = isPhone ? phoneTel : isWhatsApp ? whatsapp : btn.href;
                    const styleObj = btn.color ? { backgroundColor: btn.color } : {};

                    const className = cn(
                      "px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5",
                      !btn.color && btn.primary 
                        ? "bg-accent hover:bg-accent/90 text-white shadow-accent/30 hover:shadow-accent/50" 
                        : !btn.color && isWhatsApp
                        ? "bg-primary hover:bg-primary/90 text-white shadow-primary/30"
                        : !btn.color ? "bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 hover:border-white/40" : "text-white"
                    );

                    if (isInternal) {
                      return (
                        <Link to={resolvedHref} key={idx} className={className} style={styleObj}>
                          <EditableText
                            storageKey={`home.hero.slides.${currentSlide}.buttons.${idx}.label`}
                            defaultContent={btn.label}
                            label={`Slide ${currentSlide + 1} Button ${idx + 1}`}
                          />
                        </Link>
                      );
                    }

                    return (
                      <a 
                        href={resolvedHref || '#'} 
                        key={idx}
                        className={className}
                        style={styleObj}
                        target={isWhatsApp ? "_blank" : undefined}
                        rel={isWhatsApp ? "noopener noreferrer" : undefined}
                      >
                        {isPhone && !isWhatsApp && <Phone className="w-4 h-4" />}
                        {isWhatsApp && <MessageCircle className="w-4 h-4" />}
                        <EditableText
                          storageKey={`home.hero.slides.${currentSlide}.buttons.${idx}.label`}
                          defaultContent={btn.label}
                          label={`Slide ${currentSlide + 1} Button ${idx + 1}`}
                        />
                      </a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 sm:px-6 lg:px-8 flex justify-between pointer-events-none z-20">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 bg-dark/60 hover:bg-accent text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/15 shadow-lg hover:scale-105 rounded-full"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 bg-dark/60 hover:bg-accent text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/15 shadow-lg hover:scale-105 rounded-full"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators & Controls */}
      <div className="absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Play slider" : "Pause slider"}
          className="text-white/60 hover:text-white transition-colors flex items-center justify-center hover:scale-110 active:scale-95"
          title={isPaused ? "Play slider" : "Pause slider"}
        >
          {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-xl transition-all duration-300",
                idx === currentSlide ? "w-8 bg-accent shadow-sm" : "w-2.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll to Footer Arrow */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-40">
        <ScrollToFooterArrow />
      </div>
    </div>
  );
}

export function QuickActions() {
  const customActions = useContent('home.quickActions.items', QUICK_ACTIONS);

  return (
    <div className="relative -mt-16 sm:-mt-20 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {customActions.map((action: any, idx: number) => {
          const defaultItem = QUICK_ACTIONS.find(q => q.id === action.id) || QUICK_ACTIONS[idx % QUICK_ACTIONS.length];
          const Icon = defaultItem?.icon || ArrowRight;
          const href = action.path || (action.title === 'Request Towing' ? '/towing' 
            : action.title === 'Rent a Car' ? '/rental' 
            : action.title === 'Buy a Car' ? '/sales' 
            : action.title === 'Call for Repairs' ? '/repairs' 
            : action.title === 'Body Works & Spray' ? '/body-works' 
            : action.title === 'Buy Batteries' ? '/parts' 
            : action.title === 'Shop Auto Parts' ? '/parts' 
            : '/services');

          return (
            <motion.div
              key={action.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="relative w-full"
            >
              <Link 
                to={href}
                className="flex flex-col h-full bg-white rounded-[1px] p-4 sm:p-5 lg:p-6 shadow-xl shadow-black/5 border border-gray-100/90 hover:-translate-y-1.5 transition-all duration-300 group hover:shadow-2xl hover:border-accent/30"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-white group-hover:shadow-md group-hover:shadow-accent/30 transition-all duration-300 shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-secondary transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-dark text-sm sm:text-base lg:text-lg mb-1 leading-snug group-hover:text-accent transition-colors">
                  <EditableText
                    storageKey={`home.quickActions.items.${idx}.title`}
                    defaultContent={action.title}
                    label={`Action ${idx + 1} Title`}
                  />
                </h3>
                <div className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3 flex-1">
                  <EditableText
                    as="p"
                    multiline={true}
                    storageKey={`home.quickActions.items.${idx}.description`}
                    defaultContent={action.description}
                    label={`Action ${idx + 1} Description`}
                  />
                </div>
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 mt-auto">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
