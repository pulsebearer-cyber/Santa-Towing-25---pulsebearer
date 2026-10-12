import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToJasikan() {
  return (
    <>
      <SEO 
        title="Accra to Jasikan Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Jasikan? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-jasikan"
        keywords={["towing Accra to Jasikan", "Accra Jasikan towing service", "tow truck Accra", "car recovery Accra Jasikan", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-jasikan"
        areaLabel="Accra to Jasikan"
        defaultHeading="Accra to Jasikan Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Jasikan? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-hwidiem", label: "Accra to Hwidiem" }}
        nextArea={{ path: "/service-areas/accra-to-jirapa", label: "Accra to Jirapa" }}
      />
    </>
  );
}
