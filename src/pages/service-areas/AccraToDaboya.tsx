import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDaboya() {
  return (
    <>
      <SEO 
        title="Accra to Daboya Towing & Car Recovery Service"
        description="Need a tow from Accra to Daboya? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Daboya."
        canonical="/service-areas/accra-to-daboya"
        keywords={["towing Accra to Daboya", "Accra Daboya towing service", "tow truck Accra", "car recovery Accra Daboya", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-daboya"
        areaLabel="Accra to Daboya"
        defaultHeading="Accra to Daboya Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Daboya? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Daboya."
        prevArea={{ path: "/service-areas/accra-to-daboase", label: "Accra to Daboase" }}
        nextArea={{ path: "/service-areas/accra-to-dadieso", label: "Accra to Dadieso" }}
      />
    </>
  );
}
