import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToHalfAssini() {
  return (
    <>
      <SEO 
        title="Accra to Half Assini Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Half Assini? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Half Assini, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-half-assini"
        keywords={["towing Accra to Half Assini", "Accra Half Assini towing service", "tow truck Accra", "car recovery Accra Half Assini", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-half-assini"
        areaLabel="Accra to Half Assini"
        defaultHeading="Accra to Half Assini Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Half Assini? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Half Assini, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-goaso", label: "Accra to Goaso" }}
        nextArea={{ path: "/service-areas/accra-to-hamile", label: "Accra to Hamile" }}
      />
    </>
  );
}
