import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function PagaToAccra() {
  return (
    <>
      <SEO 
        title="Paga to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Paga and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Paga to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/paga-to-accra"
        keywords={["towing Paga to Accra", "Paga Accra towing service", "tow truck Paga", "vehicle recovery Paga Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="paga-to-accra"
        areaLabel="Paga to Accra"
        defaultHeading="Paga to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Paga and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Paga to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/osu", label: "Osu" }}
        nextArea={{ path: "/service-areas/osu", label: "Pokuase" }}
      />
    </>
  );
}
