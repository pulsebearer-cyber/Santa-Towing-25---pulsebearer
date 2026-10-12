import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string[];
}

export default function SEO({ title, description, canonical, noindex = false, keywords }: SEOProps) {
  const siteUrl = 'https://sparkprimeautoservices.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
    </Helmet>
  );
}
