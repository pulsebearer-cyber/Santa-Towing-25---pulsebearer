import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function SogakopeToAccra() {
  return (
    <>
      <SEO 
        title="Sogakope to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Sogakope and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/sogakope-to-accra"
        keywords={["towing Sogakope to Accra", "Sogakope Accra towing service", "tow truck Sogakope", "vehicle recovery Sogakope Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="sogakope-to-accra"
        areaLabel="Sogakope to Accra"
        defaultHeading="Sogakope to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Sogakope and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/shama-to-accra", label: "Shama to Accra" }}
        nextArea={{ path: "/service-areas/shama-to-accra", label: "Somanya to Accra" }}
      />
    </>
  );
}
