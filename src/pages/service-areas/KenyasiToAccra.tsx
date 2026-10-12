import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KenyasiToAccra() {
  return (
    <>
      <SEO 
        title="Kenyasi to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Kenyasi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kenyasi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/kenyasi-to-accra"
        keywords={["towing Kenyasi to Accra", "Kenyasi Accra towing service", "tow truck Kenyasi", "vehicle recovery Kenyasi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="kenyasi-to-accra"
        areaLabel="Kenyasi to Accra"
        defaultHeading="Kenyasi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Kenyasi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kenyasi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/kasoa", label: "Kasoa" }}
        nextArea={{ path: "/service-areas/kasoa", label: "Keta to Accra" }}
      />
    </>
  );
}
