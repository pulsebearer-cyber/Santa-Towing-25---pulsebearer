import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BegoroToAccra() {
  return (
    <>
      <SEO 
        title="Begoro to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Begoro and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Begoro to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/begoro-to-accra"
        keywords={["towing Begoro to Accra", "Begoro Accra towing service", "tow truck Begoro", "vehicle recovery Begoro Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="begoro-to-accra"
        areaLabel="Begoro to Accra"
        defaultHeading="Begoro to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Begoro and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Begoro to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/bechem-to-accra", label: "Bechem to Accra" }}
        nextArea={{ path: "/service-areas/bechem-to-accra", label: "Bekwai to Accra" }}
      />
    </>
  );
}
