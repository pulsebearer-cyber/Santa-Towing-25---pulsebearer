import React from 'react';
import SEO from '../../components/seo/SEO';
import ServiceAreaPageTemplate from '../../components/sections/ServiceAreaPageTemplate';

export default function WassaAkropongToAccra() {
  return (
    <>
      <SEO 
        title="Wassa Akropong to Accra Towing & Vehicle Recovery Service"
        description="Stranded on the road between Wassa Akropong and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        canonical="/service-areas/wassa-akropong-to-accra"
        keywords={["towing Wassa Akropong to Accra", "Wassa Akropong Accra towing service", "tow truck Wassa Akropong", "vehicle recovery Wassa Akropong Accra", "long distance towing Ghana"]}
      />
      <ServiceAreaPageTemplate
        slug="wassa-akropong-to-accra"
        areaLabel="Wassa Akropong to Accra"
        defaultHeading="Wassa Akropong to Accra Towing & Vehicle Recovery Service"
        defaultDescription="Stranded on the road between Wassa Akropong and Accra? Santa Towing & Garage Services offers prompt, reliable towing and recovery on this route, day or night. Our team is equipped to handle cars, SUVs, and light commercial vehicles, with real-time updates throughout the journey. Reach out now for immediate assistance."
        prevArea={{ path: "/service-areas/walewale-to-accra", label: "Walewale to Accra" }}
        nextArea={{ path: "/service-areas/walewale-to-accra", label: "Weija Gbawe" }}
      />
    </>
  );
}
