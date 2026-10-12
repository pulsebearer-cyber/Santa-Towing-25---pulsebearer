import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Achimota() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Achimota"
        description="Santa Towing & Garage Services proudly serves Achimota with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Achimota."
        canonical="/service-areas/achimota"
        keywords={["towing Achimota", "tow truck Achimota", "roadside assistance Achimota", "car recovery Achimota", "emergency towing Achimota", "breakdown service Achimota"]}
      />
      <ServiceAreaPageTemplate
        slug="achimota"
        areaLabel="Achimota"
        defaultHeading="Towing & Recovery Service in Achimota"
        defaultDescription="Santa Towing & Garage Services proudly serves Achimota with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Achimota."
        prevArea={{ path: "/service-areas/accra-to-zebilla", label: "Accra to Zebilla" }}
        nextArea={{ path: "/service-areas/accra-to-zebilla", label: "Adenta" }}
      />
    </>
  );
}
