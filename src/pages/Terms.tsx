import React from 'react';
import { SEO } from '../components/SEO';

const Component: React.FC = () => {
  return (
    <>
      <SEO title="Terms of service" description="Review Health Gauge terms covering calculator accuracy, liability, and acceptable use." url="/terms" />
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Terms of service</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Effective date: March 1, 2025</p>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Health Gauge calculators are educational tools and do not replace medical diagnosis or individualized treatment plans. Consult
              a licensed professional before making health decisions.
            </p>
            <p>
              You may share Health Gauge tools with attribution. Commercial redistribution without written consent is prohibited.
            </p>
            <p>
              We reserve the right to update formulas, content, or pricing at any time. Continued use constitutes acceptance of changes.
            </p>
            <p>
              For partnership or licensing inquiries, contact legal@healthgauge.health.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
