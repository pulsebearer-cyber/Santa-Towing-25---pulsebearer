import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function PrangToAccra() {
  return (
    <>
      <SEO 
        title="Prang to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Prang and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Prang to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/prang-to-accra"
        keywords={["towing Prang to Accra", "Prang Accra towing service", "tow truck Prang", "vehicle recovery Prang Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="prang-to-accra"
        areaLabel="Prang to Accra"
        defaultHeading="Prang to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Prang and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Prang to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/prampram", label: "Prampram" }}
        nextArea={{ path: "/service-areas/prampram", label: "Prestea to Accra" }}
      />
    </>
  );
}
