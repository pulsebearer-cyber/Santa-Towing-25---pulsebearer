import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function TowingServiceTerms() {
  const title = useContent('policies.towingTerms.title', 'Towing Service Terms');
  const subtitle = useContent('policies.towingTerms.subtitle', 'Please review the specific terms governing our towing and recovery services.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Read the specific terms, conditions, and liabilities related to our emergency towing and car recovery services." canonical="/towing-service-terms" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Towing Service Terms' }]} />
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

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">1. About the Towing Service</h2>
            <p className="mb-4">
              Our towing service provides professional car transportation and recovery assistance for customers experiencing breakdowns, accidents, or other automotive emergencies. We offer various types of towing assistance, including flatbed towing, emergency roadside recovery, and scheduled transport for different car types.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Requesting a Towing Service</h2>
            <p className="mb-4">
              When requesting a towing service, you should provide accurate information to help us dispatch the appropriate car and equipment. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your full name and phone number.</li>
              <li>Your current exact location.</li>
              <li>The car's make, model, and type.</li>
              <li>The car's current condition (e.g., whether it has keys, missing wheels, or steering issues).</li>
              <li>The primary reason for towing (e.g., accident, mechanical failure).</li>
              <li>Your intended destination.</li>
              <li>Any special requirements or known access restrictions.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Service Availability</h2>
            <p className="mb-4">
              Submitting a request for towing does not automatically guarantee immediate service. Our ability to respond is subject to availability and may depend on:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your specific location.</li>
              <li>Driver and tow truck availability.</li>
              <li>The specific towing equipment required.</li>
              <li>Traffic and road conditions.</li>
              <li>Severe weather.</li>
              <li>The type and condition of your car.</li>
              <li>Other operational circumstances.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Towing Charges</h2>
            <p className="mb-4">
              Towing charges may vary depending on the specifics of your request. Factors that influence pricing include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The total distance of the tow.</li>
              <li>The car's type and size.</li>
              <li>The pickup and drop-off locations.</li>
              <li>The time of service (e.g., late-night or holiday requests).</li>
              <li>Waiting time upon arrival.</li>
              <li>The need for special equipment.</li>
              <li>Difficult recovery conditions (e.g., cars stuck in mud, ditches, or tight spaces).</li>
              <li>Any additional services requested.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Customer Responsibilities</h2>
            <p className="mb-4">
              To ensure a safe and efficient service, customers must:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Provide accurate and complete information during the booking process.</li>
              <li>Provide safe and reasonable access to the car where possible.</li>
              <li>Inform the towing provider of any known car problems or hazards.</li>
              <li>Follow all reasonable instructions from the towing provider regarding safety at the scene.</li>
              <li>Disclose any special circumstances that may affect the towing process.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Car Condition</h2>
            <p className="mb-4">
              You must accurately describe the car's condition when requesting service, including whether it can start, steer, brake, roll, or move freely. Inaccurate information may result in delays or additional equipment being required, which could affect the final cost or our ability to complete the tow.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Personal Belongings</h2>
            <p className="mb-4">
              We strongly advise all customers to remove valuable and personal belongings from their cars before towing whenever reasonably possible. Santa Towing and its providers are not responsible for the loss or damage of unsecured personal belongings left inside the car, except where responsibility is strictly imposed by applicable law.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Car Damage and Pre-Existing Damage</h2>
            <p className="mb-4">
              Cars requiring towing often have pre-existing damage or mechanical problems. While we take professional care during the recovery and transport process, we are not responsible for pre-existing damage, mechanical failures unrelated to the tow, or issues arising from the car's existing poor condition. Any concerns regarding handling should be raised with the provider immediately.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Difficult or Unsafe Towing Conditions</h2>
            <p className="mb-4">
              Additional arrangements or specialized equipment may be required for cars that are:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Severely damaged or structurally compromised.</li>
              <li>Stuck in mud, sand, or water.</li>
              <li>Involved in a major accident.</li>
              <li>Located in difficult terrain or off-road.</li>
              <li>Unable to roll or steer.</li>
              <li>Carrying unusual or heavy loads.</li>
              <li>In an unsafe, restricted, or hazardous location.</li>
            </ul>
            <p className="mb-4">
              The towing provider reserves the right to decline or postpone a job where attempting the tow would create an unreasonable safety risk to personnel, equipment, or the public.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Waiting Time</h2>
            <p className="mb-4">
              Service delays may incur waiting time charges, particularly when the towing provider has arrived at the designated location but the car or customer is not ready for the service to commence.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Cancellation</h2>
            <p className="mb-4">
              You may cancel a towing request by contacting us immediately. Please note that charges may apply in certain circumstances, such as when a towing provider has already been dispatched or has arrived at your location prior to the cancellation.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Service Delays</h2>
            <p className="mb-4">
              We aim to provide prompt service; however, estimated arrival times are not guaranteed. Response times may be affected by traffic, severe weather, road conditions, ongoing emergencies, car availability, and other circumstances beyond our reasonable control.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Emergency and 24/7 Towing</h2>
            <p className="mb-4">
              Emergency requests and 24/7 towing services are handled with priority, subject to driver, equipment, location, and safety availability. We will communicate the earliest possible arrival time, but we cannot guarantee an immediate response under all operational conditions.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Towing Provider Relationship</h2>
            <p className="mb-4">
              Santa Towing may connect you with independent towing drivers or affiliated towing providers to fulfill your service request. In such instances, the independent provider is directly responsible for the execution of the tow and adherence to safety standards.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Payment</h2>
            <p className="mb-4">
              Customers are responsible for paying all applicable towing charges according to the agreed pricing terms prior to or upon completion of the service.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">16. Prohibited or Unsafe Requests</h2>
            <p className="mb-4">
              The towing provider reserves the right to refuse requests involving unlawful activities, unsafe conditions, hazardous situations, or circumstances where the requested service cannot reasonably be performed safely or legally.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">17. Complaints and Disputes</h2>
            <p className="mb-4">
              If you have any concerns regarding a towing service, billing, delays, car condition, or other service issues, please contact our support team promptly so we can investigate and address the matter.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">18. Changes to These Towing Service Terms</h2>
            <p className="mb-4">
              We may update these Towing Service Terms from time to time to reflect operational changes or legal requirements. When changes are made, the latest version will be published on our website, and your continued use of our services constitutes acceptance of these updates.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">19. Contact Information</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding these Towing Service Terms, please contact us:
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
