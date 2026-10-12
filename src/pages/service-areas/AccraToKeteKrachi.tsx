import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKeteKrachi() {
  return (
    <>
      <SEO 
        title="Accra to Kete Krachi Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Kete Krachi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-kete-krachi"
        keywords={["towing Accra to Kete Krachi", "Accra Kete Krachi towing service", "tow truck Accra", "car recovery Accra Kete Krachi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-kete-krachi"
        areaLabel="Accra to Kete Krachi"
        defaultHeading="Accra to Kete Krachi Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Kete Krachi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-keta", label: "Accra to Keta" }}
        nextArea={{ path: "/service-areas/accra-to-kintampo", label: "Accra to Kintampo" }}
      />
    </>
  );
}
