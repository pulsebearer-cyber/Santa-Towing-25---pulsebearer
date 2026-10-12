import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DaboaseToAccra() {
  return (
    <>
      <SEO 
        title="Daboase to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Daboase to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Daboase and Accra."
        canonical="/service-areas/daboase-to-accra"
        keywords={["towing Daboase to Accra", "Daboase Accra towing service", "tow truck Daboase", "vehicle recovery Daboase Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="daboase-to-accra"
        areaLabel="Daboase to Accra"
        defaultHeading="Daboase to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Daboase to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Daboase and Accra."
        prevArea={{ path: "/service-areas/circle", label: "Circle" }}
        nextArea={{ path: "/service-areas/circle", label: "Daboya to Accra" }}
      />
    </>
  );
}
