import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Kpone() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Kpone"
        description="Stranded in Kpone? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Kpone."
        canonical="/service-areas/kpone"
        keywords={["towing Kpone", "tow truck Kpone", "roadside assistance Kpone", "car recovery Kpone", "emergency towing Kpone", "breakdown service Kpone"]}
      />
      <ServiceAreaPageTemplate
        slug="kpone"
        areaLabel="Kpone"
        defaultHeading="Towing & Recovery Service in Kpone"
        defaultDescription="Stranded in Kpone? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Kpone."
        prevArea={{ path: "/service-areas/korle-klottey", label: "Korle Klottey" }}
        nextArea={{ path: "/service-areas/korle-klottey", label: "Kumasi to Accra" }}
      />
    </>
  );
}
