import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KetaToAccra() {
  return (
    <>
      <SEO 
        title="Keta to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Keta and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/keta-to-accra"
        keywords={["towing Keta to Accra", "Keta Accra towing service", "tow truck Keta", "vehicle recovery Keta Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="keta-to-accra"
        areaLabel="Keta to Accra"
        defaultHeading="Keta to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Keta and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/kenyasi-to-accra", label: "Kenyasi to Accra" }}
        nextArea={{ path: "/service-areas/kenyasi-to-accra", label: "Kete Krachi to Accra" }}
      />
    </>
  );
}
