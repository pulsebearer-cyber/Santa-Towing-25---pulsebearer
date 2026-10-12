import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNandom() {
  return (
    <>
      <SEO 
        title="Accra to Nandom Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Nandom? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-nandom"
        keywords={["towing Accra to Nandom", "Accra Nandom towing service", "tow truck Accra", "car recovery Accra Nandom", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nandom"
        areaLabel="Accra to Nandom"
        defaultHeading="Accra to Nandom Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Nandom? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-nalerigu", label: "Accra to Nalerigu" }}
        nextArea={{ path: "/service-areas/accra-to-nalerigu", label: "Accra to Navrongo" }}
      />
    </>
  );
}
