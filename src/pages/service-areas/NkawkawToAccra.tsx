import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NkawkawToAccra() {
  return (
    <>
      <SEO 
        title="Nkawkaw to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Nkawkaw and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nkawkaw to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/nkawkaw-to-accra"
        keywords={["towing Nkawkaw to Accra", "Nkawkaw Accra towing service", "tow truck Nkawkaw", "vehicle recovery Nkawkaw Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nkawkaw-to-accra"
        areaLabel="Nkawkaw to Accra"
        defaultHeading="Nkawkaw to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Nkawkaw and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Nkawkaw to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/nkawie-to-accra", label: "Nkawie to Accra" }}
        nextArea={{ path: "/service-areas/nkawie-to-accra", label: "Nkoranza to Accra" }}
      />
    </>
  );
}
