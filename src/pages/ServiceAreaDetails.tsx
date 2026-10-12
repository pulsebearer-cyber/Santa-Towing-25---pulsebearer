import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ChevronRight, ArrowRight, Truck, Shield, CalendarClock, Route } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { TOWING_ADVERTS } from '../data/towingAdverts';
import NotFound from './NotFound';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

const STANDARD_SERVICES = [
  { id: 'emergency-towing', title: 'Emergency Towing', icon: Truck, desc: 'Fast, 24/7 response for breakdowns and accidents.' },
  { id: 'scheduled-towing', title: 'Scheduled Towing', icon: CalendarClock, desc: 'Schedule a tow truck for planned car relocation.' },
  { id: 'car-recovery', title: 'Car Recovery', icon: Shield, desc: 'Safe off-road and ditch recovery services.' },
  { id: 'long-distance-towing', title: 'Long-Distance Towing', icon: Route, desc: 'Inter-city and cross-regional car transport.' }
];

export default function ServiceAreaDetails() {
  const { areaSlug } = useParams();
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  
  const advert = TOWING_ADVERTS.find(
    ad => ad.district.toLowerCase().replace(/ /g, '-') === areaSlug
  );

  if (!advert) {
    return <NotFound />;
  }

  const district = advert.district;

  
  const currentIndex = TOWING_ADVERTS.findIndex(
    ad => ad.district.toLowerCase().replace(/ /g, '-') === areaSlug
  );
  const prevAdvert = currentIndex > 0 ? TOWING_ADVERTS[currentIndex - 1] : null;
  const nextAdvert = currentIndex < TOWING_ADVERTS.length - 1 ? TOWING_ADVERTS[currentIndex + 1] : null;
return (
    <>
      <SEO 
        title={`24/7 Emergency Towing in ${district} | Santa Towing`}
        description={`Need reliable car towing in ${district}? Santa Towing provides professional 24/7 emergency towing, accident recovery, and roadside assistance in ${district} and surrounding areas.`}
        canonical={`/service-areas/${areaSlug}`}
      />
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12">
          <Breadcrumbs items={[
            { label: 'Towing Services', path: '/towing' },
            { label: 'Service Areas', path: '/service-areas' },
            { label: district }
          ]} />
          <div className="mt-4">
            <Link to="/service-areas" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-dark transition-colors">
              &larr; Back to Service Areas
            </Link>
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl md:text-5xl font-bold text-dark mb-6">
              Towing Services in {district}
            </h1>
            <div className="bg-white p-6 sm:p-8 rounded-[1px] border border-dark/10 shadow-sm mb-12">
              <div className="prose prose-slate max-w-none text-dark/80 whitespace-pre-wrap">
                {advert.description}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={phoneTel} className="bg-primary hover:bg-dark text-white px-4 sm:px-8 py-3 font-bold transition-colors text-center inline-block rounded-full">
                  Call Now: {phoneFormatted}
                </a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-dark text-white px-4 sm:px-8 py-3 font-bold transition-colors text-center inline-block rounded-full">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
          Available Services in {district}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-16">
          {STANDARD_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                key={service.id}
                to={`/service-areas/${areaSlug}/${service.id}`}
                className="bg-white p-6 rounded-[1px] border border-dark/10 hover:border-accent hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                  <Icon className="w-6 h-6 text-white group-hover:text-secondary transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-dark/70 mb-4">{service.desc}</p>
                  <span className="text-accent font-bold text-sm flex items-center gap-1">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
    </>
  );
}
