import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function JuabenToAccra() {
  return (
    <>
      <SEO 
        title="Juaben to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Juaben and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Juaben to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/juaben-to-accra"
        keywords={["towing Juaben to Accra", "Juaben Accra towing service", "tow truck Juaben", "vehicle recovery Juaben Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="juaben-to-accra"
        areaLabel="Juaben to Accra"
        defaultHeading="Juaben to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Juaben and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Juaben to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/jirapa-to-accra", label: "Jirapa to Accra" }}
        nextArea={{ path: "/service-areas/jirapa-to-accra", label: "Juaboso to Accra" }}
      />
    </>
  );
}
