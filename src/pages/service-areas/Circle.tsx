import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Circle() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Circle"
        description="Looking for a dependable tow truck in Circle? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Circle, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/circle"
        keywords={["towing Circle", "tow truck Circle", "roadside assistance Circle", "car recovery Circle", "emergency towing Circle", "breakdown service Circle"]}
      />
      <ServiceAreaPageTemplate
        slug="circle"
        areaLabel="Circle"
        defaultHeading="Towing & Recovery Service in Circle"
        defaultDescription="Looking for a dependable tow truck in Circle? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Circle, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/cape-coast-to-accra", label: "Cape Coast to Accra" }}
        nextArea={{ path: "/service-areas/cape-coast-to-accra", label: "Daboase to Accra" }}
      />
    </>
  );
}
