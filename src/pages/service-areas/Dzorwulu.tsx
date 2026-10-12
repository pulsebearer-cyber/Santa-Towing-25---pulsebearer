import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Dzorwulu() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Dzorwulu"
        description="Looking for a dependable tow truck in Dzorwulu? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Dzorwulu, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/dzorwulu"
        keywords={["towing Dzorwulu", "tow truck Dzorwulu", "roadside assistance Dzorwulu", "car recovery Dzorwulu", "emergency towing Dzorwulu", "breakdown service Dzorwulu"]}
      />
      <ServiceAreaPageTemplate
        slug="dzorwulu"
        areaLabel="Dzorwulu"
        defaultHeading="Towing & Recovery Service in Dzorwulu"
        defaultDescription="Looking for a dependable tow truck in Dzorwulu? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Dzorwulu, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/dunkwa-on-offin-to-accra", label: "Dunkwa On Offin to Accra" }}
        nextArea={{ path: "/service-areas/dunkwa-on-offin-to-accra", label: "East Legon" }}
      />
    </>
  );
}
