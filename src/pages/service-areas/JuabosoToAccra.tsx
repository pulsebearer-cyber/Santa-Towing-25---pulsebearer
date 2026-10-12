import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function JuabosoToAccra() {
  return (
    <>
      <SEO 
        title="Juaboso to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Juaboso to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Juaboso and Accra."
        canonical="/service-areas/juaboso-to-accra"
        keywords={["towing Juaboso to Accra", "Juaboso Accra towing service", "tow truck Juaboso", "vehicle recovery Juaboso Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="juaboso-to-accra"
        areaLabel="Juaboso to Accra"
        defaultHeading="Juaboso to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Juaboso to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Juaboso and Accra."
        prevArea={{ path: "/service-areas/juaben-to-accra", label: "Juaben to Accra" }}
        nextArea={{ path: "/service-areas/juaben-to-accra", label: "Kadjebi to Accra" }}
      />
    </>
  );
}
