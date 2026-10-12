import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToYendi() {
  return (
    <>
      <SEO 
        title="Accra to Yendi Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Yendi? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Yendi."
        canonical="/service-areas/accra-to-yendi"
        keywords={["towing Accra to Yendi", "Accra Yendi towing service", "tow truck Accra", "vehicle recovery Accra Yendi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-yendi"
        areaLabel="Accra to Yendi"
        defaultHeading="Accra to Yendi Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Yendi? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Yendi."
        prevArea={{ path: "/service-areas/accra-to-yeji", label: "Accra to Yeji" }}
        nextArea={{ path: "/service-areas/accra-to-yeji", label: "Accra to Zebilla" }}
      />
    </>
  );
}
