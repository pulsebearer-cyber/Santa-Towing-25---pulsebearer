import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToJuaben() {
  return (
    <>
      <SEO 
        title="Accra to Juaben Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Juaben? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-juaben"
        keywords={["towing Accra to Juaben", "Accra Juaben towing service", "tow truck Accra", "car recovery Accra Juaben", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-juaben"
        areaLabel="Accra to Juaben"
        defaultHeading="Accra to Juaben Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Juaben? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-jirapa", label: "Accra to Jirapa" }}
        nextArea={{ path: "/service-areas/accra-to-juaboso", label: "Accra to Juaboso" }}
      />
    </>
  );
}
