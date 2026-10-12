import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DuayawNkwantaToAccra() {
  return (
    <>
      <SEO 
        title="Duayaw Nkwanta to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Duayaw Nkwanta and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Duayaw Nkwanta to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/duayaw-nkwanta-to-accra"
        keywords={["towing Duayaw Nkwanta to Accra", "Duayaw Nkwanta Accra towing service", "tow truck Duayaw Nkwanta", "vehicle recovery Duayaw Nkwanta Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="duayaw-nkwanta-to-accra"
        areaLabel="Duayaw Nkwanta to Accra"
        defaultHeading="Duayaw Nkwanta to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Duayaw Nkwanta and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Duayaw Nkwanta to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/dormaa-ahenkro-to-accra", label: "Dormaa Ahenkro to Accra" }}
        nextArea={{ path: "/service-areas/dormaa-ahenkro-to-accra", label: "Dunkwa On Offin to Accra" }}
      />
    </>
  );
}
