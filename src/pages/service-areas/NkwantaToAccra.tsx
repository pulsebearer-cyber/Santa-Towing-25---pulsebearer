import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NkwantaToAccra() {
  return (
    <>
      <SEO 
        title="Nkwanta to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Nkwanta and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nkwanta to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/nkwanta-to-accra"
        keywords={["towing Nkwanta to Accra", "Nkwanta Accra towing service", "tow truck Nkwanta", "vehicle recovery Nkwanta Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nkwanta-to-accra"
        areaLabel="Nkwanta to Accra"
        defaultHeading="Nkwanta to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Nkwanta and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nkwanta to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/nkwanta-south-to-accra", label: "Nkwanta South to Accra" }}
        nextArea={{ path: "/service-areas/nkwanta-south-to-accra", label: "Nsawam to Accra" }}
      />
    </>
  );
}
