import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Spintex() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Spintex"
        description="Santa Towing & Garage Services proudly serves Spintex with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Spintex."
        canonical="/service-areas/spintex"
        keywords={["towing Spintex", "tow truck Spintex", "roadside assistance Spintex", "car recovery Spintex", "emergency towing Spintex", "breakdown service Spintex"]}
      />
      <ServiceAreaPageTemplate
        slug="spintex"
        areaLabel="Spintex"
        defaultHeading="Towing & Recovery Service in Spintex"
        defaultDescription="Santa Towing & Garage Services proudly serves Spintex with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Spintex."
        prevArea={{ path: "/service-areas/somanya-to-accra", label: "Somanya to Accra" }}
        nextArea={{ path: "/service-areas/somanya-to-accra", label: "Suhum to Accra" }}
      />
    </>
  );
}
