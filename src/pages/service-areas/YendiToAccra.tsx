import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function YendiToAccra() {
  return (
    <>
      <SEO 
        title="Yendi to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Yendi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Yendi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/yendi-to-accra"
        keywords={["towing Yendi to Accra", "Yendi Accra towing service", "tow truck Yendi", "vehicle recovery Yendi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="yendi-to-accra"
        areaLabel="Yendi to Accra"
        defaultHeading="Yendi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Yendi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Yendi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/yeji-to-accra", label: "Yeji to Accra" }}
        nextArea={{ path: "/service-areas/yeji-to-accra", label: "Zebilla to Accra" }}
      />
    </>
  );
}
