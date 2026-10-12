import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function MimToAccra() {
  return (
    <>
      <SEO 
        title="Mim to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Mim and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Mim to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/mim-to-accra"
        keywords={["towing Mim to Accra", "Mim Accra towing service", "tow truck Mim", "vehicle recovery Mim Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="mim-to-accra"
        areaLabel="Mim to Accra"
        defaultHeading="Mim to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Mim and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Mim to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/mankessim-to-accra", label: "Mankessim to Accra" }}
        nextArea={{ path: "/service-areas/mankessim-to-accra", label: "Mpohor to Accra" }}
      />
    </>
  );
}
