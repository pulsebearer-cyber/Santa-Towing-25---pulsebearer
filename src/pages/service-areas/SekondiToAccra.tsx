import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SekondiToAccra() {
  return (
    <>
      <SEO 
        title="Sekondi to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Sekondi to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Sekondi and Accra."
        canonical="/service-areas/sekondi-to-accra"
        keywords={["towing Sekondi to Accra", "Sekondi Accra towing service", "tow truck Sekondi", "vehicle recovery Sekondi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="sekondi-to-accra"
        areaLabel="Sekondi to Accra"
        defaultHeading="Sekondi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Sekondi to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently."
        prevArea={{ path: "/service-areas/sefwi-wiawso-to-accra", label: "Sefwi Wiawso to Accra" }}
        nextArea={{ path: "/service-areas/sefwi-wiawso-to-accra", label: "Shama to Accra" }}
      />
    </>
  );
}
