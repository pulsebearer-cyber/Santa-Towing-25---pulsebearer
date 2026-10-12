import React, { useState, useRef, useEffect } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  X, ChevronLeft, ChevronRight, Play, Camera, 
  MapPin, CheckCircle2, Phone, ArrowRight, Instagram
} from 'lucide-react';
import ScrollToFooterArrow from '@/components/ui/ScrollToFooterArrow';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';
import { useInventoryGallery } from '@/hooks/useInventory';

const CATEGORIES = [
  'All', 'Towing Fleet', 'Workshop', 'Body Works', 'Rental Fleet', 'Car Sales', 'Team & Facilities'
];

const GALLERY_IMAGES = [
  { id: 1, category: 'Workshop', url: 'https://i.ibb.co/KcZkH37Y/Image-3-Sedan-Toyotta-Corolla.jpg', title: 'State-of-the-art diagnostic bay', span: 'col-span-1 row-span-2' },
  { id: 2, category: 'Towing Fleet', url: 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg', title: 'Heavy-duty recovery car', span: 'col-span-2 row-span-1' },
  { id: 3, category: 'Team & Facilities', url: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg', title: 'Our expert mechanics', span: 'col-span-1 row-span-1' },
  { id: 4, category: 'Car Sales', url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', title: 'Premium pre-owned inventory', span: 'col-span-1 row-span-1' },
  { id: 5, category: 'Rental Fleet', url: 'https://i.ibb.co/zVkLKHdN/Image-2-A-SUV-KIA-Sportage-2024-Ratio.png', title: 'Luxury SUV rentals', span: 'col-span-1 row-span-2' },
  { id: 6, category: 'Body Works', url: 'https://i.ibb.co/Mx8G6vHw/Image-5-Economy-Nissan-Almera-2021.jpg', title: 'Custom paint job', span: 'col-span-2 row-span-2' },
  { id: 7, category: 'Workshop', url: 'https://i.ibb.co/DH19ffJd/Image-6-Luxury-Mercedes-Benz.jpg', title: 'Engine overhaul in progress', span: 'col-span-1 row-span-1' },
  { id: 8, category: 'Towing Fleet', url: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg', title: 'City-wide flatbed towing', span: 'col-span-1 row-span-1' },
];

const VIDEOS = [
  { id: 1, title: 'Inside Our Advanced Workshop', thumb: 'https://i.ibb.co/WpNkptMZ/Image-4-Van-Hyundai-H1-2022.jpg', duration: '2:45' },
  { id: 2, title: 'Emergency Towing Operation', thumb: 'https://i.ibb.co/gZh5x06r/Image-1-Towing-Vehicle.jpg', duration: '1:30' },
  { id: 3, title: 'Body Works Transformation', thumb: 'https://i.ibb.co/vC6nfrK8/Image-7-Pickup-Toyota-Hilux-2023.jpg', duration: '3:10' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { galleryItems } = useInventoryGallery();
  const filteredImages = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(img => img.category === activeCategory);

  const handleSliderMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    let clientX = 0;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent | MouseEvent).clientX;
    }
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleSliderMove(e);
    const handleTouchMove = (e: TouchEvent) => handleSliderMove(e);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const seoTitle = useContent('seo.gallery.title', 'Our Work Gallery | Towing & Auto Repairs | Santa Towing');
  const seoDesc = useContent('seo.gallery.description', 'View our gallery showcasing successful car recoveries, auto body restorations, repair works, and our premium rental fleet.');
  const galleryDesc = useContent('gallery.description', 'A visual look at our towing fleet, workshop facilities, car inventory, and completed repairs. Quality you can see.');
  const heroImage = useContent('gallery.heroImage', 'https://i.ibb.co/0RDWpXBh/Image-8-Heavy-Duty-Recovery-Vehicle-or-Car.jpg');
  const beforeImage = useContent('gallery.beforeImage', 'https://i.ibb.co/1YFx5jQV/Image-10-Engine-Oil-and-Fluids-Maintenance.jpg');
  const afterImage = useContent('gallery.afterImage', 'https://i.ibb.co/j9GzSqt8/Image-9-Car-Battery-Maintenance.jpg');
  const instagramUrl = useContent('global.social.instagram', 'https://instagram.com/santatowing');

  return (
    <main className="pt-24 lg:pt-[104px] min-h-screen bg-white">
      <SEO title={seoTitle} description={seoDesc} canonical="/gallery" />
      
      {/* 1. Hero Banner */}
      <section className="relative bg-primary text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />
          <img 
            src={heroImage} 
            alt="Automotive Gallery" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            See Our Work <span className="text-accent">in Action</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8 mx-auto md:mx-0"
          >
            {galleryDesc}
          </motion.p>
        </div>
      
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 ">
          <ScrollToFooterArrow />
        </div>
      </section>

      {/* 2. Category Filter */}
      <section className="pt-12 pb-8 sticky top-[72px] lg:top-[104px] z-30 bg-white/95 backdrop-blur-sm border-b border-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Media Gallery' }]} variant="light" />
          </div>
          <div className="flex overflow-x-auto no-scrollbar py-2 gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2.5 rounded-md text-sm font-bold whitespace-nowrap transition-all",
                  activeCategory === category 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white border border-dark/20 text-dark/70 hover:border-accent hover:text-accent"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Masonry/Grid Gallery */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            <AnimatePresence>
              {filteredImages.map((image, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={image.id}
                  className={cn("relative group rounded-xl overflow-hidden cursor-pointer", image.span)}
                  onClick={() => openLightbox(idx)}
                >
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 self-start mb-2 rounded-full">
                      {image.category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight flex items-center justify-between">
                      {image.title}
                      <Camera className="w-5 h-5 opacity-70" />
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 rounded-xl p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button 
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-accent rounded-xl p-3 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="max-w-5xl max-h-[80vh] relative">
              <img 
                src={filteredImages[lightboxIndex].url} 
                alt={filteredImages[lightboxIndex].title} 
                className="max-w-full max-h-[80vh] object-contain rounded-[1px] shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/90 to-transparent rounded-b-[1px] text-center">
                <span className="text-accent font-bold text-sm uppercase tracking-wider block mb-1">
                  {filteredImages[lightboxIndex].category}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-bold">
                  {filteredImages[lightboxIndex].title}
                </h3>
              </div>
            </div>

            <button 
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-accent rounded-xl p-3 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Before & After Slider */}
      <section className="py-12 md:py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-12">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Body Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformations</h2>
            <p className="text-white/80 max-w-2xl mx-auto">Slide to see the incredible results our expert body repair and painting team achieves.</p>
          </div>
          
          <div 
            ref={sliderRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[1px] overflow-hidden cursor-ew-resize select-none touch-none shadow-2xl"
            onMouseDown={(e) => { setIsDragging(true); handleSliderMove(e); }}
            onTouchStart={(e) => { setIsDragging(true); handleSliderMove(e); }}
          >
            {/* After Image (Background) */}
            <img 
              src={afterImage} 
              alt="After repair" 
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Before Image (Foreground, clipped) */}
            <div 
              className="absolute inset-0 z-10 overflow-hidden border-r-2 border-white"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={beforeImage} 
                alt="Before repair" 
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: '100%', maxWidth: 'none' }} // Negate the parent's dynamic width
                draggable="false"
              />
              <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-[1px] shadow-lg">
                Before
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-[1px] shadow-lg z-20">
              After
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center -ml-4 w-8"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center border border-dark/20">
                <div className="flex gap-0.5 text-dark">
                  <ChevronLeft className="w-3 h-3" />
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Video Highlights */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Video Highlights</h2>
              <p className="text-dark/70 max-w-2xl">Take a closer look at our operations, from the workshop floor to emergency roadside assistance.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {VIDEOS.map((video) => (
              <div key={video.id} className="group relative rounded-[1px] overflow-hidden aspect-video bg-white cursor-pointer shadow-sm hover:shadow-xl transition-all border border-dark/10">
                <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm text-primary rounded-xl flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 ml-1 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="font-bold text-white text-lg drop-shadow-md leading-tight max-w-[70%]">{video.title}</h3>
                  <span className="bg-primary/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 flex items-center gap-1 rounded-full">
                    <Play className="w-3 h-3" /> {video.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Instagram Feed Integration */}
      <section className="py-12 md:py-20 bg-white border-t border-dark/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <Instagram className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Follow Us on Instagram</h2>
            <p className="text-dark/70 mb-6 max-w-lg mx-auto">Stay updated with our latest projects, behind-the-scenes looks, and daily automotive content.</p>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-accent hover:text-accent transition-colors">
              @santatowing <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square bg-white rounded-[1px] overflow-hidden relative group">
                <img 
                  src={`https://i.ibb.co/JRyRmbjF/Image-11-Brake-Parts-and-Disk-Maintenance.jpg`} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call-to-Action Banner */}
      <section className="py-12 md:py-20 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Service Firsthand?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Our visual gallery is just a glimpse of what we do. Call for service today and see our dedication to quality for yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-primary hover:bg-black text-white px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg inline-block rounded-full">
              Book a Service
            </Link>
            <Link to="/contact" className="bg-white hover:bg-dark/5 text-dark px-4 sm:px-8 py-4 font-bold transition-all shadow-xl text-lg flex items-center gap-2 rounded-full">
              <Phone className="w-5 h-5" /> Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
