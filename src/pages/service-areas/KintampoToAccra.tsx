import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KintampoToAccra() {
  return (
    <>
      <SEO 
        title="Kintampo to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Kintampo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kintampo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/kintampo-to-accra"
        keywords={["towing Kintampo to Accra", "Kintampo Accra towing service", "tow truck Kintampo", "vehicle recovery Kintampo Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="kintampo-to-accra"
        areaLabel="Kintampo to Accra"
        defaultHeading="Kintampo to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Kintampo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Kintampo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/kete-krachi-to-accra", label: "Kete Krachi to Accra" }}
        nextArea={{ path: "/service-areas/kete-krachi-to-accra", label: "Koforidua to Accra" }}
      />
    </>
  );
}
