import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Kaneshie() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Kaneshie"
        description="Looking for a dependable tow truck in Kaneshie? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Kaneshie, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/kaneshie"
        keywords={["towing Kaneshie", "tow truck Kaneshie", "roadside assistance Kaneshie", "car recovery Kaneshie", "emergency towing Kaneshie", "breakdown service Kaneshie"]}
      />
      <ServiceAreaPageTemplate
        slug="kaneshie"
        areaLabel="Kaneshie"
        defaultHeading="Towing & Recovery Service in Kaneshie"
        defaultDescription="Looking for a dependable tow truck in Kaneshie? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Kaneshie, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/kadjebi-to-accra", label: "Kadjebi to Accra" }}
        nextArea={{ path: "/service-areas/kadjebi-to-accra", label: "Karaga to Accra" }}
      />
    </>
  );
}
