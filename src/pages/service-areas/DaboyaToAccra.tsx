import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DaboyaToAccra() {
  return (
    <>
      <SEO 
        title="Daboya to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Daboya and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Daboya to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/daboya-to-accra"
        keywords={["towing Daboya to Accra", "Daboya Accra towing service", "tow truck Daboya", "vehicle recovery Daboya Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="daboya-to-accra"
        areaLabel="Daboya to Accra"
        defaultHeading="Daboya to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Daboya and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Daboya to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/daboase-to-accra", label: "Daboase to Accra" }}
        nextArea={{ path: "/service-areas/daboase-to-accra", label: "Dadieso to Accra" }}
      />
    </>
  );
}
