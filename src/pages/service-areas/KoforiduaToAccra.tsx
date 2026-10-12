import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KoforiduaToAccra() {
  return (
    <>
      <SEO 
        title="Koforidua to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Koforidua and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Koforidua to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/koforidua-to-accra"
        keywords={["towing Koforidua to Accra", "Koforidua Accra towing service", "tow truck Koforidua", "vehicle recovery Koforidua Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="koforidua-to-accra"
        areaLabel="Koforidua to Accra"
        defaultHeading="Koforidua to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Koforidua and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Koforidua to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/kintampo-to-accra", label: "Kintampo to Accra" }}
        nextArea={{ path: "/service-areas/kintampo-to-accra", label: "Konongo to Accra" }}
      />
    </>
  );
}
