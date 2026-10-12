import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTumu() {
  return (
    <>
      <SEO 
        title="Accra to Tumu Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Tumu? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Tumu."
        canonical="/service-areas/accra-to-tumu"
        keywords={["towing Accra to Tumu", "Accra Tumu towing service", "tow truck Accra", "vehicle recovery Accra Tumu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-tumu"
        areaLabel="Accra to Tumu"
        defaultHeading="Accra to Tumu Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Tumu? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Tumu."
        prevArea={{ path: "/service-areas/accra-to-tolon", label: "Accra to Tolon" }}
        nextArea={{ path: "/service-areas/accra-to-tolon", label: "Accra to Wa" }}
      />
    </>
  );
}
