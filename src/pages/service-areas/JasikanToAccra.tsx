import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function JasikanToAccra() {
  return (
    <>
      <SEO 
        title="Jasikan to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Jasikan and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Jasikan to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/jasikan-to-accra"
        keywords={["towing Jasikan to Accra", "Jasikan Accra towing service", "tow truck Jasikan", "vehicle recovery Jasikan Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="jasikan-to-accra"
        areaLabel="Jasikan to Accra"
        defaultHeading="Jasikan to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Jasikan and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Jasikan to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/hwidiem-to-accra", label: "Hwidiem to Accra" }}
        nextArea={{ path: "/service-areas/hwidiem-to-accra", label: "Jirapa to Accra" }}
      />
    </>
  );
}
