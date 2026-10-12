import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Ashaiman() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Ashaiman"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Ashaiman and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Ashaiman."
        canonical="/service-areas/ashaiman"
        keywords={["towing Ashaiman", "tow truck Ashaiman", "roadside assistance Ashaiman", "car recovery Ashaiman", "emergency towing Ashaiman", "breakdown service Ashaiman"]}
      />
      <ServiceAreaPageTemplate
        slug="ashaiman"
        areaLabel="Ashaiman"
        defaultHeading="Towing & Recovery Service in Ashaiman"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Ashaiman and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Ashaiman."
        prevArea={{ path: "/service-areas/asante-akim-to-accra", label: "Asante Akim to Accra" }}
        nextArea={{ path: "/service-areas/asante-akim-to-accra", label: "Assin Fosu to Accra" }}
      />
    </>
  );
}
