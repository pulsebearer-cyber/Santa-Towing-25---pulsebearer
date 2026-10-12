import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AsanteAkimToAccra() {
  return (
    <>
      <SEO 
        title="Asante Akim to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Asante Akim and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Asante Akim to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/asante-akim-to-accra"
        keywords={["towing Asante Akim to Accra", "Asante Akim Accra towing service", "tow truck Asante Akim", "vehicle recovery Asante Akim Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="asante-akim-to-accra"
        areaLabel="Asante Akim to Accra"
        defaultHeading="Asante Akim to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Asante Akim and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Asante Akim to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/asankragwa-to-accra", label: "Asankragwa to Accra" }}
        nextArea={{ path: "/service-areas/asankragwa-to-accra", label: "Ashaiman" }}
      />
    </>
  );
}
