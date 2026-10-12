import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAsanteAkim() {
  return (
    <>
      <SEO 
        title="Accra to Asante Akim Towing & Car Recovery Service"
        description="Need a tow from Accra to Asante Akim? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Asante Akim."
        canonical="/service-areas/accra-to-asante-akim"
        keywords={["towing Accra to Asante Akim", "Accra Asante Akim towing service", "tow truck Accra", "car recovery Accra Asante Akim", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-asante-akim"
        areaLabel="Accra to Asante Akim"
        defaultHeading="Accra to Asante Akim Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Asante Akim? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Asante Akim."
        prevArea={{ path: "/service-areas/accra-to-asankragwa", label: "Accra to Asankragwa" }}
        nextArea={{ path: "/service-areas/accra-to-assin-fosu", label: "Accra to Assin Fosu" }}
      />
    </>
  );
}
