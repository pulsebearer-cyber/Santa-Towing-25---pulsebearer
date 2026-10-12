import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DambaiToAccra() {
  return (
    <>
      <SEO 
        title="Dambai to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Dambai and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Dambai to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/dambai-to-accra"
        keywords={["towing Dambai to Accra", "Dambai Accra towing service", "tow truck Dambai", "vehicle recovery Dambai Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="dambai-to-accra"
        areaLabel="Dambai to Accra"
        defaultHeading="Dambai to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Dambai and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Dambai to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/dadieso-to-accra", label: "Dadieso to Accra" }}
        nextArea={{ path: "/service-areas/dadieso-to-accra", label: "Damongo to Accra" }}
      />
    </>
  );
}
