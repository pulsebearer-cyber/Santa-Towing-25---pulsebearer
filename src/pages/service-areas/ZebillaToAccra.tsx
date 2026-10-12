import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function ZebillaToAccra() {
  return (
    <>
      <SEO 
        title="Zebilla to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Zebilla and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Zebilla to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/zebilla-to-accra"
        keywords={["towing Zebilla to Accra", "Zebilla Accra towing service", "tow truck Zebilla", "vehicle recovery Zebilla Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="zebilla-to-accra"
        areaLabel="Zebilla to Accra"
        defaultHeading="Zebilla to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Zebilla and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Zebilla to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/yendi-to-accra", label: "Yendi to Accra" }}
      />
    </>
  );
}
