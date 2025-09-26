import React from 'react';
import { SEO } from '../components/SEO';

const Component: React.FC = () => {
  return (
    <>
      <SEO title="About Health Gauge" description="Learn how Health Gauge builds fast calculators and actionable news for everyday health decisions." url="/about" />
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">About Health Gauge</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Health Gauge is a small, research-driven team based in Bucharest and London. We build calculators and stories that help
            people act on the best available science without getting stuck in jargon.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card space-y-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Editorial principles</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                <li>Every calculator cites its equations and underlying assumptions.</li>
                <li>Articles undergo clinical review from our advisory board.</li>
                <li>We publish in English and Romanian with localized examples.</li>
              </ul>
            </div>
            <div className="card space-y-3">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Technology stack</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Built with React, Vite, and TypeScript, Health Gauge ships with Tailwind CSS, MDX content, Google Analytics, and Google
                AdSense. Ready for one-click deploys on Vercel or GitHub Pages.
              </p>
            </div>
          </div>
          <div className="card space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Trust & compliance</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We follow WCAG AA guidance, implement schema.org structured data, and maintain a transparent privacy and terms
              policy. Our roadmap adds more localized dictionaries and integrations with wearable APIs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
