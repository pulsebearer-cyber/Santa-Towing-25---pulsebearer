import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToWalewale() {
  return (
    <>
      <SEO 
        title="Accra to Walewale Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Walewale? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-walewale"
        keywords={["towing Accra to Walewale", "Accra Walewale towing service", "tow truck Accra", "vehicle recovery Accra Walewale", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-walewale"
        areaLabel="Accra to Walewale"
        defaultHeading="Accra to Walewale Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Walewale? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-wa", label: "Accra to Wa" }}
        nextArea={{ path: "/service-areas/accra-to-wa", label: "Accra to Wassa Akropong" }}
      />
    </>
  );
}
