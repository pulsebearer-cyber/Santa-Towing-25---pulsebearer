import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function TolonToAccra() {
  return (
    <>
      <SEO 
        title="Tolon to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Tolon and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Tolon to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/tolon-to-accra"
        keywords={["towing Tolon to Accra", "Tolon Accra towing service", "tow truck Tolon", "vehicle recovery Tolon Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="tolon-to-accra"
        areaLabel="Tolon to Accra"
        defaultHeading="Tolon to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Tolon and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Tolon to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/teshie", label: "Teshie" }}
        nextArea={{ path: "/service-areas/teshie", label: "Tumu to Accra" }}
      />
    </>
  );
}
