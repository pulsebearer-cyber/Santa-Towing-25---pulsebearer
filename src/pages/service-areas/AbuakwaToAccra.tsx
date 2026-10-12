import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function AbuakwaToAccra() {
  return (
    <>
      <SEO 
        title="Abuakwa to Accra Towing & Car Recovery Service"
        description="Santa Towing & Garage Services handles long-distance towing between Abuakwa and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Abuakwa to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        canonical="/service-areas/abuakwa-to-accra"
        keywords={["towing Abuakwa to Accra", "Abuakwa Accra towing service", "tow truck Abuakwa", "car recovery Abuakwa Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="abuakwa-to-accra"
        areaLabel="Abuakwa to Accra"
        defaultHeading="Abuakwa to Accra Towing & Car Recovery Service"
        defaultDescription="Santa Towing & Garage Services handles long-distance towing between Abuakwa and Accra with a licensed, insured, and experienced team. Whether it's a breakdown, accident, or scheduled transport, we get your car safely from Abuakwa to Accra. Call or WhatsApp us now for a quote and fast dispatch."
        prevArea={{ path: "/service-areas/abeka", label: "Abeka" }}
        nextArea={{ path: "/service-areas/aburi-to-accra", label: "Aburi to Accra" }}
      />
    </>
  );
}
