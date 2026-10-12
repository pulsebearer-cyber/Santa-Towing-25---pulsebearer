import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToNsawam() {
  return (
    <>
      <SEO 
        title="Accra to Nsawam Towing & Car Recovery Service"
        description="Stranded on the road between Accra and Nsawam? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/accra-to-nsawam"
        keywords={["towing Accra to Nsawam", "Accra Nsawam towing service", "tow truck Accra", "car recovery Accra Nsawam", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-nsawam"
        areaLabel="Accra to Nsawam"
        defaultHeading="Accra to Nsawam Towing & Car Recovery Service"
        defaultDescription="Stranded on the road between Accra and Nsawam? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial cars, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/accra-to-nkwanta-south", label: "Accra to Nkwanta South" }}
        nextArea={{ path: "/service-areas/accra-to-nkwanta-south", label: "Accra to Obuasi" }}
      />
    </>
  );
}
