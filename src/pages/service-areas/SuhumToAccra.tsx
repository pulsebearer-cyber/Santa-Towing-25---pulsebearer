import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SuhumToAccra() {
  return (
    <>
      <SEO 
        title="Suhum to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Suhum and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Suhum to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/suhum-to-accra"
        keywords={["towing Suhum to Accra", "Suhum Accra towing service", "tow truck Suhum", "vehicle recovery Suhum Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="suhum-to-accra"
        areaLabel="Suhum to Accra"
        defaultHeading="Suhum to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Suhum and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Suhum to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/spintex", label: "Spintex" }}
        nextArea={{ path: "/service-areas/spintex", label: "Sunyani to Accra" }}
      />
    </>
  );
}
