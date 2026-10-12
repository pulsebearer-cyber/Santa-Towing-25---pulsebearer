import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AssinFosuToAccra() {
  return (
    <>
      <SEO 
        title="Assin Fosu to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Assin Fosu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Assin Fosu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/assin-fosu-to-accra"
        keywords={["towing Assin Fosu to Accra", "Assin Fosu Accra towing service", "tow truck Assin Fosu", "vehicle recovery Assin Fosu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="assin-fosu-to-accra"
        areaLabel="Assin Fosu to Accra"
        defaultHeading="Assin Fosu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Assin Fosu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Assin Fosu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/ashaiman", label: "Ashaiman" }}
        nextArea={{ path: "/service-areas/ashaiman", label: "Atebubu to Accra" }}
      />
    </>
  );
}
