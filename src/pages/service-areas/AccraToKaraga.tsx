import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKaraga() {
  return (
    <>
      <SEO 
        title="Accra to Karaga Towing & Car Recovery Service"
        description="Need a tow from Accra to Karaga? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Karaga."
        canonical="/service-areas/accra-to-karaga"
        keywords={["towing Accra to Karaga", "Accra Karaga towing service", "tow truck Accra", "car recovery Accra Karaga", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-karaga"
        areaLabel="Accra to Karaga"
        defaultHeading="Accra to Karaga Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Karaga? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Karaga."
        prevArea={{ path: "/service-areas/accra-to-kadjebi", label: "Accra to Kadjebi" }}
        nextArea={{ path: "/service-areas/accra-to-kenyasi", label: "Accra to Kenyasi" }}
      />
    </>
  );
}
