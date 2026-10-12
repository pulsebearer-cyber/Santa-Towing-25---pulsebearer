import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToLawra() {
  return (
    <>
      <SEO 
        title="Accra to Lawra Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Lawra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-lawra"
        keywords={["towing Accra to Lawra", "Accra Lawra towing service", "tow truck Accra", "car recovery Accra Lawra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-lawra"
        areaLabel="Accra to Lawra"
        defaultHeading="Accra to Lawra Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Lawra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-kwame-danso", label: "Accra to Kwame Danso" }}
        nextArea={{ path: "/service-areas/accra-to-mampong", label: "Accra to Mampong" }}
      />
    </>
  );
}
