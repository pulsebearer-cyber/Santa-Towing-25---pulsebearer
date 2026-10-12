import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToFomena() {
  return (
    <>
      <SEO 
        title="Accra to Fomena Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Fomena? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-fomena"
        keywords={["towing Accra to Fomena", "Accra Fomena towing service", "tow truck Accra", "car recovery Accra Fomena", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-fomena"
        areaLabel="Accra to Fomena"
        defaultHeading="Accra to Fomena Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Fomena? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-enchi", label: "Accra to Enchi" }}
        nextArea={{ path: "/service-areas/accra-to-fumbisi", label: "Accra to Fumbisi" }}
      />
    </>
  );
}
