import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function TakoradiToAccra() {
  return (
    <>
      <SEO 
        title="Takoradi to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Takoradi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/takoradi-to-accra"
        keywords={["towing Takoradi to Accra", "Takoradi Accra towing service", "tow truck Takoradi", "vehicle recovery Takoradi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="takoradi-to-accra"
        areaLabel="Takoradi to Accra"
        defaultHeading="Takoradi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Takoradi and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey."
        prevArea={{ path: "/service-areas/sunyani-to-accra", label: "Sunyani to Accra" }}
        nextArea={{ path: "/service-areas/sunyani-to-accra", label: "Tamale to Accra" }}
      />
    </>
  );
}
