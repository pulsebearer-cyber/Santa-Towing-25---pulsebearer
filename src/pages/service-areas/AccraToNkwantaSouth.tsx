import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNkwantaSouth() {
  return (
    <>
      <SEO 
        title="Accra to Nkwanta South Towing & Car Recovery Service"
        description="Need a tow from Accra to Nkwanta South? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Nkwanta South."
        canonical="/service-areas/accra-to-nkwanta-south"
        keywords={["towing Accra to Nkwanta South", "Accra Nkwanta South towing service", "tow truck Accra", "car recovery Accra Nkwanta South", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nkwanta-south"
        areaLabel="Accra to Nkwanta South"
        defaultHeading="Accra to Nkwanta South Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Nkwanta South? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Nkwanta South."
        prevArea={{ path: "/service-areas/accra-to-nkwanta", label: "Accra to Nkwanta" }}
        nextArea={{ path: "/service-areas/accra-to-nkwanta", label: "Accra to Nsawam" }}
      />
    </>
  );
}
