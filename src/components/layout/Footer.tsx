import React from 'react';
import { Phone, MessageCircle, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';
import EditableImage from '@/components/editable/EditableImage';

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const logoUrl = useContent('global.logo.url', 'https://i.ibb.co/KgkfFKV/Santa-Logo.png');
  const brandName = useContent('global.brand.shortName', 'Santa Towing');
  const brandTagline = useContent('global.brand.tagline', '24/7 Emergency Towing, Haulage & Automotive Services in Ghana');
  const aboutText = useContent('global.footer.about', "Ghana's premier automotive partner for 24/7 rapid emergency towing, heavy car recovery, certified garage repairs, car sales, and rental fleet solutions.");
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const whatsappDisplay = useContent('global.links.whatsappDisplay', 'WhatsApp: 0244753849');
  const address = useContent('global.links.address', '123 Spintex Road, Accra, Ghana');

  const quickLinksTitle = useContent('global.footer.quickLinksTitle', 'Quick Links');
  const servicesTitle = useContent('global.footer.servicesTitle', 'Our Services');
  const legalTitle = useContent('global.footer.legalTitle', 'Legal and Policies');
  const stayConnectedTitle = useContent('global.footer.stayConnectedTitle', 'Stay Connected');
  const newsletterText = useContent('global.footer.newsletterText', 'Subscribe for roadside safety tips, car maintenance reminders, and exclusive service discounts.');
  const newsletterPlaceholder = useContent('global.footer.newsletterPlaceholder', 'Enter your email');
  const newsletterButton = useContent('global.footer.newsletterButton', 'Subscribe Now');
  const newsletterSuccess = useContent('global.footer.newsletterSuccess', 'Thank you! You have successfully subscribed to Santa Towing updates.');
  const copyrightText = useContent('global.footer.copyright', 'Santa Towing & Garage Services Ltd. All rights reserved.');

  const facebook = useContent('global.social.facebook', 'https://facebook.com/santatowing');
  const twitter = useContent('global.social.twitter', 'https://twitter.com/santatowing');
  const instagram = useContent('global.social.instagram', 'https://instagram.com/santatowing');
  const linkedin = useContent('global.social.linkedin', 'https://linkedin.com/company/santatowing');

  const defaultQuickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Haulage Services', path: '/haulage' },
    { name: '24/7 Emergency Towing', path: '/towing' },
    { name: 'Service Areas Directory', path: '/service-areas' },
    { name: 'Auto Repair & Maintenance', path: '/repairs' },
    { name: 'Car Rentals', path: '/rental' },
    { name: 'Car Sales', path: '/sales' },
    { name: 'Auto Parts & Batteries', path: '/parts' },
    { name: 'Blog & Resources', path: '/blog' },
    { name: 'Contact & Dispatch', path: '/contact' },
    { name: 'Sitemap', path: '/sitemap' }
  ];

  const defaultServiceLinks = [
    { name: 'Haulage & Heavy Transport', path: '/haulage' },
    { name: 'Tema Harbour Haulage', path: '/haulage' },
    { name: 'Heavy Machinery Transport', path: '/haulage' },
    { name: 'Emergency Roadside Towing', path: '/towing' },
    { name: 'Heavy Duty Recovery', path: '/towing' },
    { name: 'Fleet Maintenance', path: '/fleet' },
    { name: 'Engine & Gearbox Repairs', path: '/repairs' },
    { name: 'Brake & Suspension Service', path: '/repairs' },
    { name: 'Corporate Car Rentals', path: '/rental' },
    { name: 'OEM Battery Replacement', path: '/parts' }
  ];

  const rawQuickLinks = useContent('global.footer.quickLinks', defaultQuickLinks);
  const rawServiceLinks = useContent('global.footer.serviceLinks', defaultServiceLinks);

  const activeQuickLinks = (rawQuickLinks || defaultQuickLinks)
    .filter((it: any) => it.visible !== false)
    .map((it: any) => ({ name: it.label || it.name, path: it.path || it.href }));

  const activeServiceLinks = (rawServiceLinks || defaultServiceLinks)
    .filter((it: any) => it.visible !== false)
    .map((it: any) => ({ name: it.label || it.name, path: it.path || it.href }));

  return (
    <footer className="bg-dark text-white/70 pt-16 sm:pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Link to="/" className="inline-block">
                <EditableImage 
                  storageKey="global.logo.url"
                  altStorageKey="global.logo.alt"
                  defaultUrl={logoUrl} 
                  defaultAlt={brandName} 
                  className="h-12 w-auto object-contain bg-white p-1.5 rounded-[1px] shadow-md"
                  label="Footer Company Logo"
                />
              </Link>
              <p className="text-xs text-white/60 italic font-medium">
                {brandTagline}
              </p>
            </div>
            <div className="text-white/85 text-sm sm:text-base leading-relaxed">
              <EditableText
                as="p"
                multiline={true}
                storageKey="global.footer.about"
                defaultContent={aboutText}
                label="Footer About Bio"
              />
            </div>
            <div className="space-y-3 text-sm">
              <a href={phoneTel} className="flex items-center gap-3 text-white hover:text-accent transition-colors font-bold">
                <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <EditableText
                  storageKey="global.links.phone"
                  defaultContent={phone}
                  label="Footer Phone"
                />
              </a>
              <a 
                href={whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-white/80 hover:text-accent transition-colors break-all sm:break-normal"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/30 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <EditableText
                  storageKey="global.links.whatsappDisplay"
                  defaultContent={whatsappDisplay}
                  label="Footer WhatsApp"
                />
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-xl bg-primary/30 flex items-center justify-center text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <EditableText
                  storageKey="global.links.address"
                  defaultContent={address}
                  label="Company Address"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-bold mb-5 relative inline-block">
              {quickLinksTitle}
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              {activeQuickLinks.map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-accent transition-colors flex items-center gap-2 text-white/80 hover:translate-x-1 duration-200">
                    <ArrowRight className="w-3 h-3 text-accent" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-bold mb-5 relative inline-block">
              {servicesTitle}
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              {activeServiceLinks.map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-accent transition-colors flex items-center gap-2 text-white/80 hover:translate-x-1 duration-200">
                    <ArrowRight className="w-3 h-3 text-accent" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and Policies */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-bold mb-5 relative inline-block">
              {legalTitle}
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-conditions' },
                { name: 'Towing Service Terms', path: '/towing-service-terms' },
                { name: 'Cancellation & Refund Policy', path: '/cancellation-refund-policy' },
                { name: 'Pricing & Payment Policy', path: '/pricing-payment-policy' },
                { name: 'Disclaimer', path: '/disclaimer' },
                { name: 'Cookie Policy', path: '/cookie-policy' },
                { name: 'Service Area Policy', path: '/service-area-policy' },
                { name: 'Emergency Service Policy', path: '/emergency-service-policy' },
                { name: 'Complaints Policy', path: '/complaints-policy' },
                { name: 'Car Damage & Liability Policy', path: '/car-damage-liability-policy' },
                { name: 'Accessibility Statement', path: '/accessibility-statement' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-accent transition-colors flex items-center gap-2 text-white/80 hover:translate-x-1 duration-200">
                    <ArrowRight className="w-3 h-3 text-accent" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-bold mb-5 relative inline-block">
              {stayConnectedTitle}
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-accent rounded-full" />
            </h4>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              {newsletterText}
            </p>
            {isSubscribed ? (
              <div className="bg-primary/40 border border-primary text-white p-4 rounded-lg text-sm flex items-center gap-2">
                <span className="font-bold">Thank you!</span> {newsletterSuccess}
              </div>
            ) : (
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }}>
                <input 
                  required
                  type="email" 
                  placeholder={newsletterPlaceholder} 
                  className="w-full bg-white/10 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
                <button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold px-4 py-3 text-sm transition-all shadow-md shadow-accent/25 hover:-translate-y-0.5 rounded-full"
                >
                  {newsletterButton}
                </button>
              </form>
            )}
            <div className="flex items-center gap-3 mt-6">
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/80" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/80" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/80" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white/80" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/80 font-medium">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <EditableText
              storageKey="global.footer.copyright"
              defaultContent={copyrightText}
              label="Copyright Text"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
