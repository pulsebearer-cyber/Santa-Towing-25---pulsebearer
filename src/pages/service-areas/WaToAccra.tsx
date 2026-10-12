import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function WaToAccra() {
  return (
    <>
      <SEO 
        title="Wa to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Wa and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Wa to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/wa-to-accra"
        keywords={["towing Wa to Accra", "Wa Accra towing service", "tow truck Wa", "vehicle recovery Wa Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="wa-to-accra"
        areaLabel="Wa to Accra"
        defaultHeading="Wa to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Wa and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Wa to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/tumu-to-accra", label: "Tumu to Accra" }}
        nextArea={{ path: "/service-areas/tumu-to-accra", label: "Walewale to Accra" }}
      />
    </>
  );
}
