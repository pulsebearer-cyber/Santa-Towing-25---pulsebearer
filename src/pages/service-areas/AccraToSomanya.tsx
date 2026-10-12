import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSomanya() {
  return (
    <>
      <SEO 
        title="Accra to Somanya Towing & Vehicle Recovery Service"
        description="Need a tow from Accra to Somanya? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Somanya."
        canonical="/service-areas/accra-to-somanya"
        keywords={["towing Accra to Somanya", "Accra Somanya towing service", "tow truck Accra", "vehicle recovery Accra Somanya", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-somanya"
        areaLabel="Accra to Somanya"
        defaultHeading="Accra to Somanya Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Accra to Somanya? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Accra and Somanya."
        prevArea={{ path: "/service-areas/accra-to-sogakope", label: "Accra to Sogakope" }}
        nextArea={{ path: "/service-areas/accra-to-sogakope", label: "Accra to Suhum" }}
      />
    </>
  );
}
