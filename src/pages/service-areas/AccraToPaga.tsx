import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToPaga() {
  return (
    <>
      <SEO 
        title="Accra to Paga Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Paga? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-paga"
        keywords={["towing Accra to Paga", "Accra Paga towing service", "tow truck Accra", "car recovery Accra Paga", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-paga"
        areaLabel="Accra to Paga"
        defaultHeading="Accra to Paga Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Paga? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-offinso", label: "Accra to Offinso" }}
        nextArea={{ path: "/service-areas/accra-to-offinso", label: "Accra to Prang" }}
      />
    </>
  );
}
