import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDaboase() {
  return (
    <>
      <SEO 
        title="Accra to Daboase Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Daboase? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Daboase, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-daboase"
        keywords={["towing Accra to Daboase", "Accra Daboase towing service", "tow truck Accra", "car recovery Accra Daboase", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-daboase"
        areaLabel="Accra to Daboase"
        defaultHeading="Accra to Daboase Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Daboase? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Daboase, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-cape-coast", label: "Accra to Cape Coast" }}
        nextArea={{ path: "/service-areas/accra-to-daboya", label: "Accra to Daboya" }}
      />
    </>
  );
}
