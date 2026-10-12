import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSefwiWiawso() {
  return (
    <>
      <SEO 
        title="Accra to Sefwi Wiawso Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Sefwi Wiawso? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Sefwi Wiawso, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-sefwi-wiawso"
        keywords={["towing Accra to Sefwi Wiawso", "Accra Sefwi Wiawso towing service", "tow truck Accra", "car recovery Accra Sefwi Wiawso", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-sefwi-wiawso"
        areaLabel="Accra to Sefwi Wiawso"
        defaultHeading="Accra to Sefwi Wiawso Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Sefwi Wiawso? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Sefwi Wiawso, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-sefwi-bekwai", label: "Accra to Sefwi Bekwai" }}
        nextArea={{ path: "/service-areas/accra-to-sefwi-bekwai", label: "Accra to Sekondi" }}
      />
    </>
  );
}
