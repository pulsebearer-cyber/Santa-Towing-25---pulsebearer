import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function ServiceAreaPolicy() {
  const title = useContent('policies.serviceAreaPolicy.title', 'Service Area Policy');
  const subtitle = useContent('policies.serviceAreaPolicy.subtitle', 'Information about our service coverage, towing availability, and operating locations.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Details on our geographic coverage, response times, and out-of-boundary service terms for towing." canonical="/service-area-policy" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Service Area Policy' }]} />
            <h1 className="text-3xl md:text-5xl font-bold text-dark mb-4">{title}</h1>
            <p className="text-lg text-dark/70">
              {subtitle}
            </p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[1px] shadow-sm border border-dark/10">
          <div className="prose prose-slate max-w-none text-dark/80">
            <p className="text-sm text-dark/50 mb-8 font-bold">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">1. Introduction</h2>
            <p className="mb-4">
              The purpose of this Service Area Policy is to clearly explain where our towing services are available, how service coverage works, and what you should expect when requesting assistance. Please note that towing availability depends on various factors, including your specific location, current driver availability, equipment availability, road conditions, and other operational factors.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Primary Service Areas</h2>
            <p className="mb-4">
              We provide professional car towing and recovery services primarily across Greater Accra and extending to select nearby municipal areas and inter-regional routes. Our core operating areas include:
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Greater Accra Coverage</h2>
            <p className="mb-4">
              We provide towing services across a wide range of locations within and around Greater Accra. While we cover many areas, we do not claim immediate complete coverage of every single location without prior confirmation. Our currently advertised local service areas include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              <ul className="list-disc pl-6 space-y-1 m-0">
                <li>Tema</li>
                <li>Ashaiman</li>
                <li>Spintex</li>
                <li>Adenta</li>
                <li>Achimota</li>
                <li>Pokuase</li>
                <li>Airport Residential</li>
              </ul>
              <ul className="list-disc pl-6 space-y-1 m-0">
                <li>Ningo-Prampram</li>
                <li>Korle Klottey</li>
                <li>Ayawaso</li>
                <li>Weija-Gbawe</li>
                <li>Madina</li>
                <li>Dodowa</li>
                <li>Amasaman</li>
              </ul>
              <ul className="list-disc pl-6 space-y-1 m-0">
                <li>Circle</li>
                <li>Nima</li>
                <li>Teshi</li>
                <li>Labadi</li>
                <li>Lakeside</li>
                <li>Burma Camp</li>
                <li>Nsawam & Suhum</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Services Outside Greater Accra</h2>
            <p className="mb-4">
              For customers requiring car transportation or long-distance towing outside Greater Accra, we also support specific inter-regional routes. Our currently offered long-distance towing routes include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Accra to Kumasi / Kumasi to Accra</li>
              <li>Accra to Cape Coast / Cape Coast to Accra</li>
              <li>Accra to Takoradi / Takoradi to Accra</li>
              <li>Accra to Koforidua / Koforidua to Accra</li>
              <li>Accra to Ho / Ho to Accra</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Service Availability by Location</h2>
            <p className="mb-4">
              Being physically located within one of our listed service areas does not necessarily guarantee that a tow truck will be immediately available. Service availability is dynamic and depends heavily on:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Current driver and personnel availability in your sector</li>
              <li>Towing car availability and current deployment</li>
              <li>Your car type and the required towing equipment</li>
              <li>The distance to your pickup location</li>
              <li>Traffic and severe weather conditions</li>
              <li>Road conditions and accessibility</li>
              <li>The time of your request</li>
              <li>The nature and complexity of the towing or recovery situation</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Response Times</h2>
            <p className="mb-4">
              Estimated response times vary significantly by location. Customers in remote areas, locations outside our primary operating zones, or areas experiencing heavy traffic may experience longer wait times. We do not promise a specific or guaranteed response time unless one is officially established at the time of your booking.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Additional Travel Charges</h2>
            <p className="mb-4">
              When a customer requests a service outside the standard local service area or requires unusually long-distance towing, additional travel or distance-related charges will apply. For more information on how towing charges are calculated, please refer to our <Link to="/pricing-payment-policy" className="text-primary font-bold hover:underline">Pricing & Payment Policy</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Location Accuracy</h2>
            <p className="mb-4">
              To ensure prompt service, customers must provide highly accurate pickup and destination information when requesting towing. Please provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your exact location or GPS coordinates if possible</li>
              <li>A nearby well-known landmark</li>
              <li>The specific road or street name</li>
              <li>The car's exact position (e.g., in a ditch, middle of the road, underground parking)</li>
              <li>The intended destination</li>
              <li>Any relevant access information or restrictions</li>
            </ul>
            <p className="mb-4">
              Inaccurate location information may cause significant delays, dispatching to the wrong area, or additional travel charges.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Difficult-to-Reach Locations</h2>
            <p className="mb-4">
              Towing services may be heavily affected, delayed, or declined if your car is in a difficult or restricted-access location. These locations include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Extremely narrow roads or tight alleyways</li>
              <li>Unpaved, muddy, or flooded areas</li>
              <li>Steep terrain or off-road conditions</li>
              <li>Restricted-access locations (e.g., secure private properties, low-clearance garages)</li>
              <li>Active and dangerous accident scenes</li>
              <li>Unsafe roadside locations with fast-moving traffic</li>
            </ul>
            <p className="mb-4">
              Our towing providers may require additional specialized equipment or may decline a request entirely where the location cannot be accessed safely.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Service Area Changes</h2>
            <p className="mb-4">
              Our service areas may change over time as our business expands, operations adjust, or driver availability shifts. This Service Area Policy and the service locations currently listed on our website should be treated as the latest published information regarding our coverage.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Service Requests Outside the Listed Areas</h2>
            <p className="mb-4">
              If you require towing from an area that is not currently listed on our website, we encourage you to contact us directly. We will review the request to determine if a special arrangement can be made. Please note that any service provided outside our listed areas is strictly subject to availability and will likely involve additional travel charges.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Emergency and 24/7 Service Areas</h2>
            <p className="mb-4">
              We offer emergency and 24/7 towing services; however, emergency availability varies strictly by location. We do not imply that every single location within our service list receives guaranteed, immediate 24/7 service. Availability after standard business hours is subject to driver deployment and safety conditions.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Third-Party or Partner Coverage</h2>
            <p className="mb-4">
              To provide expansive coverage across Greater Accra and our inter-regional routes, Santa Towing may utilize independent towing drivers, affiliated providers, or partner networks to cover certain areas. We do not claim to directly operate every car or directly employ every driver across all listed service areas unless factually accurate for that specific deployment.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Contacting the Business</h2>
            <p className="mb-4">
              If you want to confirm whether towing is available at your current location, please contact our dispatch team. When making an enquiry, be sure to provide your pickup location, the car type, the car's condition, and your intended destination so we can assist you quickly.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Service Area Policy from time to time as our service coverage and operational capacities change. The most recent version of this policy will always be published on this page.
            </p>

            <div className="bg-slate-50 p-6 rounded-[1px] mt-6 border border-dark/10 flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Phone</h4>
                  <a href={phoneTel} className="text-dark/70 hover:text-accent transition-colors">{phoneFormatted}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">WhatsApp Support</h4>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-dark/70 hover:text-accent transition-colors">Chat on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
