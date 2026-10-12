import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToEjisu() {
  return (
    <>
      <SEO 
        title="Accra to Ejisu Towing & Car Recovery Service"
        description="Need a tow from Accra to Ejisu? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Ejisu."
        canonical="/service-areas/accra-to-ejisu"
        keywords={["towing Accra to Ejisu", "Accra Ejisu towing service", "tow truck Accra", "car recovery Accra Ejisu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-ejisu"
        areaLabel="Accra to Ejisu"
        defaultHeading="Accra to Ejisu Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Ejisu? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Ejisu."
        prevArea={{ path: "/service-areas/accra-to-dunkwa-on-offin", label: "Accra to Dunkwa On Offin" }}
        nextArea={{ path: "/service-areas/accra-to-elmina", label: "Accra to Elmina" }}
      />
    </>
  );
}
