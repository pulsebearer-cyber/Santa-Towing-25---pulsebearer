import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToElubo() {
  return (
    <>
      <SEO 
        title="Accra to Elubo Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Elubo? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Elubo, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-elubo"
        keywords={["towing Accra to Elubo", "Accra Elubo towing service", "tow truck Accra", "car recovery Accra Elubo", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-elubo"
        areaLabel="Accra to Elubo"
        defaultHeading="Accra to Elubo Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Elubo? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Elubo, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-elmina", label: "Accra to Elmina" }}
        nextArea={{ path: "/service-areas/accra-to-enchi", label: "Accra to Enchi" }}
      />
    </>
  );
}
