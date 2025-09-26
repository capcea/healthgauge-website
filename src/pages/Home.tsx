import React, { useMemo, useState } from 'react';
import { calculatorRegistry } from '../data/calculators';
import { useLanguage } from '../providers/LanguageProvider';
import { CalculatorCard } from '../components/CalculatorCard';
import { AdSlot } from '../components/AdSlot';
import { getLatestPosts } from '../utils/posts';
import { NewsCard } from '../components/NewsCard';
import { SEO } from '../components/SEO';

const trustBadges = ['Clinician reviewed', 'Evidence-based formulas', 'WCAG AA ready'];

const Component: React.FC = () => {
  const { dictionary } = useLanguage();
  const [query, setQuery] = useState('');

  const filteredCalculators = useMemo(() => {
    return calculatorRegistry.filter((calculator) =>
      [calculator.name, calculator.description, calculator.tags.join(' ')].some((value) =>
        value.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);

  const featuredCalculators = filteredCalculators.slice(0, 3);
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <SEO
        title="Health Gauge Health Hub"
        description="Discover bilingual health calculators, actionable macro tools, and curated wellbeing news—all optimized for mobile."
        url="/"
      />
      <section className="bg-gradient-to-b from-primary-50 via-white to-transparent py-16 dark:from-slate-900/40 dark:via-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center">
          <div className="space-y-6 md:w-1/2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600 shadow dark:bg-slate-900">
              ⚡ Fast, science-backed calculators
            </span>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{dictionary.hero.title}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">{dictionary.hero.subtitle}</p>
            <div className="flex flex-col gap-3 md:flex-row">
              <a href="#calculators" className="btn-primary md:w-auto">
                {dictionary.hero.cta}
              </a>
              <a href="/news" className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-200">
                Visit newsroom
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {trustBadges.map((badge) => (
                <div key={badge} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                  {badge}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <AdSlot slotId="1111111111" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      <section className="py-16" id="calculators">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">{dictionary.home.featured}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Tap a calculator to start planning smarter.</p>
            </div>
            <div className="relative w-full max-w-md">
              <label htmlFor="calculator-search" className="sr-only">
                {dictionary.search.placeholder}
              </label>
              <input
                id="calculator-search"
                type="search"
                placeholder={dictionary.search.placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredCalculators.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/calculators" className="btn-primary inline-flex items-center gap-2">
              {dictionary.home.cta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-wide text-primary-200">Health Gauge newsroom</span>
              <h2 className="text-3xl font-semibold">{dictionary.home.latestNews}</h2>
            </div>
            <a href="/news" className="rounded-full border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-200 transition hover:bg-primary-500 hover:text-slate-900">
              View all news
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <NewsCard
                key={post.slug}
                slug={post.slug}
                title={post.meta.title}
                excerpt={post.meta.excerpt}
                date={post.meta.date}
                category={post.meta.category}
                readingTime={post.meta.readingTime}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export { Component };
export default Component;
