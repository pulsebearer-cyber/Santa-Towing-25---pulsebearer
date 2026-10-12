import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';

import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function AccessibilityStatement() {
  const seoTitle = useContent('seo.accessibilityStatement.title', 'Accessibility Statement | Santa Towing');
  const seoDesc = useContent('seo.accessibilityStatement.description', 'Our commitment to digital accessibility and ensuring our website is usable by everyone, regardless of ability.');
  const title = useContent('policies.accessibility.title', 'Accessibility Statement');
  const subtitle = useContent('policies.accessibility.subtitle', 'Our commitment to providing an inclusive and accessible online experience.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={seoTitle} description={seoDesc} canonical="/accessibility-statement" />
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

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">1. Our Commitment to Accessibility</h2>
            <p className="mb-4">
              At Santa Towing, we are deeply committed to improving the accessibility and usability of our website. We believe that everyone, including people with disabilities, should be able to access our services easily. We make reasonable efforts to provide an inclusive online experience and continuously work to remove barriers for our customers.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Accessibility Features</h2>
            <p className="mb-4">
              We have implemented several accessibility features and practices on our website to ensure a better experience for all users:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Clear navigation structure:</strong> Consistent layouts to help you find what you need.</li>
              <li><strong>Readable typography:</strong> Legible font sizes and clean typefaces.</li>
              <li><strong>Appropriate color contrast:</strong> Thoughtful color choices to make text stand out against backgrounds.</li>
              <li><strong>Descriptive buttons and links:</strong> Call-to-action buttons designed to clearly explain their purpose.</li>
              <li><strong>Accessible forms:</strong> Clear labels and visible focus indicators when filling out contact or booking requests.</li>
              <li><strong>Responsive design:</strong> Content that scales and adapts properly across desktop, tablet, and mobile devices.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Visual Accessibility</h2>
            <p className="mb-4">
              We strive to make our content visually clear and easy to read. This includes maintaining sufficient contrast between text and background colors, ensuring text remains readable across different screen sizes, and avoiding placing critical text over difficult-to-read background images. We use our brand colors thoughtfully to provide clear visual states for buttons and links without relying on color alone to communicate important information.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Keyboard Accessibility</h2>
            <p className="mb-4">
              We recognize the importance of navigating the web without a mouse. Users should be able to navigate important website features using a keyboard. Our main navigation, buttons, forms, and links—including Call Now buttons, Contact Towing Service options, advert cards, and footer links—are designed to receive clear keyboard focus so you know exactly which interactive element you are currently on.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Screen Reader Accessibility</h2>
            <p className="mb-4">
              To support users who rely on screen readers, we aim to structure our content logically using proper heading hierarchies (H1, H2, H3). We also aim to provide meaningful alternative text for important images, clear names for buttons, and logical link descriptions so that the context of our towing services is properly announced by assistive technologies.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Images and Media</h2>
            <p className="mb-4">
              Meaningful images on our website, such as advert graphics and service photos, are intended to have appropriate alternative text descriptions to convey their purpose to screen reader users. Purely decorative images and background graphics are treated appropriately so they do not clutter or confuse the reading experience.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Forms and User Input</h2>
            <p className="mb-4">
              We design our forms—such as those on our Contact page—with accessibility in mind. This includes providing visible labels, required-field indicators, and clear focus states. If a form submission fails, we strive to provide helpful error messages to guide you in correcting the input.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Advert Cards and Modal Popups</h2>
            <p className="mb-4">
              Our website features towing advert cards and modal popups. We have taken steps to ensure these elements are accessible. Advert cards can be accessed via keyboard, and modal popups can be opened and closed safely. We ensure that interactive buttons inside these modals, such as the phone numbers and Call Now links, are clearly labeled and accessible.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Mobile Accessibility</h2>
            <p className="mb-4">
              Our website is built using responsive design techniques, ensuring that accessibility features translate properly to smartphones and tablets. We focus on providing adequate touch targets for buttons, clear mobile menus, and legible text sizes that adapt to portrait or landscape orientations.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Accessibility Limitations</h2>
            <p className="mb-4">
              While we strive to make our website as accessible as possible, we acknowledge that some limitations may exist. Certain older pages, complex interactive elements, or features relying on third-party technologies may not be fully optimized for all assistive devices. We are actively working to identify and address these limitations over time.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Third-Party Content</h2>
            <p className="mb-4">
              Some tools and content integrated into our website are provided by third-party services that we do not fully control. This may include embedded maps, social media links (such as WhatsApp integrations), or external communication platforms. These third-party elements may have their own accessibility limitations.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Accessibility Feedback</h2>
            <p className="mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter any barriers while trying to access our content or request a towing service, please let us know. When reporting an issue, it is incredibly helpful to provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>The specific page or feature affected</li>
              <li>A description of the accessibility problem</li>
              <li>The device or browser you are using (if known)</li>
              <li>Your preferred method of receiving assistance</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">13. Alternative Assistance</h2>
            <p className="mb-4">
              If you experience difficulty accessing important information or requesting a towing service through the website, please do not hesitate to contact us directly via phone or WhatsApp. Our customer support team is ready to assist you through alternative official communication channels to ensure you get the help you need.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">14. Accessibility Improvements</h2>
            <p className="mb-4">
              Accessibility is an ongoing process. We are dedicated to periodically reviewing and improving our website's accessibility to provide a better user experience for everyone. We use accessibility feedback from our users to help identify and fix problems promptly.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">15. Accessibility Standards</h2>
            <p className="mb-4">
              While no formal third-party accessibility audit has currently certified our compliance with a specific standard (such as WCAG), we aim to follow recognized accessibility best practices during our development and design process. We are committed to continuously improving the accessibility of our platform.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">16. Changes to This Statement</h2>
            <p className="mb-4">
              We may update this Accessibility Statement from time to time as our website's accessibility features, underlying technology, or services evolve. The most recent version will always be published on this page.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">17. Contact Information</h2>
            <p className="mb-4">
              To report an accessibility issue, request alternative assistance, or ask questions about our accessibility practices, please contact us:
            </p>
            
            <div className="bg-slate-50 p-6 rounded-[1px] mt-6 border border-dark/10 flex flex-col sm:flex-row gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Accessibility Support Phone</h4>
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
