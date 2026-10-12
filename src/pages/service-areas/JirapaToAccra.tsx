import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function JirapaToAccra() {
  return (
    <>
      <SEO 
        title="Jirapa to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Jirapa and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Jirapa to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/jirapa-to-accra"
        keywords={["towing Jirapa to Accra", "Jirapa Accra towing service", "tow truck Jirapa", "vehicle recovery Jirapa Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="jirapa-to-accra"
        areaLabel="Jirapa to Accra"
        defaultHeading="Jirapa to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Jirapa and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Jirapa to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/jasikan-to-accra", label: "Jasikan to Accra" }}
        nextArea={{ path: "/service-areas/jasikan-to-accra", label: "Juaben to Accra" }}
      />
    </>
  );
}
