import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNkawkaw() {
  return (
    <>
      <SEO 
        title="Accra to Nkawkaw Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Nkawkaw? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-nkawkaw"
        keywords={["towing Accra to Nkawkaw", "Accra Nkawkaw towing service", "tow truck Accra", "car recovery Accra Nkawkaw", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nkawkaw"
        areaLabel="Accra to Nkawkaw"
        defaultHeading="Accra to Nkawkaw Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Nkawkaw? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-nkawie", label: "Accra to Nkawie" }}
        nextArea={{ path: "/service-areas/accra-to-nkawie", label: "Accra to Nkoranza" }}
      />
    </>
  );
}
