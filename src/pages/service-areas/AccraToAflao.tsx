import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAflao() {
  return (
    <>
      <SEO 
        title="Accra to Aflao Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Aflao? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-aflao"
        keywords={["towing Accra to Aflao", "Accra Aflao towing service", "tow truck Accra", "car recovery Accra Aflao", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-aflao"
        areaLabel="Accra to Aflao"
        defaultHeading="Accra to Aflao Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Aflao? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-aburi", label: "Accra to Aburi" }}
        nextArea={{ path: "/service-areas/accra-to-agona", label: "Accra to Agona" }}
      />
    </>
  );
}
