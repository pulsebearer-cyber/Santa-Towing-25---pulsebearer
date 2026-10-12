import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDuayawNkwanta() {
  return (
    <>
      <SEO 
        title="Accra to Duayaw Nkwanta Towing & Car Recovery Service"
        description="Need a tow from Accra to Duayaw Nkwanta? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Duayaw Nkwanta."
        canonical="/service-areas/accra-to-duayaw-nkwanta"
        keywords={["towing Accra to Duayaw Nkwanta", "Accra Duayaw Nkwanta towing service", "tow truck Accra", "car recovery Accra Duayaw Nkwanta", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-duayaw-nkwanta"
        areaLabel="Accra to Duayaw Nkwanta"
        defaultHeading="Accra to Duayaw Nkwanta Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Duayaw Nkwanta? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Duayaw Nkwanta."
        prevArea={{ path: "/service-areas/accra-to-dormaa-ahenkro", label: "Accra to Dormaa Ahenkro" }}
        nextArea={{ path: "/service-areas/accra-to-dunkwa-on-offin", label: "Accra to Dunkwa On Offin" }}
      />
    </>
  );
}
