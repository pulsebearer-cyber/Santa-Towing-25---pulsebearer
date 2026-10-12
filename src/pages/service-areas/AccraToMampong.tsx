import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToMampong() {
  return (
    <>
      <SEO 
        title="Accra to Mampong Towing & Car Recovery Service"
        description="Need a tow from Accra to Mampong? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Mampong."
        canonical="/service-areas/accra-to-mampong"
        keywords={["towing Accra to Mampong", "Accra Mampong towing service", "tow truck Accra", "car recovery Accra Mampong", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-mampong"
        areaLabel="Accra to Mampong"
        defaultHeading="Accra to Mampong Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Mampong? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Mampong."
        prevArea={{ path: "/service-areas/accra-to-lawra", label: "Accra to Lawra" }}
        nextArea={{ path: "/service-areas/accra-to-lawra", label: "Accra to Mankessim" }}
      />
    </>
  );
}
