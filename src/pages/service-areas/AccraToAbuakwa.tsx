import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAbuakwa() {
  return (
    <>
      <SEO 
        title="Accra to Abuakwa Towing & Car Recovery Service"
        description="Need a tow from Accra to Abuakwa? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Abuakwa."
        canonical="/service-areas/accra-to-abuakwa"
        keywords={["towing Accra to Abuakwa", "Accra Abuakwa towing service", "tow truck Accra", "car recovery Accra Abuakwa", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-abuakwa"
        areaLabel="Accra to Abuakwa"
        defaultHeading="Accra to Abuakwa Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Abuakwa? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Abuakwa."
        prevArea={{ path: "/service-areas/accra", label: "Accra" }}
        nextArea={{ path: "/service-areas/accra-to-aburi", label: "Accra to Aburi" }}
      />
    </>
  );
}
