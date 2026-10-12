import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function NkwantaSouthToAccra() {
  return (
    <>
      <SEO 
        title="Nkwanta South to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Nkwanta South and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Nkwanta South to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/nkwanta-south-to-accra"
        keywords={["towing Nkwanta South to Accra", "Nkwanta South Accra towing service", "tow truck Nkwanta South", "vehicle recovery Nkwanta South Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="nkwanta-south-to-accra"
        areaLabel="Nkwanta South to Accra"
        defaultHeading="Nkwanta South to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Nkwanta South and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Nkwanta South to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/nkoranza-to-accra", label: "Nkoranza to Accra" }}
        nextArea={{ path: "/service-areas/nkoranza-to-accra", label: "Nkwanta to Accra" }}
      />
    </>
  );
}
