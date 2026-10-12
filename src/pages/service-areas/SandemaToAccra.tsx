import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SandemaToAccra() {
  return (
    <>
      <SEO 
        title="Sandema to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Sandema and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Sandema to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/sandema-to-accra"
        keywords={["towing Sandema to Accra", "Sandema Accra towing service", "tow truck Sandema", "vehicle recovery Sandema Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="sandema-to-accra"
        areaLabel="Sandema to Accra"
        defaultHeading="Sandema to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Sandema and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Sandema to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/samreboi-to-accra", label: "Samreboi to Accra" }}
        nextArea={{ path: "/service-areas/samreboi-to-accra", label: "Savelugu to Accra" }}
      />
    </>
  );
}
