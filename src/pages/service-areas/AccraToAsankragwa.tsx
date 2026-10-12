import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAsankragwa() {
  return (
    <>
      <SEO 
        title="Accra to Asankragwa Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Asankragwa? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Asankragwa, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-asankragwa"
        keywords={["towing Accra to Asankragwa", "Accra Asankragwa towing service", "tow truck Accra", "car recovery Accra Asankragwa", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-asankragwa"
        areaLabel="Accra to Asankragwa"
        defaultHeading="Accra to Asankragwa Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Asankragwa? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Asankragwa, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-asamankese", label: "Accra to Asamankese" }}
        nextArea={{ path: "/service-areas/accra-to-asante-akim", label: "Accra to Asante Akim" }}
      />
    </>
  );
}
