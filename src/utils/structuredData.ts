// Structured data generators for better SEO

export interface CalculatorData {
  name: string;
  description: string;
  url: string;
  category: string;
  formula?: string;
  inputs: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  outputs: Array<{
    name: string;
    type: string;
    description: string;
  }>;
}

export const generateCalculatorSchema = (calculator: CalculatorData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculator.name,
    description: calculator.description,
    url: `https://www.healthgauge.com${calculator.url}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'BMI Calculation',
      'Macro Planning',
      'Nutrition Tracking',
      'Health Metrics'
    ],
    screenshot: `https://www.healthgauge.com${calculator.url}/screenshot.png`,
    author: {
      '@type': 'Organization',
      name: 'Health Gauge',
      url: 'https://www.healthgauge.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Health Gauge',
      url: 'https://www.healthgauge.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.healthgauge.com/logo.png'
      }
    },
    potentialAction: {
      '@type': 'UseAction',
      target: `https://www.healthgauge.com${calculator.url}`,
      'object': {
        '@type': 'EntryPoint',
        urlTemplate: `https://www.healthgauge.com${calculator.url}`
      }
    }
  };
};

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  category: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || 'https://www.healthgauge.com/og-image.jpg',
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Health Gauge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.healthgauge.com/logo.png'
      }
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.healthgauge.com${article.url}`
    },
    articleSection: article.category,
    keywords: [
      'health',
      'fitness',
      'nutrition',
      'wellness',
      'calculator',
      article.category.toLowerCase()
    ]
  };
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{
  name: string;
  url: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://www.healthgauge.com${crumb.url}`
    }))
  };
};

export const generateFAQSchema = (faqs: Array<{
  question: string;
  answer: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Health Gauge',
    url: 'https://www.healthgauge.com',
    logo: 'https://www.healthgauge.com/logo.png',
    description: 'Professional health calculators, fitness tools, and evidence-based wellness insights',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@healthgauge.com'
    },
    sameAs: [
      'https://twitter.com/healthgauge',
      'https://facebook.com/healthgauge',
      'https://linkedin.com/company/healthgauge'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    }
  };
};

export const generateWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Health Gauge',
    url: 'https://www.healthgauge.com',
    description: 'Professional health calculators, fitness tools, and evidence-based wellness insights',
    publisher: {
      '@type': 'Organization',
      name: 'Health Gauge',
      url: 'https://www.healthgauge.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.healthgauge.com/logo.png'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.healthgauge.com/calculators?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
};
