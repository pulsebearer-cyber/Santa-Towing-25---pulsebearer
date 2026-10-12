import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToPrang() {
  return (
    <>
      <SEO 
        title="Accra to Prang Towing & Car Recovery Service"
        description="Need a tow from Accra to Prang? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Prang."
        canonical="/service-areas/accra-to-prang"
        keywords={["towing Accra to Prang", "Accra Prang towing service", "tow truck Accra", "car recovery Accra Prang", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-prang"
        areaLabel="Accra to Prang"
        defaultHeading="Accra to Prang Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Prang? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Prang."
        prevArea={{ path: "/service-areas/accra-to-paga", label: "Accra to Paga" }}
        nextArea={{ path: "/service-areas/accra-to-paga", label: "Accra to Prestea" }}
      />
    </>
  );
}
