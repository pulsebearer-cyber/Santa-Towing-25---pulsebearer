import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '@/components/seo/SEO';
import { useContent } from '@/hooks/useContent';

export default function CookiePolicy() {
  const seoTitle = useContent('seo.cookiePolicy.title', 'Cookie Policy | Santa Towing');
  const seoDesc = useContent('seo.cookiePolicy.description', 'Learn about how we use cookies to improve your browsing experience on the Santa Towing website.');
  const title = useContent('policies.cookie.title', 'Cookie Policy');
  const subtitle = useContent('policies.cookie.subtitle', 'Learn how we use cookies and similar technologies on our website.');
  const phoneFormatted = useContent('global.links.phoneFormatted', '024 475 3849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <SEO title={seoTitle} description={seoDesc} canonical="/cookie-policy" />
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
              This Cookie Policy explains what cookies and similar technologies are, how Santa Towing uses them when you visit our website, and how you can manage your cookie preferences. Cookies are small files or pieces of information stored on your computer or mobile device when you visit a website. They are widely used to make websites work, improve user experience, and provide analytical information to the website owners.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">2. Why We Use Cookies</h2>
            <p className="mb-4">
              We may use cookies and similar tracking technologies for various purposes, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Making the website function properly and securely.</li>
              <li>Remembering your user preferences and settings.</li>
              <li>Improving overall website performance and speed.</li>
              <li>Understanding how visitors interact with and use our website.</li>
              <li>Improving navigation and user experience.</li>
              <li>Measuring website traffic and usage patterns.</li>
              <li>Supporting security and fraud prevention efforts.</li>
              <li>Supporting relevant advertising, where such technologies are implemented.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">3. Types of Cookies</h2>
            <p className="mb-4">
              The cookies that may be used on our website generally fall into the following categories:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Essential Cookies:</strong> These cookies are strictly necessary for core website functions, security, navigation, forms, and other basic features. Without these cookies, the website may not function correctly.</li>
              <li><strong>Functional Cookies:</strong> These cookies remember user preferences and choices to improve and personalize the website's functionality.</li>
              <li><strong>Analytics/Performance Cookies:</strong> These cookies help us understand how visitors use the website, which pages are most popular, and identify areas for improvement by collecting anonymous performance data.</li>
              <li><strong>Advertising/Marketing Cookies:</strong> If implemented, these cookies may be used to understand advertising performance or to provide more relevant advertising based on your interests.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">4. Third-Party Cookies</h2>
            <p className="mb-4">
              In addition to our own cookies, some third-party services integrated into our website may place their own cookies or similar technologies on your device. These may include analytics services, embedded maps, social media platforms, video providers, or payment gateways. These third parties manage their own cookies according to their respective privacy policies.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">5. Cookies Used on This Website</h2>
            <p className="mb-4">
              Below is a list of the specific cookies that may be used on our website. <em>(Note: If the website currently uses only essential technical cookies, non-essential cookies will not be placed on your device.)</em>
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-dark/20 text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-dark/20 p-3 text-left">Cookie Name</th>
                    <th className="border border-dark/20 p-3 text-left">Provider</th>
                    <th className="border border-dark/20 p-3 text-left">Purpose</th>
                    <th className="border border-dark/20 p-3 text-left">Category</th>
                    <th className="border border-dark/20 p-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-dark/20 p-3">[Editable Placeholder]</td>
                    <td className="border border-dark/20 p-3">[Editable Placeholder]</td>
                    <td className="border border-dark/20 p-3">[Editable Placeholder]</td>
                    <td className="border border-dark/20 p-3">Essential</td>
                    <td className="border border-dark/20 p-3">Session</td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="border border-dark/20 p-3 text-center italic text-dark/50 py-4">
                      [Website Owner: Populate this section after performing a cookie scan]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">6. Cookie Consent</h2>
            <p className="mb-4">
              If our website uses non-essential cookies (such as analytics or advertising cookies), we will provide a mechanism for you to provide, refuse, or manage your consent where applicable by law. Our consent interface is designed to allow you to make informed choices rather than treating all cookies as automatically accepted.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">7. Managing Cookies</h2>
            <p className="mb-4">
              You can manage, block, or delete cookies at any time through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Our website's cookie preference controls (where available).</li>
              <li>Your web browser settings (usually found under 'Privacy', 'Settings', or 'Preferences').</li>
              <li>Your mobile device settings, where applicable.</li>
            </ul>
            <p className="mb-4">
              Please note that if you choose to disable or reject essential or functional cookies, some features or functionality of our website may not operate as intended.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">8. Do Not Track and Similar Technologies</h2>
            <p className="mb-4">
              "Do Not Track" (DNT) is a privacy preference you can set in some web browsers. While we strive to respect user privacy, our website may not currently respond to specific DNT signals or similar browser-based privacy technologies unless strictly configured to do so.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">9. Personal Information and Cookies</h2>
            <p className="mb-4">
              Some cookies or tracking technologies may collect information that could be associated with you or your device, depending on how they are configured (such as IP addresses). For more information about how we collect, protect, and use your personal information overall, please refer to our <Link to="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">10. Data Security</h2>
            <p className="mb-4">
              We take reasonable, industry-standard measures to protect any information collected through cookies and related technologies. However, please be aware that no method of electronic data transmission or storage is completely risk-free.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">11. Changes to This Cookie Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our use of cookies, tracking technologies, third-party services, or legal requirements. The latest version will always be published on this page, and the "Last Updated" date will reflect the most recent changes.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 border-b border-dark/10 pb-2">12. Contact Information</h2>
            <p className="mb-4">
              If you have any questions or concerns about our use of cookies or privacy practices, please contact us:
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
