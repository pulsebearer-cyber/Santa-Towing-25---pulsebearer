import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBolgatanga() {
  return (
    <>
      <SEO 
        title="Accra to Bolgatanga Towing & Car Recovery Service"
        description="Need a tow from Accra to Bolgatanga? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Bolgatanga."
        canonical="/service-areas/accra-to-bolgatanga"
        keywords={["towing Accra to Bolgatanga", "Accra Bolgatanga towing service", "tow truck Accra", "car recovery Accra Bolgatanga", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bolgatanga"
        areaLabel="Accra to Bolgatanga"
        defaultHeading="Accra to Bolgatanga Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Bolgatanga? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Bolgatanga."
        prevArea={{ path: "/service-areas/accra-to-bole", label: "Accra to Bole" }}
        nextArea={{ path: "/service-areas/accra-to-buipe", label: "Accra to Buipe" }}
      />
    </>
  );
}
