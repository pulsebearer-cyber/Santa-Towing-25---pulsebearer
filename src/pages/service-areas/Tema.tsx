import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Tema() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Tema"
        description="Santa Towing & Garage Services proudly serves Tema with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Tema."
        canonical="/service-areas/tema"
        keywords={["towing Tema", "tow truck Tema", "roadside assistance Tema", "car recovery Tema", "emergency towing Tema", "breakdown service Tema"]}
      />
      <ServiceAreaPageTemplate
        slug="tema"
        areaLabel="Tema"
        defaultHeading="Towing & Recovery Service in Tema"
        defaultDescription="Santa Towing & Garage Services proudly serves Tema with reliable, professional towing and vehicle recovery, available every day of the week, day or night. From minor breakdowns to accident recovery, our Accra-based team is ready to assist. We are fully licensed and insured, giving you peace of mind on the road. Call or WhatsApp us for immediate help in Tema."
        prevArea={{ path: "/service-areas/techiman-to-accra", label: "Techiman to Accra" }}
        nextArea={{ path: "/service-areas/techiman-to-accra", label: "Tepa to Accra" }}
      />
    </>
  );
}
