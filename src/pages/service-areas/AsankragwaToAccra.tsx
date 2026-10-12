import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AsankragwaToAccra() {
  return (
    <>
      <SEO 
        title="Asankragwa to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Asankragwa to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Asankragwa and Accra."
        canonical="/service-areas/asankragwa-to-accra"
        keywords={["towing Asankragwa to Accra", "Asankragwa Accra towing service", "tow truck Asankragwa", "vehicle recovery Asankragwa Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="asankragwa-to-accra"
        areaLabel="Asankragwa to Accra"
        defaultHeading="Asankragwa to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Asankragwa to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Asankragwa and Accra."
        prevArea={{ path: "/service-areas/asamankese-to-accra", label: "Asamankese to Accra" }}
        nextArea={{ path: "/service-areas/asamankese-to-accra", label: "Asante Akim to Accra" }}
      />
    </>
  );
}
