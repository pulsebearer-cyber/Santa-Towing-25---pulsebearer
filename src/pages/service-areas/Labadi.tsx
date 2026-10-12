import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Labadi() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Labadi"
        description="Santa Towing & Garage Services proudly serves Labadi with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Labadi."
        canonical="/service-areas/labadi"
        keywords={["towing Labadi", "tow truck Labadi", "roadside assistance Labadi", "car recovery Labadi", "emergency towing Labadi", "breakdown service Labadi"]}
      />
      <ServiceAreaPageTemplate
        slug="labadi"
        areaLabel="Labadi"
        defaultHeading="Towing & Recovery Service in Labadi"
        defaultDescription="Santa Towing & Garage Services proudly serves Labadi with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Labadi."
        prevArea={{ path: "/service-areas/la", label: "La" }}
        nextArea={{ path: "/service-areas/la", label: "Lakeside" }}
      />
    </>
  );
}
