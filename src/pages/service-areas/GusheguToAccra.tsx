import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function GusheguToAccra() {
  return (
    <>
      <SEO 
        title="Gushegu to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Gushegu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Gushegu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/gushegu-to-accra"
        keywords={["towing Gushegu to Accra", "Gushegu Accra towing service", "tow truck Gushegu", "vehicle recovery Gushegu Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="gushegu-to-accra"
        areaLabel="Gushegu to Accra"
        defaultHeading="Gushegu to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Gushegu and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Gushegu to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/goaso-to-accra", label: "Goaso to Accra" }}
        nextArea={{ path: "/service-areas/goaso-to-accra", label: "Half Assini to Accra" }}
      />
    </>
  );
}
