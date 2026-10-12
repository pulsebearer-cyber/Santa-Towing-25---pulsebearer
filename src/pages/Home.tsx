import React from 'react';
import { HeroSlider, QuickActions } from '@/components/sections/HeroAndActions';
import { AboutSection, ServicesSection } from '@/components/sections/AboutAndServices';
import { HaulageHomeSection } from '@/components/sections/HaulageSection';
import { FeaturedCars, RentalFleet } from '@/components/sections/CarsAndRentals';
import { AutoParts, WhyChooseUs } from '@/components/sections/PartsAndWhyUs';
import { FAQ, BlogSection } from '@/components/sections/BottomSections';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function Home() {
  const seoTitle = useContent('seo.home.title', 'Santa Towing | 24/7 Towing, Haulage, Repairs & Rentals in Ghana');
  const seoDescription = useContent('seo.home.description', 'Expert 24/7 emergency towing, nationwide haulage & heavy machinery transport, professional auto repairs, car sales, and premium car rentals in Ghana.');

  return (
    <main>
      <SEO title={seoTitle} description={seoDescription} canonical="/" />
      <HeroSlider />
      <QuickActions />
      <AboutSection />
      <ServicesSection />
      <HaulageHomeSection />
      <FeaturedCars />
      <RentalFleet />
      <AutoParts />
      <WhyChooseUs />
      <BlogSection />
      <FAQ />
    </main>
  );
}
