import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useContent } from '@/hooks/useContent';

export interface ServiceAreaPageTemplateProps {
  slug: string;
  areaLabel: string;
  defaultHeading: string;
  defaultDescription: string;
  prevArea?: {
    path: string;
    label: string;
  };
  nextArea?: {
    path: string;
    label: string;
  };
}

export default function ServiceAreaPageTemplate({
  slug,
  areaLabel,
  defaultHeading,
  defaultDescription,
  prevArea,
  nextArea,
}: ServiceAreaPageTemplateProps) {
  const heading = useContent(`serviceAreas.pages.${slug}.heading`, defaultHeading);
  const description = useContent(`serviceAreas.pages.${slug}.description`, defaultDescription);
  const ctaHeading = useContent('serviceAreas.template.ctaHeading', 'Need Immediate Assistance?');
  const ctaSubtext = useContent('serviceAreas.template.ctaSubtext', 'Call or WhatsApp us now to book your tow.');
  const callBtnLabel = useContent('serviceAreas.template.callBtnLabel', 'Call Now');
  const whatsappBtnLabel = useContent('serviceAreas.template.whatsappBtnLabel', 'WhatsApp Us');
  const prevAreaLabel = useContent('serviceAreas.template.prevAreaLabel', 'Previous Area');
  const nextAreaLabel = useContent('serviceAreas.template.nextAreaLabel', 'Next Area');
  const phoneTel = useContent('global.links.phoneTel', 'tel:0244753849');
  const whatsapp = useContent('global.links.whatsapp', 'https://wa.me/233244753849');

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <Breadcrumbs
            items={[
              { label: 'Towing Services', path: '/towing' },
              { label: 'Service Areas', path: '/service-areas' },
              { label: areaLabel },
            ]}
          />

          <div className="mt-8">
            <h1 className="text-3xl md:text-5xl font-bold text-dark mb-4">
              {heading}
            </h1>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[1px] border border-dark/10 shadow-sm mb-12">
          <p className="text-dark/80 mb-6 leading-relaxed text-lg">
            {description}
          </p>

          <div className="mt-8 p-6 bg-slate-50 rounded-[1px] border border-dark/5">
            <h3 className="text-xl font-bold text-dark mb-4">{ctaHeading}</h3>
            <p className="text-dark/70 mb-6">{ctaSubtext}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={phoneTel}
                className="flex items-center justify-center gap-3 bg-primary hover:bg-dark text-white px-6 py-4 font-bold transition-colors w-full rounded-full"
              >
                <Phone className="w-5 h-5" />
                {callBtnLabel}
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-primary hover:bg-dark text-white px-6 py-4 font-bold transition-colors w-full rounded-full"
              >
                <MessageCircle className="w-5 h-5" />
                {whatsappBtnLabel}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-dark/10">
            {prevArea && (
              <div className="w-full sm:w-1/2 flex justify-start">
                <Link
                  to={prevArea.path}
                  className="group flex items-center gap-3 hover:bg-slate-50 p-3 rounded-[1px] transition-colors max-w-full"
                >
                  <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-dark/50 font-bold uppercase tracking-wider mb-0.5">
                      {prevAreaLabel}
                    </div>
                    <div className="text-sm font-bold text-dark group-hover:text-accent truncate">
                      {prevArea.label}
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {nextArea && (
              <div className="w-full sm:w-1/2 flex justify-end">
                <Link
                  to={nextArea.path}
                  className="group flex items-center gap-3 hover:bg-slate-50 p-3 rounded-[1px] transition-colors max-w-full text-right"
                >
                  <div className="overflow-hidden">
                    <div className="text-xs text-dark/50 font-bold uppercase tracking-wider mb-0.5">
                      {nextAreaLabel}
                    </div>
                    <div className="text-sm font-bold text-dark group-hover:text-accent truncate">
                      {nextArea.label}
                    </div>
                  </div>
                  <div className="w-10 h-10 shrink-0 bg-slate-100 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
