import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function TermsConditions() {
  const title = useContent('policies.terms.title', 'Terms & Conditions');
  const subtitle = useContent('policies.terms.subtitle', 'Please read these terms carefully before using our services.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Review the general terms and conditions for using Santa Towing and our website." canonical="/terms-conditions" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />
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
              Welcome to Santa Towing. By accessing or using our website and requesting our towing or automotive services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Use of the Website</h2>
            <p className="mb-4">
              You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website. You must provide accurate information when making enquiries or booking services. Prohibited uses include using the website for fraudulent, unlawful, abusive, or misleading purposes.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Towing Service Requests</h2>
            <p className="mb-4">
              Submitting a towing request or contacting us does not automatically guarantee immediate service availability. Our ability to provide service may depend on various factors including your location, the condition of your car, the specific towing equipment required, driver availability, traffic conditions, weather, and other unforeseen circumstances.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Customer Responsibilities</h2>
            <p className="mb-4">
              When requesting towing or roadside assistance, you are responsible for providing accurate and complete information about:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your exact location.</li>
              <li>The type, make, and model of your car.</li>
              <li>The current condition of the car (e.g., whether it rolls, steers, or has missing wheels).</li>
              <li>The intended destination for the tow.</li>
              <li>Accurate contact information so our drivers can reach you.</li>
              <li>Any special towing requirements or potential access issues at the pickup or drop-off location.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Pricing and Payment</h2>
            <p className="mb-4">
              Towing charges are determined based on several factors, which may include the total distance of the tow, the type and size of the car, the location of the pickup and drop-off, the time of day, waiting times at the scene, and whether special equipment is required to safely move the car. Final pricing will be communicated to you prior to the service, and payment must be made as agreed.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Cancellations</h2>
            <p className="mb-4">
              If you need to cancel a requested service, please notify us immediately. Depending on the time elapsed and whether a dispatch team is already en route or has arrived at your location, a cancellation fee or service charge may apply to cover our dispatched costs.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Car and Personal Belongings</h2>
            <p className="mb-4">
              It is your responsibility to remove any valuable or personal belongings from the car prior to it being towed, wherever reasonably possible. We cannot be held responsible for the loss or damage of personal items left inside the car during transport.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Car Damage and Liability</h2>
            <p className="mb-4">
              While we handle all cars with professional care, our liability is limited. We are not responsible for pre-existing damage, mechanical problems that occur during transport unrelated to the towing itself, or issues arising from improperly secured cars prior to our arrival. Any claims for damage alleged to have occurred during the towing process must be reported to our driver at the time of delivery and submitted in writing.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Third-Party Towing Providers</h2>
            <p className="mb-4">
              In certain circumstances, or during periods of high demand, we may connect you with independent towing drivers or affiliated service providers to execute your request. In such cases, the independent provider is responsible for the physical execution of the service.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Emergency and 24/7 Services</h2>
            <p className="mb-4">
              We strive to provide emergency and 24/7 towing services; however, actual response times and service availability may vary depending on your location, traffic conditions, severe weather, driver availability, and the specific condition of your car.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Website Content</h2>
            <p className="mb-4">
              We make reasonable efforts to keep the information on our website accurate and up to date. However, service descriptions, availability, images, prices, and other information may change without notice. We do not warrant that all content is entirely free of errors.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Intellectual Property</h2>
            <p className="mb-4">
              All text, images, logos, branding, graphics, and other content on this website are the property of Santa Towing or our content suppliers. You may not copy, reproduce, distribute, or create derivative works from our content without our express written permission.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Third-Party Links and Services</h2>
            <p className="mb-4">
              Our website may contain links or connections to third-party services, such as WhatsApp, external mapping services, or payment platforms. These third-party services operate under their own terms and privacy policies. We are not responsible for the practices, content, or availability of these external platforms.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by applicable law, Santa Towing shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our website or services. This limitation applies to circumstances beyond our reasonable control, without unlawfully excluding responsibilities that cannot be legally excluded under Ghanaian law.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Changes to These Terms</h2>
            <p className="mb-4">
              We reserve the right to update or modify these Terms & Conditions at any time. When changes are made, the revised version will be published on this page with an updated date. Your continued use of the website or our services following any changes constitutes your acceptance of the revised terms.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">16. Governing Law</h2>
            <p className="mb-4">
              These Terms & Conditions and your use of our website and services shall be governed by and interpreted in accordance with the applicable laws of Ghana, subject to applicable legal requirements.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">17. Contact Information</h2>
            <p className="mb-4">
              If you have any questions or concerns regarding these Terms & Conditions, please contact us:
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
