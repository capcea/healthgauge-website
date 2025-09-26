import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  schema?: Record<string, unknown>;
  locale?: string;
};

const siteUrl = 'https://www.example.com';
const defaultImage = `${siteUrl}/favicon.svg`;

export const SEO: React.FC<SEOProps> = ({ title, description, url, image, schema, locale = 'en_US' }) => {
  const metaTitle = `${title} | Codex Health Hub`;
  const metaDescription = description ?? 'Codex delivers fast calculators and actionable health news to power everyday wellbeing.';
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const metaImage = image ?? defaultImage;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Codex Health Hub" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};
