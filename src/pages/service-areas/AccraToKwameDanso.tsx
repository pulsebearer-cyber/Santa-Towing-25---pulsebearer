import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToKwameDanso() {
  return (
    <>
      <SEO 
        title="Accra to Kwame Danso Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Kwame Danso? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-kwame-danso"
        keywords={["towing Accra to Kwame Danso", "Accra Kwame Danso towing service", "tow truck Accra", "car recovery Accra Kwame Danso", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-kwame-danso"
        areaLabel="Accra to Kwame Danso"
        defaultHeading="Accra to Kwame Danso Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Kwame Danso? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-kumasi", label: "Accra to Kumasi" }}
        nextArea={{ path: "/service-areas/accra-to-lawra", label: "Accra to Lawra" }}
      />
    </>
  );
}
