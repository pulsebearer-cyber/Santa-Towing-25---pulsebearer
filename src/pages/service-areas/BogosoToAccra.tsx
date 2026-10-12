import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BogosoToAccra() {
  return (
    <>
      <SEO 
        title="Bogoso to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Bogoso and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/bogoso-to-accra"
        keywords={["towing Bogoso to Accra", "Bogoso Accra towing service", "tow truck Bogoso", "vehicle recovery Bogoso Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bogoso-to-accra"
        areaLabel="Bogoso to Accra"
        defaultHeading="Bogoso to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Bogoso and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/bodi-to-accra", label: "Bodi to Accra" }}
        nextArea={{ path: "/service-areas/bodi-to-accra", label: "Bolgatanga to Accra" }}
      />
    </>
  );
}
