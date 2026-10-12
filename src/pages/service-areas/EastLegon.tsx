import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function EastLegon() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in East Legon"
        description="Looking for a dependable tow truck in East Legon? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around East Legon, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/east-legon"
        keywords={["towing East Legon", "tow truck East Legon", "roadside assistance East Legon", "car recovery East Legon", "emergency towing East Legon", "breakdown service East Legon"]}
      />
      <ServiceAreaPageTemplate
        slug="east-legon"
        areaLabel="East Legon"
        defaultHeading="Towing & Recovery Service in East Legon"
        defaultDescription="Looking for a dependable tow truck in East Legon? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around East Legon, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/dzorwulu", label: "Dzorwulu" }}
        nextArea={{ path: "/service-areas/dzorwulu", label: "Ejisu to Accra" }}
      />
    </>
  );
}
