import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BodiToAccra() {
  return (
    <>
      <SEO 
        title="Bodi to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Bodi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/bodi-to-accra"
        keywords={["towing Bodi to Accra", "Bodi Accra towing service", "tow truck Bodi", "vehicle recovery Bodi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bodi-to-accra"
        areaLabel="Bodi to Accra"
        defaultHeading="Bodi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Bodi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/bibiani-to-accra", label: "Bibiani to Accra" }}
        nextArea={{ path: "/service-areas/bibiani-to-accra", label: "Bogoso to Accra" }}
      />
    </>
  );
}
