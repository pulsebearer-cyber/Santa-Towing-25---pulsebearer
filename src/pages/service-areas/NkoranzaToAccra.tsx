import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NkoranzaToAccra() {
  return (
    <>
      <SEO 
        title="Nkoranza to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Nkoranza and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Nkoranza to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/nkoranza-to-accra"
        keywords={["towing Nkoranza to Accra", "Nkoranza Accra towing service", "tow truck Nkoranza", "vehicle recovery Nkoranza Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nkoranza-to-accra"
        areaLabel="Nkoranza to Accra"
        defaultHeading="Nkoranza to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Nkoranza and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Nkoranza to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/nkawkaw-to-accra", label: "Nkawkaw to Accra" }}
        nextArea={{ path: "/service-areas/nkawkaw-to-accra", label: "Nkwanta South to Accra" }}
      />
    </>
  );
}
