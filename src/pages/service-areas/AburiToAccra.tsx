import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AburiToAccra() {
  return (
    <>
      <SEO 
        title="Aburi to Accra Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Aburi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Aburi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/aburi-to-accra"
        keywords={["towing Aburi to Accra", "Aburi Accra towing service", "tow truck Aburi", "car recovery Aburi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="aburi-to-accra"
        areaLabel="Aburi to Accra"
        defaultHeading="Aburi to Accra Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Aburi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Aburi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/abuakwa-to-accra", label: "Abuakwa to Accra" }}
        nextArea={{ path: "/service-areas/accra", label: "Accra" }}
      />
    </>
  );
}
