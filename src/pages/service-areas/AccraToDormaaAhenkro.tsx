import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDormaaAhenkro() {
  return (
    <>
      <SEO 
        title="Accra to Dormaa Ahenkro Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Dormaa Ahenkro? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-dormaa-ahenkro"
        keywords={["towing Accra to Dormaa Ahenkro", "Accra Dormaa Ahenkro towing service", "tow truck Accra", "car recovery Accra Dormaa Ahenkro", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-dormaa-ahenkro"
        areaLabel="Accra to Dormaa Ahenkro"
        defaultHeading="Accra to Dormaa Ahenkro Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Dormaa Ahenkro? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-donkorkrom", label: "Accra to Donkorkrom" }}
        nextArea={{ path: "/service-areas/accra-to-duayaw-nkwanta", label: "Accra to Duayaw Nkwanta" }}
      />
    </>
  );
}
