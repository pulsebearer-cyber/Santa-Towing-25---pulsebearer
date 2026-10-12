import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToBawku() {
  return (
    <>
      <SEO 
        title="Accra to Bawku Towing & Car Recovery Service"
        description="Need a tow from Accra to Bawku? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Bawku."
        canonical="/service-areas/accra-to-bawku"
        keywords={["towing Accra to Bawku", "Accra Bawku towing service", "tow truck Accra", "car recovery Accra Bawku", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-bawku"
        areaLabel="Accra to Bawku"
        defaultHeading="Accra to Bawku Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Bawku? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Bawku."
        prevArea={{ path: "/service-areas/accra-to-bawdie", label: "Accra to Bawdie" }}
        nextArea={{ path: "/service-areas/accra-to-bechem", label: "Accra to Bechem" }}
      />
    </>
  );
}
