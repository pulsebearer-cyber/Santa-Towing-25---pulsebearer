import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToElmina() {
  return (
    <>
      <SEO 
        title="Accra to Elmina Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Elmina with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Elmina. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-elmina"
        keywords={["towing Accra to Elmina", "Accra Elmina towing service", "tow truck Accra", "car recovery Accra Elmina", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-elmina"
        areaLabel="Accra to Elmina"
        defaultHeading="Accra to Elmina Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Elmina with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Elmina. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-ejisu", label: "Accra to Ejisu" }}
        nextArea={{ path: "/service-areas/accra-to-elubo", label: "Accra to Elubo" }}
      />
    </>
  );
}
