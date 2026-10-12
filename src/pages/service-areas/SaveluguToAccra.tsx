import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SaveluguToAccra() {
  return (
    <>
      <SEO 
        title="Savelugu to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Savelugu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Savelugu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/savelugu-to-accra"
        keywords={["towing Savelugu to Accra", "Savelugu Accra towing service", "tow truck Savelugu", "vehicle recovery Savelugu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="savelugu-to-accra"
        areaLabel="Savelugu to Accra"
        defaultHeading="Savelugu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Savelugu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Savelugu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/sandema-to-accra", label: "Sandema to Accra" }}
        nextArea={{ path: "/service-areas/sandema-to-accra", label: "Sefwi Bekwai to Accra" }}
      />
    </>
  );
}
