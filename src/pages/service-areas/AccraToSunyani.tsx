import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSunyani() {
  return (
    <>
      <SEO 
        title="Accra to Sunyani Towing & Vehicle Recovery Service"
        description="Stranded on the road between Accra and Sunyani? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-sunyani"
        keywords={["towing Accra to Sunyani", "Accra Sunyani towing service", "tow truck Accra", "vehicle recovery Accra Sunyani", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-sunyani"
        areaLabel="Accra to Sunyani"
        defaultHeading="Accra to Sunyani Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Accra and Sunyani? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-suhum", label: "Accra to Suhum" }}
        nextArea={{ path: "/service-areas/accra-to-suhum", label: "Accra to Takoradi" }}
      />
    </>
  );
}
