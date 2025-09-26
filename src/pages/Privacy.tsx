import React from 'react';
import { SEO } from '../components/SEO';

const Component: React.FC = () => {
  return (
    <>
      <SEO title="Privacy policy" description="Understand how Codex collects, stores, and safeguards your personal data." url="/privacy" />
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Privacy policy</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Last updated: March 1, 2025
          </p>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Codex uses Google Analytics and Google AdSense to understand how visitors use our site and to display contextual ads.
              We do not sell personal data to third parties.
            </p>
            <p>
              When you submit a form, we collect your name, email, and message to follow up. Data is stored on secure servers in the EU and deleted upon request.
            </p>
            <p>
              Cookies help us remember language preferences and anonymize usage metrics. You can disable cookies in your browser at any time.
            </p>
            <p>
              For access or deletion requests, email privacy@codex.health. We respond within 30 days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
