import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function TechimanToAccra() {
  return (
    <>
      <SEO 
        title="Techiman to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Techiman and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Techiman to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/techiman-to-accra"
        keywords={["towing Techiman to Accra", "Techiman Accra towing service", "tow truck Techiman", "vehicle recovery Techiman Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="techiman-to-accra"
        areaLabel="Techiman to Accra"
        defaultHeading="Techiman to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Techiman and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Techiman to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/tarkwa-to-accra", label: "Tarkwa to Accra" }}
        nextArea={{ path: "/service-areas/tarkwa-to-accra", label: "Tema" }}
      />
    </>
  );
}
