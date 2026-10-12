import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAtonsu() {
  return (
    <>
      <SEO 
        title="Accra to Atonsu Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Atonsu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-atonsu"
        keywords={["towing Accra to Atonsu", "Accra Atonsu towing service", "tow truck Accra", "car recovery Accra Atonsu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-atonsu"
        areaLabel="Accra to Atonsu"
        defaultHeading="Accra to Atonsu Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Atonsu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-atebubu", label: "Accra to Atebubu" }}
        nextArea={{ path: "/service-areas/accra-to-axim", label: "Accra to Axim" }}
      />
    </>
  );
}
