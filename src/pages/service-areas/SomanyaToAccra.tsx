import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SomanyaToAccra() {
  return (
    <>
      <SEO 
        title="Somanya to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Somanya and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Somanya to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/somanya-to-accra"
        keywords={["towing Somanya to Accra", "Somanya Accra towing service", "tow truck Somanya", "vehicle recovery Somanya Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="somanya-to-accra"
        areaLabel="Somanya to Accra"
        defaultHeading="Somanya to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Somanya and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Somanya to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/sogakope-to-accra", label: "Sogakope to Accra" }}
        nextArea={{ path: "/service-areas/sogakope-to-accra", label: "Spintex" }}
      />
    </>
  );
}
