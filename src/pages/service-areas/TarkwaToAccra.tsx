import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function TarkwaToAccra() {
  return (
    <>
      <SEO 
        title="Tarkwa to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Tarkwa to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Tarkwa and Accra."
        canonical="/service-areas/tarkwa-to-accra"
        keywords={["towing Tarkwa to Accra", "Tarkwa Accra towing service", "tow truck Tarkwa", "vehicle recovery Tarkwa Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="tarkwa-to-accra"
        areaLabel="Tarkwa to Accra"
        defaultHeading="Tarkwa to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Tarkwa to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Tarkwa and Accra."
        prevArea={{ path: "/service-areas/tamale-to-accra", label: "Tamale to Accra" }}
        nextArea={{ path: "/service-areas/tamale-to-accra", label: "Techiman to Accra" }}
      />
    </>
  );
}
