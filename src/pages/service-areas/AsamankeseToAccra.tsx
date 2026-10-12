import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AsamankeseToAccra() {
  return (
    <>
      <SEO 
        title="Asamankese to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Asamankese and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Asamankese to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/asamankese-to-accra"
        keywords={["towing Asamankese to Accra", "Asamankese Accra towing service", "tow truck Asamankese", "vehicle recovery Asamankese Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="asamankese-to-accra"
        areaLabel="Asamankese to Accra"
        defaultHeading="Asamankese to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Asamankese and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Asamankese to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/apam-to-accra", label: "Apam to Accra" }}
        nextArea={{ path: "/service-areas/apam-to-accra", label: "Asankragwa to Accra" }}
      />
    </>
  );
}
