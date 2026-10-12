import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NandomToAccra() {
  return (
    <>
      <SEO 
        title="Nandom to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Nandom and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nandom to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/nandom-to-accra"
        keywords={["towing Nandom to Accra", "Nandom Accra towing service", "tow truck Nandom", "vehicle recovery Nandom Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nandom-to-accra"
        areaLabel="Nandom to Accra"
        defaultHeading="Nandom to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Nandom and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nandom to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/nalerigu-to-accra", label: "Nalerigu to Accra" }}
        nextArea={{ path: "/service-areas/nalerigu-to-accra", label: "Navrongo to Accra" }}
      />
    </>
  );
}
