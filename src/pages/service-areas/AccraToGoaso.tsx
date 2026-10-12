import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToGoaso() {
  return (
    <>
      <SEO 
        title="Accra to Goaso Towing & Car Recovery Service"
        description="Need a tow from Accra to Goaso? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Goaso."
        canonical="/service-areas/accra-to-goaso"
        keywords={["towing Accra to Goaso", "Accra Goaso towing service", "tow truck Accra", "car recovery Accra Goaso", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-goaso"
        areaLabel="Accra to Goaso"
        defaultHeading="Accra to Goaso Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Goaso? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Goaso."
        prevArea={{ path: "/service-areas/accra-to-gambaga", label: "Accra to Gambaga" }}
        nextArea={{ path: "/service-areas/accra-to-half-assini", label: "Accra to Half Assini" }}
      />
    </>
  );
}
