import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToYeji() {
  return (
    <>
      <SEO 
        title="Accra to Yeji Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Yeji? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Yeji."
        canonical="/service-areas/accra-to-yeji"
        keywords={["towing Accra to Yeji", "Accra Yeji towing service", "tow truck Accra", "vehicle recovery Accra Yeji", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-yeji"
        areaLabel="Accra to Yeji"
        defaultHeading="Accra to Yeji Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Yeji? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Yeji."
        prevArea={{ path: "/service-areas/accra-to-winneba", label: "Accra to Winneba" }}
        nextArea={{ path: "/service-areas/accra-to-winneba", label: "Accra to Yendi" }}
      />
    </>
  );
}
