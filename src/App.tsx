import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SEO } from './components/SEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Health Gauge Health Hub',
  url: 'https://www.example.com',
  logo: 'https://www.example.com/favicon.svg',
};

const LoadingFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <span className="text-sm text-slate-500">Loading Health Gauge…</span>
  </div>
);

const App: React.FC = () => {
  return (
    <>
      <SEO title="Health Gauge" description="Health Gauge delivers calculators, insights, and expert guidance for modern health tracking." schema={organizationSchema} />
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
