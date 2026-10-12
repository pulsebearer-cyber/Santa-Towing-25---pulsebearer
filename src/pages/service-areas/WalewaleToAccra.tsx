import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function WalewaleToAccra() {
  return (
    <>
      <SEO 
        title="Walewale to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Walewale and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Walewale to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/walewale-to-accra"
        keywords={["towing Walewale to Accra", "Walewale Accra towing service", "tow truck Walewale", "vehicle recovery Walewale Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="walewale-to-accra"
        areaLabel="Walewale to Accra"
        defaultHeading="Walewale to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Walewale and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Walewale to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/wa-to-accra", label: "Wa to Accra" }}
        nextArea={{ path: "/service-areas/wa-to-accra", label: "Wassa Akropong to Accra" }}
      />
    </>
  );
}
