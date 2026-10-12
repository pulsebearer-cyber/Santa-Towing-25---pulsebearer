import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToCapeCoast() {
  return (
    <>
      <SEO 
        title="Accra to Cape Coast Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Cape Coast? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Cape Coast, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-cape-coast"
        keywords={["towing Accra to Cape Coast", "Accra Cape Coast towing service", "tow truck Accra", "car recovery Accra Cape Coast", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-cape-coast"
        areaLabel="Accra to Cape Coast"
        defaultHeading="Accra to Cape Coast Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Cape Coast? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Cape Coast, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-buipe", label: "Accra to Buipe" }}
        nextArea={{ path: "/service-areas/accra-to-daboase", label: "Accra to Daboase" }}
      />
    </>
  );
}
