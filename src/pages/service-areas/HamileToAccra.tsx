import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function HamileToAccra() {
  return (
    <>
      <SEO 
        title="Hamile to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Hamile and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Hamile to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/hamile-to-accra"
        keywords={["towing Hamile to Accra", "Hamile Accra towing service", "tow truck Hamile", "vehicle recovery Hamile Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="hamile-to-accra"
        areaLabel="Hamile to Accra"
        defaultHeading="Hamile to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Hamile and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Hamile to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/half-assini-to-accra", label: "Half Assini to Accra" }}
        nextArea={{ path: "/service-areas/half-assini-to-accra", label: "Ho to Accra" }}
      />
    </>
  );
}
