import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAkwatia() {
  return (
    <>
      <SEO 
        title="Accra to Akwatia Towing & Car Recovery Service"
        description="Need a tow from Accra to Akwatia? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Akwatia."
        canonical="/service-areas/accra-to-akwatia"
        keywords={["towing Accra to Akwatia", "Accra Akwatia towing service", "tow truck Accra", "car recovery Accra Akwatia", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-akwatia"
        areaLabel="Accra to Akwatia"
        defaultHeading="Accra to Akwatia Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Akwatia? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Akwatia."
        prevArea={{ path: "/service-areas/accra-to-akropong", label: "Accra to Akropong" }}
        nextArea={{ path: "/service-areas/accra-to-akyem-oda", label: "Accra to Akyem Oda" }}
      />
    </>
  );
}
