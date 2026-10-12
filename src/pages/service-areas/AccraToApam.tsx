import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToApam() {
  return (
    <>
      <SEO 
        title="Accra to Apam Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Apam? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Apam, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-apam"
        keywords={["towing Accra to Apam", "Accra Apam towing service", "tow truck Accra", "car recovery Accra Apam", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-apam"
        areaLabel="Accra to Apam"
        defaultHeading="Accra to Apam Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Apam? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Apam, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-akyem-oda", label: "Accra to Akyem Oda" }}
        nextArea={{ path: "/service-areas/accra-to-asamankese", label: "Accra to Asamankese" }}
      />
    </>
  );
}
