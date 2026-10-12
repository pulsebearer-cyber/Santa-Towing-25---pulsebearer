import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function PresteaToAccra() {
  return (
    <>
      <SEO 
        title="Prestea to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Prestea to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Prestea and Accra."
        canonical="/service-areas/prestea-to-accra"
        keywords={["towing Prestea to Accra", "Prestea Accra towing service", "tow truck Prestea", "vehicle recovery Prestea Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="prestea-to-accra"
        areaLabel="Prestea to Accra"
        defaultHeading="Prestea to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Prestea to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Prestea and Accra."
        prevArea={{ path: "/service-areas/prang-to-accra", label: "Prang to Accra" }}
        nextArea={{ path: "/service-areas/prang-to-accra", label: "Salaga to Accra" }}
      />
    </>
  );
}
