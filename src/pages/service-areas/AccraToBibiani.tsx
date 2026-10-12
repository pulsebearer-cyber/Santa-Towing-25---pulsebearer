import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBibiani() {
  return (
    <>
      <SEO 
        title="Accra to Bibiani Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Bibiani with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Bibiani. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-bibiani"
        keywords={["towing Accra to Bibiani", "Accra Bibiani towing service", "tow truck Accra", "car recovery Accra Bibiani", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bibiani"
        areaLabel="Accra to Bibiani"
        defaultHeading="Accra to Bibiani Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Bibiani with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Bibiani. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-berekum", label: "Accra to Berekum" }}
        nextArea={{ path: "/service-areas/accra-to-bodi", label: "Accra to Bodi" }}
      />
    </>
  );
}
