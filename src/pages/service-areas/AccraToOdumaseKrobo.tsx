import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToOdumaseKrobo() {
  return (
    <>
      <SEO 
        title="Accra to Odumase-Krobo Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Odumase-Krobo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-odumase-krobo"
        keywords={["towing Accra to Odumase-Krobo", "Accra Odumase-Krobo towing service", "tow truck Accra", "car recovery Accra Odumase-Krobo", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-odumase-krobo"
        areaLabel="Accra to Odumase-Krobo"
        defaultHeading="Accra to Odumase-Krobo Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Odumase-Krobo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-obuasi", label: "Accra to Obuasi" }}
        nextArea={{ path: "/service-areas/accra-to-obuasi", label: "Accra to Offinso" }}
      />
    </>
  );
}
