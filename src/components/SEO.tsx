import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  schema?: Record<string, unknown>;
  locale?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleType?: 'article' | 'website';
  noindex?: boolean;
  nofollow?: boolean;
};

const siteUrl = 'https://www.healthgauge.com';
const defaultImage = `${siteUrl}/og-image.jpg`;
const siteName = 'Health Gauge';
const siteDescription = 'Professional health calculators, fitness tools, and evidence-based wellness insights. Track BMI, calculate macros, plan nutrition, and optimize your health journey.';

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  url, 
  image, 
  schema, 
  locale = 'en_US',
  keywords = [],
  author = 'Health Gauge Team',
  publishedTime,
  modifiedTime,
  articleType = 'website',
  noindex = false,
  nofollow = false
}) => {
  const metaTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const metaDescription = description ?? siteDescription;
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const metaImage = image ?? defaultImage;
  const fullKeywords = [
    'health calculator',
    'BMI calculator',
    'macro calculator',
    'TDEE calculator',
    'fitness tools',
    'nutrition planning',
    'wellness calculator',
    'health tracking',
    ...keywords
  ].join(', ');

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/calculators?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const articleSchema = articleType === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: metaDescription,
    image: metaImage,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={articleType} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Article specific meta tags */}
      {articleType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {articleType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {articleType === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Language and region */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || (articleType === 'article' ? articleSchema : defaultSchema))}
      </script>
    </Helmet>
  );
};
