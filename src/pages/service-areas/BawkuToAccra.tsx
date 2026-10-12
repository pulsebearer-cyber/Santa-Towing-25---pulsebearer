import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BawkuToAccra() {
  return (
    <>
      <SEO 
        title="Bawku to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Bawku and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bawku to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/bawku-to-accra"
        keywords={["towing Bawku to Accra", "Bawku Accra towing service", "tow truck Bawku", "vehicle recovery Bawku Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bawku-to-accra"
        areaLabel="Bawku to Accra"
        defaultHeading="Bawku to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Bawku and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Bawku to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/bawdie-to-accra", label: "Bawdie to Accra" }}
        nextArea={{ path: "/service-areas/bawdie-to-accra", label: "Bechem to Accra" }}
      />
    </>
  );
}
