import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToPrestea() {
  return (
    <>
      <SEO 
        title="Accra to Prestea Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Prestea? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Prestea, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-prestea"
        keywords={["towing Accra to Prestea", "Accra Prestea towing service", "tow truck Accra", "car recovery Accra Prestea", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-prestea"
        areaLabel="Accra to Prestea"
        defaultHeading="Accra to Prestea Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Prestea? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Prestea, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-prang", label: "Accra to Prang" }}
        nextArea={{ path: "/service-areas/accra-to-prang", label: "Accra to Salaga" }}
      />
    </>
  );
}
