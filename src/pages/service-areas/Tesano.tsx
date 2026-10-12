import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Tesano() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Tesano"
        description="Santa Towing & Garage Services proudly serves Tesano with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Tesano."
        canonical="/service-areas/tesano"
        keywords={["towing Tesano", "tow truck Tesano", "roadside assistance Tesano", "car recovery Tesano", "emergency towing Tesano", "breakdown service Tesano"]}
      />
      <ServiceAreaPageTemplate
        slug="tesano"
        areaLabel="Tesano"
        defaultHeading="Towing & Recovery Service in Tesano"
        defaultDescription="Santa Towing & Garage Services proudly serves Tesano with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Tesano."
        prevArea={{ path: "/service-areas/tepa-to-accra", label: "Tepa to Accra" }}
        nextArea={{ path: "/service-areas/tepa-to-accra", label: "Teshie" }}
      />
    </>
  );
}
