import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function MankessimToAccra() {
  return (
    <>
      <SEO 
        title="Mankessim to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Mankessim to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Mankessim and Accra."
        canonical="/service-areas/mankessim-to-accra"
        keywords={["towing Mankessim to Accra", "Mankessim Accra towing service", "tow truck Mankessim", "vehicle recovery Mankessim Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="mankessim-to-accra"
        areaLabel="Mankessim to Accra"
        defaultHeading="Mankessim to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Mankessim to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Mankessim and Accra."
        prevArea={{ path: "/service-areas/mampong-to-accra", label: "Mampong to Accra" }}
        nextArea={{ path: "/service-areas/mampong-to-accra", label: "Mim to Accra" }}
      />
    </>
  );
}
