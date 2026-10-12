import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Dansoman() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Dansoman"
        description="Stranded in Dansoman? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Dansoman."
        canonical="/service-areas/dansoman"
        keywords={["towing Dansoman", "tow truck Dansoman", "roadside assistance Dansoman", "car recovery Dansoman", "emergency towing Dansoman", "breakdown service Dansoman"]}
      />
      <ServiceAreaPageTemplate
        slug="dansoman"
        areaLabel="Dansoman"
        defaultHeading="Towing & Recovery Service in Dansoman"
        defaultDescription="Stranded in Dansoman? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Dansoman."
        prevArea={{ path: "/service-areas/damongo-to-accra", label: "Damongo to Accra" }}
        nextArea={{ path: "/service-areas/damongo-to-accra", label: "Dawhenya" }}
      />
    </>
  );
}
