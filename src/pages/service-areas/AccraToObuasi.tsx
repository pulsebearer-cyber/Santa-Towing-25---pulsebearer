import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToObuasi() {
  return (
    <>
      <SEO 
        title="Accra to Obuasi Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Obuasi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-obuasi"
        keywords={["towing Accra to Obuasi", "Accra Obuasi towing service", "tow truck Accra", "car recovery Accra Obuasi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-obuasi"
        areaLabel="Accra to Obuasi"
        defaultHeading="Accra to Obuasi Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Obuasi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-nsawam", label: "Accra to Nsawam" }}
        nextArea={{ path: "/service-areas/accra-to-nsawam", label: "Accra to Odumase Krobo" }}
      />
    </>
  );
}
