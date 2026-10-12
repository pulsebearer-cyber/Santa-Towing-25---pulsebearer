import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBerekum() {
  return (
    <>
      <SEO 
        title="Accra to Berekum Towing & Car Recovery Service"
        description="Need a tow from Accra to Berekum? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Berekum."
        canonical="/service-areas/accra-to-berekum"
        keywords={["towing Accra to Berekum", "Accra Berekum towing service", "tow truck Accra", "car recovery Accra Berekum", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-berekum"
        areaLabel="Accra to Berekum"
        defaultHeading="Accra to Berekum Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Berekum? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Berekum."
        prevArea={{ path: "/service-areas/accra-to-bekwai", label: "Accra to Bekwai" }}
        nextArea={{ path: "/service-areas/accra-to-bibiani", label: "Accra to Bibiani" }}
      />
    </>
  );
}
