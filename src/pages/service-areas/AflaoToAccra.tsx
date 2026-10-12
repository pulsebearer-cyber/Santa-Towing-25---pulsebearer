import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AflaoToAccra() {
  return (
    <>
      <SEO 
        title="Aflao to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Aflao and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/aflao-to-accra"
        keywords={["towing Aflao to Accra", "Aflao Accra towing service", "tow truck Aflao", "vehicle recovery Aflao Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="aflao-to-accra"
        areaLabel="Aflao to Accra"
        defaultHeading="Aflao to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Aflao and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/adenta", label: "Adenta" }}
        nextArea={{ path: "/service-areas/adenta", label: "Agona Nkwanta to Accra" }}
      />
    </>
  );
}
