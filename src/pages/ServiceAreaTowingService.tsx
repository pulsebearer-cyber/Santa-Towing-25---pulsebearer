import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowRight, Truck, Shield, CalendarClock, Route, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { TOWING_ADVERTS } from '../data/towingAdverts';
import NotFound from './NotFound';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

const STANDARD_SERVICES = {
  'emergency-towing': { title: 'Emergency Towing', icon: Truck, desc: 'Fast, 24/7 response for breakdowns and accidents.' },
  'scheduled-towing': { title: 'Scheduled Towing', icon: CalendarClock, desc: 'Schedule a tow truck for planned car relocation.' },
  'car-recovery': { title: 'Car Recovery', icon: Shield, desc: 'Safe off-road and ditch recovery services.' },
  'vehicle-recovery': { title: 'Car Recovery', icon: Shield, desc: 'Safe off-road and ditch recovery services.' },
  'long-distance-towing': { title: 'Long-Distance Towing', icon: Route, desc: 'Inter-city and cross-regional car transport.' }
};

export default function ServiceAreaTowingService() {
  const { areaSlug, serviceSlug } = useParams();
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  
  const advert = TOWING_ADVERTS.find(
    ad => ad.district.toLowerCase().replace(/ /g, '-') === areaSlug
  );
  
  const service = STANDARD_SERVICES[serviceSlug as keyof typeof STANDARD_SERVICES];

  if (!advert || !service) {
    return <NotFound />;
  }

  const district = advert.district;
  const Icon = service.icon;

  
  const serviceKeys = Object.keys(STANDARD_SERVICES);
  const currentServiceIndex = serviceKeys.indexOf(serviceSlug as string);
  const prevServiceSlug = currentServiceIndex > 0 ? serviceKeys[currentServiceIndex - 1] : null;
  const nextServiceSlug = currentServiceIndex < serviceKeys.length - 1 ? serviceKeys[currentServiceIndex + 1] : null;
return (
    <>
      <SEO 
        title={`${service.title} in ${district} | Santa Towing Towing`} 
        description={`Professional ${service.title.toLowerCase()} services in ${district}. Fast response, 24/7 availability, and safe car handling.`} 
        canonical={`/service-areas/${areaSlug}/${serviceSlug}`}
      />
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <Breadcrumbs items={[
            { label: 'Towing Services', path: '/towing' },
            { label: 'Service Areas', path: '/service-areas' },
            { label: district, path: `/service-areas/${areaSlug}` },
            { label: service.title }
          ]} />
          <div className="mt-4">
            <Link to={`/service-areas/${areaSlug}`} className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-dark transition-colors">
              &larr; Back to {district}
            </Link>
          </div>
          
          <div className="mt-8">
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center shrink-0 mb-6">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-dark mb-4">
              {service.title} in {district}
            </h1>
            <p className="text-lg text-dark/70 max-w-2xl">
              Professional {service.title.toLowerCase()} support across {district} and surrounding locations.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[1px] border border-dark/10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-dark mb-4">Service Overview</h2>
          <p className="text-dark/80 mb-6 leading-relaxed">
            When you need {service.title.toLowerCase()} in {district}, our experienced team at Santa Towing is ready to deploy immediately. We understand the specific routes, traffic conditions, and logistics of operating in {district}, ensuring that your car is transported safely and efficiently.
          </p>
          <p className="text-dark/80 mb-8 leading-relaxed">
            {service.desc} Our tow trucks are fully equipped to handle your requirements, providing peace of mind from pickup to drop-off.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <a href={phoneTel} className="flex items-center justify-center gap-3 bg-primary hover:bg-dark text-white px-6 py-4 font-bold transition-colors w-full rounded-full">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-primary hover:bg-dark text-white px-6 py-4 font-bold transition-colors w-full rounded-full">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-dark/10 pt-12">
          <h3 className="text-xl font-bold text-dark mb-6">Explore Other Services in {district}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(STANDARD_SERVICES).filter(([key]) => key !== serviceSlug).map(([key, srv]) => (
              <Link 
                key={key}
                to={`/service-areas/${areaSlug}/${key}`}
                className="p-4 rounded-[1px] border border-dark/10 hover:border-accent flex items-center justify-between group transition-colors bg-white"
              >
                <span className="font-bold text-dark/80 group-hover:text-accent transition-colors">{srv.title}</span>
                <ArrowRight className="w-4 h-4 text-dark/30 group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
