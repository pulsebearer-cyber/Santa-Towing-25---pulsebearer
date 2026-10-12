import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNkoranza() {
  return (
    <>
      <SEO 
        title="Accra to Nkoranza Towing & Car Recovery Service"
        description="Need a tow from Accra to Nkoranza? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Nkoranza."
        canonical="/service-areas/accra-to-nkoranza"
        keywords={["towing Accra to Nkoranza", "Accra Nkoranza towing service", "tow truck Accra", "car recovery Accra Nkoranza", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nkoranza"
        areaLabel="Accra to Nkoranza"
        defaultHeading="Accra to Nkoranza Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Nkoranza? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Nkoranza."
        prevArea={{ path: "/service-areas/accra-to-nkawkaw", label: "Accra to Nkawkaw" }}
        nextArea={{ path: "/service-areas/accra-to-nkawkaw", label: "Accra to Nkwanta" }}
      />
    </>
  );
}
