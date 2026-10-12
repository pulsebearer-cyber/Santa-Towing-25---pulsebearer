import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KumasiToAccra() {
  return (
    <>
      <SEO 
        title="Kumasi to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Kumasi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kumasi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/kumasi-to-accra"
        keywords={["towing Kumasi to Accra", "Kumasi Accra towing service", "tow truck Kumasi", "vehicle recovery Kumasi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="kumasi-to-accra"
        areaLabel="Kumasi to Accra"
        defaultHeading="Kumasi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Kumasi and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kumasi to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/kpone", label: "Kpone" }}
        nextArea={{ path: "/service-areas/kpone", label: "Kwame Danso to Accra" }}
      />
    </>
  );
}
