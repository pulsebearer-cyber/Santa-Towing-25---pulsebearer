import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToHo() {
  return (
    <>
      <SEO 
        title="Accra to Ho Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Ho? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-ho"
        keywords={["towing Accra to Ho", "Accra Ho towing service", "tow truck Accra", "car recovery Accra Ho", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-ho"
        areaLabel="Accra to Ho"
        defaultHeading="Accra to Ho Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Ho? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-hamile", label: "Accra to Hamile" }}
        nextArea={{ path: "/service-areas/accra-to-hohoe", label: "Accra to Hohoe" }}
      />
    </>
  );
}
