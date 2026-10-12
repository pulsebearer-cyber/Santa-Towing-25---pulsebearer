import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToFumbisi() {
  return (
    <>
      <SEO 
        title="Accra to Fumbisi Towing & Car Recovery Service"
        description="Need a tow from Accra to Fumbisi? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Fumbisi."
        canonical="/service-areas/accra-to-fumbisi"
        keywords={["towing Accra to Fumbisi", "Accra Fumbisi towing service", "tow truck Accra", "car recovery Accra Fumbisi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-fumbisi"
        areaLabel="Accra to Fumbisi"
        defaultHeading="Accra to Fumbisi Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Fumbisi? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Fumbisi."
        prevArea={{ path: "/service-areas/accra-to-fomena", label: "Accra to Fomena" }}
        nextArea={{ path: "/service-areas/accra-to-gambaga", label: "Accra to Gambaga" }}
      />
    </>
  );
}
