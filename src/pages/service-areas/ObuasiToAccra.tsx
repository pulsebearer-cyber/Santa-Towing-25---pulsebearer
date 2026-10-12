import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function ObuasiToAccra() {
  return (
    <>
      <SEO 
        title="Obuasi to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Obuasi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Obuasi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/obuasi-to-accra"
        keywords={["towing Obuasi to Accra", "Obuasi Accra towing service", "tow truck Obuasi", "vehicle recovery Obuasi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="obuasi-to-accra"
        areaLabel="Obuasi to Accra"
        defaultHeading="Obuasi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Obuasi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Obuasi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/nungua", label: "Nungua" }}
        nextArea={{ path: "/service-areas/nungua", label: "Odumase Krobo to Accra" }}
      />
    </>
  );
}
