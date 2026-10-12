import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SunyaniToAccra() {
  return (
    <>
      <SEO 
        title="Sunyani to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Sunyani and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Sunyani to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/sunyani-to-accra"
        keywords={["towing Sunyani to Accra", "Sunyani Accra towing service", "tow truck Sunyani", "vehicle recovery Sunyani Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="sunyani-to-accra"
        areaLabel="Sunyani to Accra"
        defaultHeading="Sunyani to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Sunyani and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Sunyani to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/suhum-to-accra", label: "Suhum to Accra" }}
        nextArea={{ path: "/service-areas/suhum-to-accra", label: "Takoradi to Accra" }}
      />
    </>
  );
}
