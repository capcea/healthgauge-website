import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SEO } from './components/SEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Codex Health Hub',
  url: 'https://www.example.com',
  logo: 'https://www.example.com/favicon.svg',
};

const LoadingFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <span className="text-sm text-slate-500">Loading Codex…</span>
  </div>
);

const App: React.FC = () => {
  return (
    <>
      <SEO title="Codex" description="Codex delivers calculators, insights, and expert guidance for modern health tracking." schema={organizationSchema} />
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
