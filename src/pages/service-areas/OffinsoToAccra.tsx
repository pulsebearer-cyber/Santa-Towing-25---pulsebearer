import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function OffinsoToAccra() {
  return (
    <>
      <SEO 
        title="Offinso to Accra Towing & Vehicle Recovery Service"
        description="Broke down or had an accident between Offinso and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Offinso to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/offinso-to-accra"
        keywords={["towing Offinso to Accra", "Offinso Accra towing service", "tow truck Offinso", "vehicle recovery Offinso Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="offinso-to-accra"
        areaLabel="Offinso to Accra"
        defaultHeading="Offinso to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Broke down or had an accident between Offinso and Accra? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your vehicle from Offinso to Accra, handling cars, SUVs, and light commercial vehicles. Fast dispatch, fair pricing, and real-time updates until your vehicle reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/odumase-krobo-to-accra", label: "Odumase Krobo to Accra" }}
        nextArea={{ path: "/service-areas/odumase-krobo-to-accra", label: "Osu" }}
      />
    </>
  );
}
