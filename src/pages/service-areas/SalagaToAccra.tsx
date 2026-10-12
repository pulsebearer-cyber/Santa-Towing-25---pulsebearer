import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SalagaToAccra() {
  return (
    <>
      <SEO 
        title="Salaga to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Salaga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Salaga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/salaga-to-accra"
        keywords={["towing Salaga to Accra", "Salaga Accra towing service", "tow truck Salaga", "vehicle recovery Salaga Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="salaga-to-accra"
        areaLabel="Salaga to Accra"
        defaultHeading="Salaga to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Salaga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Salaga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/prestea-to-accra", label: "Prestea to Accra" }}
        nextArea={{ path: "/service-areas/prestea-to-accra", label: "Samreboi to Accra" }}
      />
    </>
  );
}
