import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function GoasoToAccra() {
  return (
    <>
      <SEO 
        title="Goaso to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Goaso and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Goaso to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/goaso-to-accra"
        keywords={["towing Goaso to Accra", "Goaso Accra towing service", "tow truck Goaso", "vehicle recovery Goaso Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="goaso-to-accra"
        areaLabel="Goaso to Accra"
        defaultHeading="Goaso to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Goaso and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Goaso to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/gambaga-to-accra", label: "Gambaga to Accra" }}
        nextArea={{ path: "/service-areas/gambaga-to-accra", label: "Gushegu to Accra" }}
      />
    </>
  );
}
