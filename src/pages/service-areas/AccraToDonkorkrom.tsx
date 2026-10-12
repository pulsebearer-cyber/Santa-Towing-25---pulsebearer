import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDonkorkrom() {
  return (
    <>
      <SEO 
        title="Accra to Donkorkrom Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Donkorkrom? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-donkorkrom"
        keywords={["towing Accra to Donkorkrom", "Accra Donkorkrom towing service", "tow truck Accra", "car recovery Accra Donkorkrom", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-donkorkrom"
        areaLabel="Accra to Donkorkrom"
        defaultHeading="Accra to Donkorkrom Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Donkorkrom? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-damongo", label: "Accra to Damongo" }}
        nextArea={{ path: "/service-areas/accra-to-dormaa-ahenkro", label: "Accra to Dormaa Ahenkro" }}
      />
    </>
  );
}
