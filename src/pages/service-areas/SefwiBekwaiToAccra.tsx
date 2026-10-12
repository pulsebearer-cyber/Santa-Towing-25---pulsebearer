import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SefwiBekwaiToAccra() {
  return (
    <>
      <SEO 
        title="Sefwi Bekwai to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Sefwi Bekwai to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Sefwi Bekwai and Accra."
        canonical="/service-areas/sefwi-bekwai-to-accra"
        keywords={["towing Sefwi Bekwai to Accra", "Sefwi Bekwai Accra towing service", "tow truck Sefwi Bekwai", "vehicle recovery Sefwi Bekwai Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="sefwi-bekwai-to-accra"
        areaLabel="Sefwi Bekwai to Accra"
        defaultHeading="Sefwi Bekwai to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Sefwi Bekwai to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Sefwi Bekwai and Accra."
        prevArea={{ path: "/service-areas/savelugu-to-accra", label: "Savelugu to Accra" }}
        nextArea={{ path: "/service-areas/savelugu-to-accra", label: "Sefwi Wiawso to Accra" }}
      />
    </>
  );
}
