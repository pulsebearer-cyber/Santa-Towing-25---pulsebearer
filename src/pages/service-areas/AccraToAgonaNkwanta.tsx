import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAgonaNkwanta() {
  return (
    <>
      <SEO 
        title="Accra to Agona Nkwanta Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Agona Nkwanta with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Agona Nkwanta. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-agona-nkwanta"
        keywords={["towing Accra to Agona Nkwanta", "Accra Agona Nkwanta towing service", "tow truck Accra", "car recovery Accra Agona Nkwanta", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-agona-nkwanta"
        areaLabel="Accra to Agona Nkwanta"
        defaultHeading="Accra to Agona Nkwanta Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Agona Nkwanta with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Agona Nkwanta. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-agona", label: "Accra to Agona" }}
        nextArea={{ path: "/service-areas/accra-to-akontombra", label: "Accra to Akontombra" }}
      />
    </>
  );
}
