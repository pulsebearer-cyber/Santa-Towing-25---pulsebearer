import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSalaga() {
  return (
    <>
      <SEO 
        title="Accra to Salaga Towing & Car Recovery Service"
        description="Need a tow from Accra to Salaga? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Salaga."
        canonical="/service-areas/accra-to-salaga"
        keywords={["towing Accra to Salaga", "Accra Salaga towing service", "tow truck Accra", "car recovery Accra Salaga", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-salaga"
        areaLabel="Accra to Salaga"
        defaultHeading="Accra to Salaga Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Salaga? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Salaga."
        prevArea={{ path: "/service-areas/accra-to-prestea", label: "Accra to Prestea" }}
        nextArea={{ path: "/service-areas/accra-to-prestea", label: "Accra to Samreboi" }}
      />
    </>
  );
}
