import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function ShamaToAccra() {
  return (
    <>
      <SEO 
        title="Shama to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Shama and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/shama-to-accra"
        keywords={["towing Shama to Accra", "Shama Accra towing service", "tow truck Shama", "vehicle recovery Shama Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="shama-to-accra"
        areaLabel="Shama to Accra"
        defaultHeading="Shama to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Shama and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/sekondi-to-accra", label: "Sekondi to Accra" }}
        nextArea={{ path: "/service-areas/sekondi-to-accra", label: "Sogakope to Accra" }}
      />
    </>
  );
}
