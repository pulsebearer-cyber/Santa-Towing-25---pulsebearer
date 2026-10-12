import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KonongoToAccra() {
  return (
    <>
      <SEO 
        title="Konongo to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Konongo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Konongo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/konongo-to-accra"
        keywords={["towing Konongo to Accra", "Konongo Accra towing service", "tow truck Konongo", "vehicle recovery Konongo Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="konongo-to-accra"
        areaLabel="Konongo to Accra"
        defaultHeading="Konongo to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Konongo and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Konongo to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/koforidua-to-accra", label: "Koforidua to Accra" }}
        nextArea={{ path: "/service-areas/koforidua-to-accra", label: "Korle Klottey" }}
      />
    </>
  );
}
