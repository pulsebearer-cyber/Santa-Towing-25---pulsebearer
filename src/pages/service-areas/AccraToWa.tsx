import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToWa() {
  return (
    <>
      <SEO 
        title="Accra to Wa Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Wa? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-wa"
        keywords={["towing Accra to Wa", "Accra Wa towing service", "tow truck Accra", "vehicle recovery Accra Wa", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-wa"
        areaLabel="Accra to Wa"
        defaultHeading="Accra to Wa Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Wa? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-tumu", label: "Accra to Tumu" }}
        nextArea={{ path: "/service-areas/accra-to-tumu", label: "Accra to Walewale" }}
      />
    </>
  );
}
