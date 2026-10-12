import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTarkwa() {
  return (
    <>
      <SEO 
        title="Accra to Tarkwa Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Accra and Tarkwa? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Accra to Tarkwa, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-tarkwa"
        keywords={["towing Accra to Tarkwa", "Accra Tarkwa towing service", "tow truck Accra", "vehicle recovery Accra Tarkwa", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-tarkwa"
        areaLabel="Accra to Tarkwa"
        defaultHeading="Accra to Tarkwa Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Tarkwa? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Accra to Tarkwa, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination."
        prevArea={{ path: "/service-areas/accra-to-tamale", label: "Accra to Tamale" }}
        nextArea={{ path: "/service-areas/accra-to-tamale", label: "Accra to Techiman" }}
      />
    </>
  );
}
