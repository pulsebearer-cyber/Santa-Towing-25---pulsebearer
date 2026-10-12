import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToMankessim() {
  return (
    <>
      <SEO 
        title="Accra to Mankessim Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Mankessim? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Mankessim, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-mankessim"
        keywords={["towing Accra to Mankessim", "Accra Mankessim towing service", "tow truck Accra", "car recovery Accra Mankessim", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-mankessim"
        areaLabel="Accra to Mankessim"
        defaultHeading="Accra to Mankessim Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Mankessim? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Mankessim, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-mampong", label: "Accra to Mampong" }}
        nextArea={{ path: "/service-areas/accra-to-mampong", label: "Accra to Mim" }}
      />
    </>
  );
}
