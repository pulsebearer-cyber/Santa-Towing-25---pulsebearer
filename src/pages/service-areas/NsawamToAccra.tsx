import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NsawamToAccra() {
  return (
    <>
      <SEO 
        title="Nsawam to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Nsawam and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nsawam to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/nsawam-to-accra"
        keywords={["towing Nsawam to Accra", "Nsawam Accra towing service", "tow truck Nsawam", "vehicle recovery Nsawam Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nsawam-to-accra"
        areaLabel="Nsawam to Accra"
        defaultHeading="Nsawam to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Nsawam and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nsawam to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/nkwanta-to-accra", label: "Nkwanta to Accra" }}
        nextArea={{ path: "/service-areas/nkwanta-to-accra", label: "Nungua" }}
      />
    </>
  );
}
