import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SamreboiToAccra() {
  return (
    <>
      <SEO 
        title="Samreboi to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Samreboi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/samreboi-to-accra"
        keywords={["towing Samreboi to Accra", "Samreboi Accra towing service", "tow truck Samreboi", "vehicle recovery Samreboi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="samreboi-to-accra"
        areaLabel="Samreboi to Accra"
        defaultHeading="Samreboi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Samreboi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/salaga-to-accra", label: "Salaga to Accra" }}
        nextArea={{ path: "/service-areas/salaga-to-accra", label: "Sandema to Accra" }}
      />
    </>
  );
}
