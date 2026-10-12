import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAtebubu() {
  return (
    <>
      <SEO 
        title="Accra to Atebubu Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Atebubu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-atebubu"
        keywords={["towing Accra to Atebubu", "Accra Atebubu towing service", "tow truck Accra", "car recovery Accra Atebubu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-atebubu"
        areaLabel="Accra to Atebubu"
        defaultHeading="Accra to Atebubu Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Atebubu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-assin-fosu", label: "Accra to Assin Fosu" }}
        nextArea={{ path: "/service-areas/accra-to-atonsu", label: "Accra to Atonsu" }}
      />
    </>
  );
}
