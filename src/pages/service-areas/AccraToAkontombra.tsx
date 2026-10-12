import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToAkontombra() {
  return (
    <>
      <SEO 
        title="Accra to Akontombra Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Akontombra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Akontombra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-akontombra"
        keywords={["towing Accra to Akontombra", "Accra Akontombra towing service", "tow truck Accra", "car recovery Accra Akontombra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-akontombra"
        areaLabel="Accra to Akontombra"
        defaultHeading="Accra to Akontombra Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Akontombra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Accra to Akontombra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-agona-nkwanta", label: "Accra to Agona Nkwanta" }}
        nextArea={{ path: "/service-areas/accra-to-akropong", label: "Accra to Akropong" }}
      />
    </>
  );
}
