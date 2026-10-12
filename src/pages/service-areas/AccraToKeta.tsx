import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKeta() {
  return (
    <>
      <SEO 
        title="Accra to Keta Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Keta? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-keta"
        keywords={["towing Accra to Keta", "Accra Keta towing service", "tow truck Accra", "car recovery Accra Keta", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-keta"
        areaLabel="Accra to Keta"
        defaultHeading="Accra to Keta Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Keta? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-kenyasi", label: "Accra to Kenyasi" }}
        nextArea={{ path: "/service-areas/accra-to-kete-krachi", label: "Accra to Kete Krachi" }}
      />
    </>
  );
}
