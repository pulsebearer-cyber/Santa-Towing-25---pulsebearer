import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AtebubuToAccra() {
  return (
    <>
      <SEO 
        title="Atebubu to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Atebubu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Atebubu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/atebubu-to-accra"
        keywords={["towing Atebubu to Accra", "Atebubu Accra towing service", "tow truck Atebubu", "vehicle recovery Atebubu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="atebubu-to-accra"
        areaLabel="Atebubu to Accra"
        defaultHeading="Atebubu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Atebubu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Atebubu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/assin-fosu-to-accra", label: "Assin Fosu to Accra" }}
        nextArea={{ path: "/service-areas/assin-fosu-to-accra", label: "Atonsu to Accra" }}
      />
    </>
  );
}
