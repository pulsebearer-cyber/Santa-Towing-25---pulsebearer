import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSamreboi() {
  return (
    <>
      <SEO 
        title="Accra to Samreboi Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Samreboi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Samreboi. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-samreboi"
        keywords={["towing Accra to Samreboi", "Accra Samreboi towing service", "tow truck Accra", "car recovery Accra Samreboi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-samreboi"
        areaLabel="Accra to Samreboi"
        defaultHeading="Accra to Samreboi Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Samreboi with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Samreboi. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-salaga", label: "Accra to Salaga" }}
        nextArea={{ path: "/service-areas/accra-to-salaga", label: "Accra to Sandema" }}
      />
    </>
  );
}
