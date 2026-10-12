import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BolgatangaToAccra() {
  return (
    <>
      <SEO 
        title="Bolgatanga to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Bolgatanga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bolgatanga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/bolgatanga-to-accra"
        keywords={["towing Bolgatanga to Accra", "Bolgatanga Accra towing service", "tow truck Bolgatanga", "vehicle recovery Bolgatanga Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bolgatanga-to-accra"
        areaLabel="Bolgatanga to Accra"
        defaultHeading="Bolgatanga to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Bolgatanga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bolgatanga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/bogoso-to-accra", label: "Bogoso to Accra" }}
        nextArea={{ path: "/service-areas/bogoso-to-accra", label: "Buipe to Accra" }}
      />
    </>
  );
}
