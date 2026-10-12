import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AkwatiaToAccra() {
  return (
    <>
      <SEO 
        title="Akwatia to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Akwatia and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Akwatia to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/akwatia-to-accra"
        keywords={["towing Akwatia to Accra", "Akwatia Accra towing service", "tow truck Akwatia", "vehicle recovery Akwatia Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="akwatia-to-accra"
        areaLabel="Akwatia to Accra"
        defaultHeading="Akwatia to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Akwatia and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Akwatia to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/akropong-to-accra", label: "Akropong to Accra" }}
        nextArea={{ path: "/service-areas/akropong-to-accra", label: "Akyem Oda to Accra" }}
      />
    </>
  );
}
