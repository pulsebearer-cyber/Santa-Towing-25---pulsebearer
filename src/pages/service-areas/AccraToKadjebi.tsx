import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKadjebi() {
  return (
    <>
      <SEO 
        title="Accra to Kadjebi Towing & Car Recovery Service"
        description="Need a tow from Accra to Kadjebi? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Kadjebi."
        canonical="/service-areas/accra-to-kadjebi"
        keywords={["towing Accra to Kadjebi", "Accra Kadjebi towing service", "tow truck Accra", "car recovery Accra Kadjebi", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-kadjebi"
        areaLabel="Accra to Kadjebi"
        defaultHeading="Accra to Kadjebi Towing & Car Recovery Service"
        defaultDescription="Need a tow from Accra to Kadjebi? Santa Towing & Garage Services provides dependable long-distance towing and car recovery on this route, any time of day or night. Our fully licensed and insured team ensures your car is transported safely and efficiently. Contact us now for fast, professional service between Accra and Kadjebi."
        prevArea={{ path: "/service-areas/accra-to-juaboso", label: "Accra to Juaboso" }}
        nextArea={{ path: "/service-areas/accra-to-karaga", label: "Accra to Karaga" }}
      />
    </>
  );
}
