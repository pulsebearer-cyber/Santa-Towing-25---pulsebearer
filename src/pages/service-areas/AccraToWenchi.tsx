import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToWenchi() {
  return (
    <>
      <SEO 
        title="Accra to Wenchi Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Wenchi? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Wenchi."
        canonical="/service-areas/accra-to-wenchi"
        keywords={["towing Accra to Wenchi", "Accra Wenchi towing service", "tow truck Accra", "vehicle recovery Accra Wenchi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-wenchi"
        areaLabel="Accra to Wenchi"
        defaultHeading="Accra to Wenchi Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Wenchi? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Wenchi."
        prevArea={{ path: "/service-areas/accra-to-wassa-akropong", label: "Accra to Wassa Akropong" }}
        nextArea={{ path: "/service-areas/accra-to-wassa-akropong", label: "Accra to Winneba" }}
      />
    </>
  );
}
