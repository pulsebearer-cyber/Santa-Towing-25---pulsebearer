import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function CarDamageLiabilityPolicy() {
  const title = useContent('policies.damageLiability.title', 'Car Damage & Liability Policy');
  const subtitle = useContent('policies.damageLiability.subtitle', 'Information regarding car condition, towing risks, and liability handling.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={`${title} | Santa Towing`} description="Understand our liability limits, damage claims process, and insurance coverage during towing or repair services." canonical="/car-damage-liability-policy" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Breadcrumbs items={[{ label: 'Car Damage & Liability' }]} />
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
              The purpose of this Car Damage & Liability Policy is to clearly explain how car condition, pre-existing damage, towing-related risks, personal belongings, and liability are handled when you use Santa Towing. This policy applies to all towing and car recovery services requested through our website, phone, WhatsApp, or other official communication channels.
            </p>
            <p className="mb-4">
              Car condition and towing circumstances can vary significantly from one service request to another, and this policy outlines the shared responsibilities to ensure a safe and professional recovery.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Customer's Responsibility to Provide Accurate Information</h2>
            <p className="mb-4">
              Customers must provide accurate information about their car before the towing service begins. When requesting service, please provide the following details where applicable:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Car make, model, and size</li>
              <li>Overall car condition</li>
              <li>Any recent accident damage</li>
              <li>Whether the car starts, rolls, and steers</li>
              <li>Whether the wheels or tires are damaged</li>
              <li>Whether the car is stuck in a ditch, mud, or on uneven terrain</li>
              <li>Any known mechanical or structural problems</li>
              <li>Any special towing requirements</li>
            </ul>
            <p className="mb-4">
              Inaccurate or incomplete information may result in delays, the need for additional equipment, additional charges, or the towing request being declined if safe towing is not possible with the dispatched equipment.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Pre-Existing Car Damage</h2>
            <p className="mb-4">
              Pre-existing damage refers to any mechanical, structural, or cosmetic damage present on the car before our towing providers begin the recovery process. Examples include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Accident damage (impacts, crushed panels)</li>
              <li>Scratches, scuffs, or dents</li>
              <li>Broken lights, mirrors, or glass</li>
              <li>Damaged bumpers or undercarriage components</li>
              <li>Mechanical and engine problems</li>
              <li>Suspension damage</li>
              <li>Wheel or tyre damage</li>
              <li>Flood, water, or fire damage</li>
            </ul>
            <p className="mb-4">
              Customers should disclose all known pre-existing damage prior to towing where reasonably possible. We highly encourage customers and towing providers to document the car's condition before the tow using photographs or reasonable written records.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Car Inspection and Documentation</h2>
            <p className="mb-4">
              Where reasonably practical and safe to do so, the condition of the car may be documented before towing commences. This documentation may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Photographs or videos of the car</li>
              <li>Written descriptions on service records</li>
              <li>Noting existing damage records</li>
              <li>Customer confirmation or signature</li>
            </ul>
            <p className="mb-4">
              This documentation is intended to help establish the car's condition before towing. While helpful, it does not guarantee that disputes over condition will never occur.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Towing and Recovery Risks</h2>
            <p className="mb-4">
              Towing and car recovery operations involve inherent risks. These risks are significantly higher in complex situations, particularly where a car is:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Severely damaged from an accident</li>
              <li>Stuck in mud, sand, or water</li>
              <li>Unable to roll freely or steer</li>
              <li>Located on difficult, uneven, or steep terrain</li>
              <li>Partially submerged</li>
              <li>Carrying unusual or hazardous loads</li>
              <li>Located in an unsafe roadside position</li>
            </ul>
            <p className="mb-4">
              In such scenarios, additional equipment or specialized recovery methods (such as winching) may be required, which inherently carry risks of secondary strain or damage during extraction.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Safe Towing Decisions</h2>
            <p className="mb-4">
              The assigned towing provider will assess the car on-site and determine the safest reasonable method of towing or recovery. To ensure safety, the provider may:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Request additional information from the customer</li>
              <li>Require specialized equipment to be dispatched</li>
              <li>Modify the planned towing method</li>
              <li>Delay the service until safe conditions are met</li>
              <li>Decline the service entirely if it cannot reasonably be performed safely</li>
            </ul>
            <p className="mb-4">
              Our towing providers must adhere to safe operating procedures and will comply with all lawful instructions from police or emergency authorities on the scene.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Responsibility for Damage During Towing</h2>
            <p className="mb-4">
              We take professional care when handling all cars. However, assessing responsibility for damage that allegedly occurs during towing is a careful process. Responsibility depends on numerous factors, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The car's documented condition before towing</li>
              <li>The specific towing and recovery methods used</li>
              <li>The condition of the equipment used</li>
              <li>Instructions provided by the customer or authorities</li>
              <li>The accuracy of the customer's initial information</li>
              <li>The environmental circumstances of the recovery (e.g., winching out of a ditch)</li>
              <li>Evidence of the alleged damage</li>
              <li>Whether reasonable professional care was exercised</li>
              <li>Applicable Ghanaian law</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Reporting New Damage</h2>
            <p className="mb-4">
              If you suspect that your car sustained new damage directly resulting from the towing process, please report the issue to us as soon as reasonably possible. When reporting suspected damage, please provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Your full name and phone number</li>
              <li>The date of the towing service</li>
              <li>Car details (make, model, registration)</li>
              <li>The pickup location and destination</li>
              <li>A clear description of the alleged damage</li>
              <li>Photographs or videos of the damage</li>
              <li>Evidence of the car's condition before towing (where available)</li>
              <li>Your payment or service reference</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Investigation of Damage Claims</h2>
            <p className="mb-4">
              Reported damage claims will be thoroughly reviewed. Our investigation may include reviewing before-and-after photographs, examining service records, collecting statements from the towing provider and customer, analyzing the towing equipment used, and reviewing relevant communications. Submitting a claim does not automatically establish liability, but we guarantee a fair and objective review of the evidence.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Personal Belongings</h2>
            <p className="mb-4">
              We strongly advise customers to remove all valuable and personal belongings from the car before towing whenever reasonably possible. Subject to applicable law and the specific circumstances of the service, customers remain entirely responsible for personal belongings left unsecured inside the car during transport.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Car Contents and Special Items</h2>
            <p className="mb-4">
              If you cannot remove specific items, you must inform the towing provider about any unusual, fragile, hazardous, highly valuable, or specialized items located in or attached to the car prior to towing. 
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Additional Equipment and Recovery Costs</h2>
            <p className="mb-4">
              Cars that are severely damaged, immobilized, stuck, unusually heavy, or located in difficult-to-recover areas may require additional specialized equipment or extra personnel. Additional charges will apply where such services are necessary to safely complete the recovery. Please refer to our <Link to="/pricing-payment-policy" className="text-primary font-bold hover:underline">Pricing & Payment Policy</Link> for more information on additional charges.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Unsafe or Prohibited Recovery</h2>
            <p className="mb-4">
              A towing provider reserves the right to refuse, delay, or postpone a car recovery when attempting it would create an unreasonable risk to people, property, the car itself, or the environment. Examples include severe weather, fires, hazardous material spills, unstable structures, dangerous traffic conditions, unsafe terrain, or situations requiring specialist emergency equipment.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Third-Party Towing Providers</h2>
            <p className="mb-4">
              To ensure fast response times across different locations, Santa Towing may connect customers with independent towing drivers or affiliated service providers. These independent providers are directly responsible for the safe physical execution of the tow and adherence to safety standards. We act as a booking platform for these assignments and do not claim that all towing providers are direct employees or that we own all assigned cars unless factually accurate for a specific dispatch.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent legally permissible, Santa Towing will not be responsible for damages, delays, or losses resulting from circumstances outside our reasonable control (including severe weather, traffic, or inaccurate customer information). However, this limitation of liability does not attempt to exclude or limit liability for negligence, intentional misconduct, or any other responsibilities that cannot legally be excluded under applicable Ghanaian law.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">16. Insurance</h2>
            <p className="mb-4">
              [Editable Placeholder: Information regarding business liability or goods-in-transit insurance coverage applicable to the towing service. Customers may wish to confirm any applicable insurance arrangements or check with their own comprehensive automotive insurance provider before requesting service.]
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">17. Disputes and Complaints</h2>
            <p className="mb-4">
              If you have concerns about car damage, handling, or liability following a service, we want to hear from you. Please refer to our <Link to="/complaints-policy" className="text-primary font-bold hover:underline">Complaints Policy</Link> for a detailed guide on how our general complaints and dispute resolution process works.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">18. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Car Damage & Liability Policy when necessary to reflect changes in our operational procedures or legal requirements. The latest version will always be published on our website.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">19. Contact Information</h2>
            <p className="mb-4">
              If you need to report car damage, discuss liability, or ask questions about this policy, please contact us:
            </p>
            
            <div className="bg-slate-50 p-6 rounded-[1px] mt-6 border border-dark/10 flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Support Phone</h4>
                  <a href="tel:0244753849" className="text-dark/70 hover:text-accent transition-colors">024 475 3849</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">WhatsApp Support</h4>
                  <a href="https://wa.me/233244753849" target="_blank" rel="noopener noreferrer" className="text-dark/70 hover:text-accent transition-colors">Chat on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
