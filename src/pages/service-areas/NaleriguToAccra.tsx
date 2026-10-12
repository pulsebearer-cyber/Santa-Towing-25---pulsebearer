import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NaleriguToAccra() {
  return (
    <>
      <SEO 
        title="Nalerigu to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Nalerigu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nalerigu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/nalerigu-to-accra"
        keywords={["towing Nalerigu to Accra", "Nalerigu Accra towing service", "tow truck Nalerigu", "vehicle recovery Nalerigu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nalerigu-to-accra"
        areaLabel="Nalerigu to Accra"
        defaultHeading="Nalerigu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Nalerigu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nalerigu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/mpohor-to-accra", label: "Mpohor to Accra" }}
        nextArea={{ path: "/service-areas/mpohor-to-accra", label: "Nandom to Accra" }}
      />
    </>
  );
}
