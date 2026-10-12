import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToHwidiem() {
  return (
    <>
      <SEO 
        title="Accra to Hwidiem Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Hwidiem? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-hwidiem"
        keywords={["towing Accra to Hwidiem", "Accra Hwidiem towing service", "tow truck Accra", "car recovery Accra Hwidiem", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-hwidiem"
        areaLabel="Accra to Hwidiem"
        defaultHeading="Accra to Hwidiem Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Hwidiem? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-hohoe", label: "Accra to Hohoe" }}
        nextArea={{ path: "/service-areas/accra-to-jasikan", label: "Accra to Jasikan" }}
      />
    </>
  );
}
