import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToDunkwaOnOffin() {
  return (
    <>
      <SEO 
        title="Accra to Dunkwa-on-Offin Towing & Car Recovery Service"
        description="Need a tow from Accra to Dunkwa-on-Offin? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Dunkwa-on-Offin."
        canonical="/service-areas/accra-to-dunkwa-on-offin"
        keywords={["towing Accra to Dunkwa-on-Offin", "Accra Dunkwa-on-Offin towing service", "tow truck Accra", "car recovery Accra Dunkwa-on-Offin", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-dunkwa-on-offin"
        areaLabel="Accra to Dunkwa-on-Offin"
        defaultHeading="Accra to Dunkwa-on-Offin Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Dunkwa-on-Offin? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Dunkwa-on-Offin."
        prevArea={{ path: "/service-areas/accra-to-duayaw-nkwanta", label: "Accra to Duayaw Nkwanta" }}
        nextArea={{ path: "/service-areas/accra-to-ejisu", label: "Accra to Ejisu" }}
      />
    </>
  );
}
