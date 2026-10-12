import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SefwiWiawsoToAccra() {
  return (
    <>
      <SEO 
        title="Sefwi Wiawso to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Sefwi Wiawso to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Sefwi Wiawso and Accra."
        canonical="/service-areas/sefwi-wiawso-to-accra"
        keywords={["towing Sefwi Wiawso to Accra", "Sefwi Wiawso Accra towing service", "tow truck Sefwi Wiawso", "vehicle recovery Sefwi Wiawso Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="sefwi-wiawso-to-accra"
        areaLabel="Sefwi Wiawso to Accra"
        defaultHeading="Sefwi Wiawso to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Sefwi Wiawso to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Sefwi Wiawso and Accra."
        prevArea={{ path: "/service-areas/sefwi-bekwai-to-accra", label: "Sefwi Bekwai to Accra" }}
        nextArea={{ path: "/service-areas/sefwi-bekwai-to-accra", label: "Sekondi to Accra" }}
      />
    </>
  );
}
