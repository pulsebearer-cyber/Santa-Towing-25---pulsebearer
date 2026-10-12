import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Prampram() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Prampram"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Prampram and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Prampram."
        canonical="/service-areas/prampram"
        keywords={["towing Prampram", "tow truck Prampram", "roadside assistance Prampram", "car recovery Prampram", "emergency towing Prampram", "breakdown service Prampram"]}
      />
      <ServiceAreaPageTemplate
        slug="prampram"
        areaLabel="Prampram"
        defaultHeading="Towing & Recovery Service in Prampram"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Prampram and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Prampram."
        prevArea={{ path: "/service-areas/pokuase", label: "Pokuase" }}
        nextArea={{ path: "/service-areas/pokuase", label: "Prang to Accra" }}
      />
    </>
  );
}
