import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKumasi() {
  return (
    <>
      <SEO 
        title="Accra to Kumasi Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Kumasi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-kumasi"
        keywords={["towing Accra to Kumasi", "Accra Kumasi towing service", "tow truck Accra", "car recovery Accra Kumasi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-kumasi"
        areaLabel="Accra to Kumasi"
        defaultHeading="Accra to Kumasi Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Kumasi? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-konongo", label: "Accra to Konongo" }}
        nextArea={{ path: "/service-areas/accra-to-kwame-danso", label: "Accra to Kwame Danso" }}
      />
    </>
  );
}
