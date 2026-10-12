import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAgona() {
  return (
    <>
      <SEO 
        title="Accra to Agona Towing & Car Recovery Service"
        description="Need a tow from Accra to Agona? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Agona."
        canonical="/service-areas/accra-to-agona"
        keywords={["towing Accra to Agona", "Accra Agona towing service", "tow truck Accra", "car recovery Accra Agona", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-agona"
        areaLabel="Accra to Agona"
        defaultHeading="Accra to Agona Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Agona? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Agona."
        prevArea={{ path: "/service-areas/accra-to-aflao", label: "Accra to Aflao" }}
        nextArea={{ path: "/service-areas/accra-to-agona-nkwanta", label: "Accra to Agona Nkwanta" }}
      />
    </>
  );
}
