import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Amasaman() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Amasaman"
        description="Santa Towing & Garage Services proudly serves Amasaman with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Amasaman."
        canonical="/service-areas/amasaman"
        keywords={["towing Amasaman", "tow truck Amasaman", "roadside assistance Amasaman", "car recovery Amasaman", "emergency towing Amasaman", "breakdown service Amasaman"]}
      />
      <ServiceAreaPageTemplate
        slug="amasaman"
        areaLabel="Amasaman"
        defaultHeading="Towing & Recovery Service in Amasaman"
        defaultDescription="Santa Towing & Garage Services proudly serves Amasaman with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Amasaman."
        prevArea={{ path: "/service-areas/akyem-oda-to-accra", label: "Akyem Oda to Accra" }}
        nextArea={{ path: "/service-areas/akyem-oda-to-accra", label: "Apam to Accra" }}
      />
    </>
  );
}
