import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function FomenaToAccra() {
  return (
    <>
      <SEO 
        title="Fomena to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Fomena and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Fomena to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/fomena-to-accra"
        keywords={["towing Fomena to Accra", "Fomena Accra towing service", "tow truck Fomena", "vehicle recovery Fomena Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="fomena-to-accra"
        areaLabel="Fomena to Accra"
        defaultHeading="Fomena to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Fomena and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Fomena to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/enchi-to-accra", label: "Enchi to Accra" }}
        nextArea={{ path: "/service-areas/enchi-to-accra", label: "Fumbisi to Accra" }}
      />
    </>
  );
}
