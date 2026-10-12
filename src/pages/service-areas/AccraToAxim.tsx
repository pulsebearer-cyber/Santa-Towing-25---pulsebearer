import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAxim() {
  return (
    <>
      <SEO 
        title="Accra to Axim Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Axim with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Axim. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-axim"
        keywords={["towing Accra to Axim", "Accra Axim towing service", "tow truck Accra", "car recovery Accra Axim", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-axim"
        areaLabel="Accra to Axim"
        defaultHeading="Accra to Axim Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Axim with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Axim. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-atonsu", label: "Accra to Atonsu" }}
        nextArea={{ path: "/service-areas/accra-to-bawdie", label: "Accra to Bawdie" }}
      />
    </>
  );
}
