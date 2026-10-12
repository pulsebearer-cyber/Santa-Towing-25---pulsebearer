import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Abeka() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Abeka"
        description="Santa Towing & Garage Services offers fast, reliable towing and car recovery in Abeka and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Abeka."
        canonical="/service-areas/abeka"
        keywords={["towing Abeka", "tow truck Abeka", "roadside assistance Abeka", "car recovery Abeka", "emergency towing Abeka", "breakdown service Abeka"]}
      />
      <ServiceAreaPageTemplate
        slug="abeka"
        areaLabel="Abeka"
        defaultHeading="Towing & Recovery Service in Abeka"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and car recovery in Abeka and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Abeka."
        nextArea={{ path: "/service-areas/abuakwa-to-accra", label: "Abuakwa to Accra" }}
      />
    </>
  );
}
