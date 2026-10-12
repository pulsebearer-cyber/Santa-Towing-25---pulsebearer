import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AirportResidential() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Airport Residential"
        description="Stranded in Airport Residential? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Airport Residential."
        canonical="/service-areas/airport-residential"
        keywords={["towing Airport Residential", "tow truck Airport Residential", "roadside assistance Airport Residential", "car recovery Airport Residential", "emergency towing Airport Residential", "breakdown service Airport Residential"]}
      />
      <ServiceAreaPageTemplate
        slug="airport-residential"
        areaLabel="Airport Residential"
        defaultHeading="Towing & Recovery Service in Airport Residential"
        defaultDescription="Stranded in Airport Residential? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Airport Residential."
        prevArea={{ path: "/service-areas/agona-to-accra", label: "Agona to Accra" }}
        nextArea={{ path: "/service-areas/agona-to-accra", label: "Akontombra to Accra" }}
      />
    </>
  );
}
