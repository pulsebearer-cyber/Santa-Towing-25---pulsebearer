import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Adenta() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Adenta"
        description="Stranded in Adenta? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Adenta."
        canonical="/service-areas/adenta"
        keywords={["towing Adenta", "tow truck Adenta", "roadside assistance Adenta", "car recovery Adenta", "emergency towing Adenta", "breakdown service Adenta"]}
      />
      <ServiceAreaPageTemplate
        slug="adenta"
        areaLabel="Adenta"
        defaultHeading="Towing & Recovery Service in Adenta"
        defaultDescription="Stranded in Adenta? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Adenta."
        prevArea={{ path: "/service-areas/achimota", label: "Achimota" }}
        nextArea={{ path: "/service-areas/achimota", label: "Aflao to Accra" }}
      />
    </>
  );
}
