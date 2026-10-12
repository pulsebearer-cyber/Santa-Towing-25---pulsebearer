import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function HoToAccra() {
  return (
    <>
      <SEO 
        title="Ho to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Ho and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/ho-to-accra"
        keywords={["towing Ho to Accra", "Ho Accra towing service", "tow truck Ho", "vehicle recovery Ho Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="ho-to-accra"
        areaLabel="Ho to Accra"
        defaultHeading="Ho to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Ho and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/hamile-to-accra", label: "Hamile to Accra" }}
        nextArea={{ path: "/service-areas/hamile-to-accra", label: "Hohoe to Accra" }}
      />
    </>
  );
}
