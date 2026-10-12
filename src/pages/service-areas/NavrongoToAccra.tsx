import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NavrongoToAccra() {
  return (
    <>
      <SEO 
        title="Navrongo to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Navrongo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Navrongo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/navrongo-to-accra"
        keywords={["towing Navrongo to Accra", "Navrongo Accra towing service", "tow truck Navrongo", "vehicle recovery Navrongo Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="navrongo-to-accra"
        areaLabel="Navrongo to Accra"
        defaultHeading="Navrongo to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Navrongo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Navrongo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/nandom-to-accra", label: "Nandom to Accra" }}
        nextArea={{ path: "/service-areas/nandom-to-accra", label: "Nima" }}
      />
    </>
  );
}
