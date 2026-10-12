import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function EmergencyServicePolicy() {
  const title = useContent('policies.emergencyService.title', 'Emergency Service Policy');
  const subtitle = useContent('policies.emergencyService.subtitle', 'Information on how our urgent towing and roadside assistance services operate.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Guidelines and policies regarding our 24/7 emergency towing and roadside assistance operations." canonical="/emergency-service-policy" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Emergency Service Policy' }]} />
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
              This Emergency Service Policy explains how urgent towing requests are handled at Santa Towing. We consider an emergency or urgent towing request to include situations such as car breakdowns, accident-related towing, cars stranded on the roadside, or cars that cannot safely continue driving. 
            </p>
            <p className="mb-4">
              <strong>Please Note:</strong> Our towing service is strictly an automotive recovery service. We are not an emergency medical, police, or fire response service.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Emergency Towing Availability</h2>
            <p className="mb-4">
              We strive to provide 24/7 emergency towing assistance across our primary service areas. However, stating 24/7 availability means we are operational around the clock, not that immediate service is guaranteed in every situation. Emergency service availability is strictly dependent on:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your exact location</li>
              <li>Towing car and required equipment availability</li>
              <li>Current driver availability and ongoing assignments</li>
              <li>Traffic and road conditions</li>
              <li>Severe weather</li>
              <li>The nature of the car problem</li>
              <li>Overall safety conditions at the scene</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. How to Request Emergency Towing</h2>
            <p className="mb-4">
              Customers can request emergency towing by calling our dispatch line directly. To help us respond as swiftly as possible, please provide the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your full name and phone number</li>
              <li>Your exact location and a nearby landmark</li>
              <li>The car's make, model, and type</li>
              <li>The car's current condition (e.g., stuck, damaged, missing wheels)</li>
              <li>The primary reason for towing (e.g., accident, mechanical failure)</li>
              <li>The intended destination for the car</li>
              <li>Any immediate safety concerns at the scene</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Response Times</h2>
            <p className="mb-4">
              All emergency towing response times provided by our dispatch team are estimates. They are not guaranteed arrival times. Response times may be affected by traffic congestion, the distance to your location, severe weather, difficult road conditions, ongoing emergencies, or the difficulty of accessing the car.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Safety First</h2>
            <p className="mb-4">
              The safety of you, our towing providers, and other road users is our highest priority. While waiting for our arrival, we strongly encourage customers to (where reasonably possible):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Move the car to a safe location out of the flow of traffic.</li>
              <li>Turn on the car's hazard lights.</li>
              <li>Avoid standing in dangerous traffic areas; move to a safe barrier or sidewalk.</li>
              <li>Inform our dispatch team if the roadside conditions are immediately dangerous.</li>
              <li>Follow all reasonable safety instructions provided by our team or local authorities.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Roadside and Accident Situations</h2>
            <p className="mb-4">
              Emergency requests involving major accidents or dangerous roadside conditions may require additional on-site assessment. Where police, emergency responders, or other authorities are involved, customers must follow their instructions before the car can be safely cleared and moved. We do not have authority over accident scenes or law-enforcement matters.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Unsafe Locations or Conditions</h2>
            <p className="mb-4">
              Our towing providers may delay, modify, or decline an emergency towing request if the conditions are deemed too unsafe to operate. Such conditions may include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Extremely heavy or fast-moving traffic without police presence</li>
              <li>Flooding, fires, or hazardous materials present at the scene</li>
              <li>Unstable terrain, steep drops, or deep mud</li>
              <li>Severe weather systems</li>
              <li>Situations requiring specialized emergency response equipment that we do not carry</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Car Information</h2>
            <p className="mb-4">
              Accurate car information is critical in an emergency. Customers must accurately state the car's size, whether it can start, roll, or steer, whether the wheels are damaged, if the car is stuck, or if it has been involved in a collision. Inaccurate information may cause significant delays or require a different type of tow truck to be dispatched.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Emergency Towing Charges</h2>
            <p className="mb-4">
              Emergency towing charges are determined according to our standard pricing structure. Charges will depend on factors such as distance, car type, location, time of day (e.g., after-hours service), waiting time, special equipment requirements, and recovery difficulty. For more detailed information, please refer to our <Link to="/pricing-payment-policy" className="text-primary font-bold hover:underline">Pricing & Payment Policy</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Cancellation of Emergency Requests</h2>
            <p className="mb-4">
              If your situation changes and you no longer require emergency towing, please call us immediately to cancel the request. Please be aware that cancellation charges may apply if a towing provider has already been dispatched, is actively travelling to your location, or has already arrived. Refer to our <Link to="/cancellation-refund-policy" className="text-primary font-bold hover:underline">Cancellation & Refund Policy</Link> for detailed rules.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Services Outside Standard Areas</h2>
            <p className="mb-4">
              Emergency towing requests located outside our standard operating zones may be subject to driver availability, significantly longer travel times, and additional travel charges. Please refer to our <Link to="/service-area-policy" className="text-primary font-bold hover:underline">Service Area Policy</Link> for comprehensive coverage information.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Third-Party Towing Providers</h2>
            <p className="mb-4">
              To ensure the fastest possible response in an emergency, Santa Towing may utilize independent towing drivers, partners, or affiliated service providers to reach your location. These independent providers are directly responsible for the safe physical execution of the service.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. What This Service Does Not Cover</h2>
            <p className="mb-4">
              Our automotive towing assistance does not replace official emergency services. We do not provide services typically rendered by:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The Police Service</li>
              <li>The Fire Service</li>
              <li>Ambulance or Medical Response Services</li>
              <li>Other national emergency authorities</li>
            </ul>
            <p className="mb-4">
              For situations involving immediate danger to life, serious injury, fires, or other emergencies requiring specialized response, you must contact the appropriate emergency authorities immediately.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Limitation of Responsibility</h2>
            <p className="mb-4">
              To the maximum extent permitted under Ghanaian law, Santa Towing shall not be liable for direct, indirect, incidental, or consequential damages resulting from delays in emergency response, failed service, or circumstances outside our reasonable control. This does not attempt to exclude responsibilities that cannot legally be excluded.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Complaints and Service Issues</h2>
            <p className="mb-4">
              We take the quality of our emergency services seriously. If you have concerns regarding delays, pricing disputes, communication problems, service quality, or car handling, please contact our support team so we can review the matter.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">16. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Emergency Service Policy when service procedures, partnerships, or operational conditions change. The latest version will always be published on this website for your review.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">17. Contact Information</h2>
            <p className="mb-4">
              For emergency towing enquiries or if you have questions regarding this policy, please contact us:
            </p>
            
            <div className="bg-slate-50 p-6 rounded-[1px] mt-6 border border-dark/10 flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Emergency Phone</h4>
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
