import React from 'react';
import { PrefetchLink } from '../components/PrefetchLink';
import { SEO } from '../components/SEO';

const Component: React.FC = () => {
  return (
    <>
      <SEO title="Page not found" description="The page you were looking for is unavailable. Explore Health Gauge calculators instead." />
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Error 404</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">We couldn’t find that page</h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            The link might be outdated. Use our calculator hub or newsroom to continue exploring.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <PrefetchLink to="/" className="btn-primary" prefetch={() => import('./Home')}>
              Back to home
            </PrefetchLink>
            <PrefetchLink
              to="/calculators"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300"
              prefetch={() => import('./Calculators')}
            >
              Browse calculators
            </PrefetchLink>
          </div>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
