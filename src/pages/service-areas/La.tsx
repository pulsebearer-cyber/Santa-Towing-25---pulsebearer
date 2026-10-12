import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function La() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in La"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in La and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in La."
        canonical="/service-areas/la"
        keywords={["towing La", "tow truck La", "roadside assistance La", "car recovery La", "emergency towing La", "breakdown service La"]}
      />
      <ServiceAreaPageTemplate
        slug="la"
        areaLabel="La"
        defaultHeading="Towing & Recovery Service in La"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in La and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in La."
        prevArea={{ path: "/service-areas/kwashieman", label: "Kwashieman" }}
        nextArea={{ path: "/service-areas/kwashieman", label: "Labadi" }}
      />
    </>
  );
}
