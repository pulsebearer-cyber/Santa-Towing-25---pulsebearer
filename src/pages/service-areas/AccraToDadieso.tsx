import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDadieso() {
  return (
    <>
      <SEO 
        title="Accra to Dadieso Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Dadieso with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Dadieso. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-dadieso"
        keywords={["towing Accra to Dadieso", "Accra Dadieso towing service", "tow truck Accra", "car recovery Accra Dadieso", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-dadieso"
        areaLabel="Accra to Dadieso"
        defaultHeading="Accra to Dadieso Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Dadieso with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Dadieso. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-daboya", label: "Accra to Daboya" }}
        nextArea={{ path: "/service-areas/accra-to-dambai", label: "Accra to Dambai" }}
      />
    </>
  );
}
