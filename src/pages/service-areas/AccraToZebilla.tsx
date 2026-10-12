import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToZebilla() {
  return (
    <>
      <SEO 
        title="Accra to Zebilla Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Zebilla? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Zebilla."
        canonical="/service-areas/accra-to-zebilla"
        keywords={["towing Accra to Zebilla", "Accra Zebilla towing service", "tow truck Accra", "vehicle recovery Accra Zebilla", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-zebilla"
        areaLabel="Accra to Zebilla"
        defaultHeading="Accra to Zebilla Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Zebilla? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Zebilla."
        prevArea={{ path: "/service-areas/accra-to-yendi", label: "Accra to Yendi" }}
        nextArea={{ path: "/service-areas/accra-to-yendi", label: "Achimota" }}
      />
    </>
  );
}
