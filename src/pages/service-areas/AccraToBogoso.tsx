import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBogoso() {
  return (
    <>
      <SEO 
        title="Accra to Bogoso Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Bogoso with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Bogoso. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-bogoso"
        keywords={["towing Accra to Bogoso", "Accra Bogoso towing service", "tow truck Accra", "car recovery Accra Bogoso", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bogoso"
        areaLabel="Accra to Bogoso"
        defaultHeading="Accra to Bogoso Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Bogoso with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Bogoso. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-bodi", label: "Accra to Bodi" }}
        nextArea={{ path: "/service-areas/accra-to-bole", label: "Accra to Bole" }}
      />
    </>
  );
}
