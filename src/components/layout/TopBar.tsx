import React from 'react';
import { Phone, MessageCircle, Clock, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import EditableText from '@/components/editable/EditableText';

export default function TopBar() {
  const phone = useContent('global.links.phone', '0244753849');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');
  const facebook = useContent('global.social.facebook', 'https://facebook.com/santatowing');
  const twitter = useContent('global.social.twitter', 'https://twitter.com/santatowing');
  const instagram = useContent('global.social.instagram', 'https://instagram.com/santatowing');
  const linkedin = useContent('global.social.linkedin', 'https://linkedin.com/company/santatowing');

  return (
    <div className="bg-secondary text-white/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs md:text-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 font-medium">
          <a href={phoneTel} className="flex items-center gap-2 text-white hover:text-accent transition-colors font-semibold">
            <Phone className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>
              24/7 Hotline:{' '}
              <EditableText
                storageKey="global.links.phone"
                defaultContent="0244753849"
                label="Hotline Phone"
              />
            </span>
          </a>
          <a 
            href={whatsapp} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden sm:flex items-center gap-2 hover:text-accent transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white/60" />
            <EditableText
              storageKey="global.links.whatsappDisplay"
              defaultContent="WhatsApp: 0244753849"
              label="WhatsApp Display"
            />
          </a>
          <div className="hidden md:flex items-center gap-2 text-white/70">
            <Clock className="w-3.5 h-3.5 text-white/60" />
            <EditableText
              storageKey="global.links.hours"
              defaultContent="24/7 Towing Service"
              label="Working Hours"
            />
          </div>
          <div className="hidden lg:flex items-center gap-2 text-white/70">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <EditableText
              storageKey="global.links.coverage"
              defaultContent="Nationwide Coverage"
              label="Coverage Area"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <span className="text-xs uppercase tracking-wider text-white/80 hidden sm:inline font-semibold">Follow Us</span>
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors p-1" aria-label="Facebook"><Facebook className="w-3.5 h-3.5" /></a>
          <a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors p-1" aria-label="Twitter"><Twitter className="w-3.5 h-3.5" /></a>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors p-1" aria-label="Instagram"><Instagram className="w-3.5 h-3.5" /></a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors p-1" aria-label="LinkedIn"><Linkedin className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
