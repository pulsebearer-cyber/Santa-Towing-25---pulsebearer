import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTechiman() {
  return (
    <>
      <SEO 
        title="Accra to Techiman Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Techiman? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-techiman"
        keywords={["towing Accra to Techiman", "Accra Techiman towing service", "tow truck Accra", "vehicle recovery Accra Techiman", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-techiman"
        areaLabel="Accra to Techiman"
        defaultHeading="Accra to Techiman Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Techiman? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-tarkwa", label: "Accra to Tarkwa" }}
        nextArea={{ path: "/service-areas/accra-to-tarkwa", label: "Accra to Tepa" }}
      />
    </>
  );
}
