import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function TamaleToAccra() {
  return (
    <>
      <SEO 
        title="Tamale to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Tamale and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Tamale to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/tamale-to-accra"
        keywords={["towing Tamale to Accra", "Tamale Accra towing service", "tow truck Tamale", "vehicle recovery Tamale Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="tamale-to-accra"
        areaLabel="Tamale to Accra"
        defaultHeading="Tamale to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Tamale and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Tamale to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/takoradi-to-accra", label: "Takoradi to Accra" }}
        nextArea={{ path: "/service-areas/takoradi-to-accra", label: "Tarkwa to Accra" }}
      />
    </>
  );
}
