import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AkyemOdaToAccra() {
  return (
    <>
      <SEO 
        title="Akyem Oda to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Akyem Oda and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Akyem Oda to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/akyem-oda-to-accra"
        keywords={["towing Akyem Oda to Accra", "Akyem Oda Accra towing service", "tow truck Akyem Oda", "vehicle recovery Akyem Oda Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="akyem-oda-to-accra"
        areaLabel="Akyem Oda to Accra"
        defaultHeading="Akyem Oda to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Akyem Oda and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Akyem Oda to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/akwatia-to-accra", label: "Akwatia to Accra" }}
        nextArea={{ path: "/service-areas/akwatia-to-accra", label: "Amasaman" }}
      />
    </>
  );
}
