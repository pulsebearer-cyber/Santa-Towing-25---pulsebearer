import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToHamile() {
  return (
    <>
      <SEO 
        title="Accra to Hamile Towing & Car Recovery Service"
        description="Need a tow from Accra to Hamile? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Hamile."
        canonical="/service-areas/accra-to-hamile"
        keywords={["towing Accra to Hamile", "Accra Hamile towing service", "tow truck Accra", "car recovery Accra Hamile", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-hamile"
        areaLabel="Accra to Hamile"
        defaultHeading="Accra to Hamile Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Hamile? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Hamile."
        prevArea={{ path: "/service-areas/accra-to-half-assini", label: "Accra to Half Assini" }}
        nextArea={{ path: "/service-areas/accra-to-ho", label: "Accra to Ho" }}
      />
    </>
  );
}
