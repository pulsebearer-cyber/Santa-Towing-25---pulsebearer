import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function HohoeToAccra() {
  return (
    <>
      <SEO 
        title="Hohoe to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Hohoe and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/hohoe-to-accra"
        keywords={["towing Hohoe to Accra", "Hohoe Accra towing service", "tow truck Hohoe", "vehicle recovery Hohoe Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="hohoe-to-accra"
        areaLabel="Hohoe to Accra"
        defaultHeading="Hohoe to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Hohoe and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/ho-to-accra", label: "Ho to Accra" }}
        nextArea={{ path: "/service-areas/ho-to-accra", label: "Hwidiem to Accra" }}
      />
    </>
  );
}
