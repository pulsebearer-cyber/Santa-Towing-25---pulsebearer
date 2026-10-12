import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Nungua() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Nungua"
        description="Looking for a dependable tow truck in Nungua? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Nungua, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/nungua"
        keywords={["towing Nungua", "tow truck Nungua", "roadside assistance Nungua", "car recovery Nungua", "emergency towing Nungua", "breakdown service Nungua"]}
      />
      <ServiceAreaPageTemplate
        slug="nungua"
        areaLabel="Nungua"
        defaultHeading="Towing & Recovery Service in Nungua"
        defaultDescription="Looking for a dependable tow truck in Nungua? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Nungua, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/nsawam-to-accra", label: "Nsawam to Accra" }}
        nextArea={{ path: "/service-areas/nsawam-to-accra", label: "Obuasi to Accra" }}
      />
    </>
  );
}
