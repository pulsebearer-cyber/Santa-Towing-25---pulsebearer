import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Accra() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Accra"
        description="Looking for a dependable tow truck in Accra? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Accra, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/accra"
        keywords={["towing Accra", "tow truck Accra", "roadside assistance Accra", "car recovery Accra", "emergency towing Accra", "breakdown service Accra"]}
      />
      <ServiceAreaPageTemplate
        slug="accra"
        areaLabel="Accra"
        defaultHeading="Towing & Recovery Service in Accra"
        defaultDescription="Looking for a dependable tow truck in Accra? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Accra, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/aburi-to-accra", label: "Aburi to Accra" }}
        nextArea={{ path: "/service-areas/accra-to-abuakwa", label: "Accra to Abuakwa" }}
      />
    </>
  );
}
