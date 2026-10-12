import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function WeijaGbawe() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Weija-Gbawe"
        description="Looking for a dependable tow truck in Weija-Gbawe? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Weija-Gbawe, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        canonical="/service-areas/weija-gbawe"
        keywords={["towing Weija-Gbawe", "tow truck Weija-Gbawe", "roadside assistance Weija-Gbawe", "car recovery Weija-Gbawe", "emergency towing Weija-Gbawe", "breakdown service Weija-Gbawe"]}
      />
      <ServiceAreaPageTemplate
        slug="weija-gbawe"
        areaLabel="Weija-Gbawe"
        defaultHeading="Towing & Recovery Service in Weija-Gbawe"
        defaultDescription="Looking for a dependable tow truck in Weija-Gbawe? Santa Towing & Garage Services has you covered with emergency towing, accident recovery, and roadside support, any time of day or night. Backed by our regional Accra dispatch team, we respond quickly to calls in and around Weija-Gbawe, with the option for long-distance towing when needed. Reach out now for fast, professional service."
        prevArea={{ path: "/service-areas/wassa-akropong-to-accra", label: "Wassa Akropong to Accra" }}
        nextArea={{ path: "/service-areas/wassa-akropong-to-accra", label: "Wenchi to Accra" }}
      />
    </>
  );
}
