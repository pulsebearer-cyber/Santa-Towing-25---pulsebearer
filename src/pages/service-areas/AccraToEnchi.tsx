import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToEnchi() {
  return (
    <>
      <SEO 
        title="Accra to Enchi Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Enchi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Enchi. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-enchi"
        keywords={["towing Accra to Enchi", "Accra Enchi towing service", "tow truck Accra", "car recovery Accra Enchi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-enchi"
        areaLabel="Accra to Enchi"
        defaultHeading="Accra to Enchi Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Enchi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Enchi. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-elubo", label: "Accra to Elubo" }}
        nextArea={{ path: "/service-areas/accra-to-fomena", label: "Accra to Fomena" }}
      />
    </>
  );
}
