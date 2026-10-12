import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Dodowa() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Dodowa"
        description="Santa Towing & Garage Services proudly serves Dodowa with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Dodowa."
        canonical="/service-areas/dodowa"
        keywords={["towing Dodowa", "tow truck Dodowa", "roadside assistance Dodowa", "car recovery Dodowa", "emergency towing Dodowa", "breakdown service Dodowa"]}
      />
      <ServiceAreaPageTemplate
        slug="dodowa"
        areaLabel="Dodowa"
        defaultHeading="Towing & Recovery Service in Dodowa"
        defaultDescription="Santa Towing & Garage Services proudly serves Dodowa with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Dodowa."
        prevArea={{ path: "/service-areas/dawhenya", label: "Dawhenya" }}
        nextArea={{ path: "/service-areas/dawhenya", label: "Donkorkrom to Accra" }}
      />
    </>
  );
}
