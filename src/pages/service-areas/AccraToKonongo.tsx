import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKonongo() {
  return (
    <>
      <SEO 
        title="Accra to Konongo Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Konongo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-konongo"
        keywords={["towing Accra to Konongo", "Accra Konongo towing service", "tow truck Accra", "car recovery Accra Konongo", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-konongo"
        areaLabel="Accra to Konongo"
        defaultHeading="Accra to Konongo Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Konongo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-koforidua", label: "Accra to Koforidua" }}
        nextArea={{ path: "/service-areas/accra-to-kumasi", label: "Accra to Kumasi" }}
      />
    </>
  );
}
