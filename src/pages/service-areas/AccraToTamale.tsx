import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTamale() {
  return (
    <>
      <SEO 
        title="Accra to Tamale Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Tamale? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-tamale"
        keywords={["towing Accra to Tamale", "Accra Tamale towing service", "tow truck Accra", "vehicle recovery Accra Tamale", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-tamale"
        areaLabel="Accra to Tamale"
        defaultHeading="Accra to Tamale Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Tamale? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-takoradi", label: "Accra to Takoradi" }}
        nextArea={{ path: "/service-areas/accra-to-takoradi", label: "Accra to Tarkwa" }}
      />
    </>
  );
}
