import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDambai() {
  return (
    <>
      <SEO 
        title="Accra to Dambai Towing & Car Recovery Service"
        description="Need a tow from Accra to Dambai? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Dambai."
        canonical="/service-areas/accra-to-dambai"
        keywords={["towing Accra to Dambai", "Accra Dambai towing service", "tow truck Accra", "car recovery Accra Dambai", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-dambai"
        areaLabel="Accra to Dambai"
        defaultHeading="Accra to Dambai Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Dambai? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Dambai."
        prevArea={{ path: "/service-areas/accra-to-dadieso", label: "Accra to Dadieso" }}
        nextArea={{ path: "/service-areas/accra-to-damongo", label: "Accra to Damongo" }}
      />
    </>
  );
}
