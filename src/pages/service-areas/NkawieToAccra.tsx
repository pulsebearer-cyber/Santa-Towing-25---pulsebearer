import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NkawieToAccra() {
  return (
    <>
      <SEO 
        title="Nkawie to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Nkawie and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Nkawie to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/nkawie-to-accra"
        keywords={["towing Nkawie to Accra", "Nkawie Accra towing service", "tow truck Nkawie", "vehicle recovery Nkawie Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nkawie-to-accra"
        areaLabel="Nkawie to Accra"
        defaultHeading="Nkawie to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Nkawie and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Nkawie to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/ningo-prampram", label: "Ningo Prampram" }}
        nextArea={{ path: "/service-areas/ningo-prampram", label: "Nkawkaw to Accra" }}
      />
    </>
  );
}
