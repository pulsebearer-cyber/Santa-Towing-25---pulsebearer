import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSuhum() {
  return (
    <>
      <SEO 
        title="Accra to Suhum Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Suhum? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Suhum."
        canonical="/service-areas/accra-to-suhum"
        keywords={["towing Accra to Suhum", "Accra Suhum towing service", "tow truck Accra", "vehicle recovery Accra Suhum", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-suhum"
        areaLabel="Accra to Suhum"
        defaultHeading="Accra to Suhum Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Suhum? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Suhum."
        prevArea={{ path: "/service-areas/accra-to-somanya", label: "Accra to Somanya" }}
        nextArea={{ path: "/service-areas/accra-to-somanya", label: "Accra to Sunyani" }}
      />
    </>
  );
}
