import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function Disclaimer() {
  const seoTitle = useContent('seo.disclaimer.title', 'Disclaimer | Santa Towing');
  const seoDesc = useContent('seo.disclaimer.description', 'Read our website disclaimer regarding automotive advice, service limitations, and third-party links.');
  const title = useContent('policies.disclaimer.title', 'Disclaimer');
  const subtitle = useContent('policies.disclaimer.subtitle', 'Important information regarding the limitations of our website and services.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={seoTitle} description={seoDesc} canonical="/disclaimer" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: title }]} />
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

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">1. General Information</h2>
            <p className="mb-4">
              The information provided on this website is intended for general informational purposes only. It may include information about our towing services, service areas, cars, pricing, availability, contact information, and related automotive services. While we make reasonable efforts to keep the information accurate and up to date, the information may change at any time without prior notice.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Towing Service Availability</h2>
            <p className="mb-4">
              Displaying a towing service, service area, advert, or contact option on this website does not guarantee that a towing car, driver, equipment, or service will be immediately available. Service availability depends on numerous factors, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your specific location</li>
              <li>Driver and personnel availability</li>
              <li>The required car type and equipment availability</li>
              <li>Traffic and road conditions</li>
              <li>Severe weather</li>
              <li>The time of the request</li>
              <li>Other operational circumstances</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Response Times</h2>
            <p className="mb-4">
              While we may promote emergency or 24/7 towing assistance, stating 24/7 availability does not constitute a guaranteed arrival time. Response times naturally vary depending on your location, traffic, weather conditions, local emergencies, road conditions, and driver availability. We do not promise a specific response time unless expressly guaranteed at the time of booking.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Pricing Information</h2>
            <p className="mb-4">
              Prices displayed or communicated through the website are typically estimates and may be subject to change depending on the actual requirements of the towing job. Final charges depend on factors such as distance, car type, car condition, waiting time, special equipment needs, recovery difficulty, and any additional services. Please refer to our <strong>Pricing & Payment Policy</strong> for more detailed information.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Car Information</h2>
            <p className="mb-4">
              Information provided by customers about their cars must be accurate. If the actual condition of a car differs from what was initially reported, we or our towing providers may require additional information, specialized equipment, or alternative arrangements after assessing the car in person.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Car Damage and Pre-Existing Conditions</h2>
            <p className="mb-4">
              Cars requiring towing frequently have existing mechanical, structural, accident-related, or cosmetic damage prior to our arrival. The contents of this website should not be interpreted as a guarantee that a car will remain completely free from damage during every towing or recovery situation, particularly in difficult recovery scenarios. However, this does not exclude our responsibility for negligence or other responsibilities that cannot be legally excluded.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Third-Party Towing Providers</h2>
            <p className="mb-4">
              Where our website connects you with independent towing drivers or affiliated service providers to execute your request, it is the independent provider who is responsible for carrying out the physical towing operation. We do not claim to directly employ all towing providers or own all towing cars operating under our network unless factually accurate for a specific dispatch.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Third-Party Websites and Services</h2>
            <p className="mb-4">
              Our website may contain links or connections to third-party services, including WhatsApp, Google Maps (or other mapping services), payment platforms, social media platforms, and external websites. These third-party services operate independently and are governed by their own terms and privacy policies. Santa Towing assumes no responsibility for their content, accuracy, or functionality.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Emergency Situations</h2>
            <p className="mb-4">
              Our website and services should never be treated as a replacement for official emergency authorities or emergency response services in situations where there is immediate danger to life, health, or public safety. We encourage users to contact the appropriate emergency authorities (such as the police, fire service, or ambulance) when necessary.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Website Accuracy and Availability</h2>
            <p className="mb-4">
              While we make reasonable efforts to correct errors and maintain the website, we do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The website will always be available or uninterrupted.</li>
              <li>All information provided will always be error-free or fully updated.</li>
              <li>All images or descriptions will exactly represent the current service or fleet.</li>
              <li>Every link or third-party integration will always function without issue.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. User-Submitted Information</h2>
            <p className="mb-4">
              Customers are entirely responsible for the accuracy of any information they submit through our website forms, phone calls, WhatsApp messages, towing requests, or other communication channels.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. No Unauthorised Guarantees</h2>
            <p className="mb-4">
              Information found on this website should not be interpreted as creating guarantees, warranties, or promises beyond those that are expressly agreed upon in writing between the customer and Santa Towing or the assigned towing provider.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Limitation of Responsibility</h2>
            <p className="mb-4">
              To the maximum extent permitted by applicable Ghanaian law, Santa Towing shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from circumstances outside our reasonable control. This includes delays, service failures, or issues arising from reliance on website information. This limitation does not attempt to remove responsibilities that cannot be legally excluded under Ghanaian law.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Changes to the Disclaimer</h2>
            <p className="mb-4">
              We may update this Disclaimer from time to time as necessary to reflect operational changes or legal requirements. The latest version will always be published on our website, and continued use of the website implies acceptance of these updates.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Contact Information</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Disclaimer or any information published on the website, please contact us:
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
