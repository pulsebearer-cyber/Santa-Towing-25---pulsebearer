import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNalerigu() {
  return (
    <>
      <SEO 
        title="Accra to Nalerigu Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Nalerigu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-nalerigu"
        keywords={["towing Accra to Nalerigu", "Accra Nalerigu towing service", "tow truck Accra", "car recovery Accra Nalerigu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nalerigu"
        areaLabel="Accra to Nalerigu"
        defaultHeading="Accra to Nalerigu Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Nalerigu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-mpohor", label: "Accra to Mpohor" }}
        nextArea={{ path: "/service-areas/accra-to-mpohor", label: "Accra to Nandom" }}
      />
    </>
  );
}
