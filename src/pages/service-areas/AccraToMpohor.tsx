import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToMpohor() {
  return (
    <>
      <SEO 
        title="Accra to Mpohor Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Mpohor? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Mpohor, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-mpohor"
        keywords={["towing Accra to Mpohor", "Accra Mpohor towing service", "tow truck Accra", "car recovery Accra Mpohor", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-mpohor"
        areaLabel="Accra to Mpohor"
        defaultHeading="Accra to Mpohor Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Mpohor? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Mpohor, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-mim", label: "Accra to Mim" }}
        nextArea={{ path: "/service-areas/accra-to-mim", label: "Accra to Nalerigu" }}
      />
    </>
  );
}
