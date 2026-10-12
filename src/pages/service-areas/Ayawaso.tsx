import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Ayawaso() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Ayawaso"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Ayawaso and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Ayawaso."
        canonical="/service-areas/ayawaso"
        keywords={["towing Ayawaso", "tow truck Ayawaso", "roadside assistance Ayawaso", "car recovery Ayawaso", "emergency towing Ayawaso", "breakdown service Ayawaso"]}
      />
      <ServiceAreaPageTemplate
        slug="ayawaso"
        areaLabel="Ayawaso"
        defaultHeading="Towing & Recovery Service in Ayawaso"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Ayawaso and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Ayawaso."
        prevArea={{ path: "/service-areas/axim-to-accra", label: "Axim to Accra" }}
        nextArea={{ path: "/service-areas/axim-to-accra", label: "Bawdie to Accra" }}
      />
    </>
  );
}
