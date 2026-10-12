import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function BurmaCamp() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Burma Camp"
        description="Stranded in Burma Camp? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Burma Camp."
        canonical="/service-areas/burma-camp"
        keywords={["towing Burma Camp", "tow truck Burma Camp", "roadside assistance Burma Camp", "car recovery Burma Camp", "emergency towing Burma Camp", "breakdown service Burma Camp"]}
      />
      <ServiceAreaPageTemplate
        slug="burma-camp"
        areaLabel="Burma Camp"
        defaultHeading="Towing & Recovery Service in Burma Camp"
        defaultDescription="Stranded in Burma Camp? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Burma Camp."
        prevArea={{ path: "/service-areas/buipe-to-accra", label: "Buipe to Accra" }}
        nextArea={{ path: "/service-areas/buipe-to-accra", label: "Cape Coast to Accra" }}
      />
    </>
  );
}
