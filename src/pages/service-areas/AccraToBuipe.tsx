import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBuipe() {
  return (
    <>
      <SEO 
        title="Accra to Buipe Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Buipe? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-buipe"
        keywords={["towing Accra to Buipe", "Accra Buipe towing service", "tow truck Accra", "car recovery Accra Buipe", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-buipe"
        areaLabel="Accra to Buipe"
        defaultHeading="Accra to Buipe Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Buipe? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-bolgatanga", label: "Accra to Bolgatanga" }}
        nextArea={{ path: "/service-areas/accra-to-cape-coast", label: "Accra to Cape Coast" }}
      />
    </>
  );
}
