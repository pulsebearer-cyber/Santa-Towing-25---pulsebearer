import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function ComplaintsPolicy() {
  const seoTitle = useContent('seo.complaintsPolicy.title', 'Complaints Policy | Santa Towing');
  const seoDesc = useContent('seo.complaintsPolicy.description', 'Learn how to submit a complaint or feedback, and understand our resolution process for service issues.');
  const title = useContent('policies.complaints.title', 'Complaints Policy');
  const subtitle = useContent('policies.complaints.subtitle', 'Our process for raising and resolving service-related concerns fairly.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={seoTitle} description={seoDesc} canonical="/complaints-policy" />
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

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">1. Introduction</h2>
            <p className="mb-4">
              At Santa Towing, we are committed to providing reliable and professional towing services. However, we understand that things may not always go as planned. The purpose of this Complaints Policy is to provide you with a clear, simple, and fair process for raising complaints.
            </p>
            <p className="mb-4">
              We take all complaints seriously and will review them fairly. You can raise concerns about any service requested through our website, phone, WhatsApp, or other official communication channels.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. What Customers Can Complain About</h2>
            <p className="mb-4">
              Customers may submit complaints relating to, but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Towing service quality</li>
              <li>Significant delays or communication problems</li>
              <li>Incorrect or disputed charges</li>
              <li>Cancellation charges and refund issues</li>
              <li>Car handling and alleged car damage</li>
              <li>Driver or service-provider conduct</li>
              <li>Incorrect information provided by our business</li>
              <li>Problems with website functionality</li>
              <li>Other service-related concerns</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. How to Submit a Complaint</h2>
            <p className="mb-4">
              To help us investigate and resolve your concern efficiently, please submit your complaint through our official <Link to="/contact" className="text-primary font-bold hover:underline">Contact page</Link> or by reaching out to our support team directly. Please provide as much relevant information as possible, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your full name and phone number</li>
              <li>The date and time of the service</li>
              <li>Your car details</li>
              <li>The pickup location and destination</li>
              <li>The name or details of the towing provider (if available)</li>
              <li>A clear description of the complaint</li>
              <li>Any payment or transaction reference (where applicable)</li>
              <li>Photographs or supporting evidence (highly recommended where relevant)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. When to Submit a Complaint</h2>
            <p className="mb-4">
              We encourage you to submit your complaint as soon as reasonably possible after the incident or service. Prompt reporting helps us accurately investigate the matter while information and evidence are still fresh.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Complaint Acknowledgement</h2>
            <p className="mb-4">
              Once we receive your complaint, we will acknowledge it where reasonably possible. During this initial stage, our team may request additional information, documentation, or clarification to properly assess the situation.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Complaint Review Process</h2>
            <p className="mb-4">
              We will make reasonable efforts to assess all complaints fairly and objectively. Our review process may involve:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Checking your customer information and service details</li>
              <li>Reviewing relevant communication logs</li>
              <li>Checking payment and billing information</li>
              <li>Contacting the assigned towing provider for their account of the incident</li>
              <li>Reviewing photographs or other submitted evidence</li>
              <li>Speaking with you directly to clarify the situation</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Car Damage Complaints</h2>
            <p className="mb-4">
              If your complaint involves alleged damage to your car during towing, please review our <Link to="/car-damage-liability-policy" className="text-primary font-bold hover:underline">Car Damage & Liability Policy</Link> and provide the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Clear photographs of the car and the specific alleged damage</li>
              <li>A detailed description of the damage</li>
              <li>Information regarding the car's condition before the towing service (if available)</li>
              <li>The date, time, and exact location of the towing service</li>
              <li>Any other relevant documentation (such as a police report if an accident was involved)</li>
            </ul>
            <p className="mb-4">
              Please note that the submission of a complaint does not automatically establish our responsibility for the damage. We will thoroughly investigate the claim. This process does not attempt to exclude any liability that cannot legally be excluded under Ghanaian law.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Pricing and Payment Complaints</h2>
            <p className="mb-4">
              If you wish to dispute unexpected charges, incorrect charges, payment issues, refund decisions, or cancellation fees, please detail the discrepancy in your complaint. We encourage you to first review our <Link to="/pricing-payment-policy" className="text-primary font-bold hover:underline">Pricing & Payment Policy</Link> and <Link to="/cancellation-refund-policy" className="text-primary font-bold hover:underline">Cancellation & Refund Policy</Link> to understand how charges are calculated.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Complaints About Towing Providers</h2>
            <p className="mb-4">
              Santa Towing sometimes connects customers with independent towing drivers or affiliated service providers to ensure prompt coverage. If your complaint is regarding the conduct or service of an independent provider, we will review the issue and communicate your concerns directly to the relevant provider. We act as a booking platform for these assignments and do not claim direct ownership of all independent cars.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Resolution</h2>
            <p className="mb-4">
              Once our review is complete, we will inform you of the outcome. Possible resolutions may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>A detailed clarification or explanation of the events</li>
              <li>Correction of an administrative error</li>
              <li>A refund (where applicable under our policies)</li>
              <li>Adjustment of an incorrect charge</li>
              <li>Referral of the issue to the relevant independent service provider</li>
              <li>Other reasonable corrective actions</li>
            </ul>
            <p className="mb-4">
              Please understand that we cannot guarantee a specific, desired outcome for every complaint, but we promise to handle each case fairly.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Escalating a Complaint</h2>
            <p className="mb-4">
              If you are dissatisfied with our initial response, you may request that your complaint be escalated for further review. An escalated complaint will be reviewed by senior management for a final determination. You also retain any additional consumer rights available to you under applicable Ghanaian law.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. False or Abusive Complaints</h2>
            <p className="mb-4">
              We expect customers to provide truthful and accurate information when submitting a complaint. We reserve the right to decline to process or respond to complaints that are clearly fraudulent, threatening, abusive, or submitted repeatedly without providing relevant new information.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Confidentiality and Personal Information</h2>
            <p className="mb-4">
              Information provided during the complaints process will be handled securely and in accordance with our <Link to="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Policy</Link>. However, please note that we cannot guarantee absolute confidentiality if disclosure is required by law or is necessary to properly investigate the complaint (such as discussing the incident with the assigned towing provider).
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Complaints Policy when necessary to reflect changes in our service processes or legal requirements. The most recent version will always be available on our website.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Contact Information</h2>
            <p className="mb-4">
              To submit a complaint or ask questions about our complaints process, please contact us using the details below or via our <Link to="/contact" className="text-primary font-bold hover:underline">Contact page</Link>.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-[1px] mt-6 border border-dark/10 flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Support Phone</h4>
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
