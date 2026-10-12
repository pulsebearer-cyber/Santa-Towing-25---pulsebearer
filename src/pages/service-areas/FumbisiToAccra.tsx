import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function FumbisiToAccra() {
  return (
    <>
      <SEO 
        title="Fumbisi to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Fumbisi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Fumbisi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/fumbisi-to-accra"
        keywords={["towing Fumbisi to Accra", "Fumbisi Accra towing service", "tow truck Fumbisi", "vehicle recovery Fumbisi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="fumbisi-to-accra"
        areaLabel="Fumbisi to Accra"
        defaultHeading="Fumbisi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Fumbisi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Fumbisi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/fomena-to-accra", label: "Fomena to Accra" }}
        nextArea={{ path: "/service-areas/fomena-to-accra", label: "Gambaga to Accra" }}
      />
    </>
  );
}
