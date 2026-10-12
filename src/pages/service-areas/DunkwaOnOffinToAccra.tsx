import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function DunkwaOnOffinToAccra() {
  return (
    <>
      <SEO 
        title="Dunkwa-on-Offin to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Dunkwa-on-Offin and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Dunkwa-on-Offin to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/dunkwa-on-offin-to-accra"
        keywords={["towing Dunkwa-on-Offin to Accra", "Dunkwa-on-Offin Accra towing service", "tow truck Dunkwa-on-Offin", "vehicle recovery Dunkwa-on-Offin Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="dunkwa-on-offin-to-accra"
        areaLabel="Dunkwa-on-Offin to Accra"
        defaultHeading="Dunkwa-on-Offin to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Dunkwa-on-Offin and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Dunkwa-on-Offin to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/duayaw-nkwanta-to-accra", label: "Duayaw Nkwanta to Accra" }}
        nextArea={{ path: "/service-areas/duayaw-nkwanta-to-accra", label: "Dzorwulu" }}
      />
    </>
  );
}
