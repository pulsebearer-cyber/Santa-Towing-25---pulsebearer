import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToJuaboso() {
  return (
    <>
      <SEO 
        title="Accra to Juaboso Towing & Car Recovery Service"
        description="Broke down or had an accident between Accra and Juaboso? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Juaboso, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        canonical="/service-areas/accra-to-juaboso"
        keywords={["towing Accra to Juaboso", "Accra Juaboso towing service", "tow truck Accra", "car recovery Accra Juaboso", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-juaboso"
        areaLabel="Accra to Juaboso"
        defaultHeading="Accra to Juaboso Towing & Car Recovery Service"
        defaultDescription="Broke down or had an accident between Accra and Juaboso? Santa Towing & Garage Services offers reliable towing and recovery along this route, day or night. Our licensed and insured operators will safely tow your car from Accra to Juaboso, handling cars, SUVs, and light commercial cars. Fast dispatch, fair pricing, and real-time updates until your car reaches its destination. Call or WhatsApp us now to book."
        prevArea={{ path: "/service-areas/accra-to-juaben", label: "Accra to Juaben" }}
        nextArea={{ path: "/service-areas/accra-to-kadjebi", label: "Accra to Kadjebi" }}
      />
    </>
  );
}
