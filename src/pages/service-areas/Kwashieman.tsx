import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Kwashieman() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Kwashieman"
        description="Stranded in Kwashieman? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Kwashieman."
        canonical="/service-areas/kwashieman"
        keywords={["towing Kwashieman", "tow truck Kwashieman", "roadside assistance Kwashieman", "car recovery Kwashieman", "emergency towing Kwashieman", "breakdown service Kwashieman"]}
      />
      <ServiceAreaPageTemplate
        slug="kwashieman"
        areaLabel="Kwashieman"
        defaultHeading="Towing & Recovery Service in Kwashieman"
        defaultDescription="Stranded in Kwashieman? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Kwashieman."
        prevArea={{ path: "/service-areas/kwame-danso-to-accra", label: "Kwame Danso to Accra" }}
        nextArea={{ path: "/service-areas/kwame-danso-to-accra", label: "La" }}
      />
    </>
  );
}
