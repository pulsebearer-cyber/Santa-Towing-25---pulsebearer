import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AximToAccra() {
  return (
    <>
      <SEO 
        title="Axim to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Axim and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/axim-to-accra"
        keywords={["towing Axim to Accra", "Axim Accra towing service", "tow truck Axim", "vehicle recovery Axim Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="axim-to-accra"
        areaLabel="Axim to Accra"
        defaultHeading="Axim to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Axim and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/atonsu-to-accra", label: "Atonsu to Accra" }}
        nextArea={{ path: "/service-areas/atonsu-to-accra", label: "Ayawaso" }}
      />
    </>
  );
}
