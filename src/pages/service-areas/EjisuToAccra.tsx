import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function EjisuToAccra() {
  return (
    <>
      <SEO 
        title="Ejisu to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Ejisu and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Ejisu to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/ejisu-to-accra"
        keywords={["towing Ejisu to Accra", "Ejisu Accra towing service", "tow truck Ejisu", "vehicle recovery Ejisu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="ejisu-to-accra"
        areaLabel="Ejisu to Accra"
        defaultHeading="Ejisu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Ejisu and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Ejisu to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/east-legon", label: "East Legon" }}
        nextArea={{ path: "/service-areas/east-legon", label: "Elmina to Accra" }}
      />
    </>
  );
}
