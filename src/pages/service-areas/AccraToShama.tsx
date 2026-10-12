import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToShama() {
  return (
    <>
      <SEO 
        title="Accra to Shama Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Shama with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Shama. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-shama"
        keywords={["towing Accra to Shama", "Accra Shama towing service", "tow truck Accra", "vehicle recovery Accra Shama", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-shama"
        areaLabel="Accra to Shama"
        defaultHeading="Accra to Shama Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Shama with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Shama. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-sekondi", label: "Accra to Sekondi" }}
        nextArea={{ path: "/service-areas/accra-to-sekondi", label: "Accra to Sogakope" }}
      />
    </>
  );
}
