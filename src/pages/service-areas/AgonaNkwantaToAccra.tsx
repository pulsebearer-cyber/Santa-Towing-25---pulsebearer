import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AgonaNkwantaToAccra() {
  return (
    <>
      <SEO 
        title="Agona Nkwanta to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Agona Nkwanta and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/agona-nkwanta-to-accra"
        keywords={["towing Agona Nkwanta to Accra", "Agona Nkwanta Accra towing service", "tow truck Agona Nkwanta", "vehicle recovery Agona Nkwanta Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="agona-nkwanta-to-accra"
        areaLabel="Agona Nkwanta to Accra"
        defaultHeading="Agona Nkwanta to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Agona Nkwanta and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/aflao-to-accra", label: "Aflao to Accra" }}
        nextArea={{ path: "/service-areas/aflao-to-accra", label: "Agona to Accra" }}
      />
    </>
  );
}
