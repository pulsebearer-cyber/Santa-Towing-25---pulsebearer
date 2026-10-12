import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AccraToWassaAkropong() {
  return (
    <>
      <SEO 
        title="Accra to Wassa Akropong Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Accra and Wassa Akropong with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Wassa Akropong. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/accra-to-wassa-akropong"
        keywords={["towing Accra to Wassa Akropong", "Accra Wassa Akropong towing service", "tow truck Accra", "vehicle recovery Accra Wassa Akropong", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="accra-to-wassa-akropong"
        areaLabel="Accra to Wassa Akropong"
        defaultHeading="Accra to Wassa Akropong Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Accra and Wassa Akropong with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Accra to Wassa Akropong. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/accra-to-walewale", label: "Accra to Walewale" }}
        nextArea={{ path: "/service-areas/accra-to-walewale", label: "Accra to Wenchi" }}
      />
    </>
  );
}
