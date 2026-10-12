import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTakoradi() {
  return (
    <>
      <SEO 
        title="Accra to Takoradi Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Takoradi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Takoradi. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-takoradi"
        keywords={["towing Accra to Takoradi", "Accra Takoradi towing service", "tow truck Accra", "vehicle recovery Accra Takoradi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-takoradi"
        areaLabel="Accra to Takoradi"
        defaultHeading="Accra to Takoradi Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Takoradi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Takoradi."
        prevArea={{ path: "/service-areas/accra-to-sunyani", label: "Accra to Sunyani" }}
        nextArea={{ path: "/service-areas/accra-to-sunyani", label: "Accra to Tamale" }}
      />
    </>
  );
}
