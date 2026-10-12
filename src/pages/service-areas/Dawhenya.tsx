import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Dawhenya() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Dawhenya"
        description="Looking for a dependable tow truck in Dawhenya? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Dawhenya, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/dawhenya"
        keywords={["towing Dawhenya", "tow truck Dawhenya", "roadside assistance Dawhenya", "car recovery Dawhenya", "emergency towing Dawhenya", "breakdown service Dawhenya"]}
      />
      <ServiceAreaPageTemplate
        slug="dawhenya"
        areaLabel="Dawhenya"
        defaultHeading="Towing & Recovery Service in Dawhenya"
        defaultDescription="Looking for a dependable tow truck in Dawhenya? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Dawhenya, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/dansoman", label: "Dansoman" }}
        nextArea={{ path: "/service-areas/dansoman", label: "Dodowa" }}
      />
    </>
  );
}
