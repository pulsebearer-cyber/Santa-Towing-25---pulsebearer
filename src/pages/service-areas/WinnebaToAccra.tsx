import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function WinnebaToAccra() {
  return (
    <>
      <SEO 
        title="Winneba to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Winneba and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/winneba-to-accra"
        keywords={["towing Winneba to Accra", "Winneba Accra towing service", "tow truck Winneba", "vehicle recovery Winneba Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="winneba-to-accra"
        areaLabel="Winneba to Accra"
        defaultHeading="Winneba to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Winneba and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/wenchi-to-accra", label: "Wenchi to Accra" }}
        nextArea={{ path: "/service-areas/wenchi-to-accra", label: "Yeji to Accra" }}
      />
    </>
  );
}
