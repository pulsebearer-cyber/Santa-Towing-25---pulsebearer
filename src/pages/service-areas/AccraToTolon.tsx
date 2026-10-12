import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToTolon() {
  return (
    <>
      <SEO 
        title="Accra to Tolon Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Tolon? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Tolon."
        canonical="/service-areas/accra-to-tolon"
        keywords={["towing Accra to Tolon", "Accra Tolon towing service", "tow truck Accra", "vehicle recovery Accra Tolon", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-tolon"
        areaLabel="Accra to Tolon"
        defaultHeading="Accra to Tolon Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Tolon? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Tolon."
        prevArea={{ path: "/service-areas/accra-to-tepa", label: "Accra to Tepa" }}
        nextArea={{ path: "/service-areas/accra-to-tepa", label: "Accra to Tumu" }}
      />
    </>
  );
}
