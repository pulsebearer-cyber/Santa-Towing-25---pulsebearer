import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKoforidua() {
  return (
    <>
      <SEO 
        title="Accra to Koforidua Towing & Car Recovery Service"
        description="Need a tow from Accra to Koforidua? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Koforidua."
        canonical="/service-areas/accra-to-koforidua"
        keywords={["towing Accra to Koforidua", "Accra Koforidua towing service", "tow truck Accra", "car recovery Accra Koforidua", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-koforidua"
        areaLabel="Accra to Koforidua"
        defaultHeading="Accra to Koforidua Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Koforidua? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Koforidua."
        prevArea={{ path: "/service-areas/accra-to-kintampo", label: "Accra to Kintampo" }}
        nextArea={{ path: "/service-areas/accra-to-konongo", label: "Accra to Konongo" }}
      />
    </>
  );
}
