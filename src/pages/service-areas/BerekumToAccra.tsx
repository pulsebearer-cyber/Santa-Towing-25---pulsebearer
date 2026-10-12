import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BerekumToAccra() {
  return (
    <>
      <SEO 
        title="Berekum to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Berekum and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Berekum to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/berekum-to-accra"
        keywords={["towing Berekum to Accra", "Berekum Accra towing service", "tow truck Berekum", "vehicle recovery Berekum Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="berekum-to-accra"
        areaLabel="Berekum to Accra"
        defaultHeading="Berekum to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Berekum and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Berekum to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/bekwai-to-accra", label: "Bekwai to Accra" }}
        nextArea={{ path: "/service-areas/bekwai-to-accra", label: "Bibiani to Accra" }}
      />
    </>
  );
}
