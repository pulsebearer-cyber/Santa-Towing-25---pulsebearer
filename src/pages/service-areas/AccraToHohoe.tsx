import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToHohoe() {
  return (
    <>
      <SEO 
        title="Accra to Hohoe Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Hohoe? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-hohoe"
        keywords={["towing Accra to Hohoe", "Accra Hohoe towing service", "tow truck Accra", "car recovery Accra Hohoe", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-hohoe"
        areaLabel="Accra to Hohoe"
        defaultHeading="Accra to Hohoe Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Hohoe? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-ho", label: "Accra to Ho" }}
        nextArea={{ path: "/service-areas/accra-to-hwidiem", label: "Accra to Hwidiem" }}
      />
    </>
  );
}
