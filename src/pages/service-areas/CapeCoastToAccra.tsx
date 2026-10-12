import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function CapeCoastToAccra() {
  return (
    <>
      <SEO 
        title="Cape Coast to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Cape Coast to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Cape Coast and Accra."
        canonical="/service-areas/cape-coast-to-accra"
        keywords={["towing Cape Coast to Accra", "Cape Coast Accra towing service", "tow truck Cape Coast", "vehicle recovery Cape Coast Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="cape-coast-to-accra"
        areaLabel="Cape Coast to Accra"
        defaultHeading="Cape Coast to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Cape Coast to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Cape Coast and Accra."
        prevArea={{ path: "/service-areas/burma-camp", label: "Burma Camp" }}
        nextArea={{ path: "/service-areas/burma-camp", label: "Circle" }}
      />
    </>
  );
}
