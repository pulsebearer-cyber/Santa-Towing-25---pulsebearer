import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Nima() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Nima"
        description="Looking for a dependable tow truck in Nima? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Nima, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/nima"
        keywords={["towing Nima", "tow truck Nima", "roadside assistance Nima", "car recovery Nima", "emergency towing Nima", "breakdown service Nima"]}
      />
      <ServiceAreaPageTemplate
        slug="nima"
        areaLabel="Nima"
        defaultHeading="Towing & Recovery Service in Nima"
        defaultDescription="Looking for a dependable tow truck in Nima? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Nima, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/navrongo-to-accra", label: "Navrongo to Accra" }}
        nextArea={{ path: "/service-areas/navrongo-to-accra", label: "Ningo Prampram" }}
      />
    </>
  );
}
