import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function KadjebiToAccra() {
  return (
    <>
      <SEO 
        title="Kadjebi to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Kadjebi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Kadjebi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/kadjebi-to-accra"
        keywords={["towing Kadjebi to Accra", "Kadjebi Accra towing service", "tow truck Kadjebi", "vehicle recovery Kadjebi Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="kadjebi-to-accra"
        areaLabel="Kadjebi to Accra"
        defaultHeading="Kadjebi to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Kadjebi and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Kadjebi to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/juaboso-to-accra", label: "Juaboso to Accra" }}
        nextArea={{ path: "/service-areas/juaboso-to-accra", label: "Kaneshie" }}
      />
    </>
  );
}
