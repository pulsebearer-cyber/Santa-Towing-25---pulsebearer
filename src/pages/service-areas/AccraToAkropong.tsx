import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAkropong() {
  return (
    <>
      <SEO 
        title="Accra to Akropong Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Akropong? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-akropong"
        keywords={["towing Accra to Akropong", "Accra Akropong towing service", "tow truck Accra", "car recovery Accra Akropong", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-akropong"
        areaLabel="Accra to Akropong"
        defaultHeading="Accra to Akropong Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Akropong? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-akontombra", label: "Accra to Akontombra" }}
        nextArea={{ path: "/service-areas/accra-to-akwatia", label: "Accra to Akwatia" }}
      />
    </>
  );
}
