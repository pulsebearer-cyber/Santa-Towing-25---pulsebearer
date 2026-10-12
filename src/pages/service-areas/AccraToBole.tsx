import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBole() {
  return (
    <>
      <SEO 
        title="Accra to Bole Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Bole? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-bole"
        keywords={["towing Accra to Bole", "Accra Bole towing service", "tow truck Accra", "car recovery Accra Bole", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bole"
        areaLabel="Accra to Bole"
        defaultHeading="Accra to Bole Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Bole? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-bogoso", label: "Accra to Bogoso" }}
        nextArea={{ path: "/service-areas/accra-to-bolgatanga", label: "Accra to Bolgatanga" }}
      />
    </>
  );
}
