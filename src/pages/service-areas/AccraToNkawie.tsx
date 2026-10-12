import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNkawie() {
  return (
    <>
      <SEO 
        title="Accra to Nkawie Towing & Car Recovery Service"
        description="Need a tow from Accra to Nkawie? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Nkawie."
        canonical="/service-areas/accra-to-nkawie"
        keywords={["towing Accra to Nkawie", "Accra Nkawie towing service", "tow truck Accra", "car recovery Accra Nkawie", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nkawie"
        areaLabel="Accra to Nkawie"
        defaultHeading="Accra to Nkawie Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Nkawie? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Nkawie."
        prevArea={{ path: "/service-areas/accra-to-navrongo", label: "Accra to Navrongo" }}
        nextArea={{ path: "/service-areas/accra-to-navrongo", label: "Accra to Nkawkaw" }}
      />
    </>
  );
}
