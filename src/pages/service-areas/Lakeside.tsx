import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function Lakeside() {
  return (
    <>
      <SEO 
        title="Towing & Recovery Service in Lakeside"
        description="Stranded in Lakeside? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Lakeside."
        canonical="/service-areas/lakeside"
        keywords={["towing Lakeside", "tow truck Lakeside", "roadside assistance Lakeside", "car recovery Lakeside", "emergency towing Lakeside", "breakdown service Lakeside"]}
      />
      <ServiceAreaPageTemplate
        slug="lakeside"
        areaLabel="Lakeside"
        defaultHeading="Towing & Recovery Service in Lakeside"
        defaultDescription="Stranded in Lakeside? Santa Towing & Garage Services provides emergency towing, breakdown recovery, and roadside assistance right here, day or night. Our team, dispatched through our Accra hub, is equipped to handle cars, SUVs, and light commercial vehicles. Licensed, insured, and trusted across Ghana. Contact us today for prompt service in Lakeside."
        prevArea={{ path: "/service-areas/labadi", label: "Labadi" }}
        nextArea={{ path: "/service-areas/labadi", label: "Lawra to Accra" }}
      />
    </>
  );
}
