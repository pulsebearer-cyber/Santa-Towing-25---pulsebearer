import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBodi() {
  return (
    <>
      <SEO 
        title="Accra to Bodi Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Bodi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Bodi. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-bodi"
        keywords={["towing Accra to Bodi", "Accra Bodi towing service", "tow truck Accra", "car recovery Accra Bodi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bodi"
        areaLabel="Accra to Bodi"
        defaultHeading="Accra to Bodi Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Bodi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Bodi. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-bibiani", label: "Accra to Bibiani" }}
        nextArea={{ path: "/service-areas/accra-to-bogoso", label: "Accra to Bogoso" }}
      />
    </>
  );
}
