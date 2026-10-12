import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Pokuase() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Pokuase"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Pokuase and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Pokuase."
        canonical="/service-areas/pokuase"
        keywords={["towing Pokuase", "tow truck Pokuase", "roadside assistance Pokuase", "car recovery Pokuase", "emergency towing Pokuase", "breakdown service Pokuase"]}
      />
      <ServiceAreaPageTemplate
        slug="pokuase"
        areaLabel="Pokuase"
        defaultHeading="Towing & Recovery Service in Pokuase"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Pokuase and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Pokuase."
        prevArea={{ path: "/service-areas/paga-to-accra", label: "Paga to Accra" }}
        nextArea={{ path: "/service-areas/paga-to-accra", label: "Prampram" }}
      />
    </>
  );
}
