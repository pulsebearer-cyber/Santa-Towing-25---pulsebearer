import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function GambagaToAccra() {
  return (
    <>
      <SEO 
        title="Gambaga to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Gambaga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Gambaga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/gambaga-to-accra"
        keywords={["towing Gambaga to Accra", "Gambaga Accra towing service", "tow truck Gambaga", "vehicle recovery Gambaga Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="gambaga-to-accra"
        areaLabel="Gambaga to Accra"
        defaultHeading="Gambaga to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Gambaga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Gambaga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/fumbisi-to-accra", label: "Fumbisi to Accra" }}
        nextArea={{ path: "/service-areas/fumbisi-to-accra", label: "Goaso to Accra" }}
      />
    </>
  );
}
