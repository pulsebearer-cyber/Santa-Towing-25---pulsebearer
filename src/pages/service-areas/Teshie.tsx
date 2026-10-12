import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Teshie() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Teshie"
        description="Stranded in Teshie? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Teshie."
        canonical="/service-areas/teshie"
        keywords={["towing Teshie", "tow truck Teshie", "roadside assistance Teshie", "car recovery Teshie", "emergency towing Teshie", "breakdown service Teshie"]}
      />
      <ServiceAreaPageTemplate
        slug="teshie"
        areaLabel="Teshie"
        defaultHeading="Towing & Recovery Service in Teshie"
        defaultDescription="Stranded in Teshie? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Teshie."
        prevArea={{ path: "/service-areas/tesano", label: "Tesano" }}
        nextArea={{ path: "/service-areas/tesano", label: "Tolon to Accra" }}
      />
    </>
  );
}
