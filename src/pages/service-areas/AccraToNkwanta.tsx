import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNkwanta() {
  return (
    <>
      <SEO 
        title="Accra to Nkwanta Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Nkwanta? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-nkwanta"
        keywords={["towing Accra to Nkwanta", "Accra Nkwanta towing service", "tow truck Accra", "car recovery Accra Nkwanta", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nkwanta"
        areaLabel="Accra to Nkwanta"
        defaultHeading="Accra to Nkwanta Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Nkwanta? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-nkoranza", label: "Accra to Nkoranza" }}
        nextArea={{ path: "/service-areas/accra-to-nkoranza", label: "Accra to Nkwanta South" }}
      />
    </>
  );
}
