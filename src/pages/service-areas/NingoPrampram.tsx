import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NingoPrampram() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Ningo-Prampram"
        description="Santa Towing & Garage Services proudly serves Ningo-Prampram with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Ningo-Prampram."
        canonical="/service-areas/ningo-prampram"
        keywords={["towing Ningo-Prampram", "tow truck Ningo-Prampram", "roadside assistance Ningo-Prampram", "car recovery Ningo-Prampram", "emergency towing Ningo-Prampram", "breakdown service Ningo-Prampram"]}
      />
      <ServiceAreaPageTemplate
        slug="ningo-prampram"
        areaLabel="Ningo-Prampram"
        defaultHeading="Towing & Recovery Service in Ningo-Prampram"
        defaultDescription="Santa Towing & Garage Services proudly serves Ningo-Prampram with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Ningo-Prampram."
        prevArea={{ path: "/service-areas/nima", label: "Nima" }}
        nextArea={{ path: "/service-areas/nima", label: "Nkawie to Accra" }}
      />
    </>
  );
}
