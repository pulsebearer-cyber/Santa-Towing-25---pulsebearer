import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BechemToAccra() {
  return (
    <>
      <SEO 
        title="Bechem to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Bechem and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bechem to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/bechem-to-accra"
        keywords={["towing Bechem to Accra", "Bechem Accra towing service", "tow truck Bechem", "vehicle recovery Bechem Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bechem-to-accra"
        areaLabel="Bechem to Accra"
        defaultHeading="Bechem to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Bechem and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bechem to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/bawku-to-accra", label: "Bawku to Accra" }}
        nextArea={{ path: "/service-areas/bawku-to-accra", label: "Begoro to Accra" }}
      />
    </>
  );
}
