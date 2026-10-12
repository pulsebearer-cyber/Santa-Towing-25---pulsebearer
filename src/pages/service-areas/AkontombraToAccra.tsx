import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AkontombraToAccra() {
  return (
    <>
      <SEO 
        title="Akontombra to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Akontombra and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/akontombra-to-accra"
        keywords={["towing Akontombra to Accra", "Akontombra Accra towing service", "tow truck Akontombra", "vehicle recovery Akontombra Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="akontombra-to-accra"
        areaLabel="Akontombra to Accra"
        defaultHeading="Akontombra to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Akontombra and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/airport-residential", label: "Airport Residential" }}
        nextArea={{ path: "/service-areas/airport-residential", label: "Akropong to Accra" }}
      />
    </>
  );
}
