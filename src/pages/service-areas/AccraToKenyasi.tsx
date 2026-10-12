import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKenyasi() {
  return (
    <>
      <SEO 
        title="Accra to Kenyasi Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Kenyasi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-kenyasi"
        keywords={["towing Accra to Kenyasi", "Accra Kenyasi towing service", "tow truck Accra", "car recovery Accra Kenyasi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-kenyasi"
        areaLabel="Accra to Kenyasi"
        defaultHeading="Accra to Kenyasi Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Kenyasi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-karaga", label: "Accra to Karaga" }}
        nextArea={{ path: "/service-areas/accra-to-keta", label: "Accra to Keta" }}
      />
    </>
  );
}
