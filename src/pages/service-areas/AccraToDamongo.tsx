import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDamongo() {
  return (
    <>
      <SEO 
        title="Accra to Damongo Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Damongo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-damongo"
        keywords={["towing Accra to Damongo", "Accra Damongo towing service", "tow truck Accra", "car recovery Accra Damongo", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-damongo"
        areaLabel="Accra to Damongo"
        defaultHeading="Accra to Damongo Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Damongo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-dambai", label: "Accra to Dambai" }}
        nextArea={{ path: "/service-areas/accra-to-donkorkrom", label: "Accra to Donkorkrom" }}
      />
    </>
  );
}
