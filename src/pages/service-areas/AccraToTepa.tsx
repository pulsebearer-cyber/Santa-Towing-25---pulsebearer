import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTepa() {
  return (
    <>
      <SEO 
        title="Accra to Tepa Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Tepa? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-tepa"
        keywords={["towing Accra to Tepa", "Accra Tepa towing service", "tow truck Accra", "vehicle recovery Accra Tepa", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-tepa"
        areaLabel="Accra to Tepa"
        defaultHeading="Accra to Tepa Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Tepa? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-techiman", label: "Accra to Techiman" }}
        nextArea={{ path: "/service-areas/accra-to-techiman", label: "Accra to Tolon" }}
      />
    </>
  );
}
