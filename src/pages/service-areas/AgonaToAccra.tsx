import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AgonaToAccra() {
  return (
    <>
      <SEO 
        title="Agona to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Agona and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Agona to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/agona-to-accra"
        keywords={["towing Agona to Accra", "Agona Accra towing service", "tow truck Agona", "vehicle recovery Agona Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="agona-to-accra"
        areaLabel="Agona to Accra"
        defaultHeading="Agona to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Agona and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Agona to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/agona-nkwanta-to-accra", label: "Agona Nkwanta to Accra" }}
        nextArea={{ path: "/service-areas/agona-nkwanta-to-accra", label: "Airport Residential" }}
      />
    </>
  );
}
