import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Osu() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Osu"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Osu and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Osu."
        canonical="/service-areas/osu"
        keywords={["towing Osu", "tow truck Osu", "roadside assistance Osu", "car recovery Osu", "emergency towing Osu", "breakdown service Osu"]}
      />
      <ServiceAreaPageTemplate
        slug="osu"
        areaLabel="Osu"
        defaultHeading="Towing & Recovery Service in Osu"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Osu and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Osu."
        prevArea={{ path: "/service-areas/offinso-to-accra", label: "Offinso to Accra" }}
        nextArea={{ path: "/service-areas/offinso-to-accra", label: "Paga to Accra" }}
      />
    </>
  );
}
