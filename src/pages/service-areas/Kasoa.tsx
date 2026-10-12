import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Kasoa() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Kasoa"
        description="Santa Towing & Garage Services proudly serves Kasoa with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Kasoa."
        canonical="/service-areas/kasoa"
        keywords={["towing Kasoa", "tow truck Kasoa", "roadside assistance Kasoa", "car recovery Kasoa", "emergency towing Kasoa", "breakdown service Kasoa"]}
      />
      <ServiceAreaPageTemplate
        slug="kasoa"
        areaLabel="Kasoa"
        defaultHeading="Towing & Recovery Service in Kasoa"
        defaultDescription="Santa Towing & Garage Services proudly serves Kasoa with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Kasoa."
        prevArea={{ path: "/service-areas/karaga-to-accra", label: "Karaga to Accra" }}
        nextArea={{ path: "/service-areas/karaga-to-accra", label: "Kenyasi to Accra" }}
      />
    </>
  );
}
