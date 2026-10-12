import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function ElminaToAccra() {
  return (
    <>
      <SEO 
        title="Elmina to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Elmina and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/elmina-to-accra"
        keywords={["towing Elmina to Accra", "Elmina Accra towing service", "tow truck Elmina", "vehicle recovery Elmina Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="elmina-to-accra"
        areaLabel="Elmina to Accra"
        defaultHeading="Elmina to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Elmina and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/ejisu-to-accra", label: "Ejisu to Accra" }}
        nextArea={{ path: "/service-areas/ejisu-to-accra", label: "Elubo to Accra" }}
      />
    </>
  );
}
