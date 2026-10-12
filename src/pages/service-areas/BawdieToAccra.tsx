import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BawdieToAccra() {
  return (
    <>
      <SEO 
        title="Bawdie to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Bawdie to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Bawdie and Accra."
        canonical="/service-areas/bawdie-to-accra"
        keywords={["towing Bawdie to Accra", "Bawdie Accra towing service", "tow truck Bawdie", "vehicle recovery Bawdie Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="bawdie-to-accra"
        areaLabel="Bawdie to Accra"
        defaultHeading="Bawdie to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Bawdie to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Bawdie and Accra."
        prevArea={{ path: "/service-areas/ayawaso", label: "Ayawaso" }}
        nextArea={{ path: "/service-areas/ayawaso", label: "Bawku to Accra" }}
      />
    </>
  );
}
