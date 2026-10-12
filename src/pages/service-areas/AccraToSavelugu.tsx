import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToSavelugu() {
  return (
    <>
      <SEO 
        title="Accra to Savelugu Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Savelugu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-savelugu"
        keywords={["towing Accra to Savelugu", "Accra Savelugu towing service", "tow truck Accra", "car recovery Accra Savelugu", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-savelugu"
        areaLabel="Accra to Savelugu"
        defaultHeading="Accra to Savelugu Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Savelugu? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-sandema", label: "Accra to Sandema" }}
        nextArea={{ path: "/service-areas/accra-to-sandema", label: "Accra to Sefwi Bekwai" }}
      />
    </>
  );
}
