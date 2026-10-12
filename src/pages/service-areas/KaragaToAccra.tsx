import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KaragaToAccra() {
  return (
    <>
      <SEO 
        title="Karaga to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Karaga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Karaga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/karaga-to-accra"
        keywords={["towing Karaga to Accra", "Karaga Accra towing service", "tow truck Karaga", "vehicle recovery Karaga Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="karaga-to-accra"
        areaLabel="Karaga to Accra"
        defaultHeading="Karaga to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Karaga and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Karaga to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/kaneshie", label: "Kaneshie" }}
        nextArea={{ path: "/service-areas/kaneshie", label: "Kasoa" }}
      />
    </>
  );
}
