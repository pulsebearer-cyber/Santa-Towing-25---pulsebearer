import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKintampo() {
  return (
    <>
      <SEO 
        title="Accra to Kintampo Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Kintampo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-kintampo"
        keywords={["towing Accra to Kintampo", "Accra Kintampo towing service", "tow truck Accra", "car recovery Accra Kintampo", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-kintampo"
        areaLabel="Accra to Kintampo"
        defaultHeading="Accra to Kintampo Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Kintampo? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-kete-krachi", label: "Accra to Kete Krachi" }}
        nextArea={{ path: "/service-areas/accra-to-koforidua", label: "Accra to Koforidua" }}
      />
    </>
  );
}
