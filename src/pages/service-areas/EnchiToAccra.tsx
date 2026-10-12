import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function EnchiToAccra() {
  return (
    <>
      <SEO 
        title="Enchi to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Enchi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/enchi-to-accra"
        keywords={["towing Enchi to Accra", "Enchi Accra towing service", "tow truck Enchi", "vehicle recovery Enchi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="enchi-to-accra"
        areaLabel="Enchi to Accra"
        defaultHeading="Enchi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Enchi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/elubo-to-accra", label: "Elubo to Accra" }}
        nextArea={{ path: "/service-areas/elubo-to-accra", label: "Fomena to Accra" }}
      />
    </>
  );
}
