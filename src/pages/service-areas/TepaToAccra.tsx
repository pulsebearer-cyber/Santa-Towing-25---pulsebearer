import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function TepaToAccra() {
  return (
    <>
      <SEO 
        title="Tepa to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Tepa and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Tepa to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/tepa-to-accra"
        keywords={["towing Tepa to Accra", "Tepa Accra towing service", "tow truck Tepa", "vehicle recovery Tepa Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="tepa-to-accra"
        areaLabel="Tepa to Accra"
        defaultHeading="Tepa to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Tepa and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Tepa to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/tema", label: "Tema" }}
        nextArea={{ path: "/service-areas/tema", label: "Tesano" }}
      />
    </>
  );
}
