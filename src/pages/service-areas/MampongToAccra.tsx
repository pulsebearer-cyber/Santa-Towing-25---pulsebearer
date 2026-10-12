import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function MampongToAccra() {
  return (
    <>
      <SEO 
        title="Mampong to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Mampong and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Mampong to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/mampong-to-accra"
        keywords={["towing Mampong to Accra", "Mampong Accra towing service", "tow truck Mampong", "vehicle recovery Mampong Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="mampong-to-accra"
        areaLabel="Mampong to Accra"
        defaultHeading="Mampong to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Mampong and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Mampong to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/madina", label: "Madina" }}
        nextArea={{ path: "/service-areas/madina", label: "Mankessim to Accra" }}
      />
    </>
  );
}
