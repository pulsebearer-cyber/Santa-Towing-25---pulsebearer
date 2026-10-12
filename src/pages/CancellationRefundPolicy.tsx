import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function CancellationRefundPolicy() {
  const title = useContent('policies.cancellation.title', 'Cancellation & Refund Policy');
  const subtitle = useContent('policies.cancellation.subtitle', 'Please review our policies regarding service cancellations and refunds.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Understand our policies regarding cancellations, refunds, and rescheduling for auto services, rentals, and parts." canonical="/cancellation-refund-policy" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Cancellation & Refund Policy' }]} />
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
              The purpose of this Cancellation & Refund Policy is to clearly explain how cancellations and refunds are handled at Santa Towing. This policy applies to all towing and recovery service requests made through our website, phone, WhatsApp, or any other official communication channels.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Cancelling a Towing Request</h2>
            <p className="mb-4">
              If you need to cancel a towing request, please contact our dispatch team immediately via phone or WhatsApp. We strongly encourage customers to cancel as early as possible if our towing service is no longer required, allowing us to free up our drivers for other emergency calls.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Cancellation Before Dispatch</h2>
            <p className="mb-4">
              If you cancel your towing request before a towing provider has been dispatched to your location, you may generally avoid cancellation-related charges, subject to the applicable service terms agreed upon at the time of booking.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Cancellation After Dispatch</h2>
            <p className="mb-4">
              A cancellation or service charge may apply when a towing provider has already been dispatched and is actively traveling to your location. This charge helps cover the operational costs and fuel incurred by sending a tow truck to assist you.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Cancellation After Arrival</h2>
            <p className="mb-4">
              If our towing provider has already arrived at your requested location and you decide to cancel the service, a charge will generally apply. This charge compensates for the time, travel, and resources already utilized by our team to reach you.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. No-Show or Customer Unavailable</h2>
            <p className="mb-4">
              Applicable charges may apply if our towing provider has been dispatched or has arrived, but the service cannot be completed because:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The customer cannot be reached upon arrival.</li>
              <li>The customer is not present at the stated location.</li>
              <li>The car cannot be located.</li>
              <li>The customer provided an incorrect location.</li>
              <li>The car is not ready for towing.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Refund Eligibility</h2>
            <p className="mb-4">
              Customers may qualify for a refund in specific circumstances, such as if an overpayment was made or if the requested service completely failed due to a fault directly attributable to our team. We do not issue refunds where the service has already been substantially provided or where operational costs have already been incurred, unless required by applicable law or a specific agreed service arrangement.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Non-Refundable Charges</h2>
            <p className="mb-4">
              Where applicable, certain costs that have already been incurred by Santa Towing may not be refundable. This typically includes dispatch costs, travel expenses, waiting time, or any supplementary services that were already performed prior to cancellation.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Refund Processing</h2>
            <p className="mb-4">
              To request a refund, please contact our support team with your booking details and the reason for the request. Our team will review the request based on the circumstances of the dispatch and service provided. Processing times for approved refunds may vary depending on the payment method used or your financial institution's internal processing timelines.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Service Cancellation by the Towing Provider</h2>
            <p className="mb-4">
              Santa Towing or our affiliated towing providers reserve the right to cancel or decline a towing request where:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The location is deemed unsafe for our personnel or equipment.</li>
              <li>The car cannot be safely towed with the available equipment.</li>
              <li>Required specialized equipment is unavailable.</li>
              <li>Severe weather or road conditions create an unreasonable risk.</li>
              <li>The request involves unlawful or prohibited activity.</li>
              <li>The customer's provided information is materially inaccurate.</li>
              <li>Other circumstances prevent the safe or reasonable delivery of service.</li>
            </ul>
            <p className="mb-4">
              In such cases, customers will be informed promptly, and any eligible refund for prepaid services that could not be rendered will be handled according to this policy.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Delays and Failed Service</h2>
            <p className="mb-4">
              A service delay is different from a cancellation. If a towing provider is delayed due to heavy traffic, severe weather, emergencies, challenging road conditions, equipment issues, or other circumstances beyond our reasonable control, we will make every effort to inform you. If a delay makes the service no longer viable for you, cancellation and refund decisions will be handled fairly based on the situation and the costs already incurred.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Disputes About Charges</h2>
            <p className="mb-4">
              If you believe a cancellation charge was incorrectly applied or you disagree with a refund decision, please contact us. We are committed to reviewing disputes fairly and resolving customer concerns in a professional manner.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Cancellation & Refund Policy when necessary to reflect changes in our operational procedures or legal requirements. The latest version will always be published on our website, and continued use of our services constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about this Cancellation & Refund Policy, or if you need to discuss a cancellation or refund, please contact us:
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
