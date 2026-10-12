import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSekondi() {
  return (
    <>
      <SEO 
        title="Accra to Sekondi Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Accra and Sekondi? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Accra to Sekondi, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-sekondi"
        keywords={["towing Accra to Sekondi", "Accra Sekondi towing service", "tow truck Accra", "vehicle recovery Accra Sekondi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-sekondi"
        areaLabel="Accra to Sekondi"
        defaultHeading="Accra to Sekondi Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Sekondi? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Accra to Sekondi, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination."
        prevArea={{ path: "/service-areas/accra-to-sefwi-wiawso", label: "Accra to Sefwi Wiawso" }}
        nextArea={{ path: "/service-areas/accra-to-sefwi-wiawso", label: "Accra to Shama" }}
      />
    </>
  );
}
