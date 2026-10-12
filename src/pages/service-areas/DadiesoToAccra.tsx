import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DadiesoToAccra() {
  return (
    <>
      <SEO 
        title="Dadieso to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Dadieso and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/dadieso-to-accra"
        keywords={["towing Dadieso to Accra", "Dadieso Accra towing service", "tow truck Dadieso", "vehicle recovery Dadieso Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="dadieso-to-accra"
        areaLabel="Dadieso to Accra"
        defaultHeading="Dadieso to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Dadieso and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/daboya-to-accra", label: "Daboya to Accra" }}
        nextArea={{ path: "/service-areas/daboya-to-accra", label: "Dambai to Accra" }}
      />
    </>
  );
}
