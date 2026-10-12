import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function EluboToAccra() {
  return (
    <>
      <SEO 
        title="Elubo to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Elubo to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Elubo and Accra."
        canonical="/service-areas/elubo-to-accra"
        keywords={["towing Elubo to Accra", "Elubo Accra towing service", "tow truck Elubo", "vehicle recovery Elubo Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="elubo-to-accra"
        areaLabel="Elubo to Accra"
        defaultHeading="Elubo to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Elubo to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Elubo and Accra."
        prevArea={{ path: "/service-areas/elmina-to-accra", label: "Elmina to Accra" }}
        nextArea={{ path: "/service-areas/elmina-to-accra", label: "Enchi to Accra" }}
      />
    </>
  );
}
