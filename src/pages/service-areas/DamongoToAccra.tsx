import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DamongoToAccra() {
  return (
    <>
      <SEO 
        title="Damongo to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Damongo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Damongo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/damongo-to-accra"
        keywords={["towing Damongo to Accra", "Damongo Accra towing service", "tow truck Damongo", "vehicle recovery Damongo Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="damongo-to-accra"
        areaLabel="Damongo to Accra"
        defaultHeading="Damongo to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Damongo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Damongo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/dambai-to-accra", label: "Dambai to Accra" }}
        nextArea={{ path: "/service-areas/dambai-to-accra", label: "Dansoman" }}
      />
    </>
  );
}
