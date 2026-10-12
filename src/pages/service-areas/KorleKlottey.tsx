import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KorleKlottey() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Korle Klottey"
        description="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Korle Klottey and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Korle Klottey."
        canonical="/service-areas/korle-klottey"
        keywords={["towing Korle Klottey", "tow truck Korle Klottey", "roadside assistance Korle Klottey", "car recovery Korle Klottey", "emergency towing Korle Klottey", "breakdown service Korle Klottey"]}
      />
      <ServiceAreaPageTemplate
        slug="korle-klottey"
        areaLabel="Korle Klottey"
        defaultHeading="Towing & Recovery Service in Korle Klottey"
        defaultDescription="Santa Towing & Garage Services offers fast, reliable towing and vehicle recovery in Korle Klottey and the surrounding area, available around the clock. Whether it's a breakdown, accident, or flat tyre, our licensed and fully insured team responds quickly, day or night. As part of our Accra-coordinated dispatch network, we also handle long-distance towing to other major towns. Call or WhatsApp us now for immediate roadside assistance in Korle Klottey."
        prevArea={{ path: "/service-areas/konongo-to-accra", label: "Konongo to Accra" }}
        nextArea={{ path: "/service-areas/konongo-to-accra", label: "Kpone" }}
      />
    </>
  );
}
