import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BibianiToAccra() {
  return (
    <>
      <SEO 
        title="Bibiani to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Bibiani and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/bibiani-to-accra"
        keywords={["towing Bibiani to Accra", "Bibiani Accra towing service", "tow truck Bibiani", "vehicle recovery Bibiani Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bibiani-to-accra"
        areaLabel="Bibiani to Accra"
        defaultHeading="Bibiani to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Bibiani and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/berekum-to-accra", label: "Berekum to Accra" }}
        nextArea={{ path: "/service-areas/berekum-to-accra", label: "Bodi to Accra" }}
      />
    </>
  );
}
