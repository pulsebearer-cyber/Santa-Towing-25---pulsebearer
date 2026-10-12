import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function PricingPaymentPolicy() {
  const title = useContent('policies.pricing.title', 'Pricing & Payment Policy');
  const subtitle = useContent('policies.pricing.subtitle', 'Please review our policies regarding service pricing and payments.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Information on our service rates, accepted payment methods, and billing processes for all auto services." canonical="/pricing-payment-policy" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Pricing & Payment Policy' }]} />
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
              The purpose of this Pricing & Payment Policy is to clearly explain how our towing service prices are determined, when customers may be charged, and how payments are handled. This policy applies to all towing and recovery services requested through our website, phone, WhatsApp, or other official communication channels.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. How Towing Prices Are Determined</h2>
            <p className="mb-4">
              Towing prices are not always fixed and may vary depending on the specifics of the required service. Factors that may influence the final price include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Pickup location</li>
              <li>Destination</li>
              <li>Total distance of the tow</li>
              <li>Car type and size</li>
              <li>Car condition (e.g., drivable, non-drivable, missing wheels)</li>
              <li>Time of service (e.g., standard business hours, late-night, or public holidays)</li>
              <li>Waiting time at the pickup or drop-off location</li>
              <li>Road and traffic conditions</li>
              <li>Special towing or recovery equipment required</li>
              <li>Difficult or unusual recovery conditions (e.g., off-road, ditches, severe accidents)</li>
              <li>Additional services requested</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Price Estimates</h2>
            <p className="mb-4">
              Any price estimate provided before our towing provider assesses the situation in person is an estimate based on the information provided. This estimate could change if the actual service requirements differ from the initial details. Where the final price may differ from the initial estimate, we will make reasonable efforts to inform you of significant additional charges before the additional service is carried out.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Additional Charges</h2>
            <p className="mb-4">
              Certain circumstances during the execution of a service may result in additional charges. These circumstances include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Extra distance required beyond the originally agreed destination</li>
              <li>Extended waiting time caused by the customer or the car not being ready</li>
              <li>The need for special or heavy-duty equipment not initially anticipated</li>
              <li>Difficult car recovery requiring extra labor or time</li>
              <li>Additional towing assistance or secondary cars</li>
              <li>Changes to the requested destination after the tow has commenced</li>
              <li>Any other additional services expressly requested by the customer</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Payment Requirements</h2>
            <p className="mb-4">
              Depending on the nature of the service and the established business process, payment may be required before, during, or immediately after the towing service is completed. Our dispatch team or towing providers will clarify the exact payment timing with you when confirming your service request.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Accepted Payment Methods</h2>
            <p className="mb-4">
              We strive to make our payment process as convenient as possible. Currently, we accept the following payment methods:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>[Editable Placeholder: Mobile Money (MTN MoMo, Telecel Cash, AT Money)]</li>
              <li>[Editable Placeholder: Cash payments directly to the driver]</li>
              <li>[Editable Placeholder: Bank Transfers (must be confirmed before service completion)]</li>
              <li>[Editable Placeholder: Point of Sale (POS) Card Payments]</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Payment Confirmation</h2>
            <p className="mb-4">
              Customers are encouraged to retain their payment confirmations, receipts, mobile money transaction references, or other evidence of payment where applicable, as proof of completed transactions.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Unpaid Services</h2>
            <p className="mb-4">
              In the event that an agreed towing charge remains unpaid upon completion of the service, Santa Towing reserves the right to withhold the release of the towed car or pursue the outstanding balance through fair and legally appropriate debt recovery channels under Ghanaian law. 
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Cancellations and Payment</h2>
            <p className="mb-4">
              If a customer cancels a towing request, certain charges may still apply depending on whether a towing provider has already been dispatched or has arrived at the location. For detailed rules regarding cancellations and associated charges, please refer to our <strong>Cancellation & Refund Policy</strong>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Refunds</h2>
            <p className="mb-4">
              Any eligible refunds are handled strictly in accordance with our <strong>Cancellation & Refund Policy</strong>. We do not provide refunds where the towing service has already been substantially provided or where operational costs have already been incurred, unless explicitly required by applicable law or an agreed service arrangement.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Pricing Changes</h2>
            <p className="mb-4">
              Towing prices may change over time due to fluctuations in operating costs, fuel costs, equipment requirements, service areas, or other business factors. However, where a specific price has already been agreed upon for an immediate service, you will not be unexpectedly charged a different amount except where additional services or unforeseen circumstances justify the change, and you are informed where reasonably possible.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Special and Emergency Services</h2>
            <p className="mb-4">
              Emergency, after-hours, difficult recovery, or specialized towing services may be subject to different pricing structures depending on the severity and requirements of the circumstances. Our team will communicate the applicable rates for these specialized services when you request assistance.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Inaccurate Information</h2>
            <p className="mb-4">
              Customers are responsible for providing accurate information regarding their car, location, car condition, and destination. If incorrect information results in the need for additional equipment, extra travel distance, extended waiting time, or other unexpected costs, the customer may be responsible for covering these additional charges.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Disputing a Charge</h2>
            <p className="mb-4">
              If you believe you were incorrectly charged for a service, please contact us promptly to submit a billing complaint. To help us investigate and resolve the issue efficiently, please provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your full name</li>
              <li>Your phone number</li>
              <li>The date the service was provided</li>
              <li>Your car information (make, model, registration)</li>
              <li>Payment details or transaction reference</li>
              <li>A clear description of the issue or the disputed charge</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Taxes and Other Applicable Charges</h2>
            <p className="mb-4">
              All prices quoted or charged may be subject to applicable taxes, statutory charges, or other legally required levies in accordance with the laws of Ghana. These charges will be applied where relevant and included in your final bill.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">16. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Pricing & Payment Policy from time to time as our business processes evolve. The latest version of the policy will always be published on our website, and your continued use of our services indicates acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">17. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about pricing, payments, invoices, refunds, or billing disputes, please contact us using the information below:
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
