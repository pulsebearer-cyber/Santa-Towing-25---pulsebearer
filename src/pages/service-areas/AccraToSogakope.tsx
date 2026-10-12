import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSogakope() {
  return (
    <>
      <SEO 
        title="Accra to Sogakope Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Sogakope? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-sogakope"
        keywords={["towing Accra to Sogakope", "Accra Sogakope towing service", "tow truck Accra", "vehicle recovery Accra Sogakope", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-sogakope"
        areaLabel="Accra to Sogakope"
        defaultHeading="Accra to Sogakope Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Sogakope? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-shama", label: "Accra to Shama" }}
        nextArea={{ path: "/service-areas/accra-to-shama", label: "Accra to Somanya" }}
      />
    </>
  );
}
