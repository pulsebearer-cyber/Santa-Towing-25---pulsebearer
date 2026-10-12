import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function WenchiToAccra() {
  return (
    <>
      <SEO 
        title="Wenchi to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Wenchi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Wenchi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/wenchi-to-accra"
        keywords={["towing Wenchi to Accra", "Wenchi Accra towing service", "tow truck Wenchi", "vehicle recovery Wenchi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="wenchi-to-accra"
        areaLabel="Wenchi to Accra"
        defaultHeading="Wenchi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Wenchi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Wenchi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/weija-gbawe", label: "Weija Gbawe" }}
        nextArea={{ path: "/service-areas/weija-gbawe", label: "Winneba to Accra" }}
      />
    </>
  );
}
