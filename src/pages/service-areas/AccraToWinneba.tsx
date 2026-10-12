import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToWinneba() {
  return (
    <>
      <SEO 
        title="Accra to Winneba Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Winneba with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Winneba. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-winneba"
        keywords={["towing Accra to Winneba", "Accra Winneba towing service", "tow truck Accra", "vehicle recovery Accra Winneba", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-winneba"
        areaLabel="Accra to Winneba"
        defaultHeading="Accra to Winneba Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Winneba with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Winneba. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-wenchi", label: "Accra to Wenchi" }}
        nextArea={{ path: "/service-areas/accra-to-wenchi", label: "Accra to Yeji" }}
      />
    </>
  );
}
