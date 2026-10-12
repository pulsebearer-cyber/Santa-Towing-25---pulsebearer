import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function HalfAssiniToAccra() {
  return (
    <>
      <SEO 
        title="Half Assini to Accra Towing & Vehicle Recovery Service"
        description="Need a tow from Half Assini to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Half Assini and Accra."
        canonical="/service-areas/half-assini-to-accra"
        keywords={["towing Half Assini to Accra", "Half Assini Accra towing service", "tow truck Half Assini", "vehicle recovery Half Assini Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="half-assini-to-accra"
        areaLabel="Half Assini to Accra"
        defaultHeading="Half Assini to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Need a tow from Half Assini to Accra? Santa Towing & Garage Services provides dependable long-distance towing and vehicle recovery on this route, any time of day or night. Our fully licensed and insured team ensures your vehicle is transported safely and efficiently. Contact us now for fast, professional service between Half Assini and Accra."
        prevArea={{ path: "/service-areas/gushegu-to-accra", label: "Gushegu to Accra" }}
        nextArea={{ path: "/service-areas/gushegu-to-accra", label: "Hamile to Accra" }}
      />
    </>
  );
}
