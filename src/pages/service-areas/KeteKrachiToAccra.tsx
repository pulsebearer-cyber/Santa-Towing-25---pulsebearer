import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KeteKrachiToAccra() {
  return (
    <>
      <SEO 
        title="Kete Krachi to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Kete Krachi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kete Krachi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/kete-krachi-to-accra"
        keywords={["towing Kete Krachi to Accra", "Kete Krachi Accra towing service", "tow truck Kete Krachi", "vehicle recovery Kete Krachi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="kete-krachi-to-accra"
        areaLabel="Kete Krachi to Accra"
        defaultHeading="Kete Krachi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Kete Krachi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kete Krachi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/keta-to-accra", label: "Keta to Accra" }}
        nextArea={{ path: "/service-areas/keta-to-accra", label: "Kintampo to Accra" }}
      />
    </>
  );
}
