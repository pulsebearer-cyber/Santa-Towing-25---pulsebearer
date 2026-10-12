import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function ApamToAccra() {
  return (
    <>
      <SEO 
        title="Apam to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Apam to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Apam and Accra."
        canonical="/service-areas/apam-to-accra"
        keywords={["towing Apam to Accra", "Apam Accra towing service", "tow truck Apam", "vehicle recovery Apam Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="apam-to-accra"
        areaLabel="Apam to Accra"
        defaultHeading="Apam to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Apam to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Apam and Accra."
        prevArea={{ path: "/service-areas/amasaman", label: "Amasaman" }}
        nextArea={{ path: "/service-areas/amasaman", label: "Asamankese to Accra" }}
      />
    </>
  );
}
