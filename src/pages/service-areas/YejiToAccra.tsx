import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function YejiToAccra() {
  return (
    <>
      <SEO 
        title="Yeji to Accra Towing & Vehicle Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Yeji and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Yeji to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/yeji-to-accra"
        keywords={["towing Yeji to Accra", "Yeji Accra towing service", "tow truck Yeji", "vehicle recovery Yeji Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="yeji-to-accra"
        areaLabel="Yeji to Accra"
        defaultHeading="Yeji to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Yeji and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your vehicle safely from Yeji to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/winneba-to-accra", label: "Winneba to Accra" }}
        nextArea={{ path: "/service-areas/winneba-to-accra", label: "Yendi to Accra" }}
      />
    </>
  );
}
