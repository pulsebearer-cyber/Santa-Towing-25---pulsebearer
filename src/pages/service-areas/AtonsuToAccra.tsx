import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AtonsuToAccra() {
  return (
    <>
      <SEO 
        title="Atonsu to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Atonsu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Atonsu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/atonsu-to-accra"
        keywords={["towing Atonsu to Accra", "Atonsu Accra towing service", "tow truck Atonsu", "vehicle recovery Atonsu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="atonsu-to-accra"
        areaLabel="Atonsu to Accra"
        defaultHeading="Atonsu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Atonsu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Atonsu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/atebubu-to-accra", label: "Atebubu to Accra" }}
        nextArea={{ path: "/service-areas/atebubu-to-accra", label: "Axim to Accra" }}
      />
    </>
  );
}
