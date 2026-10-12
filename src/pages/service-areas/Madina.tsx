import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Madina() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Madina"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Madina and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Madina."
        canonical="/service-areas/madina"
        keywords={["towing Madina", "tow truck Madina", "roadside assistance Madina", "car recovery Madina", "emergency towing Madina", "breakdown service Madina"]}
      />
      <ServiceAreaPageTemplate
        slug="madina"
        areaLabel="Madina"
        defaultHeading="Towing & Recovery Service in Madina"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Madina and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Madina."
        prevArea={{ path: "/service-areas/lawra-to-accra", label: "Lawra to Accra" }}
        nextArea={{ path: "/service-areas/lawra-to-accra", label: "Mampong to Accra" }}
      />
    </>
  );
}
