import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToJirapa() {
  return (
    <>
      <SEO 
        title="Accra to Jirapa Towing & Car Recovery Service"
        description="Need a tow from Accra to Jirapa? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Jirapa."
        canonical="/service-areas/accra-to-jirapa"
        keywords={["towing Accra to Jirapa", "Accra Jirapa towing service", "tow truck Accra", "car recovery Accra Jirapa", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-jirapa"
        areaLabel="Accra to Jirapa"
        defaultHeading="Accra to Jirapa Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Jirapa? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Jirapa."
        prevArea={{ path: "/service-areas/accra-to-jasikan", label: "Accra to Jasikan" }}
        nextArea={{ path: "/service-areas/accra-to-juaben", label: "Accra to Juaben" }}
      />
    </>
  );
}
