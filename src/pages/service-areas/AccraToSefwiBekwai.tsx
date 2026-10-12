import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSefwiBekwai() {
  return (
    <>
      <SEO 
        title="Accra to Sefwi Bekwai Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Sefwi Bekwai? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Sefwi Bekwai, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-sefwi-bekwai"
        keywords={["towing Accra to Sefwi Bekwai", "Accra Sefwi Bekwai towing service", "tow truck Accra", "car recovery Accra Sefwi Bekwai", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-sefwi-bekwai"
        areaLabel="Accra to Sefwi Bekwai"
        defaultHeading="Accra to Sefwi Bekwai Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Sefwi Bekwai? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Sefwi Bekwai, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-savelugu", label: "Accra to Savelugu" }}
        nextArea={{ path: "/service-areas/accra-to-savelugu", label: "Accra to Sefwi Wiawso" }}
      />
    </>
  );
}
