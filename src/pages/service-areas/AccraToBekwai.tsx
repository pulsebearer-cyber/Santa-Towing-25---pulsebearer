import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBekwai() {
  return (
    <>
      <SEO 
        title="Accra to Bekwai Towing & Car Recovery Service"
        description="Need a tow from Accra to Bekwai? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Bekwai."
        canonical="/service-areas/accra-to-bekwai"
        keywords={["towing Accra to Bekwai", "Accra Bekwai towing service", "tow truck Accra", "car recovery Accra Bekwai", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bekwai"
        areaLabel="Accra to Bekwai"
        defaultHeading="Accra to Bekwai Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Bekwai? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Bekwai."
        prevArea={{ path: "/service-areas/accra-to-begoro", label: "Accra to Begoro" }}
        nextArea={{ path: "/service-areas/accra-to-berekum", label: "Accra to Berekum" }}
      />
    </>
  );
}
