import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAssinFosu() {
  return (
    <>
      <SEO 
        title="Accra to Assin Fosu Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Assin Fosu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-assin-fosu"
        keywords={["towing Accra to Assin Fosu", "Accra Assin Fosu towing service", "tow truck Accra", "car recovery Accra Assin Fosu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-assin-fosu"
        areaLabel="Accra to Assin Fosu"
        defaultHeading="Accra to Assin Fosu Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Assin Fosu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-asante-akim", label: "Accra to Asante Akim" }}
        nextArea={{ path: "/service-areas/accra-to-atebubu", label: "Accra to Atebubu" }}
      />
    </>
  );
}
