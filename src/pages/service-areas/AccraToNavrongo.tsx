import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNavrongo() {
  return (
    <>
      <SEO 
        title="Accra to Navrongo Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Navrongo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-navrongo"
        keywords={["towing Accra to Navrongo", "Accra Navrongo towing service", "tow truck Accra", "car recovery Accra Navrongo", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-navrongo"
        areaLabel="Accra to Navrongo"
        defaultHeading="Accra to Navrongo Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Navrongo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-nandom", label: "Accra to Nandom" }}
        nextArea={{ path: "/service-areas/accra-to-nandom", label: "Accra to Nkawie" }}
      />
    </>
  );
}
