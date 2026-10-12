import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAburi() {
  return (
    <>
      <SEO 
        title="Accra to Aburi Towing & Car Recovery Service"
        description="Need a tow from Accra to Aburi? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Aburi."
        canonical="/service-areas/accra-to-aburi"
        keywords={["towing Accra to Aburi", "Accra Aburi towing service", "tow truck Accra", "car recovery Accra Aburi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-aburi"
        areaLabel="Accra to Aburi"
        defaultHeading="Accra to Aburi Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Aburi? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Aburi."
        prevArea={{ path: "/service-areas/accra-to-abuakwa", label: "Accra to Abuakwa" }}
        nextArea={{ path: "/service-areas/accra-to-aflao", label: "Accra to Aflao" }}
      />
    </>
  );
}
