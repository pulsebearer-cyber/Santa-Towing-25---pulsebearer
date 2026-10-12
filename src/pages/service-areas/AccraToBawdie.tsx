import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBawdie() {
  return (
    <>
      <SEO 
        title="Accra to Bawdie Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Bawdie? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Bawdie, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-bawdie"
        keywords={["towing Accra to Bawdie", "Accra Bawdie towing service", "tow truck Accra", "car recovery Accra Bawdie", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bawdie"
        areaLabel="Accra to Bawdie"
        defaultHeading="Accra to Bawdie Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Bawdie? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Bawdie, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-axim", label: "Accra to Axim" }}
        nextArea={{ path: "/service-areas/accra-to-bawku", label: "Accra to Bawku" }}
      />
    </>
  );
}
