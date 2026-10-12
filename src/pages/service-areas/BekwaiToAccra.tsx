import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BekwaiToAccra() {
  return (
    <>
      <SEO 
        title="Bekwai to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Bekwai and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bekwai to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/bekwai-to-accra"
        keywords={["towing Bekwai to Accra", "Bekwai Accra towing service", "tow truck Bekwai", "vehicle recovery Bekwai Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bekwai-to-accra"
        areaLabel="Bekwai to Accra"
        defaultHeading="Bekwai to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Bekwai and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bekwai to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/begoro-to-accra", label: "Begoro to Accra" }}
        nextArea={{ path: "/service-areas/begoro-to-accra", label: "Berekum to Accra" }}
      />
    </>
  );
}
