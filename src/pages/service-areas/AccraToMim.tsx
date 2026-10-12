import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToMim() {
  return (
    <>
      <SEO 
        title="Accra to Mim Towing & Car Recovery Service"
        description="Need a tow from Accra to Mim? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Mim."
        canonical="/service-areas/accra-to-mim"
        keywords={["towing Accra to Mim", "Accra Mim towing service", "tow truck Accra", "car recovery Accra Mim", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-mim"
        areaLabel="Accra to Mim"
        defaultHeading="Accra to Mim Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Mim? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Mim."
        prevArea={{ path: "/service-areas/accra-to-mankessim", label: "Accra to Mankessim" }}
        nextArea={{ path: "/service-areas/accra-to-mankessim", label: "Accra to Mpohor" }}
      />
    </>
  );
}
