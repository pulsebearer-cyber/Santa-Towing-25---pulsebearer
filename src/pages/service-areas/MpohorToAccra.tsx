import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function MpohorToAccra() {
  return (
    <>
      <SEO 
        title="Mpohor to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Mpohor to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Mpohor and Accra."
        canonical="/service-areas/mpohor-to-accra"
        keywords={["towing Mpohor to Accra", "Mpohor Accra towing service", "tow truck Mpohor", "vehicle recovery Mpohor Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="mpohor-to-accra"
        areaLabel="Mpohor to Accra"
        defaultHeading="Mpohor to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Mpohor to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Mpohor and Accra."
        prevArea={{ path: "/service-areas/mim-to-accra", label: "Mim to Accra" }}
        nextArea={{ path: "/service-areas/mim-to-accra", label: "Nalerigu to Accra" }}
      />
    </>
  );
}
