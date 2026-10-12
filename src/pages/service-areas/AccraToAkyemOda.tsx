import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAkyemOda() {
  return (
    <>
      <SEO 
        title="Accra to Akyem Oda Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Akyem Oda? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-akyem-oda"
        keywords={["towing Accra to Akyem Oda", "Accra Akyem Oda towing service", "tow truck Accra", "car recovery Accra Akyem Oda", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-akyem-oda"
        areaLabel="Accra to Akyem Oda"
        defaultHeading="Accra to Akyem Oda Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Akyem Oda? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-akwatia", label: "Accra to Akwatia" }}
        nextArea={{ path: "/service-areas/accra-to-apam", label: "Accra to Apam" }}
      />
    </>
  );
}
